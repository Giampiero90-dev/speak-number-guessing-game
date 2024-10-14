const msgEl = document.querySelector('.msg');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

function checkNumber(msg) {
    const num = +msg;

    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }
    
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
        return;
    }
    
    if (num === randomNum) {
        document.body.innerHTML = `
            <h2>You got it! It was ${num}</h2>
            <h1>Congrats!</h1>
            <img src="img/win.gif">
            <p>Play again?</p>
            <button id="play-again" class="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>GO LOWER</div>`;
    } else {
        msgEl.innerHTML += `<div>GO HIGHER</div>`;
    }
}

function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
}

// Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id === 'play-again') {
        window.location.reload();
    }
});
