
// =========================================
// AI TRIP PLANNER - SCRIPT.JS
// 27 DESTINATIONS + HOTELS
// =========================================

const destinations = {
    "ujjain": {
        city: "Ujjain",
        places: ["Mahakaleshwar Temple", "Ram Ghat", "Kal Bhairav Temple", "Harsiddhi Temple"]
    },
    "manali": {
        city: "Manali",
        places: ["Hadimba Temple", "Solang Valley", "Old Manali", "Vashisht Temple"]
    },
    "jaipur": {
        city: "Jaipur",
        places: ["Hawa Mahal", "Amber Fort", "City Palace", "Jal Mahal"]
    },
    "mumbai": {
        city: "Mumbai",
        places: ["Gateway of India", "Marine Drive", "Juhu Beach", "Siddhivinayak Temple"]
    },
    "ahmedabad": {
        city: "Ahmedabad",
        places: ["Sabarmati Ashram", "Kankaria Lake", "Adalaj Stepwell", "Akshardham"]
    },
    "delhi": {
        city: "Delhi",
        places: ["India Gate", "Red Fort", "Qutub Minar", "Lotus Temple"]
    },
    "agra": {
        city: "Agra",
        places: ["Taj Mahal", "Agra Fort", "Mehtab Bagh", "Fatehpur Sikri"]
    },
    "goa": {
        city: "Goa",
        places: ["Baga Beach", "Calangute Beach", "Fort Aguada", "Basilica of Bom Jesus"]
    },
    "dwarka": {
        city: "Dwarka",
        places: ["Dwarkadhish Temple", "Nageshwar Jyotirlinga", "Bet Dwarka", "Rukmini Temple"]
    },
    "somnath": {
        city: "Somnath",
        places: ["Somnath Temple", "Triveni Sangam", "Bhalka Tirth", "Gita Mandir"]
    },
    "chotila": {
        city: "Chotila",
        places: ["Chamunda Mata Temple", "Chotila Hill", "Local Market"]
    },
    "kedarnath": {
        city: "Kedarnath",
        places: ["Kedarnath Temple", "Bhairavnath Temple", "Gaurikund"]
    },
    "udaipur": {
        city: "Udaipur",
        places: ["City Palace", "Lake Pichola", "Fateh Sagar Lake", "Saheliyon Ki Bari"]
    },
    "jaisalmer": {
        city: "Jaisalmer",
        places: ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli", "Gadisar Lake"]
    },
    "varanasi": {
        city: "Varanasi",
        places: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Assi Ghat", "Sarnath"]
    },
    "kerala": {
        city: "Kerala",
        places: ["Alleppey", "Munnar", "Kochi", "Wayanad"]
    },
    "munnar": {
        city: "Munnar",
        places: ["Tea Gardens", "Eravikulam National Park", "Mattupetty Dam", "Top Station"]
    },
    "ladakh": {
        city: "Ladakh",
        places: ["Pangong Lake", "Nubra Valley", "Shanti Stupa", "Magnetic Hill"]
    },
    "rishikesh": {
        city: "Rishikesh",
        places: ["Lakshman Jhula", "Ram Jhula", "Triveni Ghat", "Neer Garh Waterfall"]
    },
    "hampi": {
        city: "Hampi",
        places: ["Virupaksha Temple", "Vijaya Vittala Temple", "Hampi Bazaar", "Lotus Mahal"]
    },
    "mysuru": {
        city: "Mysuru",
        places: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "St Philomena Church"]
    },
    "madikeri": {
        city: "Madikeri",
        places: ["Abbey Falls", "Raja's Seat", "Madikeri Fort", "Omkareshwara Temple"]
    },
    "amritsar": {
        city: "Amritsar",
        places: ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Partition Museum"]
    },
    "darjeeling": {
        city: "Darjeeling",
        places: ["Tiger Hill", "Batasia Loop", "Darjeeling Himalayan Railway", "Tea Gardens"]
    },
    "shimla": {
        city: "Shimla",
        places: ["Mall Road", "The Ridge", "Jakhoo Temple", "Kufri"]
    },
    "mcleod ganj": {
        city: "McLeod Ganj",
        places: ["Namgyal Monastery", "Bhagsu Waterfall", "Dal Lake", "Triund"]
    },
    "rann of kutch": {
        city: "Rann of Kutch",
        places: ["White Rann", "Kalo Dungar", "Dholavira", "Mandvi Beach"]
    }
};

// =========================================
// DESTINATION ALIASES
// =========================================

const aliases = {
    "new delhi": "delhi",
    "taj mahal": "agra",
    "coorg": "madikeri",
    "madikeri (coorg)": "madikeri"
};

// =========================================
// HTML SAFETY
// =========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// =========================================
// GOOGLE MAPS LINKS
// =========================================

function googleMapsLink(query) {
    return "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(query);
}

// =========================================
// HOTELS FOR ALL 27 DESTINATIONS
// =========================================

function createHotelSection(city) {
    const hotelQuery = encodeURIComponent(
        "Hotels in " + city + ", India"
    );

    const hotelMapLink =
        "https://www.google.com/maps/search/?api=1&query=" +
        hotelQuery;

    return `
        <section class="hotel-section">
            <h2>🏨 Hotels in ${escapeHTML(city)}</h2>

            <p>
                Find hotels, locations, ratings and available
                contact details for ${escapeHTML(city)}.
            </p>

            <div class="trip-place hotel-card">
                <h3>Find Hotels in ${escapeHTML(city)}</h3>

                <p>
                    Explore nearby hotels and compare
                    publicly listed information.
                </p>

                <a href="${hotelMapLink}"
                   target="_blank"
                   rel="noopener noreferrer">
                    View Hotels on Google Maps →
                </a>
            </div>

            <p>
                <small>
                    Prices, facilities and availability should
                    be confirmed directly with each hotel.
                </small>
            </p>
        </section>
    `;
}

// =========================================
// TOURIST PLACES SECTION
// =========================================

function createPlacesSection(destination) {
    let html = `
        <section class="places-section">
            <h2>📍 Tourist Places near ${escapeHTML(destination.city)}</h2>
            <div class="places-list">
    `;

    destination.places.forEach((place, index) => {
        const link = googleMapsLink(place + " " + destination.city);

        html += `
            <div class="trip-place">
                <h3>${index + 1}. ${escapeHTML(place)}</h3>
                <a href="${link}" target="_blank"
                   rel="noopener noreferrer">
                    Open in Google Maps →
                </a>
            </div>
        `;
    });

    html += `
            </div>
        </section>
    `;

    return html;
}

// =========================================
// CREATE TRIP PLAN
// =========================================

function createSavedPlan(from, destination, days, style) {
    const placesHTML = createPlacesSection(destination);
    const hotelsHTML = createHotelSection(destination.city);

    return `
        <div class="trip-plan">
            <h2>✈️ ${escapeHTML(from)} → ${escapeHTML(destination.city)}</h2>

            <p><strong>${escapeHTML(days)} Days</strong> | ${escapeHTML(style)} trip</p>

            ${placesHTML}

            ${hotelsHTML}
        </div>
    `;
}

// =========================================
// MAIN SEARCH FUNCTION
// =========================================

function makePlan() {
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");
    const daysInput = document.getElementById("days");
    const styleInput = document.getElementById("style");
    const result = document.getElementById("trip-result");

    if (!fromInput || !toInput || !daysInput || !styleInput || !result) {
        alert("Website HTML elements nahi mile. IDs check karo.");
        return;
    }

    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const days = daysInput.value;
    const style = styleInput.value;

    if (!from || !to) {
        alert("Please enter starting city and destination.");
        return;
    }

    if (!days || Number(days) < 1) {
        alert("Please enter valid trip days.");
        return;
    }

    const normalized = to.toLowerCase().trim();
    const key = aliases[normalized] || normalized;
    const destination = destinations[key];

    result.innerHTML = "";

    if (destination) {
        result.innerHTML = createSavedPlan(
            from,
            destination,
            days,
            style
        );
        return;
    }

    const placesLink = googleMapsLink("Tourist places in " + to);
    const hotelsLink = googleMapsLink("Hotels in " + to + ", India");

    result.innerHTML = `
        <div class="trip-plan">
            <h2>✈️ ${escapeHTML(from)} → ${escapeHTML(to)}</h2>
            <p>${escapeHTML(days)} Days | ${escapeHTML(style)} trip</p>

            <h2>📍 Tourist Places</h2>
            <a href="${placesLink}" target="_blank"
               rel="noopener noreferrer">
                Find Tourist Places on Google Maps →
            </a>

            ${createHotelSection(to)}
        </div>
    `;
}

// =========================================
// BUTTON EVENT
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("create-trip-btn");

    if (button) {
        button.addEventListener("click", makePlan);
    }
});
