const api = {
    key: "1c39d2bbe79193bd9cf7413fc49c0d29",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();      
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    debugger;
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}


















/* function searchFilter() {
    let searchBox = document.getElementById('search-box');
    let searchString = searchBox.value;

    console.log(searchString);

    let Wcheck = document.getElementById('weatherCheck');
    let Acheck = document.getElementById('attractionsCheck');

    let weather = document.querySelector('#location');
    let attraction = document.querySelector('#attraction');

    if (Wcheck.checked === true) {
        weather.style.display = 'flex';
        attraction.style.display ='none';
    } 
    else (Wcheck.checked === false) {
        weather.style.display = 'flex';
    }
        weather.style.display = 'none';
    }
    if (Acheck.checked === true) {
        attraction.style.display = 'flex';
    } 
    else {
        attraction.style.display = 'none';
    } */