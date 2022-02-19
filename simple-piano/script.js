const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
const WHITE = ['w', 'x', 'c', 'v', 'b', 'n', ','];
const BLACK = ['s', 'd', 'g', 'h', 'j'];


keys.forEach(key => {
    console.log(key);
    key.addEventListener('click', () => play(key));
});

document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key;
    const whiteIndex = WHITE.indexOf(key);
    const blackIndex = BLACK.indexOf(key);

    if (whiteIndex > -1) play(whiteKeys[whiteIndex]);
    if (blackIndex > -1) play(blackKeys[blackIndex]);
});

function play(key) {
    const audio = document.getElementById(key.dataset.note);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('active')

    audio.addEventListener('ended', () => {
        key.classList.remove('active');
    });
};