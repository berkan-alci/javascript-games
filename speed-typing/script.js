const timer = document.querySelector("[data-timer]");
const quote = document.querySelector("[data-quote]");
const input = document.querySelector("[data-input]");

const API_URL = 'http://api.quotable.io/random';


input.addEventListener('input', () => {
    const quoteArray = quote.querySelectorAll('span');
    const valueArray = input.value.split('');
    let check = true;

    quoteArray.forEach((span, i) => {
        const char = valueArray[i];
        if (char == null) {
            span.classList.remove('correct');
            span.classList.remove('wrong');
            check = false;
        } else if (char === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('wrong');
        } else {
            span.classList.remove('correct');
            span.classList.add('wrong');
            check = false;
        }
    })

    if (check) renderQuote();
});

let startTime;
function startTimer() {
    timer.innerText = 0;
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTime();
    }, 1000)
};

function getTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function getQuote() {
    return fetch(API_URL)
        .then(res => res.json())
        .then(data => data.content)
};

async function renderQuote() {
    const q = await getQuote();
    quote.innerHTML = '';
    q.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quote.appendChild(charSpan);
    })
    input.value = null;
    startTimer();
};

renderQuote();


