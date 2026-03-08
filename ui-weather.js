import { state } from "./audio-config.js";

export function startWeatherUI() {

    const ikone = {
        clear: "☀️",
        clouds: "☁️",
        rain: "🌧️",
        snow: "❄️",
        mist: "🌫️",
        fog: "🌫️",
        drizzle: "🌦️",
        thunderstorm: "⛈️"
    };

    const prijevodVrijeme = {
        clear: "vedro",
        clouds: "oblačno",
        rain: "kiša",
        snow: "snijeg",
        mist: "magla",
        fog: "magla",
        drizzle: "rosulja",
        thunderstorm: "grmljavina"
    };

    function updateUI() {
        const temp = state.weather.temperature;
        const cond = state.weather.condition;
        const season = state.time.season;

        if (temp == null || !cond) return;

        document.getElementById("temp").textContent = temp;
        document.getElementById("weather").textContent = prijevodVrijeme[cond] || cond;
        document.getElementById("season").textContent = season;
        document.getElementById("weatherIcon").textContent = ikone[cond] || "🌤️";
    }

    updateUI();
    setInterval(updateUI, 2000);
}
