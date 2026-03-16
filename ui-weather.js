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
    //  EMOJI IKONE
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

    iconEl.textContent = ikoneVrijeme[cond] || "🌤️";
    tempEl.textContent = `${Math.round(temp)}°`;
    descEl.textContent = prijevodVrijeme[cond] || cond;

    // Lokacija – uvijek Baranja
    locEl.textContent = "Baranja";

    extraEl.textContent = `${prijevodSezona[season]} ${ikoneSezona[season]}`;

    // ===========================
    //  PROMJENA BOJE OKVIRA
    // ===========================
    const box = document.querySelector(".weather-box");
    if (box) {
        box.classList.remove("winter", "spring", "summer", "autumn");
        box.classList.add(season);
    }

    // ===========================
    //  3-DNEVNA PROGNOZA
    // ===========================
    if (state.weather.forecastData) {
        updateForecast(state.weather.forecastData);
    }
}

// ======================================
//  FUNKCIJA ZA 3-DNEVNU PROGNOZU
// ======================================
function updateForecast(data) {
    const days = document.querySelectorAll(".forecast-day");

    const list = data.list;
    const grouped = {};

    list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.getDate();
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(item);
    });

    const keys = Object.keys(grouped).slice(1, 4);

    keys.forEach((dayKey, i) => {
        const items = grouped[dayKey];

        const avgTemp = Math.round(
            items.reduce((sum, item) => sum + item.main.temp, 0) / items.length
        );

        const icon = items[0].weather[0].icon;
        const cond = items[0].weather[0].main.toLowerCase();

        const date = new Date(items[0].dt * 1000);
        const dayName = date.toLocaleDateString("hr-HR", { weekday: "short" });

        days[i].querySelector(".f-day-name").textContent = dayName;
        days[i].querySelector(".f-day-icon").textContent = getEmoji(icon);
        days[i].querySelector(".f-day-temp").textContent = `${avgTemp}°`;
    });
}

// ======================================
//  EMOJI FUNKCIJA
// ======================================
function getEmoji(icon) {
    if (icon.includes("01")) return "☀️";
    if (icon.includes("02")) return "🌤️";
    if (icon.includes("03")) return "⛅";
    if (icon.includes("04")) return "☁️";
    if (icon.includes("09")) return "🌧️";
    if (icon.includes("10")) return "🌦️";
    if (icon.includes("11")) return "⛈️";
    if (icon.includes("13")) return "❄️";
    if (icon.includes("50")) return "🌫️";
    return "⛅";
}
