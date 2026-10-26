// Константы в начале файла
const INITIAL_LIVES = 3;
const PLAYERS = ["Mbappé", "Bellingham", "Haaland", "Yamal", "Pedri", "Saka"];

let lives = INITIAL_LIVES;
let streak = 0;
let currentVal = 50;

// Элементы DOM
const livesEl = document.getElementById("lives");
const streakEl = document.getElementById("streak");
const nameEl = document.getElementById("player-name");
const valEl = document.getElementById("player-val");
const msgEl = document.getElementById("msg");

function getRandomVal() {
    return Math.floor(Math.random() * (150 - 20 + 1)) + 20; // от 20 до 150
}

function nextTurn() {
    nameEl.textContent = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
    valEl.textContent = `${currentVal} млн €`;
    livesEl.textContent = lives;
    streakEl.textContent = streak;
}

function makeGuess(type) {
    const nextVal = getRandomVal();
    const isCorrect = (type === "higher" && nextVal >= currentVal) || 
                      (type === "lower" && nextVal <= currentVal);

    if (isCorrect) {
        streak++;
        msgEl.textContent = `Правильно! Следующий был ${nextVal} млн €`;
        msgEl.className = "alert alert-success";
    } else {
        lives--;
        msgEl.textContent = `Ошибка! Следующий был ${nextVal} млн €`;
        msgEl.className = "alert alert-danger";
    }
    msgEl.classList.remove("d-none");

    if (lives <= 0) {
        msgEl.textContent = `Игра окончена! Финальный счет: ${streak}`;
        document.getElementById("btn-higher").disabled = true;
        document.getElementById("btn-lower").disabled = true;
        document.getElementById("btn-reset").classList.remove("d-none");
    } else {
        currentVal = nextVal;
        nextTurn();
    }
}

document.getElementById("btn-higher").addEventListener("click", () => makeGuess("higher"));
document.getElementById("btn-lower").addEventListener("click", () => makeGuess("lower"));
document.getElementById("btn-reset").addEventListener("click", () => {
    lives = INITIAL_LIVES;
    streak = 0;
    currentVal = 50;
    document.getElementById("btn-higher").disabled = false;
    document.getElementById("btn-lower").disabled = false;
    document.getElementById("btn-reset").classList.add("d-none");
    msgEl.classList.add("d-none");
    nextTurn();
});

nextTurn();