const HOLE_HEIGHT = 180;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = .75;
const PIPE_WIDTH = 120;
let pipes = [];
let tSinceLast;
let score;

export function setupPipes() {
    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH);
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT);
    pipes.forEach(pipe => pipe.remove())
    tSinceLast = PIPE_INTERVAL;
    score = 0;
}


export function updatePipes(delta) {
    tSinceLast += delta;

    if (tSinceLast > PIPE_INTERVAL) {
        tSinceLast -= PIPE_INTERVAL;
        createPipe();
    }

    pipes.forEach(pipe => {

        if (pipe.left + PIPE_WIDTH < 0) {
            score++;
            return pipe.remove()
        }

        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}

export function getScore() {
    return score;
}

export function getPipeRects() {
    return pipes.flatMap(pipe => pipe.rects())
}

function createPipe() {
    const pipeEl = document.createElement("div");
    const topEl = createPipeSegment("top");
    const bottomEl = createPipeSegment("bottom");
    pipeEl.append(topEl);
    pipeEl.append(bottomEl);
    pipeEl.classList.add("pipe");
    pipeEl.style.setProperty("--hole-top",
        randomNumber(
            HOLE_HEIGHT * 1.5,
            window.innerHeight - HOLE_HEIGHT * 1.5
        )
    )

    const pipe = {
        get left() {
            return parseFloat(
                getComputedStyle(pipeEl).getPropertyValue("--pipe-left")
            )
        },
        set left(value) {
            pipeEl.style.setProperty("--pipe-left", value)
        },
        remove() {
            pipes = pipes.filter(p => p !== pipe)
            pipeEl.remove()
        },
        rects() {
            return [
                topEl.getBoundingClientRect(),
                bottomEl.getBoundingClientRect(),
            ]
        }
    }

    pipe.left = window.innerWidth;
    document.body.append(pipeEl);
    pipes.push(pipe);
    console.log("pipe created");
};

function createPipeSegment(position) {
    const segment = document.createElement("div")
    segment.classList.add("segment", position)
    return segment
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}