
// ==========================================
// AI TRIP PLANNER - OPTIMIZED VERSION
// Parallel Search + 24 Hour Cache
// ==========================================

const ujjainPlaces = [
    {
        name: "Mahakaleshwar Jyotirlinga",
        description: "Ujjain ka famous Jyotirlinga temple."
    },
    {
        name: "Harsiddhi Mata Temple",
        description: "Ujjain ka prasiddh Shakti Peeth."
    },
    {
        name: "Ram Ghat",
        description: "Shipra river ke kinare famous ghat."
    },
    {
        name: "Kaal Bhairav Temple",
        description: "Ujjain ka famous Bhairav mandir."
    },
    {
        name: "Mangalnath Temple",
        description: "Ujjain ka prasiddh dharmik sthal."
    },
    {
        name: "Sandipani Ashram",
        description: "Krishna ji se judi prasiddh jagah."
    },
    {
        name: "Vedh Shala",
        description: "Ujjain ki historic observatory."
    }
];

// ==========================================
// CACHE SETTINGS
// ==========================================

const CACHE_TIME = 24 * 60 * 60 * 1000;
const GEO_CACHE_TIME = 7 * 24 * 60 * 60 * 1000;

const CACHE_PREFIX = "aiTripPlanner_";
const pendingSearches = new Map();

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function readCache(key, duration) {
    try {
        const saved = localStorage.getItem(CACHE_PREFIX + key);

        if (!saved) return null;

        const data = JSON.parse(saved);

        if (Date.now() - data.time > duration) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }

        return data.value;

    } catch (error) {
        return null;
    }
}

function saveCache(key, value) {
    try {
        localStorage.setItem(
            CACHE_PREFIX + key,
            JSON.stringify({
                time: Date.now(),
                value: value
            })
        );
    } catch (error) {
        console.warn("Cache storage unavailable:", error);
    }
}

// ==========================================
// FETCH WITH TIMEOUT
// ==========================================

async function fetchJSON(url, timeout = 15000) {

    const controller = new AbortController();

    const timer = setTimeout(
        () => controller.abort(),
        timeout
    );

    try {

        const response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error("API request failed: " + response.status);
        }

        return await response.json();

    } finally {
        clearTimeout(timer);
    }
}

// ==========================================
// GEOGRAPHIC LOCATION SEARCH
// ==========================================

async function findLocation(city) {

    const cacheKey = "geo_" + city.toLowerCase();

    const cached = readCache(cacheKey, GEO_CACHE_TIME);

    if (cached) {
        console.log("Location loaded from cache");
        return cached;
    }

    const geoUrl =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) +
        "&count=10&language=en&format=json&countryCode=IN";

    const data = await fetchJSON(geoUrl);

    if (!data.results || data.results.length === 0) {
        throw new Error("Destination not found. Please check spelling.");
    }

    let location;

    if (city.toLowerCase().includes("manali")) {

        location = data.results.find(item =>
            item.name.toLowerCase() === "manali" &&
            (item.admin1 || "").toLowerCase().includes("himachal")
        );

        if (!location) {
            throw new Error("Manali, Himachal Pradesh could not be verified.");
        }

    } else {
        location = data.results[0];
    }

    saveCache(cacheKey, location);

    return location;
}

// ==========================================
// PARALLEL OVERPASS SEARCH
// ==========================================

async function searchOverpass(lat, lon) {

    const cacheKey =
        "places_" + lat.toFixed(3) + "_" + lon.toFixed(3);

    const cached = readCache(cacheKey, CACHE_TIME);

    if (cached) {
        console.log("Tourist places loaded from cache");
        return cached;
    }

    const query = `
        [out:json][timeout:18];
        (
            nwr(around:20000,${lat},${lon})
            ["tourism"~"attraction|museum|zoo|theme_park|viewpoint|gallery"];

            nwr(around:20000,${lat},${lon})
            ["historic"];

            nwr(around:20000,${lat},${lon})
            ["amenity"="place_of_worship"];
        );
        out center 40;
    `;

    // Multiple servers are tried simultaneously.
    const servers = [
        "https://overpass.private.coffee/api/interpreter",
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter"
    ];

    const controllers = [];
    const timers = [];

    try {

        const requests = servers.map(async server => {

            const controller = new AbortController();
            controllers.push(controller);

            const timer = setTimeout(
                () => controller.abort(),
                20000
            );

            timers.push(timer);

            const response = await fetch(server, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + encodeURIComponent(query),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error("Overpass server unavailable");
            }

            const data = await response.json();

            if (!data.elements) {
                throw new Error("Invalid tourist places response");
            }

            return data;

        });

        // First successful server response wins.
        const data = await Promise.any(requests);

        // Stop other requests after success.
        controllers.forEach(controller => controller.abort());

        saveCache(cacheKey, data);

        return data;

    } finally {

        timers.forEach(timer => clearTimeout(timer));
        controllers.forEach(controller => controller.abort());

    }
}

// ==========================================
// FILTER AND SORT TOURIST PLACES
// ==========================================

function filterPlaces(elements) {

    const seen = new Set();

    const blockedNames = [
        "temple",
        "church",
        "mosque",
        "shrine",
        "sacred trees",
        "end trail",
        "viewpoint",
        "valley viewpoint",
        "meadow viewpoint",
        "view to waterfall"
    ];

    const places = elements.filter(item => {

        const name = item.tags && item.tags.name;

        if (!name || name.trim().length < 4) {
            return false;
        }

        const key = name.trim().toLowerCase();

        if (blockedNames.includes(key)) {
            return false;
        }

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);

        return true;
    });

    // Give attractions and museums priority.
    places.sort((a, b) => {

        function priority(item) {

            const tourism = item.tags.tourism;

            if (tourism === "attraction") return 1;
            if (tourism === "museum") return 2;
            if (item.tags.historic) return 3;
            if (item.tags.amenity === "place_of_worship") return 4;

            return 5;
        }

        return priority(a) - priority(b);
    });

    return places;
}

// ==========================================
// GOOGLE MAPS LINK
// ==========================================

function createMapLink(name, city) {

    const query = encodeURIComponent(name + " " + city + " India");

    return `
        <a target="_blank"
           rel="noopener noreferrer"
           href="https://www.google.com/maps/search/?api=1&query=${query}">
           Open in Google Maps →
        </a>
    `;
}

// ==========================================
// DAY-WISE ITINERARY
// ==========================================

function createItinerary(places, days, city) {

    let html = "";

    const placesPerDay = Math.ceil(places.length / days);

    for (let day = 0; day < days; day++) {

        const start = day * placesPerDay;
        const end = Math.min(start + placesPerDay, places.length);

        if (start >= places.length) break;

        html += `<h3>Day ${day + 1}</h3>`;

        for (let i = start; i < end; i++) {

            const place = places[i];

            const name = place.tags.name;

            const category =
                place.tags.tourism ||
                place.tags.historic ||
                place.tags.amenity ||
                "Tourist place";

            html += `
                <div class="trip-place">

                    <h4>${i + 1}. ${escapeHTML(name)}</h4>

                    <p>Category: ${escapeHTML(category)}</p>

                    ${createMapLink(name, city)}

                </div>
            `;
        }
    }

    return html;
}

// ==========================================
// UJJAIN SPECIAL ITINERARY
// ==========================================

function createUjjainPlan(from, to, days, style) {

    let html = `
        <h2>${escapeHTML(from)} → ${escapeHTML(to)}</h2>
        <p>${days} Days | ${escapeHTML(style)}</p>
        <h3>Tourist Places near Ujjain</h3>
    `;

    const placesPerDay = Math.ceil(ujjainPlaces.length / days);

    for (let day = 0; day < days; day++) {

        const start = day * placesPerDay;
        const end = Math.min(start + placesPerDay, ujjainPlaces.length);

        if (start >= ujjainPlaces.length) break;

        html += `<h3>Day ${day + 1}</h3>`;

        for (let i = start; i < end; i++) {

            const place = ujjainPlaces[i];

            html += `
                <div class="trip-place">
                    <h4>${i + 1}. ${escapeHTML(place.name)}</h4>
                    <p>${escapeHTML(place.description)}</p>
                    ${createMapLink(place.name, "Ujjain")}
                </div>
            `;
        }
    }

    return html;
}

// ==========================================
// MAIN TRIP PLANNER
// ==========================================

async function makePlan() {

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();

    const days = Math.max(
        1,
        Number(document.getElementById("days").value) || 1
    );

    const style = document.getElementById("style").value;

    const result = document.getElementById("trip-result");

    const button = document.getElementById("create-trip-btn");

    if (!from || !to) {
        alert("Please enter starting city and destination!");
        return;
    }

    if (!result) {
        alert("Trip result section is missing!");
        return;
    }

    result.style.display = "block";

    result.innerHTML = `
        <h2>Finding tourist places near ${escapeHTML(to)}...</h2>
        <p>Please wait while we prepare your trip.</p>
    `;

    if (button) {
        button.disabled = true;
        button.textContent = "Searching...";
    }

    result.scrollIntoView({ behavior: "smooth" });

    try {

        // Ujjain special itinerary
        if (to.toLowerCase().includes("ujjain")) {

            result.innerHTML = createUjjainPlan(
                from, to, days, style
            );

            return;
        }

        // Search destination coordinates
        const location = await findLocation(to);

        const lat = location.latitude;
        const lon = location.longitude;

        // Search tourist places
        // Multiple requests are handled simultaneously.
        const mapData = await searchOverpass(lat, lon);

        const places = filterPlaces(mapData.elements);

        if (places.length === 0) {

            result.innerHTML = `
                <h2>${escapeHTML(to)}</h2>

                <p>No mapped tourist places were found nearby.</p>

                ${createMapLink("Tourist places", to)}
            `;

            return;
        }

        let html = `
            <h2>${escapeHTML(from)} → ${escapeHTML(to)}</h2>

            <p>${days} Days | ${escapeHTML(style)}</p>

            <h3>Tourist Places near ${escapeHTML(to)}</h3>

            <p>
                Places found within approximately 20 km
                of your destination. Map data may be incomplete.
            </p>
        `;

        html += createItinerary(places, days, to);

        result.innerHTML = html;

    } catch (error) {

        console.error("Trip Planner Error:", error);

        result.innerHTML = `
            <h2>Unable to load tourist places</h2>

            <p>${escapeHTML(error.message)}</p>

            <p>Please try again later.</p>

            ${createMapLink("Tourist places", to)}
        `;

    } finally {

        if (button) {
            button.disabled = false;
            button.textContent = "Create My Trip →";
        }
    }
}
