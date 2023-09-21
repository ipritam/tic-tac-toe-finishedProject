const squareOne = document.getElementById("grid_square-1");
const squareTwo = document.getElementById("grid_square-2");
const squareThree = document.getElementById("grid_square-3");
const squareFour = document.getElementById("grid_square-4");
const squareFive = document.getElementById("grid_square-5");
const squareSix = document.getElementById("grid_square-6");
const squareSeven = document.getElementById("grid_square-7");
const squareEight = document.getElementById("grid_square-8");
const squareNine = document.getElementById("grid_square-9");
const allSquares = document.querySelectorAll(".grid_square");

const playerOneScore = document.getElementById("info_player_score1");
const playerTwoScore = document.getElementById("info_player_score2");

const infoText = document.getElementById("instructions_text");
const startGameBtn = document.getElementById("instructions_btn");

const modal = document.getElementById("modal");


const players = {
    playerOne:{name : "Jack",wins:0},
    playerTwo:{name : "Jill",wins:0}
}

let move = 1;
let nextPlayer = players.playerOne.name;
let pastPlayer;
let currentImage = "cross";
let playerHasWon = false;


function addSquareClick(){
    allSquares.forEach((square)=>{
        square.addEventListener("click",squareClick);
    });
}
function removeSquareClick(){
    allSquares.forEach((square)=>{
        square.removeEventListener("click",squareClick);
    });
}

function squareClick(){
    if(!this.classList.contains("cross") && !this.classList.contains("circle")){
    this.classList.add(`${currentImage}`);
    incrementMove();
    }
}
addSquareClick();

function incrementMove(){
    move = move +1;
    if(move % 2 !== 0){
        nextPlayer = players.playerOne.name;
        pastPlayer = players.playerTwo.name;
        currentImage = "cross";
        infoText.innerHTML = `${players.playerOne.name}'s turn`;
    }else{
        nextPlayer = players.playerTwo.name;
        pastPlayer = players.playerOne.name;
        currentImage = "circle";
        infoText.innerHTML = `${players.playerTwo.name}'s turn`;
    }
    checkForWin();
    checkForTie();
}

function checkForWin(){
    const lines = [
        [squareOne , squareTwo, squareThree],
        [squareFour, squareFive,squareSix],
        [squareSeven,squareEight,squareNine],
        [squareOne,squareFour,squareSeven],
        [squareTwo,squareFive,squareEight],
        [squareThree,squareSix,squareNine],
        [squareOne,squareFive,squareNine],
        [squareThree,squareFive,squareSeven]
    ];
    for (const line of lines) {
        const hasCross = line.every((square)=>
            square.classList.contains("cross")
        );
        const hasCircle = line.every((square)=>
            square.classList.contains("circle")
        );
        if(hasCross || hasCircle){
            const winner = hasCross ? players.playerOne:players.playerTwo;
            winner.wins += 1;
            updateScores();
            playerWon();
            return;
        }
    }
}

function updateScores(){
    playerOneScore.innerHTML = players.playerOne.wins;
    playerTwoScore.innerHTML = players.playerTwo.wins;
}

function playerWon(){
    infoText.innerHTML = `${pastPlayer} won!`;
    playerHasWon = true;
    continueGame();
}

function checkForTie(){
    const squares = [
        squareOne,
        squareTwo,
        squareThree,
        squareFour,
        squareFive,
        squareSix,
        squareSeven,
        squareEight,
        squareNine
    ];
    const allSquaresFilled = squares.every((square)=>{
        return(
            square.classList.contains("cross") || square.classList.contains("circle")
        );
    });
    if(allSquaresFilled && !playerHasWon){
        infoText.innerHTML = "It's a tie";
        continueGame();
    }
}

function continueGame(){
    removeSquareClick();
    setTimeout(()=>{
        reset();
    },2000);
}
function restartGame(){
    removeSquareClick();
    reset();
}

function reset(){
    allSquares.forEach((square)=>{
        square.classList = "grid_square";
    });
    addSquareClick();
    playerHasWon = false;
    infoText.innerHTML = `${nextPlayer}'s turn to start`;
}

function startGame(){
    startGameBtn.addEventListener("click",()=>{
        modal.style.display = "flex";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const player1Input = document.getElementById("player1").value.trim().toLowerCase();
        const player2Input = document.getElementById("player2").value.trim().toLowerCase();

        const player1InputCap = player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
        const player2InputCap = player2Input.charAt(0).toUpperCase() + player2Input.slice(1);

        players.playerOne.name = player1InputCap;
        players.playerTwo.name = player2InputCap;
        nextPlayer = player1InputCap;

        document.getElementById("info_player_name1").innerHTML = players.playerOne.name;
        document.getElementById("info_player_name2").innerHTML = players.playerTwo.name;

        players.playerOne.wins = 0;
        players.playerTwo.wins = 0;
        updateScores();

        infoText.innerHTML = `${players.playerOne.name}'s turn to start`;
        modal.style.display = "none";

        startGameBtn.innerHTML = "Restart Game";
        addSquareClick();
        restartGame();
    });
}

startGame();