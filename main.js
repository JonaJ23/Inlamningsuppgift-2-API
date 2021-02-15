window.onload = function () {


    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('keypress', setQuery);


    const weatherCheckbox = document.getElementById('weatherCheck');
    const attractionsCheckbox = document.getElementById('attractionsCheck');
    const filter = document.getElementById('alphaCheck');  


    // SEARCHBOX VALUE

    async function setQuery(event) {
        if (event.keyCode == 13) {

            if (searchBox.value == "" || searchBox.value == null) {
                alert("Please enter a valid city name.");
                return false;
            }        
            getWeatherResults(searchBox.value);
            getAttractionResults(searchBox.value);
            console.log(searchBox.value);
        }
    }


    // DISPLAY FUNCTION OF WEATHER

    function showWeatherResults() {
        const weather = document.getElementById('weather-segment');
        weather.style.display = 'block';
    }
    
    function hideWeatherResults() {
        const weather = document.getElementById('weather-segment');
        weather.style.display = 'none';
    }
       


    // DISPLAY FUNCTION OF ATTRACTIONS

    function showAttractionResults() {
        const attractions = document.getElementById('attraction-segment');
        attractions.style.display = 'block';
    }
    
    function hideAttractionResults() {
        const attractions = document.getElementById('attraction-segment');
        attractions.style.display = 'none';
    }



    
    // OPENWEATHER API-CALL
    
    function getWeatherResults(city) {
        const weatherAPI = '1c39d2bbe79193bd9cf7413fc49c0d29';
        
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherAPI + '')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } 
            else if (response.status === 400 || response.status === 404) {
                alert(city + " could not be found, check spelling or try another city name.")
            }
            else if (response.status === 500) {
                alert("500 Internal error with server. Try again later")
            }
            else if (response.status === 401) {
                alert("Unauthorized access to server detected. Is possibly out of date or suffers from communication error")
            }
            else {
                alert("Oops! Something went wrong. Try again.")
            }
        })
        .then(function(weather) {
            displayWeatherResults(weather);
        })
        .catch(function(error) {
            console.log(error.message);
        });
    }
    
    function displayWeatherResults (weather) {
        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);
        
        const temp = document.getElementById('temp');
        const celsius = Math.round(parseFloat(weather.main.temp) - 273.15);
        temp.innerHTML = celsius + '&deg;' + "C";

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
    
    
    
    // FOURSQUARE CLIENT
    
    function getAttractionResults(city) {
    
        const clientID = "G21QHFLO1V3QABSS5VYAENKWSPWZLUNFOVXHOCPVLZIAWC4U";
        const clientSecret = "EDBQEB3FMDFG5LBX5I3TWJACDAJUJGBLJHEVQELYWHGRMP1L";
    
        fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + clientSecret + '&near=' + city + '&limit=10&v=20210211')
            .then(function (response) { return response.json() })
            .then(function (attractions) {

                displayAttractionsResults(attractions);
                console.log(attractions);

                if (weatherCheckbox.checked == true) { 
                    hideAttractionResults();
                    showWeatherResults();
                    if (attractionsCheckbox.checked == true) {
                        showAttractionResults();
                    }
                }
                if (weatherCheckbox.checked == false) { //
                    showAttractionResults();
                    showWeatherResults();               
                }
                if (attractionsCheckbox.checked == true) {
                    showAttractionResults();
                    if (weatherCheckbox.checked == false) {
                        hideWeatherResults();
                    }
                }
            })
            .catch(function(error) {
                console.log(error.message);
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

