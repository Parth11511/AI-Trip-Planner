
// =========================================
// AI TRIP PLANNER - SCRIPT.JS
// 27 DESTINATIONS + 27 HOTEL CARDS
// BUTTON FIXED
// =========================================


// =========================================
// DESTINATION DATA
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
// HOTEL DATA - 27 DESTINATIONS
// =========================================

const hotelData = {
    "ujjain": {
        name: "Anjushree",
        type: "Hotel",
        description: "A hotel option for visitors exploring Ujjain."
    },
    "manali": {
        name: "Johnson Lodge & Spa",
        type: "Mountain hotel",
        description: "A stay option in the Manali area."
    },
    "jaipur": {
        name: "Dera Mandawa",
        type: "Heritage homestay",
        description: "A heritage-style stay in Jaipur."
    },
    "mumbai": {
        name: "The Taj Mahal Palace",
        type: "Luxury heritage hotel",
        description: "A landmark hotel near the Gateway of India."
    },
    "ahmedabad": {
        name: "House of MG",
        type: "Heritage hotel",
        description: "A heritage property in Ahmedabad."
    },
    "delhi": {
        name: "The Imperial",
        type: "Luxury heritage hotel",
        description: "A well-known heritage hotel in New Delhi."
    },
    "agra": {
        name: "The Oberoi Amarvilas",
        type: "Luxury hotel",
        description: "A hotel known for views of the Taj Mahal."
    },
    "goa": {
        name: "Ahilya by the Sea",
        type: "Boutique hotel",
        description: "A coastal boutique stay in Goa."
    },
    "dwarka": {
        name: "Lemon Tree Premier",
        type: "Hotel",
        description: "A hotel option for visitors to Dwarka."
    },
    "somnath": {
        name: "Lords Inn Somnath",
        type: "Hotel",
        description: "A hotel option for Somnath visitors."
    },
    "chotila": {
        name: "Chotila local accommodation",
        type: "Local stay",
        description: "Check locally available guesthouses and hotels before travelling."
    },
    "kedarnath": {
        name: "GMVN Tourist Rest House",
        type: "Tourist accommodation",
        description: "Government tourism accommodation; seasonal operation and booking conditions apply."
    },
    "udaipur": {
        name: "Taj Lake Palace",
        type: "Luxury heritage hotel",
        description: "A historic palace hotel on Lake Pichola."
    },
    "jaisalmer": {
        name: "Suryagarh",
        type: "Heritage luxury hotel",
        description: "A heritage-style hotel in Jaisalmer."
    },
    "varanasi": {
        name: "BrijRama Palace",
        type: "Heritage hotel",
        description: "A heritage property near the ghats of Varanasi."
    },
    "kerala": {
        name: "Coconut Lagoon",
        type: "Backwater resort",
        description: "A backwater resort in Kumarakom, Kerala."
    },
    "munnar": {
        name: "Windermere Estate",
        type: "Tea estate stay",
        description: "A nature-focused stay in the Munnar hills."
    },
    "ladakh": {
        name: "The Grand Dragon Ladakh",
        type: "Hotel",
        description: "A hotel option in Leh, Ladakh."
    },
    "rishikesh": {
        name: "Ananda in the Himalayas",
        type: "Wellness resort",
        description: "A wellness retreat near Rishikesh, in Narendra Nagar."
    },
    "hampi": {
        name: "Evolve Back Kamalapura Palace",
        type: "Heritage resort",
        description: "A resort near the Hampi heritage area."
    },
    "mysuru": {
        name: "Royal Orchid Metropole",
        type: "Heritage hotel",
        description: "A heritage hotel in Mysuru."
    },
    "madikeri": {
        name: "Taj Madikeri Resort & Spa",
        type: "Hill resort",
        description: "A resort surrounded by the Coorg hills."
    },
    "amritsar": {
        name: "Le Méridien Amritsar",
        type: "Hotel",
        description: "A hotel option in Amritsar."
    },
    "darjeeling": {
        name: "Glenburn Tea Estate",
        type: "Tea estate stay",
        description: "A tea estate stay near Darjeeling."
    },
    "shimla": {
        name: "The Oberoi Cecil",
        type: "Heritage hotel",
        description: "A heritage hotel in Shimla."
    },
    "mcleod ganj": {
        name: "Chonor House",
        type: "Guesthouse",
        description: "A Tibetan-style guesthouse in McLeod Ganj."
    },
    "rann of kutch": {
        name: "Rann Utsav Tent City",
        type: "Seasonal tent accommodation",
        description: "A seasonal tent stay near the White Rann; check festival dates."
    }
};


// =========================================
// DESTINATION ALIASES
// =========================================

const aliases = {
    "new delhi": "delhi",
    "taj mahal": "agra",
    "coorg": "madikeri",
    "madikeri (coorg)": "madikeri",
    "mcleodganj": "mcleod ganj"
};


// =========================================
// HTML ESCAPE
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
// GOOGLE MAPS LINK
// =========================================

function googleMapsLink(query) {
    return "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(query);
}


// =========================================
// HOTEL SECTION
// =========================================

function createHotelSection(destinationKey) {
    const hotel = hotelData[destinationKey];

    if (!hotel) {
        return `
            <section class="hotel-section">
                <h2>🏨 Hotels</h2>
                <p>Hotel information is not available yet.</p>
            </section>
        `;
    }

    const city = destinations[destinationKey].city;

    const hotelSearchLink = googleMapsLink(
        hotel.name + " " + city + " India"
    );

    return `
        <section class="hotel-section">

            <h2>🏨 Recommended Stay in ${escapeHTML(city)}</h2>

            <div class="hotel-card">

                <div class="hotel-card-content">

                    <span class="hotel-label">HOTEL OPTION</span>

                    <h3>${escapeHTML(hotel.name)}</h3>

                    <p class="hotel-type">
                        ${escapeHTML(hotel.type)}
                    </p>

                    <p>${escapeHTML(hotel.description)}</p>

                    <p>
                        <strong>Destination:</strong>
                        ${escapeHTML(city)}, India
                    </p>

                    <a
                        href="${hotelSearchLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Check hotel location and details →
                    </a>

                </div>

            </div>

            <p class="hotel-note">
                Confirm current prices, availability, address
                and facilities directly before booking.
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

        const link = googleMapsLink(
            place + " " + destination.city
        );

        html += `
            <div class="trip-place">

                <h3>${index + 1}. ${escapeHTML(place)}</h3>

                <a
                    href="${link}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
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

function createSavedPlan(from, destinationKey, days, style) {

    const destination = destinations[destinationKey];

    return `
        <div class="trip-plan">

            <h2>
                ✈️ ${escapeHTML(from)}
                → ${escapeHTML(destination.city)}
            </h2>

            <p>
                <strong>${escapeHTML(days)} Days</strong>
                | ${escapeHTML(style)} trip
            </p>

            ${createPlacesSection(destination)}

            ${createHotelSection(destinationKey)}

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
        alert("Website HTML IDs check karo.");
        return;
    }

    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const days = daysInput.value;
    const style = styleInput.value;

    if (!from || !to) {
        alert("Starting city aur destination enter karo.");
        return;
    }

    if (!days || Number(days) < 1) {
        alert("Valid trip days enter karo.");
        return;
    }

    const normalized = to.toLowerCase().trim();

    const destinationKey = aliases[normalized] || normalized;

    // Clear previous result
    result.innerHTML = "";

    // Known destination
    if (destinations[destinationKey]) {

        result.innerHTML = createSavedPlan(
            from,
            destinationKey,
            days,
            style
        );

    } else {

        // Unknown destination fallback
        const placesLink = googleMapsLink(
            "Tourist places in " + to
        );

        const hotelsLink = googleMapsLink(
            "Hotels in " + to + ", India"
        );

        result.innerHTML = `
            <div class="trip-plan">

                <h2>
                    ✈️ ${escapeHTML(from)}
                    → ${escapeHTML(to)}
                </h2>

                <p>
                    ${escapeHTML(days)} Days |
                    ${escapeHTML(style)} trip
                </p>

                <section class="places-section">

                    <h2>📍 Tourist Places</h2>

                    <a
                        href="${placesLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Find Tourist Places →
                    </a>

                </section>

                <section class="hotel-section">

                    <h2>🏨 Hotels in ${escapeHTML(to)}</h2>

                    <a
                        href="${hotelsLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Find Hotels →
                    </a>

                </section>

            </div>
        `;
    }

    // Show result section
    result.classList.add("show");
    result.style.display = "block";

    // Scroll to result
    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =========================================
// BUTTON EVENT + GLOBAL FUNCTION
// =========================================

window.makePlan = makePlan;

document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("create-trip-btn");

    if (button) {
        button.addEventListener("click", makePlan);
    }

});
