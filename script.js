window.onload = function () {
    fetchWeatherData('Bangalore');
}

document.getElementById('searchIcon').addEventListener('click', function () {
    fetchWeatherData(document.getElementById('search').value);

    document.getElementsByClassName("fah")[0].style.backgroundColor = "white";
    document.getElementsByClassName("fah")[0].style.color = "black";
    document.getElementsByClassName("cels")[0].style.backgroundColor = "white";
    document.getElementsByClassName("cels")[0].style.color = "black";

});


function fetchWeatherData(city) {

    const api1 = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${'
    const api2 = city
    const api3 = '}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json'

    apiurl = api1 + api2 + api3

    console.log(typeof (apiurl));


    fetch(apiurl)
        .then(response => response.json())
        .then(data => {

            updateCurrentWeather(data.currentConditions, data.resolvedAddress);
            updateHourlyForecast(data.days)
            todayhighlights(data.days)
            weeklydata(data.days)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateCurrentWeather(currentConditions, resolvedAddress) {
    const weatherIconElement = document.getElementById("weatherIcon");
    const tempElement = document.getElementById("temp");
    const daytimeElement = document.getElementById("daytime");
    const weatherConditionElement = document.getElementById('weatherCondition');
    const humidityElement = document.getElementById('humidity');
    const locationElement = document.getElementById('location');

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];

    switch (currentConditions.icon) {
        case "clear-night":
            weatherIconElement.src = './assets-1/clear night.png';
            document.body.style.backgroundImage = 'url("./assets-2/clear night bg.jpg")';
            break;
        case "partly-cloudy-day":
            weatherIconElement.src = './assets-1/partly cloudy day 2.jpg';
            document.body.style.backgroundImage = 'url("./assets-2/partly cloudy day bg.webp")';
            break;
        case "partly-cloudy-night":
            weatherIconElement.src = './assets-1/partly cloudy night.png';
            document.body.style.backgroundImage = 'url("./assets-2/partly cloudy night bg.jpg")';
            break;
        case "clear-day":
            weatherIconElement.src = './assets-1/clear day.png';
            document.body.style.backgroundImage = 'url("./assets-2/clear day bg.jpg")';
            break;
        default:
            weatherIconElement.src = './assets-1/rain.png';
            document.body.style.backgroundImage = 'url("./assets-2/rain bg.webp")';
    }

    tempElement.innerHTML = `<h1>${currentConditions.temp}<sup>o</sup>C</h1>`;
    daytimeElement.innerHTML = `<p>${day}, ${currentConditions.datetime}</p>`;
    weatherConditionElement.innerHTML = `<p id="weatherCondition"><span><i class="bi bi-cloud-fill"></i></span> ${currentConditions.conditions}</p>`;
    humidityElement.innerHTML = `<p id="humidity"><span><i class="bi bi-droplet-fill"></i></span> ${currentConditions.precip}%</p>`;
    locationElement.innerHTML = `<p id="location"><span><i class="bi bi-geo-alt-fill"></i></span> ${resolvedAddress}</p>`;
}

function updateHourlyForecast(days) {

    const currentdata = days[0];

    for (let i = 0; i < 24; i++) {

        const datahrs = currentdata.hours[i]

        const currentDiv = document.querySelector(`.smain > div:nth-child(${i + 1})`);
        currentDiv.querySelector("p:first-child").innerHTML = `<p>${datahrs.datetime}</p>`;

        if (datahrs.icon == "clear-night") {
            currentDiv.querySelector("img").src = './assets-1/clear night.png';
        } else if (datahrs.icon == "partly-cloudy-day") {
            currentDiv.querySelector("img").src = './assets-1/partly cloudy day 2.jpg';
        } else if (datahrs.icon == "partly-cloudy-night") {
            currentDiv.querySelector("img").src = './assets-1/partly cloudy night.png';
        } else if (datahrs.icon === "clear-day") {
            currentDiv.querySelector("img").src = './assets-1/clear day.png';
        } else {
            currentDiv.querySelector("img").src = './assets-1/rain.png';
        }
        currentDiv.querySelector("p:nth-child(3)").innerHTML = `<p>${datahrs.temp}<sup>o</sup>C</p>`;
    }
}

function todayhighlights(days) {

    todaydetails = days[0]
    uvindex2 = days[0].uvindex

    if (uvindex2 >= 0 && uvindex2 <= 3) {
        document.getElementById("uvindex").innerHTML = `<h3>${uvindex2}</h3>`
        document.querySelector(".sfooter section div p:nth-child(3)").innerHTML = `<p>Low</p>`
    }
    else if (uvindex2 >= 3 && uvindex2 <= 8) {
        document.getElementById("uvindex").innerHTML = `<h3>${uvindex2}</h3>`
        document.querySelector(".sfooter section div p:nth-child(3)").innerHTML = `<p>Moderate</p>`
    }
    else if (uvindex2 >= 3 && uvindex2 <= 10) {
        document.getElementById("uvindex").innerHTML = `<h3>${uvindex2}</h3>`
        document.querySelector(".sfooter section div p:nth-child(3)").innerHTML = `<p>High</p>`
    } else {
        document.getElementById("uvindex").innerHTML = `<h3>${uvindex2}</h3>`
        document.querySelector(".sfooter section div p:nth-child(3)").innerHTML = `<p>Extreme</p>`
    }

    windspeed2 = days[0].windspeed

    document.getElementById("windstatus").innerHTML = `<h3>${windspeed2}</h3>`

    sunrise2 = days[0].sunrise

    document.getElementById("sunrise").innerHTML = `<h3>${sunrise2}</h3>`

    sunset2 = days[0].sunset

    document.getElementById("sunset").innerHTML = `<p>${sunset2}</p>`

    humid2 = days[0].humidity;

    if (humid2 >= 30 && humid2 <= 60) {
        document.getElementById("humid1").innerHTML = `<h3>${humid2}</h3>`;
        document.getElementById("condition").innerHTML = `<p>Moderate</p>`;
    } else if (humid2 > 60) {
        document.getElementById("humid1").innerHTML = `<h3>${humid2}</h3>`;
        document.getElementById("condition").innerHTML = `<p>High</p>`;
    } else {
        document.getElementById("humid1").innerHTML = `<h3>${humid2}</h3>`;
        document.getElementById("condition").innerHTML = `<p>Low</p>`;
    }

    visible2 = days[0].visibility;

    if (visible2 === 0.03) {
        document.getElementById("visible").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Good";
        document.getElementById("quality").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Good"
    } else if (visible2 === 0.16) {
        document.getElementById("visible").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Moderate Fog";
        document.getElementById("quality").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Moderate"
    } else if (visible2 === 0.35) {
        document.getElementById("visible").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Light Fog";
        document.getElementById("quality").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Unhealthy for sensitive groups"
    } else if (visible2 >= 0.54 && visible2 <= 1.03) {
        document.getElementById("visible").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Very Light Fog";
        document.getElementById("quality").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Unhealthy"
    } else if (visible2 >= 1.08 && visible2 <= 2.15) {
        document.getElementById("visible").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Light Mist";
        document.getElementById("quality").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Very Unhealthy"
    } else if (visible2 >= 2.16 && visible2 <= 5.3) {
        document.getElementById("visible").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Very Light Mist";
        document.getElementById("quality").innerHTML = ` <h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Hazardous"
    } else if (visible2 >= 5.4 && visible2 <= 10.7) {
        document.getElementById("visible").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Clear Air";
        document.getElementById("quality").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Hazardous"
    } else if (visible2 >= 10.8 && visible2 <= 27.0) {
        document.getElementById("visible").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Very Clear Air";
        document.getElementById("quality").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Hazardous"
    } else {
        document.getElementById("visible").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("visiblecondition").innerHTML = "Unknown";
        document.getElementById("quality").innerHTML = `<h3>${visible2}</h3>`
        document.getElementById("qualcondition").innerHTML = "Unknown"
    }
}

function weeklydata(data) {

    data.map(element => {
        document.getElementById("smain2").innerHTML += `<div>
        <p>${element.datetime}</p>
        ${weeklyimage(element.icon)}
        <p>${element.temp}<sup>o</sup>C</p>
    </div>`

    });
}

function weeklyimage(icon) {

    let imagetag = `<img src= "`
    let imagesrc = ""
    let imagetag2 = `"alt="icon" >`

    if (icon == "clear-night") {
        imagesrc = "./assets-1/clear night.png"
    } else if (icon == "partly-cloudy-day") {
        imagesrc = "./assets-1/partly cloudy day 2.jpg"
    } else if (icon == "partly-cloudy-night") {
        imagesrc = "./assets-1/partly cloudy night.png"
    } else if (icon === "clear-day") {
        imagesrc = "./assets-1/clear day.png"
    } else {
        imagesrc = "./assets-1/rain.png"
    }

    let fullimage = imagetag + imagesrc + imagetag2

    return fullimage
}

fetchWeatherData();

function todaydata() {
    document.getElementById("smain").style.display = "grid"
    document.getElementById("smain2").style.display = "none"
    document.getElementsByClassName("sfooter")[0].style.display = "grid"
}

function weekdata() {
    document.getElementById("smain").style.display = "none"
    document.getElementById("smain2").style.display = "grid"
    document.getElementsByClassName("sfooter")[0].style.display = "none"
}

function celconversion() {

    document.getElementsByClassName("cels")[0].style.backgroundColor = "black";
    document.getElementsByClassName("cels")[0].style.color = "white";
    document.getElementsByClassName("fah")[0].style.backgroundColor = "white";
    document.getElementsByClassName("fah")[0].style.color = "black";


    fetch(apiurl)
        .then(response => response.json())
        .then(data => {

            updateCurrentWeather(data.currentConditions, data.resolvedAddress);
            updateHourlyForecast(data.days)
            todayhighlights(data.days)
            document.getElementById("smain2").innerHTML = '';
            weeklydata(data.days)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fahconversion() {

    document.getElementsByClassName("fah")[0].style.backgroundColor = "black";
    document.getElementsByClassName("fah")[0].style.color = "white";
    document.getElementsByClassName("cels")[0].style.backgroundColor = "white";
    document.getElementsByClassName("cels")[0].style.color = "black";

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            celtemp = data.currentConditions.temp
            convertedtemp = (celtemp * 9 / 5) + 32
            document.getElementById("temp").innerHTML = `<h1>${convertedtemp}<sup>o</sup>F</h1>`

            let hourlyfahtemp = data.days[0].hours

            for (i = 0; i < 24; i++) {

                celtemp = hourlyfahtemp[i].temp
                convertedtemp2 = (celtemp * 9 / 5) + 32
                convertedtemp2format = convertedtemp2.toFixed(2)
                const currentDiv = document.querySelector(`.smain > div:nth-child(${i + 1})`);
                currentDiv.querySelector("p:nth-child(3)").innerHTML = `<p>${convertedtemp2format}<sup>o</sup>F</p>`;
            }

            document.getElementById("smain2").innerHTML = '';

            let weeklyfahtemp = data.days

            console.log(weeklyfahtemp);
            weeklyfahtemp.forEach(element => {
                celtemp = element.temp;
                console.log(celtemp);
                convertedtemp3 = (celtemp * 9 / 5) + 32;
                convertedtemp3format = convertedtemp3.toFixed(2);
                document.getElementById("smain2").innerHTML += `<div>
            <p>${element.datetime}</p>
            ${weeklyimage(element.icon)}
            <p>${convertedtemp3format}<sup>o</sup>F</p>
            </div>`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

