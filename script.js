function start(){
    openModal();
    scoresModal.style.display = 'none';
    howToModal.style.display = 'none';
    startModal.style.display = 'block';
}

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

function play(){
    //let selectedDifficulty = difficulty.value;
    playScreen.style.position = 'static'; //restore the play screen to center if it had been moved to top on mobile device
    playScreen.style.top = '0';
    modal.style.display = 'none'; //close the start modal
    userInput.value = ''; //clearing the input if any from previous session
    bgVideo.style.display = 'block'; //make the background video visible
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

function stop(){
    addScoreToStorage(score.innerHTML,difficulty.value); //add the score to local storage
    time = 0; // reset the time
    bgVideo.style.display = 'none'; //disable the video
    startArea.style.display = 'block'; //enable the start area
    resetArea.style.display = 'none'; //enable the reset area
    playArea.style.display = 'none'; //disable the play area
    document.querySelector('.title').style.display = 'block'; //enable the title
}

function reset(){
    addScoreToStorage(score.innerHTML); //add the score to local storage
    clearInterval(setTimer); //clear the timer
    time = 0; //reset the time
    start(); //restart the game
}

function exit(){
    userInput.value = '';
    time = 0;
}

function changeStyleForMobile(){
    if(screen.width <= 768){
        playScreen.style.position = 'absolute';
        playScreen.style.top = '0';
        //playScreen.style.margin = 'auto';
        //playScreen.style.textAlign = 'center';
    }
}

function generateRandomWord(){
    let random = Math.floor(Math.random()*words.length);
    document.querySelector('.word').innerHTML = words[random]; //display a random word from the list
}

function addScoreToStorage(currentScore,difficulty){
    if(localStorage.getItem(`scores_${difficulty}`) === null) //this is for a first time user to initialze the scores array
        localStorage.setItem(`scores_${difficulty}`,'[]');
    let scores = JSON.parse(localStorage.getItem(`scores_${difficulty}`));
    scores.push(currentScore); //add the current score to the scores array
    localStorage.setItem(`scores_${difficulty}`,JSON.stringify(scores)); //add the score to local storage
}

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

function timer(){
    setTimer = setInterval(timerInterval,1000);
}

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

function openModal(){
    modal.style.display = 'block';
}

function closeModal(event){
    if(event.target === modal || event.target === closeModalButton)
        modal.style.display = 'none';
}

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
let body = document.getElementsByTagName('body');
let startArea = document.querySelector('.start-area');
let playScreen = document.querySelector('.play-screen');
let resetArea = document.querySelector('.reset-area');
let playArea = document.querySelector('.play-area');
let startButton = document.querySelector('.start-button');
let resetButton = document.querySelector('.reset-button');
let exitButton = document.querySelector('.exit-button');
let trophyButton = document.querySelector('.trophy-button');
let howToButton = document.querySelector('.how-to-button');
let userInput = document.querySelector('#user-input');
let word = document.querySelector('.word');
let timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let bgVideo = document.querySelector('#bgVideo');
let gameOver = document.querySelector('#gameOver');
let wellDone = document.querySelector('#well-done');
let modal = document.querySelector('.modal');
let startModal = document.querySelector('.start-modal');
let scoresModal = document.querySelector('.scores-modal');
let howToModal = document.querySelector('.how-to-modal');
let closeModalButton = document.querySelector('.close');
let playButton = document.querySelector('.play-button');
let difficulty = document.querySelector('#difficulty');
let easyScoresButton = document.querySelector('#easy-score');
let mediumScoresButton = document.querySelector('#medium-score');
let hardScoresButton = document.querySelector('#hard-score');
let easyHowToButton = document.querySelector('#easy-how-to');
let mediumHowToButton = document.querySelector('#medium-how-to');
let hardHowToButton = document.querySelector('#hard-how-to');

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
