passwordEl = document.querySelector("[data-password]");
cRange = document.getElementById("char-range");
cNum = document.getElementById("char-number");
form = document.getElementById("password-form");
upperBool = document.getElementById("uppercase");
numBool = document.getElementById("numbers");
symBool = document.getElementById("numbers");

const UPPER_CODES = generateArray(65, 90);
const LOWER_CODES = generateArray(97, 122);
const NUM_CODES = generateArray(48, 57);
const SYM_CODES = generateArray(33, 47)
    .concat(generateArray(58, 64)
        .concat(generateArray(91, 96)
            .concat(generateArray(123, 126)
            )
        )
    );

cRange.addEventListener('input', syncChar);
cNum.addEventListener('input', syncChar);
form.addEventListener('submit', e => {
    e.preventDefault();
    const cAmount = cNum.value;
    const inclUpper = upperBool.checked;
    const inclNum = numBool.checked;
    const inclSym = symBool.checked;

    const pass = generatePass(cAmount, inclUpper, inclNum, inclSym)
    passwordEl.innerText = pass;
});


function generatePass(cAmount, inclUpper, inclNum, inclSym) {
    let charCodes = LOWER_CODES;
    if (inclUpper) { charCodes = charCodes.concat(UPPER_CODES); }
    if (inclNum) { charCodes = charCodes.concat(NUM_CODES); }
    if (inclSym) { charCodes = charCodes.concat(SYM_CODES); }

    const chars = [];
    for (let i = 0; i <= cAmount; i++) {
        const charCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        chars.push(String.fromCharCode(charCode));
    }

    return chars.join('');

}

function generateArray(low, high) {
    array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    };
    return array;
}

function syncChar(e) {
    const value = e.target.value;
    cRange.value = value;
    cNum.value = value;
}