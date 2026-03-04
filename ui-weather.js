import { state } from "./audio-config.js";

export function startWeatherUI() {
    function updateUI() {
        const el = document.getElementById("weatherDisplay");
        if (!el) return;

        const temp = state.weather.temperature;
        const cond = state.weather.condition;

        if (temp == null || !cond) {
            el.innerHTML = "Učitavanje vremena...";
            return;
        }

        el.innerHTML = `Temperatura: ${temp}°C | Vrijeme: ${cond}`;
    }

    updateUI();
    setInterval(updateUI, 2000);
}
