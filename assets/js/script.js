$(document).ready(function () {

    const apiKey = "3c93e73d72c848cc06d03b3131ddc61f";

    let date = new Date();

    $("#searchCity").keypress(function (event) {
        if (event.kayCode === 13) {
            event.preventDefault();
            $("#searchButton").click();
        }
    });

    $("#searchButton").on("click", function () {

        let city = $("#searchCity").val();
        if (city) {
            searchWeather(city);
        }
        
    })

    function searchWeather(city) {

        let endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        fetch(endPoint)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let todayEl = document.getElementById("today")
            todayEl.textContent = ""

            let titleEl = document.createElement('h3')
            titleEl.classList.add('card-title')
            titleEl.textContent = `${data.name} (${new Date().toLocaleDateString()})`

           let cardEl = document.createElement('div') 
           cardEl.classList.add('card')

           let cardBodyEl = document.createElement('div')
           cardBodyEl.classList.add('card-body')

           let windEl = document.createElement('p')
           windEl.classList.add('card-text')
           
           let humidEl = document.createElement('p')
           humidEl.classList.add('card-text')

           let tempEl = document.createElement('p')
           tempEl.classList.add('card-text')

           humidEl.textContent = `humidity : ${data.main.humidity} %`

           tempEl.textContent = `temperature : ${data.main.temp}`

           windEl.textContent = `wind : ${data.wind.speed}`

           let imgEl = document.createElement('img')
           imgEl.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

           titleEl.appendChild(imgEl)
           cardBodyEl.appendChild(titleEl)
           cardBodyEl.appendChild(tempEl)
           cardBodyEl.appendChild(windEl)
           cardBodyEl.appendChild(humidEl)
           cardEl.appendChild(cardBodyEl)
           todayEl.appendChild(cardEl)

           getForecast(city)
           getUVIndex(data.coord.lat, data.coord.lon)

        //    let lat = city.coord.lat;
        //    let lon = city.coord.lon;

           function getUVIndex(lat) {

           }

           function getForecast(lon) {

           }

           //write func for lat and lon //2 sep api calls 
        })



    }


})




