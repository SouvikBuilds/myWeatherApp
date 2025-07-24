document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton")
    const fault = document.querySelector(".fault")
    const details = document.querySelector(".details")
    const weatherData = document.querySelector(".weatherData")
    details.style.display = "none"
    weatherData.style.display = "none"

    async function getWeatherByCity() {
        const searchCity = document.getElementById("search-city").value.trim()
        if (searchCity === '') {
            fault.innerHTML = `<p>Please Enter City First</p>`
            fault.style.display = "block"
            return
        }
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=280a0a168aeb4a3496f30316251307&q=${searchCity}&aqi=yes`

        const response = await fetch(apiUrl)
        if (response.status === 404) {
            fault.innerHTML = `<p>Error At Fetching Data</p>`
            fault.style.display = "block"
            details.style.display = "none"
            weatherData.style.display = "none"
            return
        }

        if (!response.ok) {
            fault.innerHTML = `<p>City Not Found</p>`
            fault.style.display = "block"
            details.style.display = "none"
            weatherData.style.display = "none"
            return
        }
        const data = await response.json()

        const weatherImage = document.getElementById("weatherImage")
        weatherImage.src = data.current.condition.icon

        const cityName = document.querySelector(".cityName")
        cityName.innerHTML = `<h2>${data.location.name}</h2>`

        const temp = document.getElementById("temp")
        temp.innerHTML = `<p>${data.current.temp_c}°C</p>`

        const humidityData = document.querySelector(".humidityData")
        humidityData.innerHTML = `<h2>Humidity:</h2>
                        <p>${data.current.humidity}%</p>`

        const windData = document.querySelector(".windData")
        windData.innerHTML = `<h2>Wind:</h2>
                        <p id="wind">${data.current.wind_kph}km/h</p>`

        const uvIndexData = document.querySelector(".uvIndexData")
        uvIndexData.innerHTML = `<h2>UV Index:</h2>
                        <p id="uvIndex">${data.current.uv}</p>`

        details.style.display = "flex"
        weatherData.style.display = "flex"
        fault.style.display = "none"
    }
    searchButton.addEventListener("click", getWeatherByCity)
})
