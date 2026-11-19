
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


async function makePlan() {

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const days = Math.max(1, Number(document.getElementById("days").value) || 1);
    const style = document.getElementById("style").value;

    if (!from || !to) {
        alert("Please enter starting city and destination!");
        return;
    }

    const result = document.getElementById("trip-result");

    if (!result) {
        alert("Trip result section is missing!");
        return;
    }

    result.style.display = "block";
    result.innerHTML = "<h2>Finding tourist places near " + to + "...</h2>";
    result.scrollIntoView({ behavior: "smooth" });

    // UJJAIN: EXISTING ITINERARY
    if (to.toLowerCase().includes("ujjain")) {

        let html = `
            <h2>${from} → ${to}</h2>
            <p>${days} Days | ${style}</p>
        `;

        const placesPerDay = Math.ceil(ujjainPlaces.length / days);

        for (let day = 0; day < days; day++) {

            html += `<h3>Day ${day + 1}</h3>`;

            const start = day * placesPerDay;
            const end = Math.min(start + placesPerDay, ujjainPlaces.length);

            for (let i = start; i < end; i++) {

                const place = ujjainPlaces[i];

                html += `
                    <div class="trip-place">
                        <h4>${i + 1}. ${place.name}</h4>
                        <p>${place.description}</p>
                        <a target="_blank" rel="noopener"
                           href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " Ujjain")}">
                           Open in Google Maps →
                        </a>
                    </div>
                `;
            }
        }

        result.innerHTML = html;
        return;
    }

    // OTHER INDIAN DESTINATIONS
    try {

       
        // Find destination coordinates
        const geoUrl =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(to) +
            "&count=10&language=en&format=json&countryCode=IN";

        const geoResponse = await fetch(geoUrl);

        if (!geoResponse.ok) {
            throw new Error("Location search failed");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            result.innerHTML = `
                <h2>Destination not found</h2>
                <p>Please check the spelling or try another Indian city.</p>
            `;
            return;
        }

        // Select the correct Manali in Himachal Pradesh
        let location;

        if (to.toLowerCase().includes("manali")) {
            location = geoData.results.find(item =>
                item.name.toLowerCase() === "manali" &&
                (item.admin1 || "").toLowerCase().includes("himachal")
            );

            if (!location) {
                throw new Error("Manali, Himachal Pradesh could not be verified.");
            }
        } else {
            location = geoData.results[0];
        }

        const lat = location.latitude;
        const lon = location.longitude;

        // Search nearby tourist places using OpenStreetMap
        const query = `
            [out:json][timeout:25];
            (
                nwr(around:20000,${lat},${lon})["tourism"~"attraction|museum|zoo|theme_park|viewpoint|gallery"];
                nwr(around:20000,${lat},${lon})["historic"];
                nwr(around:20000,${lat},${lon})["amenity"="place_of_worship"];
            );
            out center 40;
        `;

        const mapUrl =
            "https://overpass-api.de/api/interpreter?data=" +
            encodeURIComponent(query);

        const mapResponse = await fetch(mapUrl);

        if (!mapResponse.ok) {
            throw new Error("Tourist places search failed");
        }

        const mapData = await mapResponse.json();

        // Remove unnamed and duplicate places
        const seen = new Set();

        const places = mapData.elements.filter(item => {
            const name = item.tags && item.tags.name;

            if (!name) return false;

            const key = name.toLowerCase();

            if (seen.has(key)) return false;

            seen.add(key);
            return true;
        });

        if (places.length === 0) {
            result.innerHTML = `
                <h2>${to}</h2>
                <p>No mapped tourist places were found nearby.</p>
                <a target="_blank" rel="noopener"
                   href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(to + " tourist places India")}">
                   Search ${to} on Google Maps →
                </a>
            `;
            return;
        }

        let html = `
            <h2>${from} → ${to}</h2>
            <p>${days} Days | ${style}</p>
            <h3>Tourist Places near ${to}</h3>
            <p>Places found within approximately 20 km of your destination. Map data may be incomplete.</p>
        `;

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

                const safeName = String(name).replace(/[&<>"']/g, char => ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                })[char]);

                html += `
                    <div class="trip-place">
                        <h4>${i + 1}. ${safeName}</h4>
                        <p>Category: ${category}</p>

                        <a target="_blank" rel="noopener"
                           href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + to + " India")}">
                           Open in Google Maps →
                        </a>
                    </div>
                `;
            }
        }

        result.innerHTML = html;

  
} catch (error) {

    console.error("Trip Planner Error:", error);

    result.innerHTML = `
        <h2>Unable to load tourist places</h2>
        <p>Error: ${String(error.message)}</p>
        <p>Please try again later.</p>
    `;
}
}

