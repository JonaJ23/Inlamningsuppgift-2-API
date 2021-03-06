window.onload = function () {


    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('keypress', setQuery);

    const weatherCheckbox = document.getElementById('weatherCheck');
    const attractionsCheckbox = document.getElementById('attractionsCheck'); 

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
    
    /* I denna funktion kallas api:n från openweathermap.org genom en fetch via URL:n. 
    Ett svar skickas då tillbaka via parametern response och konverterar sedan det till ett json objekt.
    Därefter kallas json-objektet med den lokala funktionen "displayWeatherResults" som visar platsens nuvarande väder.
    Om det stöts på ett kommunikationsfel med servern så skickas en annan status till användaren istället. 
    */
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
    
    /* Denna funktion är motsvarande till hur Openweather fungerar när den kallar på api:n osv,
    fast i detta fall ska en förfrågan efter stadens 3 populäraste attraktioner fetchas via Foursquares URL med client-parametrarna.
    När användaren söker efter en stad används kryssrutorna som en enkel döljningsfunktion för att antagligen visa enbart väder eller attraktioner. */
    function getAttractionResults(city) {
    
        const clientID = "G21QHFLO1V3QABSS5VYAENKWSPWZLUNFOVXHOCPVLZIAWC4U";
        const clientSecret = "EDBQEB3FMDFG5LBX5I3TWJACDAJUJGBLJHEVQELYWHGRMP1L";

        fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + clientSecret + '&near=' + city + '&limit=3&v=20210218')
            .then(function (response) { return response.json() })
            .then(function (attractions) {

                displayAttractionsResults(attractions);
                console.log(attractions);

                // WEATHER

                if (weatherCheckbox.checked == true) { 
                    hideAttractionResults();
                    showWeatherResults();
                }
                if (weatherCheckbox.checked == false) {
                    showAttractionResults();
                    showWeatherResults();               
                }

                // TOP ATTRACTIONS 

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

