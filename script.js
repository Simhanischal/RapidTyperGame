function start(){
    bgVideo.style.display = 'block'; //make the background video visible
    startArea.style.display = 'none'; //make the start area(start button and high scores button) invisible
    resetArea.style.display = 'block'; //make the reset area(reset button and exit button) visible
    playArea.style.display = 'block'; 
    time = 5; //set the time to 5s
    timer(); //start the timer
    generateRandomWord(); //generate a random word
    document.querySelector('#score').innerHTML = 0; //set the score to 0
    document.querySelector('#time-left').innerHTML = time;
}

function stop(){
    addScoreToStorage(score.innerHTML); //add the score to local storage
    time = 0; // reset the time
    bgVideo.style.display = 'none'; //disable the video
    startArea.style.display = 'block'; //enable the start area
    resetArea.style.display = 'none'; //enable the reset area
    playArea.style.display = 'none'; //disable the play area
    
}

function reset(){
    addScoreToStorage(score.innerHTML); //add the score to local storage
    clearInterval(setTimer); //clear the timer
    time = 0; //reset the time
    start(); //restart the game
}

function generateRandomWord(){
    let random = Math.floor(Math.random()*words.length);
    document.querySelector('.word').innerHTML = words[random]; //display a random word from the list
}

function addScoreToStorage(currentScore){
    if(localStorage.getItem('scores') === null) //this is for a first time user to initialze the scores array
        localStorage.setItem('scores','[]');
    let scores = JSON.parse(localStorage.getItem('scores'));
    scores.push(currentScore); //add the current score to the scores array
    localStorage.setItem('scores',JSON.stringify(scores)); //add the score to local storage
}

function getHighScores(){
    if(localStorage.getItem('scores') === null)
        localStorage.setItem('scores',JSON.stringify([0,0,0])); //initialize an array with 3 zeros for 3 high scores for first time user
    let scores = JSON.parse(localStorage.getItem('scores'));
    scores.sort((a,b)=>b-a); //sort the scores array in descending order
    //add the top 3 scores in the array in high scores area
    document.querySelector('#first-high-score').innerHTML = scores[0];
    document.querySelector('#second-high-score').innerHTML = scores[1];
    document.querySelector('#third-high-score').innerHTML = scores[2];
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
        score.innerHTML = parseInt(score.innerHTML) + 3; //increment the score by 3
        timeLeft.innerHTML = parseInt(timeLeft.innerHTML) + 3; //increment the time by 3s
        time += 3;
        generateRandomWord(); //generate a new random word
    }
}

function openModal(){
    getHighScores(); //show the high scores
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
let resetArea = document.querySelector('.reset-area');
let playArea = document.querySelector('.play-area');
let startButton = document.querySelector('.start-button');
let resetButton = document.querySelector('.reset-button');
let exitButton = document.querySelector('.exit-button');
let trophyButton = document.querySelector('.trophy-button');
let userInput = document.querySelector('#user-input');
let word = document.querySelector('.word');
let timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let bgVideo = document.querySelector('#bgVideo');
let gameOver = document.querySelector('#gameOver');
let wellDone = document.querySelector('#well-done');
let modal = document.querySelector('.modal');
let closeModalButton = document.querySelector('.close');


startButton.addEventListener("click",start);
resetButton.addEventListener("click",reset);
exitButton.addEventListener("click",()=>{time=0;});
userInput.addEventListener("input",checkWord);
trophyButton.addEventListener("click",openModal);
closeModalButton.addEventListener("click",closeModal);
window.addEventListener("click",closeModal);













//document.onload(()=>alert('hi'));