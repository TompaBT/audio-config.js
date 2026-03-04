import { sounds, state } from "./audio-config.js";
import { fetchWeather } from "./weather.js";
import { updateTime, checkTimeEvents } from "./time.js";

// ===============================
//  AUDIO ENGINE – MODUL 4
// ===============================

// Glavni audio element
export const audioElement = new Audio();
audioElement.loop = true;

// Uključivanje / isključivanje zvuka
export function toggleUserSound() {
    state.audio.userMuted = !state.audio.userMuted;

    if (state.audio.userMuted) {
        audioElement.pause();
    } else {
        audioElement.play().catch(() => {});
    }

    return !state.audio.userMuted; // vraća true = zvuk uključen
}

// Promjena zvuka
export function changeSound(newSound) {
    if (state.audio.current === newSound) return;

    state.audio.current = newSound;
    audioElement.src = newSound;
    audioElement.currentTime = 0;

    if (!state.audio.userMuted) {
        audioElement.play().catch(() => {});
    }
}

// Logika za vrijeme (kiša, snijeg, grmljavina)
function handleWeather() {
    const condition = state.weather.condition;

    if (!condition) return;

    if (condition.includes("thunder")) {
        changeSound(sounds.grmljavina);
        return;
    }

    if (condition.includes("rain")) {
        changeSound(sounds.kisa);
        return;
    }

    if (condition.includes("snow")) {
        changeSound(sounds.snijeg);
        return;
    }

    // Ako nema kiše ni snijega → vrati normalne zvukove
    if (!state.audio.frogsActive) {
        changeSound(sounds.ptice);
    }
}

// Glavna petlja zvuka
export function startAudioEngine() {
    setInterval(() => {
        updateTime();
        fetchWeather();
        handleWeather();
        checkTimeEvents(audioElement, sounds, changeSound);
    }, 5000);
}
