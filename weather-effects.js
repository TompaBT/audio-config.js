import { state } from "./audio-config.js";

// ===============================
//  WEATHER EFFECTS – MODUL 5
// ===============================

// Kreiraj canvas
const canvas = document.createElement("canvas");
canvas.id = "weatherCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// ===============================
//  KIŠA
// ===============================

const rainDrops = [];

function createRain() {
    for (let i = 0; i < 150; i++) {
        rainDrops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: 10 + Math.random() * 20,
            speed: 4 + Math.random() * 4
        });
    }
}

function drawRain() {
    ctx.strokeStyle = "rgba(180,180,255,0.6)";
    ctx.lineWidth = 2;

    rainDrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
        }
    });
}

// ===============================
//  SNIJEG
// ===============================

const snowFlakes = [];

function createSnow() {
    for (let i = 0; i < 120; i++) {
        snowFlakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1 + Math.random() * 3,
            speed: 0.5 + Math.random() * 1.5
        });
    }
}

function drawSnow() {
    ctx.fillStyle = "rgba(255,255,255,0.9)";

    snowFlakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();

        flake.y += flake.speed;

        if (flake.y > height) {
            flake.y = -10;
            flake.x = Math.random() * width;
        }
    });
}

// ===============================
//  GLAVNA PETLJA
// ===============================

export function startWeatherEffects() {
    createRain();
    createSnow();

    function animate() {
        ctx.clearRect(0, 0, width, height);

        if (state.weather.condition?.includes("rain")) {
            drawRain();
        }

        if (state.weather.condition?.includes("snow")) {
            drawSnow();
        }

        requestAnimationFrame(animate);
    }

    animate();
}
