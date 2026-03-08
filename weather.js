import { apiKey, city, state } from "./audio-config.js";

// ===============================
//  WEATHER – MODUL 2
// ===============================

// Dohvat vremena iz OpenWeather API-ja
export async function fetchWeather() {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hr`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.weather || !data.weather[0]) return;

        const condition = data.weather[0].main.toLowerCase();
        const temperature = Math.round(data.main.temp);

        state.weather.temperature = temperature;
        state.weather.condition = condition;

        // Kiša
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

// Automatsko osvježavanje svakih 60 sekundi
export function startWeatherLoop() {
    fetchWeather();
    setInterval(fetchWeather, 60 * 1000);
}
