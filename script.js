'use strict';

// GETTING SCORE ELEMENTS
const score0Ele = document.getElementById('score--0');
const score1Ele = document.getElementById('score--1');
const currentScoreP0Ele = document.getElementById('current--0');
const currentScoreP1Ele = document.getElementById('current--1');

// GETTING BUTTON ELEMENTS
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');

// GETTING OTHER ELEMENTS
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');

// SETTING START CONDITIONS
score0Ele.textContent = 0;
score1Ele.textContent = 0;
diceImg.classList.add('hidden');
let score0 = 0;
let score1 = 0;

// STARTING A NEW GAME
function newGame() {
  score0 = 0;
  score1 = 0;
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  currentScoreP0Ele.textContent = 0;
  currentScoreP1Ele.textContent = 0;
  btnRollDice.disabled = false;
  btnHoldScore.disabled = false;
  diceImg.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  if (player1.classList.contains('player--active')) {
    switchPlayer();
  }
}

// PLAYER SWITCH FUNCTION
function switchPlayer() {
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
}

// ROLLING THE DICE
function rollDice() {
  const dice = Math.round(Math.random() * 5 + 1);
  diceImg.src = `dice-${dice}.png`;
  diceImg.classList.remove('hidden');

  // SWITCH PLAYER IF DICE ROLLED IS 1
  if (dice === 1) {
    if (player0.classList.contains('player--active')) {
      currentScoreP0Ele.textContent = 0;
      score0 = 0;
    } else {
      currentScoreP1Ele.textContent = 0;
      score1 = 0;
    }
    switchPlayer();
  }

  // INCREMENT SCORE FOR PLAYER 1 IF DICE ROLLED IS NOT 1
  if (player0.classList.contains('player--active')) {
    score0 += dice;
    if (Number(score0Ele.textContent) + score0 >= 100) {
      player0.classList.add('player--winner');
      diceImg.classList.add('hidden');
      score0Ele.textContent = 'WON';
      btnRollDice.disabled = true;
      btnHoldScore.disabled = true;
    }
    currentScoreP0Ele.textContent = score0;
  }

  // INCREMENT SCORE FOR PLAYER 2 IF DICE ROLLED IS NOT 1
  if (player1.classList.contains('player--active')) {
    score1 += dice;
    if (Number(score1Ele.textContent) + score1 >= 100) {
      player1.classList.add('player--winner');
      diceImg.classList.add('hidden');
      score1Ele.textContent = 'WON';
      btnRollDice.disabled = true;
      btnHoldScore.disabled = true;
    }
    currentScoreP1Ele.textContent = score1;
  }
}

// HOLD SCORE FUNCTION
function holdScore() {
  if (player0.classList.contains('player--active')) {
    score0Ele.textContent =
      Number(score0Ele.textContent) + Number(currentScoreP0Ele.textContent);
    currentScoreP0Ele.textContent = 0;
    score0 = 0;
  } else {
    score1Ele.textContent =
      Number(score1Ele.textContent) + Number(currentScoreP1Ele.textContent);
    currentScoreP1Ele.textContent = 0;
    score1 = 0;
  }
  switchPlayer();
}

btnRollDice.addEventListener('click', rollDice);
btnHoldScore.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', newGame);
