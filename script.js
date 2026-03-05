(function() {
    const API = "https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&measures=Population&drilldowns=Year";
    function loadPopulation() {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", API, true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                const response = JSON.parse(xhr.responseText);
                displayData(response.data);
            } else {
                console.error("Request failed. Status: ", xhr.status);
            }
        };

        xhr.onerror = function () {
            console.log(1);
            console.error("Netowrd error.");            
        };

        xhr.send();
    }

    function displayData(data) {
        data.sort((a,b) => b.Year - a.Year);

        const tableBody = document.querySelector("#populationTable tbody");

        data.forEach(item => {
            const row = document.createElement("tr");
            const year = document.createElement("td");
            year.textContent = item.Year;

            const population = document.createElement("td");
            population.textContent = item.Population.toLocaleString();

            row.appendChild(year);
            row.appendChild(population);

            tableBody.appendChild(row);
        });
    }
    document.addEventListener("DOMContentLoaded", loadPopulation);
})();