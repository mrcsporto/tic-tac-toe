let boxElements = Array.from(document.querySelectorAll('.box')) // variable to catch all the .box div and storage to a Array
let xTurn = [] // Array to storage the X player moves
let circleTurn = [] // Array to storage the Circle player moves
let currentPlayer = '' //actual current player
let hasWinner // variable to storage if game has a winner
let seconds = 5 // seconds for HTML (seconds to restart)
let timeInterval // variable for clearInterval() function
const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// function to insert player's symbol into the local path
function insertFirstPlayer() {
    if (window.location.href.includes("player=x")) {
        currentPlayer = 'x'
    } else {
        currentPlayer = 'circle'
    }
}
//function to highlight the player's turn when the game is running
function changeColor() {
    const markPlayerX = document.getElementById('MarkPlayerX')
    const markPlayerCircle = document.getElementById('MarkPlayerCircle')
    if (currentPlayer === 'x') {
        markPlayerCircle.style.backgroundColor = '#88B2CC'
        markPlayerCircle.style.border = '2px solid transparent'
        markPlayerX.style.backgroundColor = '#a9c7db'
        markPlayerX.style.padding = '0.10rem 0.75rem'
        markPlayerX.style.border = '2px solid rgb(101, 142, 169)'
    }
    if (currentPlayer === 'circle') {
        markPlayerX.style.backgroundColor = '#88B2CC'
        markPlayerX.style.border = '2px solid transparent'
        markPlayerCircle.style.backgroundColor = '#a9c7db'
        markPlayerCircle.style.padding = '0.10rem 0.75rem'
        markPlayerCircle.style.border = '2px solid rgb(101, 142, 169)'
    }
    if (hasWinner === true) {
        markPlayerX.style.backgroundColor = '#88B2CC'
        markPlayerX.style.border = '2px solid transparent'
        markPlayerCircle.style.backgroundColor = '#88B2CC'
        markPlayerCircle.style.border = '2px solid transparent'
    }
    if (hasWinner !== true && xTurn.length + circleTurn.length === 9) {
        markPlayerX.style.backgroundColor = '#88B2CC'
        markPlayerX.style.border = '2px solid transparent'
        markPlayerCircle.style.backgroundColor = '#88B2CC'
        markPlayerCircle.style.border = '2px solid transparent'
    }
}
insertFirstPlayer()
changeColor()
// Change the player turn by add the player's name into the div .box
function changePlayer() {
    if (currentPlayer === 'circle') {
        currentPlayer = 'x'
    } else {
        currentPlayer = 'circle'
    }
}

function markBox() {
    for (let i = 0; i < boxElements.length; i++){
      let boxElement = boxElements[i]
     //inputMark() is activated by a click event that // Add a mark of the current player into the .box element
    function inputMark() {
        countTurn()
        changePlayer()
        checkWinner()
        changeColor()
    }
// Get the last index of the boxElements's Array was clicked and push it into the circleTurn and xTurn Arrays
    function countTurn() {
        boxElement.classList.add(currentPlayer)
        if (currentPlayer === 'circle') {
            classIndex = boxElements.indexOf(boxElement)
            circleTurn.push(classIndex)
        } else {
            classIndex = boxElements.indexOf(boxElement)
            xTurn.push(classIndex)
        }
    } 
    boxElement.addEventListener('click', inputMark, {once: true})
    }
} 
markBox()
// function to return the winners combination in a include function
function checkWinnerCombination(winnerplayer) {
    return winnerCombination.includes(winnerplayer)
}
// loop to obtained an Array newCombination by calling the function checkWinnerCombination() with map() method
// This function will loop through the Combination's Array to check if the xTurn or circleTurn Arrays matches to any winning combination
// winCount will filter into the newCombination Array only the true
// If winCount has 3 or more true then will input true on hasCombination variable
function checkWinner() {
    for (let j = 0; j < winnerCombinations.length; j++) {
        winnerCombination = winnerCombinations[j]
        if (xTurn.length >= 3) {
            const newWinner = xTurn.map(checkWinnerCombination)
            const winCount = newWinner.filter(Boolean).length
            if (winCount >= 3) {
                winnerPlayer = 'X'
                hasWinner = true
                showWinner()
            }
        }
        if (circleTurn.length >= 3) {
            const newWinner = circleTurn.map(checkWinnerCombination)
            const winCount = newWinner.filter(Boolean).length
            if (winCount >= 3) {
                hasWinner = true
                winnerPlayer = 'Circle'
                showWinner()
            }
        }
    }
    if (hasWinner !== true) {
        checkDraw()
    }
}
// Check which player is the winner and show the menssage
function showWinner() {
    document.getElementById('showWinner').style.display = 'flex'
    document.getElementById('showWinner').style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
    document.getElementById('player').classList.add('player' + winnerPlayer)
    document.getElementById('viewPort').style.filter = 'blur(6px)'
    countdownTimer()
}
// Check if is draw and show menssage
function checkDraw() {
    if ((xTurn.length + circleTurn.length === 9)) {
        document.getElementById('showWinner').style.display = 'flex'
        document.getElementById('showWinner').style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        document.getElementById('winner').innerHTML = 'Its a tie!!'
        document.getElementById('viewPort').style.filter = 'blur(6px)'
        countdownTimer()
    }
}
// Countdown timer for redirecting to another URL after several seconds
function redirect() {
    document.location.href = 'index.html'
}

function updateSecs() {
    document.getElementById("seconds").innerHTML = 'The game will restart in ' + seconds + ' seconds'
    seconds--
    if (seconds == -1) {
        clearInterval(timeInterval)
        redirect()
    }
}

function countdownTimer() {
    timeInterval = setInterval(function() {updateSecs()}, 1000)
}

document.getElementById("restart").onclick = function() {
    location.href = "index.html"
}
