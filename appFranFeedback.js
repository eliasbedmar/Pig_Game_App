  /*
  YOUR 3 CHALLENGES
  Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row.
  After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score,
  so that they can change the predefined score of 100.
  (Hint: you can read that value with the .value property in JavaScript.
  This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now.
  The player looses his current score when one of them is a 1.
  (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
  */


var scores, roundScores, activePlayer;
var gamePlaying;

//Saving DOM nodes in constants

const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');
const diceDOM = document.querySelector(".dice");
const name0 = document.getElementById('name-0');
const name1 = document.getElementById('name-1');
const player0panel = document.querySelector('.player-0-panel');
const player1panel = document.querySelector('.player-1-panel');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');


init(); //initialise game.


btnNew.addEventListener('click',init); //Start new game

btnRoll.addEventListener('click', rollDice); //Roll dice

btnHold.addEventListener('click', holdBtn)


function init(){
  //Function is used to initialise game after pressing New Game button.

  scores = [0,0]; //Global scores
  roundScore = 0;
  activePlayer = 0; //As scores are kept in a zero-based array, active player will be 0 or 1


  //Setting initial scores to 0
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';

  //Re-setting UI to initial state
  diceDOM.style.display = "none";
  name0.textContent = "Player 1";
  name1.textContent = "Player 2";
  player0panel.classList.remove('winner');
  player1panel.classList.remove('winner');
  player0panel.classList.remove('active');
  player1panel.classList.remove('active');
  player0panel.classList.add('active');
  //The active class has been removed first from both and then added. This is to avoid duplication of classes.

  //Re-set game state variable to true.
  gamePlaying = true;

};

function changePlayer(){
  //Function changes player
  //change player
  (activePlayer===1) ? activePlayer=0: activePlayer=1;
  //set score to 0
  roundScore=0;
  //change UI - current scores to 0 and toggle between active pannels (CSS change)
  current0.textContent = '0';
  current1.textContent = '0';
  player0panel.classList.toggle('active');
  player1panel.classList.toggle('active');

  //hide dice (Changing CSS)
  diceDOM.style.display = "none";

};


function rollDice(){
  if (gamePlaying){

    var dice = numberGenerator();//Random integer 1-6

    updateDice(dice);

    addScore(dice);
  };
};

function numberGenerator(){
  //Function rolls dice based on a random number generator.
  return Math.floor(Math.random() * 6) + 1;
};

function updateDice(dice){
  //Function updates result by changing source of dice DOM
  var srcImage = "dice-"+dice+".png";
  diceDOM.style.display = 'block';
  diceDOM.src = srcImage;
};

function addScore(dice){
  //Update round(total) score IF the rolled number is not 1. Else, change player.
  if (dice !== 1){
    //Add score
    roundScore += dice;
    document.querySelector('#current-'+activePlayer).textContent = roundScore;
  } else {

    //Change player, ternary operator.
    changePlayer();
  };
};


function holdBtn(){
  //Function implements the hold button.
  if (gamePlaying){

    holdScores();

    if (scores[activePlayer]>=20){ //**Change to 100 once tested is complete.

      declareWinner();

    } else {

      changePlayer();
    };
  };
};

function holdScores(){
  //Add roundscore to global score. Set roundScore to 0 (re-set counter)
    scores[activePlayer]+=roundScore;

  //Update the UI for scores
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

};

function declareWinner(){
  //Change message and change UI
  document.querySelector('#name-'+activePlayer).textContent = "WINNER!";
  document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
  document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
  diceDOM.style.display = 'none';

  //Change state variable to indicate end of game
  gamePlaying = false;
};
