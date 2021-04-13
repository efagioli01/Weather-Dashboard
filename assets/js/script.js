$(document).ready(function () {

    let apiKey = "3c93e73d72c848cc06d03b3131ddc61f";

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

    });

    // var history = JSON.parse(localStorage.getItem('"history')) || [];

    // if (history.length > 0) {
    //     weatherFunction(history[historylength -1]);
    // }

    // for (var i = 0; i < history.length; i++) {
    //     createRow(history[1]);
    // }

    // function createRow(text) {
    //     var listItem =$("<li>").addClass("list-group-item").text(text);
    //     $(".history").append(listItem);
    // }

    // $(".history").on("click", "li", function() {
    //     weatherFunction($(this).text());
    //     weatherForecast($(this).text());

    // });
    // function weatherFunction(searchTerm) {
    // }

    

    function searchWeather(city) {

        let endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
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

                humidEl.textContent = `humidity : ${Math.round(data.main.humidity)} %`

                tempEl.textContent = `temperature : ${Math.round(data.main.temp)}` 
                

                windEl.textContent = `wind : ${Math.round(data.wind.speed)} mph`

                let imgEl = document.createElement('img')
                imgEl.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)


                titleEl.appendChild(imgEl)
                cardBodyEl.appendChild(titleEl)
                cardBodyEl.appendChild(tempEl)
                cardBodyEl.appendChild(windEl)
                cardBodyEl.appendChild(humidEl)
                cardEl.appendChild(cardBodyEl)
                todayEl.appendChild(cardEl)
            

                function getUVIndex(lat, lon) {
                    let UVQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
                    fetch(UVQueryURL)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            console.log(lat, lon)
                            console.log(data.current.uvi)

                            let uvEl = document.createElement('p')
                            uvEl.classList.add('card-text')
                            uvEl.textContent = `uv index : ${Math.round(data.current.uvi)}`

                            cardBodyEl.appendChild(uvEl)

                            function getuvColor() {

                                if(uvEl <= 2){
                                   uvEl.addClass = ("favorable")
                               }
                               
                               else if(uvEl >2 && uvEl <=7){
                                   uvEl.addClass = ("moderate")
                               }
                               
                               else if(uvEl >8) {
                                   uvEl.addClass = ("severe")
                               };
               
                           }
                           getuvColor()

                        })
                        
                }

                getUVIndex(data.coord.lat, data.coord.lon)


            });

    }

})



//for 5 day forecast
// let forecastQueryURL= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`



