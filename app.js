/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Learning Objectives:
-Create fundamental (game) variables
-Generate random number
-Manipulate DOM
-Read from DOM
-Change CSS styles
*/

//Creation of scores, current active player, dice(random number),

var scores, roundScores, activePlayer;
var gamePlaying;

init(); //initialise game.

//dice = Math.floor(Math.random() * 6) + 1;//Random integer 1-6

//Select any element from DOM (document) HTML/CSS with querySelector
//querySelector('#idname') - for IDs
//querySelector('.classname') - for class (note that it selects ONLY the first instance)
//querySelector can be a setter (when it changes the queried HTML element), or a getter (when it reads only)
//querySelector to change CSS:
//querySelector('.classname').style.propertyName = 'newValue';
//Alternative to query Selector, for ids: document.getElementbyID(''idname'). **CAN BRING ABOUT ISSUES! WITH changing DOM...



//Change of plain text within document - .textContent =
//document.querySelector('#current-' + activePlayer).textContent = dice; //Type coertion makes conveting to string not needed

//Change of HTML text within document - .innerHTML = [String]
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>';

//var x = document.querySelector("#score-1").innerHTML;
//console.log(x);

function init(){
  scores = [0,0]; //Global scores
  roundScore = 0;
  activePlayer = 0; //As scores are kept in a zero-based array, active player will be 0 or 1


  //Setting initial scores to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //Re-setting UI to initial state
  document.querySelector(".dice").style.display = "none";
  document.getElementById('name-0').textContent = "Player 1";
  document.getElementById('name-1').textContent = "Player 2";
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  //The active class has been removed first from both and then added. This is to avoid duplication of classes.

  //Re-set game state variable to true.
  gamePlaying = true;

};


//Changing player:
function changePlayer(){
  //change player
  (activePlayer===1) ? activePlayer=0: activePlayer=1;
  //set score to 0
  roundScore=0;
  //change UI - current scores to 0 and toggle between active pannels (CSS change)
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //hide dice (Changing CSS)
  document.querySelector(".dice").style.display = "none";

};

document.querySelector('.btn-new').addEventListener('click',init); //Callback functions DO NOT NEED BRACKETS !!!

/*
**New Lecture (Events and event handling):
-How to set up an event handler
-What a callback function is
-What an anonymous function is
-Another way to select elements by ID
-How to change the image in an <img> element.
*/

/*
**New lecture (point 3 of event handler onwards)
-Ternary Operator
-Add, remove, toggle HTML classes
*/


//Event Handler
//Add Event Listener to element in which event will happen - 'Roll dice'
//querySelector(...).addEventListener(triggerEvent, function[usually anonymous])

//Callback function - called by another function
//e.g. using this inside event handler - function btn(){
  //Do something.
//}
//Anonymous function - cannot be reused, hasn't got a function. Useful for event handlers. See event handler.

document.querySelector('.btn-roll').addEventListener('click', function(){
  if (gamePlaying===true){
    //1.Random number generator
    var dice = Math.floor(Math.random() * 6) + 1;//Random integer 1-6

    //2.Display result by changing source
    var diceDOM = document.querySelector('.dice');
    var srcImage = "dice-"+dice+".png";
    diceDOM.style.display = 'block';
    diceDOM.src = srcImage;

    //3.Update round(total) score IF the rolled number is not 1. Change player.

    if (dice !== 1){
      //Add score
      roundScore += dice;
      document.querySelector('#current-'+activePlayer).textContent = roundScore;
    } else {

      //Change player, ternary operator.
      changePlayer();

      //Change style of app (player 1/2). Background to active class. Player name to active player name class.
      //Remove active class from current player and add to other player. Doesn't work.
      //document.querySelector('.player-0-panel').classList.remove('active');
      //document.querySelector('.player-1-panel').classList.add('active');
      //For this to work, we'd have to do complex if/else with add/remove, like a switch.

      //We use toggle, to turn on and off a class.
  };
}; //**This only works when if is inside the event listener - why not the other way around???
  });

/*
**New lecture (after point 3 of event handler) - HOLD
-Use of functions to correctly apply DRY principle
-How to think about the game logic like a programmer
*/


document.querySelector('.btn-hold').addEventListener('click',function(){

if (gamePlaying===true){
  //Add roundscore to global score. Set roundScore to 0 (re-set counter)
    scores[activePlayer]+=roundScore;

  //Update the UI for scores
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

  //Check if player won the game. If so, display message and change UI. Else - change player.
  if (scores[activePlayer]>=20){ //**Change to 100 once tested is complete.

    //Change message and change UI
    document.querySelector('#name-'+activePlayer).textContent = "WINNER!";
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    document.querySelector('.dice').style.display = 'none';

    //Change state variable to indicate end of game
    gamePlaying = false;

  } else {
    //Change player, function. And change UI of active panel.
    changePlayer()
  };
}
});

//So far, app almost complete. Issue: once winner is declared, the roll dice and hold still work and the whole game still works.
//Need to add a feature that starts/stops game.
//This is - init() function to restart
//        - state variable - tells us state/current condition of the system
