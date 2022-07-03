let classes = Array.from(document.querySelectorAll('.box')) // variable to catch all the .box div and storage to a Array
let xTurn = [] // Array to storage the X player moves
let circleTurn = [] // Array to storage the Circle player moves
let currentPlayer = '' //actual current player
let hasWinner // variable to storage if game has a winner
let seconds = 5 // seconds for HTML
let foo // variable for clearInterval() function
const winnerCombination = [
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
function firstPlayer() {
    if (window.location.href.includes("#x")) {
        currentPlayer = 'x'
    } else {
        currentPlayer = 'circle'
    }
}

//function to highlight the player's turn when the game is running
function changeColor() {
    if (currentPlayer == 'x') {
        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid transparent'
        document.getElementById('MarkPlayerX').style.backgroundColor = '#a9c7db'
        document.getElementById('MarkPlayerX').style.padding = '0.10rem 0.75rem'
        document.getElementById('MarkPlayerX').style.border = '2px solid rgb(101, 142, 169)'
    }
    if (currentPlayer == 'circle') {
        document.getElementById('MarkPlayerX').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerX').style.border = '2px solid transparent'
        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#a9c7db'
        document.getElementById('MarkPlayerCircle').style.padding = '0.10rem 0.75rem'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid rgb(101, 142, 169)'
    }
    if (hasWinner == true) {
        document.getElementById('MarkPlayerX').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerX').style.border = '2px solid transparent'
        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid transparent'
    }
    if (hasWinner !== true && xTurn.length + circleTurn.length === 9) {
        document.getElementById('MarkPlayerX').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerX').style.border = '2px solid transparent'
        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid transparent'
    }
}

firstPlayer()
changeColor()

// Change the player turn by add the player's name into the div .box
function changePlayer() {
    if (currentPlayer == 'circle') {
        currentPlayer = 'x'
    } else {
        currentPlayer = 'circle'
    }
}

// The loop will look up in the Array Classes which .box element the player has clicked 
// Add a mark of the current player into the .box element
for (let i = 0; i < classes.length; i++) {
    const boxElement = classes[i]
    //inputMark function is activated by an click event
    function inputMark() {
        boxElement.classList.add(currentPlayer)
        countTurn()
        changePlayer()
        checkWinner()
        changeColor()
    }

    // Get the last index of the classes's Array was clicked and push it into the circleTurn and xTurn Arrays
    function countTurn() {
        if (currentPlayer == 'circle') {
            classIndex = classes.lastIndexOf(boxElement)
            circleTurn.push(classIndex)
        } else {
            classIndex = classes.lastIndexOf(boxElement)
            xTurn.push(classIndex)
        }
    }
    boxElement.addEventListener('click', inputMark, {
        once: true
    })
}

// Check if is draw
function checkDraw() {
    if ((xTurn.length + circleTurn.length === 9)) {
        document.getElementById('winner').style.display = 'block'
        document.getElementById('restart').style.display = 'block'
        document.getElementById('winner').style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        document.getElementById('viewPort').style.filter = 'blur(6px)'
        document.getElementById('winner').innerHTML = 'Its a tie!!'
        countdownTimer()
    }
}

function showWinner() {
    document.getElementById('winner').style.display = 'block'
    document.getElementById('restart').style.display = 'block'
    document.getElementById('winner').style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
    document.getElementById('viewPort').style.filter = 'blur(6px)'
    document.getElementById('player').classList.add('player' + winnerPlayer)
    // countdownTimer()
}

// function to return the 
function checkTrue(countTrue) {
    return winner.includes(countTrue)
}

// loop to obtained an Array newWinner by calling the function checkTrue() with map() method
// This function will loop through the winner's Array to check if the xTurn or circleTurn Arrays match any winning combination
// winCount will filter into the newWinner Array only the true
// If winCount has 3 or more true then will input true on hasWinner variable
function checkWinner() {
    for (let j = 0; j < winnerCombination.length; j++) {
        winner = winnerCombination[j]

        if (xTurn.length >= 3) {
            const newWinner = xTurn.map(checkTrue)
            const winCount = newWinner.filter(Boolean).length
            if (winCount >= 3) {
                winnerPlayer = "X"
                hasWinner = true
                showWinner()
            }
        }
        if (circleTurn.length >= 3) {
            const newWinner = circleTurn.map(checkTrue)
            const winCount = newWinner.filter(Boolean).length

            if (winCount >= 3) {
                hasWinner = true
                winnerPlayer = "Circle"
                showWinner()
            }
        }
    }
    if (hasWinner !== true) {
        checkDraw()
    }
}

// Countdown timer for redirecting to another URL after several seconds
function redirect() {
    document.location.href = 'http://127.0.0.1:5500/index.html'
}

function updateSecs() {
    document.getElementById("seconds").innerHTML = 'The game will restart in ' + seconds + ' seconds'
    seconds--
    if (seconds == -1) {
        clearInterval(foo)
        redirect()
    }
}

function countdownTimer() {
    foo = setInterval(function() {updateSecs()}, 1000)
}

document.getElementById("restart").onclick = function() {
    location.href = "http://127.0.0.1:5500/index.html"
}