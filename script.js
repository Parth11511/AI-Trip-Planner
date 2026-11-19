
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
    result.innerHTML = "<h2>Finding places for your trip...</h2>";

    result.scrollIntoView({ behavior: "smooth" });

    // UJJAIN ITINERARY
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

    // OTHER DESTINATIONS
    try {

        const searchUrl =
            "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
            encodeURIComponent(to + " tourist attractions India") +
            "&format=json&origin=*&srlimit=6";

        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        const places = searchData.query.search;

        if (!places || places.length === 0) {
            result.innerHTML = `
                <h2>${to}</h2>
                <p>We couldn't find information automatically.</p>
                <a target="_blank" rel="noopener"
                   href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(to + " tourist places India")}">
                   Explore ${to} on Google Maps →
                </a>
            `;
            return;
        }

        const pageIds = places.map(place => place.pageid).join("|");

        const detailsUrl =
            "https://en.wikipedia.org/w/api.php?action=query&pageids=" +
            pageIds +
            "&prop=extracts&exintro=1&explaintext=1&format=json&origin=*";

        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        const pages = Object.values(detailsData.query.pages);

        let html = `
            <h2>${from} → ${to}</h2>
            <p>${days} Days | ${style}</p>
            <h3>Places to Explore in ${to}</h3>
            <p>Information collected from Wikipedia. Please verify details before travelling.</p>
        `;

        const placesPerDay = Math.ceil(pages.length / days);

        for (let day = 0; day < days; day++) {

            html += `<h3>Day ${day + 1}</h3>`;

            const start = day * placesPerDay;
            const end = Math.min(start + placesPerDay, pages.length);

            for (let i = start; i < end; i++) {

                const place = pages[i];

                const description = (place.extract || "More information is available on Wikipedia.")
                    .substring(0, 500);

                html += `
                    <div class="trip-place">
                        <h4>${i + 1}. ${place.title}</h4>
                        <p>${description}</p>

                        <a target="_blank" rel="noopener"
                           href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + " " + to)}">
                           Open in Google Maps →
                        </a>
                    </div>
                `;
            }
        }

        result.innerHTML = html;

    } catch (error) {

        result.innerHTML = `
            <h2>Unable to load trip details</h2>
            <p>Please check your internet connection and try again.</p>
        `;
    }
}
