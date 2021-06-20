/**
 * start takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Start" button in the home page.
 * This function opens a modal to choose game difficulty
 */
function start(){
    openModal();
    scoresModal.style.display = 'none';
    howToModal.style.display = 'none';
    startModal.style.display = 'block';
}

/**
 * openScores takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "High Scores" button in the home page.
 * This function opens a modal to where the user can view their high scores in all the 3 difficulty levels.
 */
function openScores(){
    getHighScores('easy'); //show the high scores
    easyScoresButton.style.borderBottom = '2px solid #ff8000';
    mediumScoresButton.style.borderBottom = 'none';
    hardScoresButton.style.borderBottom = 'none';
    openModal();
    startModal.style.display = 'none';
    howToModal.style.display = 'none';
    scoresModal.style.display = 'block';
}

/**
 * openHowToPlay takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "How to Play" button in the home page.
 * This function opens a modal to view the guide to playing a game.
 */
function openHowToPlay(){
    getHowtoPlay('easy'); //show the how to play section
    easyHowToButton.style.borderBottom = '2px solid #ff8000';
    mediumHowToButton.style.borderBottom = 'none';
    hardHowToButton.style.borderBottom = 'none';
    openModal();
    startModal.style.display = 'none';
    scoresModal.style.display = 'none';
    howToModal.style.display = 'block';
}

/**
 * play takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user clicks on "Play" button in the start modal of home page.
 * This function displays the play area, hides the start area, starts the timer, generates a random word and initializes time and score to 0.
 */
function play(){
    playScreen.style.position = 'static'; //restore the play screen to center if it had been moved to top on mobile device
    modal.style.display = 'none'; //close the start modal
    userInput.value = ''; //clearing the input if any from previous session
    document.body.style.backgroundImage = "url('./public/RapidTyperBg.jpg')"; //change the background image
    startArea.style.display = 'none'; //make the start area(start button and high scores button) invisible
    resetArea.style.display = 'block'; //make the reset area(reset button and exit button) visible
    playArea.style.display = 'block'; //make the play area visible
    document.querySelector('.title').style.display = 'none'; //make the title invisible
    document.querySelector('#playDifficulty').innerHTML = difficulty.value.toUpperCase(); //to display in the play area the difficulty level selected 
    time = 5; //set the time to 5s
    timer(); //start the timer
    generateRandomWord(); //generate a random word
    document.querySelector('#score').innerHTML = 0; //set the score to 0
    document.querySelector('#time-left').innerHTML = time;
}

/**
 * stop takes no arguments.
 * There is no return value in all cases.
 * This function is triggered wheen the game timer reaches 0.
 * This function adds the score to local storage, exits the game area and brings back the start area.
 */
function stop(){
    addScoreToStorage(score.innerHTML,difficulty.value); //add the score to local storage
    time = 0; // reset the time
    document.body.style.backgroundImage = "url('./public/home.jpg')"; //change the background image
    startArea.style.display = 'block'; //enable the start area
    resetArea.style.display = 'none'; //enable the reset area
    playArea.style.display = 'none'; //disable the play area
    document.querySelector('.title').style.display = 'block'; //enable the title
}

/**
 * reset takes no arguments.
 * There is no return value in all cases.
 * This function is triggered wheen the user clicks on "Reset" button.
 * This function adds the score to local storage, clears the timer and restarts the game.
 */
function reset(){
    addScoreToStorage(score.innerHTML,difficulty.value); //add the score to local storage
    time = 0; //reset the time
    clearInterval(setTimer); //clear the timer
    play(); //restart the game
}

/**
 * exit takes no arguments.
 * There is no return value in all cases.
 * This function is triggered wheen the user clicks on "Exit" button.
 * This function clears the user input, reset the timer, exits out of the play area and brings back start area.
 */
function exit(){
    userInput.value = '';
    time = 0;
}

/**
 * changeStyleForMobile takes no arguments.
 * There is no return value in all cases.
 * This function is fired when the user opens the game in a mobile device.
 * This function pushes the play area to the top so that mobile keyboard doesn't mask the play area.
 */
function changeStyleForMobile(){
    if(screen.width <= 768){
        playScreen.style.position = 'absolute';
        playScreen.style.top = '0';
    }
}

/**
 * generateRandomWord takes no arguments.
 * There is no return value in all cases.
 * This function picks up a random word from the set of words stored in "words" variable.
 */
function generateRandomWord(){
    let random = Math.floor(Math.random()*words.length);
    document.querySelector('.word').innerHTML = words[random]; //display a random word from the list
}

/**
 * addScoreToStorage takes "currentScore" and "difficulty" as arguments.
 * There is no return value in all cases.
 * @param {string} currentScore
 * @param {string} difficulty
 * This function adds the score to local storage in the acceptable format.
 */
function addScoreToStorage(currentScore,difficulty){
    if(localStorage.getItem(`scores_${difficulty}`) === null) //this is for a first time user to initialze the scores array
        localStorage.setItem(`scores_${difficulty}`,'[]');
    let scores = JSON.parse(localStorage.getItem(`scores_${difficulty}`));
    scores.push(currentScore); //add the current score to the scores array
    localStorage.setItem(`scores_${difficulty}`,JSON.stringify(scores)); //add the score to local storage
}

/**
 * addScoreToStorage takes "difficulty" as argument.
 * There is no return value in all cases.
 * @param {string} difficulty
 * This function gets the high scores of an user from localStorage depending on the difficulty requested.
 */
function getHighScores(difficulty){
    if(localStorage.getItem(`scores_${difficulty}`) === null)
        localStorage.setItem(`scores_${difficulty}`,JSON.stringify([0,0,0])); //initialize an array with 3 zeros for 3 high scores for first time user
    let scores = JSON.parse(localStorage.getItem(`scores_${difficulty}`));
    scores.sort((a,b)=>b-a); //sort the scores array in descending order
    //add the top 3 scores in the array in high scores area
    document.querySelector('#first-high-score').innerHTML = scores[0];
    document.querySelector('#second-high-score').innerHTML = scores[1];
    document.querySelector('#third-high-score').innerHTML = scores[2];
}

/**
 * addScoreToStorage takes "difficulty" as argument.
 * There is no return value in all cases.
 * @param {string} difficulty
 * This function gets the score and time increments depending on the difficulty requested.
 */
function getHowtoPlay(difficulty){
    let increment;
    if(difficulty === 'medium'){
        increment = '+3';
    }
    else if(difficulty === 'hard'){
        increment = '+1';
    }
    else{
        increment = '+5';
    }
    document.querySelector('#how-to-score').innerHTML = increment;
    document.querySelector('#how-to-time').innerHTML = increment;
}

/**
 * timerInterval takes no arguments.
 * There is no return value in all cases.
 * This function is triggered every second when the game is being played.
 * This function updates the time remaining in the game and if the time reaches 0, stops the game
 */
function timerInterval(){
    if(time === 0){
        clearInterval(setTimer); //clear the interval
        alert(`Game over! Your score is ${score.innerHTML}!!`);
        stop(); //stop the game
    }
    else{
        document.querySelector('#time-left').innerHTML = time;
        time = time-1; //decrease the time every 1 second
    }
}

/**
 * openModal takes no arguments.
 * There is no return value in all cases.
 * This function sets a timer interval for every second which is used as a timer in the game.
 */
function timer(){
    setTimer = setInterval(timerInterval,1000);
}

/**
 * addScoreToStorage takes "event"(JavaScript event) as argument.
 * There is no return value in all cases.
 * @param {object} event
 * This function checks the word entered by user with the selected word and if it matches, increments the time and score according to the difficlty level.
 */
function checkWord(event){
    //if the entered word is equal to displayed word 
    if(word.innerHTML === event.target.value.toLowerCase()){
        event.target.value = '';
        if(difficulty.value === 'easy'){
            score.innerHTML = parseInt(score.innerHTML) + 5; //increment the score by 5
            timeLeft.innerHTML = parseInt(timeLeft.innerHTML) + 5; //increment the time by 5s
            time += 5;
        }
        else if(difficulty.value === 'medium'){
            score.innerHTML = parseInt(score.innerHTML) + 3; //increment the score by 3
            timeLeft.innerHTML = parseInt(timeLeft.innerHTML) + 3; //increment the time by 3s
            time += 3;
        }
        else{
            score.innerHTML = parseInt(score.innerHTML) + 1; //increment the score by 1
            timeLeft.innerHTML = parseInt(timeLeft.innerHTML) + 1; //increment the time by 1s
            time += 1;
        }
        generateRandomWord(); //generate a new random word
    }
}

/**
 * openModal takes no arguments.
 * There is no return value in all cases.
 * This function displays a modal to choose game difficulty or to view high scores depending on user choice.
 */
function openModal(){
    modal.style.display = 'block';
}

/**
 * closeModal takes no arguments.
 * There is no return value in all cases.
 * This function is triggered wheen the user clicks on "Close" icon in modal or anywhere outside the modal area.
 * This function closes the opened modal.
 */
function closeModal(event){
    if(event.target === modal || event.target === closeModalButton)
        modal.style.display = 'none';
}

//set of words to give out randomly in the play area
let words = [
    'horseradish','bellhop','lifelike','hookup','everything',
    'earthquake','blackberries','underarm','turnoff','keyway',
    'backfire','forgive','carryall','waterwheel','taxpayer',
    'bedroom','sharecropper','tailgate','catwalk','upstate',
    'matchbox','coffeemaker','basketball','carsick','newsstand',
    'southwest','spacewalk','wheelhouse','firecracker','bookshelf',
    'tenderfoot','brazen','counterfeit','abjure','matriculation',
    'catalyst','acarpous','indolence','impediment','palpitate',
    'regularly','unimpressively','joshingly','zestfully','daintily',
    'likely','initially','quaintly','wetly','joyfully','virtually','honestly'
]

let time;
let setTimer;
const body = document.getElementsByTagName('body');
const startArea = document.querySelector('.start-area');
const playScreen = document.querySelector('.play-screen');
const resetArea = document.querySelector('.reset-area');
const playArea = document.querySelector('.play-area');
const startButton = document.querySelector('.start-button');
const resetButton = document.querySelector('.reset-button');
const exitButton = document.querySelector('.exit-button');
const trophyButton = document.querySelector('.trophy-button');
const howToButton = document.querySelector('.how-to-button');
const userInput = document.querySelector('#user-input');
const word = document.querySelector('.word');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
// const bgVideo = document.querySelector('#bgVideo');
const modal = document.querySelector('.modal');
const startModal = document.querySelector('.start-modal');
const scoresModal = document.querySelector('.scores-modal');
const howToModal = document.querySelector('.how-to-modal');
const closeModalButton = document.querySelector('.close');
const playButton = document.querySelector('.play-button');
const difficulty = document.querySelector('#difficulty');
const easyScoresButton = document.querySelector('#easy-score');
const mediumScoresButton = document.querySelector('#medium-score');
const hardScoresButton = document.querySelector('#hard-score');
const easyHowToButton = document.querySelector('#easy-how-to');
const mediumHowToButton = document.querySelector('#medium-how-to');
const hardHowToButton = document.querySelector('#hard-how-to');

startButton.addEventListener("click",start);
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
exitButton.addEventListener("click",exit);
userInput.addEventListener("input",checkWord);
userInput.addEventListener("focus",changeStyleForMobile);
trophyButton.addEventListener("click",openScores);
howToButton.addEventListener("click",openHowToPlay);
easyScoresButton.addEventListener("click",()=>{
    getHighScores('easy');
    easyScoresButton.style.borderBottom = '2px solid #ff8000';
    mediumScoresButton.style.borderBottom = 'none';
    hardScoresButton.style.borderBottom = 'none';
});
mediumScoresButton.addEventListener("click",()=>{
    getHighScores('medium');
    mediumScoresButton.style.borderBottom = '2px solid #ff8000';
    easyScoresButton.style.borderBottom = 'none';
    hardScoresButton.style.borderBottom = 'none';
});
hardScoresButton.addEventListener("click",()=>{
    getHighScores('hard');
    hardScoresButton.style.borderBottom = '2px solid #ff8000';
    easyScoresButton.style.borderBottom = 'none';
    mediumScoresButton.style.borderBottom = 'none';
});
easyHowToButton.addEventListener("click",()=>{
    getHowtoPlay('easy');
    easyHowToButton.style.borderBottom = '2px solid #ff8000';
    mediumHowToButton.style.borderBottom = 'none';
    hardHowToButton.style.borderBottom = 'none';
});
mediumHowToButton.addEventListener("click",()=>{
    getHowtoPlay('medium');
    mediumHowToButton.style.borderBottom = '2px solid #ff8000';
    easyHowToButton.style.borderBottom = 'none';
    hardHowToButton.style.borderBottom = 'none';
});
hardHowToButton.addEventListener("click",()=>{
    getHowtoPlay('hard');
    hardHowToButton.style.borderBottom = '2px solid #ff8000';
    easyHowToButton.style.borderBottom = 'none';
    mediumHowToButton.style.borderBottom = 'none';
});
closeModalButton.addEventListener("click",closeModal);
window.addEventListener("click",closeModal);
