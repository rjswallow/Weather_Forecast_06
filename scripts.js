// City current weather

const url = "https://api.openweathermap.org/"
const apiKey = "098c93e8d17b5848e68a154c5abf26ec"





$("#searchBtn").on("click", function () {
    let cityName = $("#search-term").val()
    $("#citySearch").empty()
    $("#crntTemp").empty()
    $("#crntHumidity").empty()
    $("#crntHumidity").empty()
    $("#crntWind").empty()
    $("#crntIndex").empty()
    displayWeather(cityName)
})


function displayWeather(cityName) {

    let endPoint = url + "data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + apiKey
    let endPoint2 = url + "data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + apiKey
    let endpoint3 = url + "data/2.5/uvi?lat="
    $.ajax({
        url: endPoint,
        method: "GET",
    })
        .then(function (response) {

            // display current city and date
            let span = $("<span>").text(response.name)
            let currentDate = moment(response.dt, "X").format(" (MM/DD/YYYY)")

            var iconcode = response.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var imageIcon = $("<img>").attr("src", iconurl)

            $("#citySearch").append(span, currentDate, imageIcon)

            //  display current temp
            let temp = $("<span>").text("Current Temp: " + response.main.temp + "ºF")
            $("#crntTemp").append(temp)

            // display current humidity  
            let humidity = $("<span>").text("Current Humidity: " + response.main.humidity + "%")
            $("#crntHumidity").append(humidity)

            // display current wind speed
            let wind = $("<span>").text("Current Wind Speed: " + response.wind.speed + " mph")
            $("#crntWind").append(wind)

            console.log(response);
            console.log("temp " + response.main.temp)
            console.log("humidity " + response.main.humidity)
            console.log("wind " + response.wind.speed)
            console.log(response.coord.lon)
            console.log(response.coord.lat)
            console.log(endpoint3 + response.coord.lat.toString() + "&lon=" + response.coord.lon + "&appid=" + apiKey)

            // call for UV Index
            $.ajax({
                url: endpoint3 + response.coord.lat.toString() + "&lon=" + response.coord.lon.toString() + "&appid=" + apiKey,
                method: "GET"
            })
                .then(function (uvResponse) {

                    // display uv index
                    let uvIndex = $("<span>").text("Current UV Index: " + uvResponse.value)
                    $("#crntIndex").append(uvIndex)

                    console.log(uvResponse)
                    console.log(uvResponse.value)

                })

        })


    $.ajax({
        url: endPoint2,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        $(".card-deck").empty()
        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.includes("12:00:00")) {


                var iconcode = response.list[i].weather[0].icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                var temp5 = response.list[i].main.temp
                var humidity5 = response.list[i].main.humidity




                let futureDate = moment(response.list[i].dt, "X").format(" MM/DD/YYYY")
                $(".card-deck").append(`
                    <div class="card">
                         
                         <div class="card-body">
                           <h5 class="card-title">${futureDate}</h5>
                           <img src="${iconurl}">
                           <p>Temp: ${temp5} </p>
                           <p>Humidity: ${humidity5}</p>
                          
                         </div>
                       </div>
                       
                       `)
            }

        }




        console.log(response);
        console.log(response.list[0])
    })


}




