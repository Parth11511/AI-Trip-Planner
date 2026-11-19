
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

function makePlan() {

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const days = Number(document.getElementById("days").value);
    const style = document.getElementById("style").value;

    if (!from || !to) {
        alert("Please enter starting city and destination!");
        return;
    }

    const result = document.getElementById("trip-result");

    if (!result) {
        alert("Trip result section is not ready yet.");
        return;
    }

    if (to.toLowerCase().includes("ujjain")) {

        let html = `
            <h2>${from} → ${to}</h2>
            <p>${days} Days | ${style}</p>
        `;

        const placesPerDay = Math.ceil(ujjainPlaces.length / days);

        for (let day = 0; day < days; day++) {

            html += `<h3>Day ${day + 1}</h3>`;

            const start = day * placesPerDay;
            const end = Math.min(
                start + placesPerDay,
                ujjainPlaces.length
            );

            for (let i = start; i < end; i++) {

                const place = ujjainPlaces[i];

                html += `
                    <div class="trip-place">
                        <h4>${i + 1}. ${place.name}</h4>
                        <p>${place.description}</p>

                        <a target="_blank"
                           rel="noopener"
                           href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " Ujjain")}">
                           Open in Google Maps →
                        </a>
                    </div>
                `;
            }
        }

        result.innerHTML = html;

    } else {

        result.innerHTML = `
            <h2>${from} → ${to}</h2>
            <p>
                Destination-specific itinerary for ${to}
                will be available after AI integration.
            </p>
            <a target="_blank"
               rel="noopener"
               href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(to + " tourist places India")}">
               Explore places on Google Maps →
            </a>
        `;
    }

    result.style.display = "block";

    result.scrollIntoView({
        behavior: "smooth"
    });
}


