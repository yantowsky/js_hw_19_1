const userApi = prompt('Enter your API key for OpenWeather');
const userCity = prompt('Enter your city name', 'Dnipro');

const arrNameDaysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const arrNameMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const nameCity = document.querySelector('.weather-city-name');
const fullDate = document.getElementById('date');
const dayWeek = document.getElementById('day-week');

const timeNow = document.getElementById('time');

const imgWeatherState = document.querySelector('.weather-state-img');
const iconWeather = document.createElement('IMG');
const temp = document.getElementById('temp');
const description = document.getElementById('description');

const feelsLike = document.getElementById('feels_like');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const windSpeed = document.getElementById('wind_speed');

const weatherUpdateBtn = document.querySelector('.weather-update-btn');

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${userApi}`;

function updateWeather() {
    const dateUTCInMs = new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000);
    let dateNowForCity;
    let formHour;
    let formMin;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            nameCity.textContent = data.name;
            dateNowForCity = new Date(dateUTCInMs + (data.timezone * 1000));
            fullDate.textContent = `${dateNowForCity.getDate()} ${arrNameMonths[dateNowForCity.getMonth()]} ${dateNowForCity.getFullYear()}`;
            formHour = dateNowForCity.getHours() < 10 ? '0' + dateNowForCity.getHours() : dateNowForCity.getHours();
            formMin = dateNowForCity.getMinutes() < 10 ? '0' + dateNowForCity.getMinutes() : dateNowForCity.getMinutes();
            timeNow.textContent = formHour + ":" + formMin;
            dayWeek.textContent = arrNameDaysWeek[dateNowForCity.getDay()];
            temp.textContent = Math.round(data.main.temp) + '°C';
            description.textContent = data.weather[0].description;
            iconWeather.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
            iconWeather.setAttribute('alt', data.weather[0].main);
            imgWeatherState.appendChild(iconWeather);
            feelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
            humidity.textContent = `Humidity ${data.main.humidity}%`;
            pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;
        })
        .catch(error => console.error('Помилка:', error));
}
updateWeather();

weatherUpdateBtn.addEventListener('click', function () {
    updateWeather();
})