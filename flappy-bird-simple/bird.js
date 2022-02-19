const birdEl = document.querySelector("[data-bird]");
const SPEED = .55;
const JUMP_DURATION = 175;
let tSinceLast = Number.POSITIVE_INFINITY;

export function setupBird() {
    setTop(window.innerHeight / 2);
    document.removeEventListener("keydown", handleJump);
    document.addEventListener("keydown", handleJump);
};


export function updateBird(delta) {
    if (tSinceLast < JUMP_DURATION) {
        setTop(getTop() - SPEED * delta);
    } else {
        setTop(getTop() + SPEED * delta);
    }

    tSinceLast += delta
};

export function getBirdRect() {
    return birdEl.getBoundingClientRect();
}

function setTop(top) {
    birdEl.style.setProperty("--bird-top", top);
}

function getTop() {
    return parseFloat(getComputedStyle(birdEl).getPropertyValue("--bird-top"));
}

function handleJump(e) {
    if (e.keyCode !== 32) return;
    tSinceLast = 0;
}