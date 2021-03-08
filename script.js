const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>Söylediniz: </div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
    const num = +msg;

    // Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>Geçerli sayı değil</div>';
        return;
    }

    // Check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Sayı 1 ile 100 arasında olmalıdır</div>';
        return;
    }

    // Check number
    if (num === randomNum) {
        document.body.innerHTML = `
      <h2>Tebrikler! Sayıyı tahmin ettiniz.<br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Tekrar Oyna</button>
    `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>Aşağı</div>';
    } else {
        msgEl.innerHTML += '<div>Yukarı</div>';
    }
}

// Generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});