import { toggleUserSound } from "./audio-engine.js";

export function connectSoundButton() {
    const btn = document.getElementById("soundToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const enabled = toggleUserSound();
        btn.innerText = enabled ? "Isključi zvuk vremena" : "Uključi zvuk vremena";
    });
}
