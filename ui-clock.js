// ===============================
//  HRVATSKI DRŽAVNI PRAZNICI
// ===============================

const fixedHolidays = [
    "1-1",   // Nova godina
    "1-6",   // Sveta tri kralja
    "5-1",   // Praznik rada
    "5-30",  // Dan državnosti
    "6-22",  // Dan antifašističke borbe
    "8-5",   // Dan pobjede i domovinske zahvalnosti
    "8-15",  // Velika Gospa
    "11-1",  // Svi sveti
    "11-18", // Dan sjećanja
    "12-25", // Božić
    "12-26"  // Sveti Stjepan
];

// Izračun Uskrsa
function getEasterDate(year) {
    const f = Math.floor;
    const G = year % 19;
    const C = f(year / 100);
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
    const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
    const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
    const L = I - J;
    const month = 3 + f((L + 40) / 44);
    const day = L + 28 - 31 * f(month / 4);
    return { day, month };
}

// Određivanje boje datuma
function getDateColor(day, month, year) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay(); // 0 = nedjelja, 6 = subota

    if (dayOfWeek === 0) return "red";   // nedjelja
    if (dayOfWeek === 6) return "blue";  // subota

    const key = `${day}-${month}`;
    if (fixedHolidays.includes(key)) return "green";

    const easter = getEasterDate(year);
    const easterMonday = new Date(year, easter.month - 1, easter.day + 1);

    if (day === easter.day && month === easter.month) return "green";
    if (day === easterMonday.getDate() && month === easterMonday.getMonth() + 1) return "green";

    return "white";
}

// ===============================
//  BING STYLE CLOCK UI
// ===============================

export function startClockUI() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const days = ["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"];
    const months = ["Siječnja","Veljače","Ožujka","Travnja","Svibnja","Lipnja","Srpnja","Kolovoza","Rujna","Listopada","Studenoga","Prosinca"];

    // Bing style elementi
    const timeEl = document.querySelector(".clock-time");
    const dateEl = document.querySelector(".clock-date");

    // Vrijeme
    timeEl.textContent = `${hh}:${mm}`;

    // Datum
    dateEl.textContent = `${days[now.getDay()]}, ${day}. ${months[now.getMonth()]} ${year}.`;

    // Boja datuma (tvoja logika)
    dateEl.style.color = getDateColor(day, month, year);
}

}
