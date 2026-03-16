import { apiKey, lat, lon, state } from "./audio-config.js";

// ===============================
//  DOHVAT TRENUTNOG VREMENA
// ===============================
export async function fetchWeather() {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=hr`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.weather || !data.weather[0]) return;

        const condition = data.weather[0].main.toLowerCase();
        const temperature = Math.round(data.main.temp);

        state.weather.temperature = temperature;
        state.weather.condition = condition;

        // Kiša logika
        if (condition.includes("rain")) {
            state.weather.wasRaining = state.weather.isRaining;
            state.weather.isRaining = true;
            state.weather.lastRainTime = Date.now();
        } else {
            state.weather.wasRaining = state.weather.isRaining;
            state.weather.isRaining = false;
        }

    } catch (error) {
        console.error("Greška pri dohvaćanju vremena:", error);
    }
}

// ===============================
//  DOHVAT 5-DNEVNE PROGNOZE
// ===============================
export async function fetchForecast() {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=hr`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.list) return;

        // Spremamo forecast u state
        state.weather.forecastData = data;

    } catch (error) {
        console.error("Greška pri dohvaćanju prognoze:", error);
    }
}

// ===============================
//  AUTOMATSKO OSVJEŽAVANJE
// ===============================
export function startWeatherLoop() {
    fetchWeather();
    fetchForecast(); // dohvat prognoze odmah

    setInterval(fetchWeather, 60 * 1000);      // svake minute
    setInterval(fetchForecast, 10 * 60 * 1000); // svakih 10 minuta
}
