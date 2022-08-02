let classes = Array.from(document.querySelectorAll('.box')) // variable to catch all the .box div and storage to a Array
let xTurn = [] // Array to storage the X player moves
let circleTurn = [] // Array to storage the Circle player moves
let currentPlayer = '' //actual current player
let hasWinner // variable to storage if game has a winner
let seconds = 500 // seconds for HTML (seconds to restart)
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
// TODO buscar utilizar query string pra passar na url o current player
function firstPlayer() {
    if (window.location.href.includes("#x")) {
        currentPlayer = 'x'
    } else {
        currentPlayer = 'circle'
    }
}

//function to highlight the player's turn when the game is running
//TODO reduzir manipulando a classe somente do pai incluindo no DOM a classe active
function changeColor() {
    const markPlayerX = document.getElementById('MarkPlayerX')
    const markPlayerCircle = document.getElementById('MarkPlayerCircle')
    if (currentPlayer == 'x') {

        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid transparent'
        markPlayerX.style.backgroundColor = '#a9c7db'
        markPlayerX.style.padding = '0.10rem 0.75rem'
        markPlayerX.style.border = '2px solid rgb(101, 142, 169)'
    }
    if (currentPlayer == 'circle') {
        markPlayerX.style.backgroundColor = '#88B2CC'
        markPlayerX.style.border = '2px solid transparent'
        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#a9c7db'
        document.getElementById('MarkPlayerCircle').style.padding = '0.10rem 0.75rem'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid rgb(101, 142, 169)'
    }
    if (hasWinner == true) {
        markPlayerX.style.backgroundColor = '#88B2CC'
        markPlayerX.style.border = '2px solid transparent'
        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid transparent'
    }
    if (hasWinner !== true && xTurn.length + circleTurn.length === 9) {
        markPlayerX.style.backgroundColor = '#88B2CC'
        markPlayerX.style.border = '2px solid transparent'
        document.getElementById('MarkPlayerCircle').style.backgroundColor = '#88B2CC'
        document.getElementById('MarkPlayerCircle').style.border = '2px solid transparent'
    }
}
firstPlayer()
changeColor()

// Change the player turn by add the player's name into the div .box
// TODO utilizar ===
function changePlayer() {
    if (currentPlayer == 'circle') {
        currentPlayer = 'x'
    } else {
        currentPlayer = 'circle'
    }
}

//TODO 
function markBox() {
    for (let i = 0; i < classes.length; i++){
      let boxElement = classes[i]
     //inputMark() is activated by a click event that // Add a mark of the current player into the .box element
    function inputMark() {
        countTurn(boxElement)
        changePlayer()
        checkWinner()
        changeColor()
    }
// Get the last index of the classes's Array was clicked and push it into the circleTurn and xTurn Arrays
    function countTurn(boxElement) {
        boxElement.classList.add(currentPlayer)
        if (currentPlayer == 'circle') {
            classIndex = classes.indexOf(boxElement)
            circleTurn.push(classIndex)
        } else {
            classIndex = classes.indexOf(boxElement)
            xTurn.push(classIndex)
        }
    } 
    boxElement.addEventListener('click', inputMark, {once: true})
    }
} 
markBox()

// function to return the winners combination in a include function
// TODO trocar nome da função
function checkTrue(countTrue) {
    return winner.includes(countTrue)
}

// loop to obtained an Array newWinner by calling the function checkTrue() with map() method
// This function will loop through the winner's Array to check if the xTurn or circleTurn Arrays matches to any winning combination
// winCount will filter into the newWinner Array only the true
// If winCount has 3 or more true then will input true on hasWinner variable
// TODO criar uma função isolada e chamar no parâmetro os arrays de x e circle
// TODO só verificar o jogados só acabou de jogar e trocar de ordem o changeplaye e checkwinner
// TODO trocar winnerCombination variable para plural e winner para winnerCombination
function checkWinner() {
    for (let j = 0; j < winnerCombination.length; j++) {
        winner = winnerCombination[j]

        if (xTurn.length >= 3) {
            const newWinner = xTurn.map(checkTrue)
            const winCount = newWinner.filter(Boolean).length
            if (winCount >= 3) {
                winnerPlayer = 'X'
                hasWinner = true
                showWinner()
            }
        }
        if (circleTurn.length >= 3) {
            const newWinner = circleTurn.map(checkTrue)
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
//TODO manipular somente o bloco pai no HTML para hide ou show
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
        clearInterval(foo)
        redirect()
    }
}

function countdownTimer() {
    foo = setInterval(function() {updateSecs()}, 1000)
}

document.getElementById("restart").onclick = function() {
    location.href = "index.html"
}