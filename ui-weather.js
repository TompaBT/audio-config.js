import { state } from "./audio-config.js";

export function startWeatherUI() {

    const ikoneVrijeme = {
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

    const ikoneSezona = {
        winter: "❄️",
        spring: "🌸",
        summer: "☀️",
        autumn: "🍂"
    };

    const prijevodSezona = {
        winter: "zima",
        spring: "proljeće",
        summer: "ljeto",
        autumn: "jesen"
    };

    function updateUI() {
        const temp = state.weather.temperature;
        const cond = state.weather.condition;
        const season = state.time.season;

        if (temp == null || !cond) return;

        document.getElementById("temp").textContent = temp;
        document.getElementById("weather").textContent = prijevodVrijeme[cond] || cond;
        document.getElementById("weatherIcon").textContent = ikoneVrijeme[cond] || "🌤️";

        document.getElementById("season").textContent = prijevodSezona[season] || season;
        document.getElementById("seasonIcon").textContent = ikoneSezona[season] || "";
    }

    updateUI();
    setInterval(updateUI, 2000);
}
