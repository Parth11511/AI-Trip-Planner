
/* =========================================
   AI TRIP PLANNER
   FAST SEARCH + SMART CACHE VERSION
========================================= */

// UJJAIN SPECIAL PLACES

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

// =========================================
// CACHE SETTINGS
// =========================================

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

const CACHE_PREFIX = "AITRIP_FAST_V5_";

const memoryCache = new Map();

const activeRequests = new Map();

let isSearching = false;

// =========================================
// SAFE HTML
// =========================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

}

// =========================================
// CACHE FUNCTIONS
// =========================================

function getCache(key) {

    // Check memory first
    const memoryData = memoryCache.get(key);

    if (memoryData && Date.now() - memoryData.time < CACHE_DURATION) {
        console.log("Memory cache HIT:", key);
        return memoryData.value;
    }

    // Check browser storage
    try {

        const saved = localStorage.getItem(CACHE_PREFIX + key);

        if (!saved) return null;

        const data = JSON.parse(saved);

        if (Date.now() - data.time > CACHE_DURATION) {

            localStorage.removeItem(CACHE_PREFIX + key);

            return null;
        }

        memoryCache.set(key, data);

        console.log("LocalStorage cache HIT:", key);

        return data.value;

    } catch (error) {

        console.warn("Cache read error:", error);

        return null;
    }
}

function setCache(key, value) {

    const data = {
        time: Date.now(),
        value: value
    };

    // Save in memory
    memoryCache.set(key, data);

    // Save in browser storage
    try {

        localStorage.setItem(
            CACHE_PREFIX + key,
            JSON.stringify(data)
        );

    } catch (error) {

        console.warn("Cache storage unavailable:", error);
    }
}

// =========================================
// FETCH WITH TIMEOUT
// =========================================

async function fetchJSON(url, timeout = 12000) {

    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {

        const response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        return await response.json();

    } finally {

        clearTimeout(timer);

    }
}

// =========================================
// DESTINATION SEARCH
// =========================================

async function findLocation(city) {

    const cacheKey = "location_" + city.toLowerCase();

    const cached = getCache(cacheKey);

    if (cached) {
        return cached;
    }

    const url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) +
        "&count=10&language=en&format=json&countryCode=IN";

    const data = await fetchJSON(url);

    if (!data.results || data.results.length === 0) {

        throw new Error(
            "Destination not found. Please check spelling."
        );
    }

    let location;

    // Select Manali in Himachal Pradesh
    if (city.toLowerCase().includes("manali")) {

        location = data.results.find(item =>
            item.name.toLowerCase() === "manali" &&
            (item.admin1 || "").toLowerCase().includes("himachal")
        );

        if (!location) {
            throw new Error("Manali, Himachal Pradesh not found.");
        }

    } else {

        location = data.results[0];

    }

    setCache(cacheKey, location);

    return location;
}

// =========================================
// OVERPASS API SEARCH
// =========================================

async function fetchOverpass(server, query, timeout = 10000) {

    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {

        const response = await fetch(server, {

            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: "data=" + encodeURIComponent(query),

            signal: controller.signal

        });

        if (!response.ok) {

            throw new Error("Server error: " + response.status);

        }

        const data = await response.json();

        if (!data.elements || data.remark) {

            throw new Error("Invalid tourist places response.");

        }

        return data;

    } finally {

        clearTimeout(timer);

    }
}

// =========================================
// FAST TOURIST PLACES SEARCH
// =========================================

async function searchOverpass(lat, lon, city) {

    const cacheKey = "tourist_places_" + city.toLowerCase();

    // Cache check before API request
    const cached = getCache(cacheKey);

    if (cached) {

        console.log("Tourist places loaded instantly from cache!");

        return cached;

    }

    // Prevent duplicate simultaneous requests
    if (activeRequests.has(cacheKey)) {

        return activeRequests.get(cacheKey);

    }

    const searchPromise = (async () => {

        const query = `
            [out:json][timeout:10];

            (
                nwr(around:10000,${lat},${lon})
                ["tourism"="attraction"];

                nwr(around:10000,${lat},${lon})
                ["tourism"="museum"];

                nwr(around:10000,${lat},${lon})
                ["tourism"="viewpoint"];

                nwr(around:10000,${lat},${lon})
                ["historic"];

                nwr(around:10000,${lat},${lon})
                ["amenity"="place_of_worship"];
            );

            out center 25;
        `;

        // Primary server
        const servers = [
            "https://overpass-api.de/api/interpreter",
            "https://overpass.kumi.systems/api/interpreter"
        ];

        let lastError;

        for (const server of servers) {

            try {

                console.log("Searching with:", server);

                const data = await fetchOverpass(
                    server,
                    query,
                    10000
                );

                setCache(cacheKey, data);

                console.log(
                    "Tourist places found:",
                    data.elements.length
                );

                return data;

            } catch (error) {

                lastError = error;

                console.warn(
                    "Server failed. Trying backup server:",
                    error.message
                );

            }
        }

        throw lastError || new Error("All tourist servers failed.");

    })();

    activeRequests.set(cacheKey, searchPromise);

    try {

        return await searchPromise;

    } finally {

        activeRequests.delete(cacheKey);

    }
}

// =========================================
// FILTER TOURIST PLACES
// =========================================

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

    // Important attractions first
    places.sort((a, b) => {

        function priority(item) {

            if (item.tags.tourism === "attraction") return 1;

            if (item.tags.tourism === "museum") return 2;

            if (item.tags.historic) return 3;

            if (item.tags.amenity === "place_of_worship") return 4;

            return 5;
        }

        return priority(a) - priority(b);

    });

    return places;
}

// =========================================
// GOOGLE MAPS LINKS
// =========================================

function createMapLink(name, city) {

    const query = encodeURIComponent(name + " " + city + " India");

    return `
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps/search/?api=1&query=${query}"
        >
            Open in Google Maps →
        </a>
    `;
}

// =========================================
// DAY WISE ITINERARY
// =========================================

function createItinerary(places, days, city) {

    let html = "";

    const placesPerDay = Math.ceil(places.length / days);

    for (let day = 0; day < days; day++) {

        const start = day * placesPerDay;

        const end = Math.min(
            start + placesPerDay,
            places.length
        );

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

// =========================================
// UJJAIN ITINERARY
// =========================================

function createUjjainPlan(from, to, days, style) {

    let html = `

        <h2>${escapeHTML(from)} → ${escapeHTML(to)}</h2>

        <p>${days} Days | ${escapeHTML(style)}</p>

        <h3>Tourist Places near Ujjain</h3>

    `;

    const perDay = Math.ceil(ujjainPlaces.length / days);

    for (let day = 0; day < days; day++) {

        const start = day * perDay;

        const end = Math.min(
            start + perDay,
            ujjainPlaces.length
        );

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

// =========================================
// MAIN TRIP PLANNER
// =========================================

async function makePlan() {

    if (isSearching) return;

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

    isSearching = true;

    result.style.display = "block";

    result.setAttribute("aria-busy", "true");

    result.innerHTML = `

        <h2>Finding tourist places near ${escapeHTML(to)}...</h2>

        <p>Preparing your trip. Please wait...</p>

    `;

    if (button) {

        button.disabled = true;

        button.textContent = "Searching...";

    }

    result.scrollIntoView({
        behavior: "smooth"
    });

    try {

        // Ujjain special plan
        if (to.toLowerCase().includes("ujjain")) {

            result.innerHTML = createUjjainPlan(
                from,
                to,
                days,
                style
            );

            return;
        }

        // Step 1: Find destination
        const location = await findLocation(to);

        const lat = location.latitude;

        const lon = location.longitude;

        // Step 2: Find tourist places
        const mapData = await searchOverpass(
            lat,
            lon,
            to
        );

        // Step 3: Filter places
        const places = filterPlaces(mapData.elements);

        if (places.length === 0) {

            result.innerHTML = `

                <h2>${escapeHTML(to)}</h2>

                <p>No mapped tourist places were found nearby.</p>

                ${createMapLink("Tourist places", to)}

            `;

            return;
        }

        // Step 4: Create itinerary
        let html = `

            <h2>${escapeHTML(from)} → ${escapeHTML(to)}</h2>

            <p>${days} Days | ${escapeHTML(style)}</p>

            <h3>Tourist Places near ${escapeHTML(to)}</h3>

            <p>
                Places found within approximately 10 km
                of your destination. Map data may be incomplete.
            </p>

        `;

        html += createItinerary(
            places,
            days,
            to
        );

        result.innerHTML = html;

    } catch (error) {

        console.error("AI Trip Planner Error:", error);

        result.innerHTML = `

            <h2>Unable to load tourist places</h2>

            <p>${escapeHTML(error.message)}</p>

            <p>Please try again later.</p>

            ${createMapLink("Tourist places", to)}

        `;

    } finally {

        isSearching = false;

        result.setAttribute("aria-busy", "false");

        if (button) {

            button.disabled = false;

            button.textContent = "Create My Trip →";

        }
    }
}
