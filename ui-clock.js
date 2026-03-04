import { state } from "./audio-config.js";

export function startClockUI() {
    function updateClock() {
        const el = document.getElementById("clockBox");
        if (!el) return;

        const h = String(state.time.hour).padStart(2, "0");
        const m = String(state.time.minute).padStart(2, "0");

        const d = state.time.day;
        const mo = state.time.month;
        const season = state.time.season;

        el.innerHTML = `${d}.${mo}. — ${h}:${m}<br>Sezona: ${season}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}
