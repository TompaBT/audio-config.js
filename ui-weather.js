import { state } from "./audio-config.js";

export function startWeatherUI() {
    updateUI();
    setInterval(updateUI, 2000);
}

function updateUI() {
    const temp = state.weather.temperature;
    const cond = state.weather.condition;
    const season = state.time.season;

    if (temp == null || !cond) return;

    // ===========================
    //  EMOJI IKONE (TVOJ SUSTAV)
    // ===========================
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
        clear: "Vedro",
        clouds: "Oblačno",
        rain: "Kiša",
        snow: "Snijeg",
        mist: "Magla",
        fog: "Magla",
        drizzle: "Rosulja",
        thunderstorm: "Grmljavina"
    };

    const ikoneSezona = {
        winter: "❄️",
        spring: "🌸",
        summer: "☀️",
        autumn: "🍂"
    };

    const prijevodSezona = {
        winter: "Zima",
        spring: "Proljeće",
        summer: "Ljeto",
        autumn: "Jesen"
    };

    // ===========================
    //  BING STYLE ELEMENTI
    // ===========================
    const iconEl = document.querySelector(".weather-icon");
    const tempEl = document.querySelector(".weather-temp");
    const descEl = document.querySelector(".weather-desc");
    const locEl = document.querySelector(".weather-location");
    const extraEl = document.querySelector(".weather-extra");

    // Ikona vremena (emoji)
    iconEl.textContent = ikoneVrijeme[cond] || "🌤️";

    // Temperatura
    tempEl.textContent = `${Math.round(temp)}°`;

    // Opis vremena
    descEl.textContent = prijevodVrijeme[cond] || cond;

    // Lokacija (fiksno ili možeš staviti state.time.location)
    locEl.textContent = "Beli Manastir";

    // Dodatne informacije
    extraEl.textContent = `${prijevodSezona[season]} ${ikoneSezona[season]}`;

    // ===========================
    //  PROMJENA BOJE OKVIRA PO SEZONI (TVOJ SUSTAV)
    // ===========================
    const box = document.querySelector(".weather-box");
    if (box) {
        box.classList.remove("winter", "spring", "summer", "autumn");
        box.classList.add(season);
    }

    // ===========================
    //  3-DNEVNA PROGNOZA (BING STYLE)
    // ===========================
    if (state.weather.forecast) {
        const days = document.querySelectorAll(".forecast-day");

        for (let i = 0; i < 3; i++) {
            const f = state.weather.forecast[i];
            if (!f) continue;

            days[i].querySelector(".f-day-name").textContent = f.day;
            days[i].querySelector(".f-day-icon").textContent = ikoneVrijeme[f.condition] || "🌤️";
            days[i].querySelector(".f-day-temp").textContent = `${Math.round(f.temp)}°`;
        }
    }
}
