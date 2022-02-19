import { updateBird, setupBird, getBirdRect } from './bird.js';
import { updatePipes, setupPipes, getScore, getPipeRects } from './pipe.js';

document.addEventListener("keypress", handleStart, { once: true })
const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");

let prevT;
function updateLoop(t) {
    if (prevT == null) {
        prevT = t;
        window.requestAnimationFrame(updateLoop);
        return;
    }
    const delta = t - prevT
    updateBird(delta);
    updatePipes(delta);
    if (checkLose()) return handleLose();

    prevT = t;
    window.requestAnimationFrame(updateLoop);
};


function handleStart() {
    title.classList.add("hide");
    setupBird();
    setupPipes();
    prevT = null;
    window.requestAnimationFrame(updateLoop);
};

function checkLose() {
    const hitbox = getBirdRect();
    const inside = getPipeRects().some(rect => collision(hitbox, rect))
    const outside = hitbox.top < 0 || hitbox.bottom > window.innerHeight;
    return outside || inside;
}

function handleLose() {
    setTimeout(() => {
        title.classList.remove("hide");
        subtitle.classList.remove("hide");
        subtitle.textContent = `${getScore()} Pipes`;
        document.addEventListener("keypress", handleStart, { once: true })
    }, 250)

};

function collision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}