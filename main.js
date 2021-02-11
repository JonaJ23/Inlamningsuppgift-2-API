window.onload = function () {

    const api = {
        key: "1c39d2bbe79193bd9cf7413fc49c0d29",
        base: "https://api.openweathermap.org/data/2.5/",
    }
    
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('keypress', setQuery);
















    const weatherCheckbox = document.getElementById('weatherCheck');
    const attractionsCheckbox = document.getElementById('attractionsCheck');
    const filter = document.getElementById('alphaCheck');
    
    


    function setQuery(event) {
        if (event.keyCode == 13) {
            getWeatherResults(searchBox.value);
            getAttractionResults(searchBox.value);
            console.log(searchBox.value);
    
            if (searchBox.value == "" || searchBox.value == null) {
                alert("Please enter a valid city name");
                return false;
            }
        }

    }



    function weatherVisible() {
        const weather = document.getElementById('weather');
        weather.style.display = 'block';
    }
    
    function weatherHidden() {
        const weather = document.getElementById('weather');
        weather.style.display = 'none';
    }
       



    function showAttractionResults() {
        const attractions = document.getElementById('attraction-segment');
        attractions.style.display = 'flex';
    }
    
    function hideAttractionResults() {
        const attractions = document.getElementById('attraction-segment');
        attractions.style.display = 'none';
    }







    
    // OPENWEATHER
    
    function getWeatherResults(query) {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {



            return weather.json();      
        }).then(displayWeatherResults);
    }
    
    function displayWeatherResults (weather) {
        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);
        let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    
        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText = weather.weather[0].main;
        let icon = weather.weather[0].icon;
        document.getElementById('cond-img').src = 'http://openweathermap.org/img/wn/' + icon + "@2x.png";
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
    
    
    
    // FOURSQUARE
    
    function getAttractionResults(city) {
    
        const clientID = "G21QHFLO1V3QABSS5VYAENKWSPWZLUNFOVXHOCPVLZIAWC4U";
        const clientSecret = "EDBQEB3FMDFG5LBX5I3TWJACDAJUJGBLJHEVQELYWHGRMP1L";
    
        fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + clientSecret + '&near=' + city + '&limit=10&v=20210211')
            .then(function (response) { return response.json() })
            .then(function (attractions) {

                if (weatherCheckbox.checked == true) {
                    hideAttractionResults();
                }
                if (weatherCheckbox.checked == false) {
                    showAttractionResults();
                }
                else {
                    displayAttractionsResults(attractions);
                    console.log(attractions);
                }
            })
            .catch(function () {
            });
    }
    
    function displayAttractionsResults(attractions) {
    
        let i;
        for (i = 0; i < 3; i++) {
            document.getElementById('attbox' + i + '-title').innerHTML = attractions.response.groups[0].items[i].venue.name;
            document.getElementById('attbox' + i + '-adress').innerHTML = attractions.response.groups[0].items[i].venue.location.address;
        }
    }
    
}