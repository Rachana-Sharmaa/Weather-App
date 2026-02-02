const apiKey = '2e29d537290e633660a4f9f238e1abcc';

async function fetchWeather() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('weatherDescription').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.main.wind}kph`;
    document.getElementById('weatherInfo').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                console.error(error.message);
            }
        });
    }
});
