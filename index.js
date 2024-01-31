const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('curent--0');
const current1El = document.getElementById('curent--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--newgame');

let curentNumber = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;

const init = function () {
  curentNumber = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = () => {
  document.getElementById(`curent--${activePlayer}`).textContent = 0;
  curentNumber = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

btnRollDice.addEventListener('click', function () {
  if (playing) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice${randomNumber}.svg`;
    diceEl.classList.remove('hidden');

    if (randomNumber !== 1) {
      curentNumber += randomNumber;
      document.getElementById(`curent--${activePlayer}`).textContent =
        curentNumber;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += curentNumber;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
