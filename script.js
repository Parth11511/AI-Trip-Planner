
/* =========================================
   AI TRIP PLANNER
   PRELOADED DESTINATIONS + FAST SEARCH
========================================= */

// =========================================
// PRELOADED TOURIST PLACES
// =========================================

const destinations = {

    "ujjain": {
        city: "Ujjain",
        places: [
            ["Mahakaleshwar Jyotirlinga", "Famous Jyotirlinga temple"],
            ["Harsiddhi Mata Temple", "Famous Shakti Peeth"],
            ["Ram Ghat", "Ghat on the Shipra River"],
            ["Kaal Bhairav Temple", "Historic temple"],
            ["Mangalnath Temple", "Famous religious place"],
            ["Sandipani Ashram", "Associated with Lord Krishna"],
            ["Vedh Shala", "Historic observatory"]
        ]
    },

    "manali": {
        city: "Manali",
        places: [
            ["Hadimba Devi Temple", "Historic wooden temple"],
            ["Solang Valley", "Mountain valley"],
            ["Old Manali", "Popular mountain neighbourhood"],
            ["Vashisht Temple", "Historic temple and hot springs area"],
            ["Jogini Waterfall", "Scenic waterfall"],
            ["Manu Temple", "Temple in Old Manali"]
        ]
    },

    "jaipur": {
        city: "Jaipur",
        places: [
            ["Hawa Mahal", "Famous Palace of Winds"],
            ["Amber Fort", "Historic hilltop fort"],
            ["City Palace", "Royal palace complex"],
            ["Jantar Mantar", "Historic astronomical observatory"],
            ["Jal Mahal", "Palace in the middle of Man Sagar Lake"],
            ["Nahargarh Fort", "Historic hilltop fort"]
        ]
    },

    "mumbai": {
        city: "Mumbai",
        places: [
            ["Gateway of India", "Famous waterfront monument"],
            ["Marine Drive", "Popular coastal promenade"],
            ["Siddhivinayak Temple", "Famous temple"],
            ["Elephanta Caves", "Historic cave monuments"],
            ["Chhatrapati Shivaji Maharaj Terminus", "Historic railway station"],
            ["Juhu Beach", "Popular city beach"]
        ]
    },

    "ahmedabad": {
        city: "Ahmedabad",
        places: [
            ["Sabarmati Ashram", "Historic Gandhi ashram"],
            ["Sabarmati Riverfront", "Popular riverside attraction"],
            ["Kankaria Lake", "Historic lake"],
            ["Adalaj Stepwell", "Historic stepwell"],
            ["Sidi Saiyyed Mosque", "Famous historic mosque"],
            ["Akshardham Temple", "Temple complex in Gandhinagar"]
        ]
    },

    "delhi": {
        city: "New Delhi",
        places: [
            ["India Gate", "War memorial"],
            ["Red Fort", "Historic Mughal fort"],
            ["Qutub Minar", "UNESCO World Heritage Site"],
            ["Humayun's Tomb", "Historic Mughal tomb"],
            ["Lotus Temple", "Famous architectural landmark"],
            ["Akshardham Temple", "Large temple complex"]
        ]
    },

    "agra": {
        city: "Agra",
        places: [
            ["Taj Mahal", "World-famous UNESCO World Heritage Site"],
            ["Agra Fort", "Historic Mughal fort"],
            ["Fatehpur Sikri", "Historic Mughal city"],
            ["Mehtab Bagh", "Garden with Taj Mahal views"],
            ["Itmad-ud-Daulah", "Historic Mughal tomb"],
            ["Akbar's Tomb", "Historic monument in Sikandra"]
        ]
    },

    "goa": {
        city: "Goa",
        places: [
            ["Baga Beach", "Popular beach"],
            ["Calangute Beach", "Famous coastal destination"],
            ["Fort Aguada", "Historic Portuguese fort"],
            ["Basilica of Bom Jesus", "UNESCO World Heritage church"],
            ["Dudhsagar Falls", "Famous waterfall"],
            ["Anjuna Beach", "Popular coastal destination"]
        ]
    },

    "dwarka": {
        city: "Dwarka",
        places: [
            ["Dwarkadhish Temple", "Famous Krishna temple"],
            ["Rukmini Devi Temple", "Historic temple"],
            ["Gomti Ghat", "Sacred riverside ghat"],
            ["Nageshwar Jyotirlinga", "Famous Jyotirlinga temple"],
            ["Bet Dwarka", "Island pilgrimage destination"],
            ["Shivrajpur Beach", "Popular blue-flag beach"]
        ]
    },

    "somnath": {
        city: "Somnath",
        places: [
            ["Somnath Temple", "Famous Jyotirlinga temple"],
            ["Somnath Beach", "Coastal attraction"],
            ["Triveni Sangam", "Sacred river confluence"],
            ["Bhalka Tirth", "Religious pilgrimage site"],
            ["Gita Mandir", "Famous temple"],
            ["Prabhas Patan Museum", "Historic museum"]
        ]
    },

    "chotila": {
        city: "Chotila",
        places: [
            ["Chamunda Mata Temple", "Famous hilltop temple"],
            ["Chotila Hill", "Popular pilgrimage hill"],
            ["Chotila Town", "Local town and market area"]
        ]
    },

    "kedarnath": {
        city: "Kedarnath",
        places: [
            ["Kedarnath Temple", "Famous Himalayan temple"],
            ["Bhairavnath Temple", "Temple near Kedarnath"],
            ["Gandhi Sarovar", "Mountain lake"],
            ["Vasuki Tal", "High-altitude lake"],
            ["Shankaracharya Samadhi", "Memorial near the temple"]
        ]
    },

    "udaipur": {
        city: "Udaipur",
        places: [
            ["City Palace", "Historic royal palace"],
            ["Lake Pichola", "Famous lake"],
            ["Jag Mandir", "Palace on an island"],
            ["Fateh Sagar Lake", "Popular lake"],
            ["Saheliyon Ki Bari", "Historic garden"],
            ["Sajjangarh Palace", "Monsoon Palace"]
        ]
    },

    "jaisalmer": {
        city: "Jaisalmer",
        places: [
            ["Jaisalmer Fort", "Historic living fort"],
            ["Patwon Ki Haveli", "Historic haveli"],
            ["Gadisar Lake", "Historic lake"],
            ["Sam Sand Dunes", "Famous desert attraction"],
            ["Bada Bagh", "Historic garden complex"],
            ["Kuldhara Village", "Historic abandoned village"]
        ]
    },

    "varanasi": {
        city: "Varanasi",
        places: [
            ["Kashi Vishwanath Temple", "Famous Jyotirlinga temple"],
            ["Dashashwamedh Ghat", "Famous Ganga ghat"],
            ["Assi Ghat", "Popular riverside ghat"],
            ["Sarnath", "Historic Buddhist pilgrimage site"],
            ["Manikarnika Ghat", "Historic riverside ghat"],
            ["Ramnagar Fort", "Historic fort"]
        ]
    },

    "kerala": {
        city: "Kerala",
        places: [
            ["Alleppey Backwaters", "Famous backwater region"],
            ["Munnar", "Hill station and tea gardens"],
            ["Thekkady", "Wildlife and nature destination"],
            ["Fort Kochi", "Historic coastal neighbourhood"],
            ["Wayanad", "Hill and nature destination"],
            ["Varkala Beach", "Coastal attraction"]
        ]
    },

    "munnar": {
        city: "Munnar",
        places: [
            ["Eravikulam National Park", "National park"],
            ["Mattupetty Dam", "Scenic dam and lake"],
            ["Tea Museum", "Tea history museum"],
            ["Top Station", "Mountain viewpoint"],
            ["Echo Point", "Popular scenic viewpoint"],
            ["Kundala Lake", "Scenic lake"]
        ]
    },

    "ladakh": {
        city: "Ladakh",
        places: [
            ["Pangong Lake", "High-altitude lake"],
            ["Nubra Valley", "Mountain valley"],
            ["Thiksey Monastery", "Historic Buddhist monastery"],
            ["Shanti Stupa", "Peace monument"],
            ["Magnetic Hill", "Popular roadside attraction"],
            ["Khardung La", "High mountain pass"]
        ]
    },

    "rishikesh": {
        city: "Rishikesh",
        places: [
            ["Lakshman Jhula", "Famous bridge area"],
            ["Ram Jhula", "Suspension bridge"],
            ["Triveni Ghat", "Sacred riverside ghat"],
            ["Neer Garh Waterfall", "Scenic waterfall"],
            ["Parmarth Niketan", "Riverside ashram"],
            ["Beatles Ashram", "Historic ashram"]
        ]
    },

    "hampi": {
        city: "Hampi",
        places: [
            ["Virupaksha Temple", "Historic temple"],
            ["Vittala Temple", "Historic temple complex"],
            ["Stone Chariot", "Famous stone monument"],
            ["Lotus Mahal", "Historic palace"],
            ["Elephant Stables", "Historic royal structure"],
            ["Hemakuta Hill", "Historic hilltop area"]
        ]
    },

    "mysuru": {
        city: "Mysuru",
        places: [
            ["Mysore Palace", "Famous royal palace"],
            ["Chamundi Hills", "Hilltop pilgrimage destination"],
            ["Brindavan Gardens", "Famous gardens"],
            ["St. Philomena's Church", "Historic church"],
            ["Mysore Zoo", "Historic zoological park"],
            ["Jaganmohan Palace", "Historic palace and art gallery"]
        ]
    },

    "madikeri": {
        city: "Madikeri",
        places: [
            ["Abbey Falls", "Scenic waterfall"],
            ["Raja's Seat", "Popular viewpoint garden"],
            ["Madikeri Fort", "Historic fort"],
            ["Omkareshwara Temple", "Historic temple"],
            ["Mandalpatti", "Mountain viewpoint"],
            ["Dubare Elephant Camp", "Nature and wildlife attraction"]
        ]
    },

    "amritsar": {
        city: "Amritsar",
        places: [
            ["Golden Temple", "Famous Sikh pilgrimage site"],
            ["Jallianwala Bagh", "Historic memorial"],
            ["Wagah Border", "Famous border ceremony destination"],
            ["Durgiana Temple", "Historic temple"],
            ["Partition Museum", "History museum"],
            ["Gobindgarh Fort", "Historic fort"]
        ]
    },

    "darjeeling": {
        city: "Darjeeling",
        places: [
            ["Tiger Hill", "Famous sunrise viewpoint"],
            ["Batasia Loop", "Scenic railway loop"],
            ["Darjeeling Himalayan Railway", "UNESCO World Heritage railway"],
            ["Padmaja Naidu Himalayan Zoological Park", "Mountain zoo"],
            ["Japanese Peace Pagoda", "Peace monument"],
            ["Happy Valley Tea Estate", "Historic tea garden"]
        ]
    },

    "shimla": {
        city: "Shimla",
        places: [
            ["The Ridge", "Popular town centre"],
            ["Mall Road", "Famous shopping street"],
            ["Jakhoo Temple", "Hilltop temple"],
            ["Christ Church", "Historic church"],
            ["Kufri", "Popular mountain destination"],
            ["Viceregal Lodge", "Historic building"]
        ]
    },

    "mcleod ganj": {
        city: "McLeod Ganj",
        places: [
            ["Namgyal Monastery", "Buddhist monastery"],
            ["Bhagsunag Temple", "Historic temple"],
            ["Bhagsu Waterfall", "Scenic waterfall"],
            ["Dal Lake", "Small mountain lake"],
            ["Naddi Viewpoint", "Mountain viewpoint"],
            ["Tibetan Museum", "Cultural museum"]
        ]
    },

    "rann of kutch": {
        city: "Rann of Kutch",
        places: [
            ["White Rann", "Famous white salt desert"],
            ["Kala Dungar", "Highest point in Kutch"],
            ["Kutch Desert Wildlife Sanctuary", "Wildlife sanctuary"],
            ["Dholavira", "UNESCO archaeological site"],
            ["Mandvi Beach", "Popular beach"],
            ["Vijay Vilas Palace", "Historic palace"]
        ]
    }

};

// =========================================
// DESTINATION ALIASES
// =========================================

const destinationAliases = {
    "new delhi": "delhi",
    "taj mahal": "agra",
    "coorg": "madikeri",
    "madikeri (coorg)": "madikeri",
    "rann of kutch": "rann of kutch"
};

// =========================================
// CACHE SETTINGS FOR OTHER CITIES
// =========================================

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;
const CACHE_PREFIX = "AITRIP_FAST_V6_";

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
// FIND PRELOADED DESTINATION
// =========================================

function getPreloadedDestination(city) {

    const key = city
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    const finalKey = destinationAliases[key] || key;

    return destinations[finalKey] || null;
}

// =========================================
// CACHE FUNCTIONS
// =========================================

function getCache(key) {

    const memoryData = memoryCache.get(key);

    if (memoryData && Date.now() - memoryData.time < CACHE_DURATION) {
        return memoryData.value;
    }

    try {

        const saved = localStorage.getItem(CACHE_PREFIX + key);

        if (!saved) return null;

        const data = JSON.parse(saved);

        if (Date.now() - data.time > CACHE_DURATION) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }

        memoryCache.set(key, data);

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

    memoryCache.set(key, data);

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

    const timer = setTimeout(() => controller.abort(), timeout);

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
// LOCATION SEARCH FOR OTHER CITIES
// =========================================

async function findLocation(city) {

    const cacheKey = "location_" + city.toLowerCase();

    const cached = getCache(cacheKey);

    if (cached) return cached;

    const url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) +
        "&count=10&language=en&format=json&countryCode=IN";

    const data = await fetchJSON(url);

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
            throw new Error("Manali, Himachal Pradesh not found.");
        }

    } else {
        location = data.results[0];
    }

    setCache(cacheKey, location);

    return location;
}

// =========================================
// OVERPASS API FOR OTHER CITIES
// =========================================

async function fetchOverpass(server, query, timeout = 10000) {

    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);

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

async function searchOverpass(lat, lon, city) {

    const cacheKey = "tourist_places_" + city.toLowerCase();

    const cached = getCache(cacheKey);

    if (cached) return cached;

    if (activeRequests.has(cacheKey)) {
        return activeRequests.get(cacheKey);
    }

    const searchPromise = (async () => {

        const query = `
            [out:json][timeout:10];
            (
                nwr(around:10000,${lat},${lon})["tourism"="attraction"];
                nwr(around:10000,${lat},${lon})["tourism"="museum"];
                nwr(around:10000,${lat},${lon})["tourism"="viewpoint"];
                nwr(around:10000,${lat},${lon})["historic"];
                nwr(around:10000,${lat},${lon})["amenity"="place_of_worship"];
            );
            out center 25;
        `;

        const servers = [
            "https://overpass-api.de/api/interpreter",
            "https://overpass.kumi.systems/api/interpreter"
        ];

        let lastError;

        for (const server of servers) {

            try {

                const data = await fetchOverpass(server, query, 10000);

                setCache(cacheKey, data);

                return data;

            } catch (error) {
                lastError = error;
                console.warn("Overpass server failed:", error.message);
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
// PRELOADED ITINERARY
// =========================================

function createSavedPlan(from, to, days, style, destination) {

    const places = destination.places;

    let html = `

        <h2>${escapeHTML(from)} → ${escapeHTML(to)}</h2>

        <p>${days} Days | ${escapeHTML(style)}</p>

        <h3>Tourist Places near ${escapeHTML(destination.city)}</h3>

        <p>Places loaded from saved destination data.</p>

    `;

    const placesPerDay = Math.ceil(places.length / days);

    for (let day = 0; day < days; day++) {

        const start = day * placesPerDay;
        const end = Math.min(start + placesPerDay, places.length);

        if (start >= places.length) break;

        html += `<h3>Day ${day + 1}</h3>`;

        for (let i = start; i < end; i++) {

            const place = places[i];

            html += `

                <div class="trip-place">

                    <h4>${i + 1}. ${escapeHTML(place[0])}</h4>

                    <p>${escapeHTML(place[1])}</p>

                    ${createMapLink(place[0], destination.city)}

                </div>

            `;
        }
    }

    return html;
}

// =========================================
// FILTER OTHER API PLACES
// =========================================

function filterPlaces(elements) {

    const seen = new Set();

    return elements.filter(item => {

        const name = item.tags && item.tags.name;

        if (!name || name.trim().length < 4) return false;

        const key = name.trim().toLowerCase();

        if (seen.has(key)) return false;

        seen.add(key);

        return true;

    }).sort((a, b) => {

        function priority(item) {

            if (item.tags.tourism === "attraction") return 1;
            if (item.tags.tourism === "museum") return 2;
            if (item.tags.historic) return 3;
            if (item.tags.amenity === "place_of_worship") return 4;

            return 5;
        }

        return priority(a) - priority(b);
    });
}

// =========================================
// API ITINERARY FOR OTHER CITIES
// =========================================

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
        <h2>Preparing your trip to ${escapeHTML(to)}...</h2>
        <p>Please wait...</p>
    `;

    if (button) {
        button.disabled = true;
        button.textContent = "Preparing...";
    }

    result.scrollIntoView({ behavior: "smooth" });

    try {

        // STEP 1: CHECK PRELOADED DESTINATIONS
        const savedDestination = getPreloadedDestination(to);

        if (savedDestination) {

            console.log("PRELOADED DATA USED:", savedDestination.city);

            result.innerHTML = createSavedPlan(
                from,
                to,
                days,
                style,
                savedDestination
            );

            return;
        }

        // STEP 2: USE API ONLY FOR OTHER DESTINATIONS
        const location = await findLocation(to);

        const mapData = await searchOverpass(
            location.latitude,
            location.longitude,
            to
        );

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
                Places found within approximately 10 km.
                Map data may be incomplete.
            </p>

        `;

        html += createItinerary(places, days, to);

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
