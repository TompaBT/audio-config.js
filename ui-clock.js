import { state } from "./audio-config.js";

export function startClockUI() {

    function updateClock() {
        const h = String(state.time.hour).padStart(2, "0");
        const m = String(state.time.minute).padStart(2, "0");

        const d = state.time.day;
        const mo = state.time.month;

        document.getElementById("date").textContent = `${d}.${mo}. — ${h}:${m}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}
