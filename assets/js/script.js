$(document).ready(function () {

    let apiKey = "3c93e73d72c848cc06d03b3131ddc61f";

    let date = new Date();

    let pastCities = localStorage.getItem('city') 
    if (pastCities == null) {
        pastCities = []
    } else {
        pastCities = JSON.parse(pastCities)
    }
      
    for (i = 0; i < pastCities.length; i++) {
        let historyEl = $("#history");
        let city = pastCities[i]
        let li = $('<button>').text(pastCities[i]).on('click', function () {
            searchWeather(city)
        })
        historyEl.append(li)
    }

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
            pastCities.push(city)
            localStorage.setItem('city', JSON.stringify(pastCities))
        }

    });

    function searchWeather(city) {

        let endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                // console.log(data)

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
                            // console.log(lat, lon)
                            // console.log(data.current.uvi)
                            for (let day of data.daily) {
                                
                               
                               let date = new Date(day.dt *1000) 
                                
                               day.weather
                               day.humidity
                               day.temp.day
                               day.wind_speed
                               day.weather[0].icon

                               
                               let forecastEl = document.getElementById("forecast")
               
                               let forecastTitleEl = document.createElement('h3')
                               forecastTitleEl.classList.add('card-title')
                               forecastTitleEl.textContent =  `${new Date(day.dt*1000).toLocaleDateString()}`

                               let newCardEl = document.createElement('div')
                               newCardEl.classList.add('card2')

                               let newCardBodyEl = document.createElement('div')
                                newCardBodyEl.classList.add('card-body')

                                let newHumidEl = document.createElement('p')
                                newHumidEl.classList.add('card-text')

                                let newTempEl = document.createElement('p')
                                newTempEl.classList.add('card-text')

                                let newWindEl = document.createElement('p')
                                newWindEl.classList.add('card-text')

                                newHumidEl.textContent = `humidity : ${Math.round(day.humidity)} %`

                                newTempEl.textContent = `temperature : ${Math.round(day.temp.day)}`

                                newWindEl.textContent = `wind : ${Math.round(day.wind_speed)} mph`

                                let newImgEl = document.createElement('img')
                                newImgEl.setAttribute('src', `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`)

                                newCardBodyEl.appendChild(forecastTitleEl)
                                newCardBodyEl.appendChild(newTempEl)
                                newCardBodyEl.appendChild(newHumidEl)
                                newCardEl.appendChild(newCardBodyEl)
                                forecastEl.appendChild(newCardEl)
                                newCardBodyEl.appendChild(newWindEl)
                                forecastTitleEl.appendChild(newImgEl)


                            }

            
                            let uvEl = document.createElement('p')
                            uvEl.classList.add('card-text')
                            uvEl.textContent = `uv index : ${Math.round(data.current.uvi)}`

                            cardBodyEl.appendChild(uvEl)

                            function getuvColor() {
                                let uvColor = data.current.uvi

                                if (uvColor <= 2) {
                                    uvEl.classList.add("favorable")
                                }

                                else if
                                    (uvColor > 2 && uvColor <= 7) {
                                    uvEl.classList.add("moderate")
                                }

                                else if (uvColor > 8) {
                                    uvEl.classList.add("severe")
                                };

                               

                            }
                            getuvColor()

                        })
                          
                }

                getUVIndex(data.coord.lat, data.coord.lon);

                
                
                

                      
                          
               
                

               


            });





    }







})



