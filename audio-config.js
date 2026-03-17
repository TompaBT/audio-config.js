// ===============================
//  AUDIO CONFIG – MODUL 1
// ===============================

// API PODACI
export const apiKey = "";

// Precizne koordinate Belog Manastira
export const lat = 45.77;
export const lon = 18.60;

// ===============================
//  LINKOVI ZVUKOVA
// ===============================

export const sounds = {
    zabe: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/Zvuk%20zabe.mp3",
    cvrcak: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/cvrcak.mp3",
    nocni: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/noc-zvono-lavez.mp3",
    pijetao: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/pijetao-jutro.mp3",
    grmljavina: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/grmljavina.mp3",
    kisa: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/kisa.mp3",
    snijeg: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/zimski-vjetar1.mp3",
    podne: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/zvono-podne.mp3",
    ptice: "https://raw.githubusercontent.com/TompaBT/baranja-audio/main/mixkit-forest-birds-ambience-1210.mp3"
};

// ===============================
//  GLOBALNO STANJE SUSTAVA
// ===============================

export const state = {
    weather: {
        condition: null,
        temperature: null,
        lastRainTime: null,
        isRaining: false,
        wasRaining: false
    },

    audio: {
        current: null,
        lastNormal: null,
        frogsTimer: null,
        frogsActive: false,
        userMuted: false
    },

    time: {
        hour: null,
        minute: null,
        day: null,
        month: null,
        season: null
    }
};

// ===============================
//  FUNKCIJE ZA GODIŠNJA DOBA
// ===============================

export function getSeason(month) {
    if (month === 12 || month === 1 || month === 2) return "winter";
    if (month === 3 || month === 4 || month === 5) return "spring";
    if (month === 6 || month === 7 || month === 8) return "summer";
    if (month === 9 || month === 10 || month === 11) return "autumn";
}

// ===============================
//  FUNKCIJA ZA PROMJENU ZVUKA
// ===============================

export function changeSound(audioElement, newSound) {
    if (state.audio.current === newSound) return;

    state.audio.current = newSound;
    audioElement.src = newSound;
    audioElement.currentTime = 0;

    if (!state.audio.userMuted) {
        audioElement.play().catch(() => {});
    }
}

// ===============================
//  FUNKCIJA ZA POKRETANJE ZABA
// ===============================

export function startFrogs(audioElement) {
    if (state.time.season === "winter") return;

    state.audio.frogsActive = true;
    state.audio.lastNormal = state.audio.current;

    changeSound(audioElement, sounds.zabe);

    clearTimeout(state.audio.frogsTimer);

    state.audio.frogsTimer = setTimeout(() => {
        state.audio.frogsActive = false;
        if (state.audio.lastNormal) {
            changeSound(audioElement, state.audio.lastNormal);
        }
    }, 3 * 60 * 1000);
}
