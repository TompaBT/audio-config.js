import { state, getSeason } from "./audio-config.js";

// ===============================
//  TIME – MODUL 3
// ===============================

// Ažuriranje vremena
export function updateTime() {
    const now = new Date();

    state.time.hour = now.getHours();
    state.time.minute = now.getMinutes();
    state.time.day = now.getDate();
    state.time.month = now.getMonth() + 1;
    state.time.season = getSeason(state.time.month);
}

// Automatsko osvježavanje svakih 30 sekundi
export function startTimeLoop() {
    updateTime();
    setInterval(updateTime, 30 * 1000);
}

// Provjera posebnih događaja
export function checkTimeEvents(audioElement, sounds, changeSound) {
    const hour = state.time.hour;

    // Pijetao ujutro (6:00 – 7:00)
    if (hour === 6 && !state.audio.frogsActive) {
        changeSound(audioElement, sounds.pijetao);
    }

    // Podnevno zvono (12:00)
    if (hour === 12 && state.time.minute === 0) {
        changeSound(audioElement, sounds.podne);
    }

    // Noćni zvukovi (22:00 – 5:00)
    if (hour >= 22 || hour < 5) {
        changeSound(audioElement, sounds.nocni);
    }
}
