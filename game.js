let classes = Array.from(document.querySelectorAll('.box'))
let xTurn = []
let circleTurn = []
let currentPlayer = ''
let hasWinner
const winnerCombination =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function changeColor() {
    if(currentPlayer == 'x'){
        document.getElementById('playerCircle').style.backgroundColor = '#88B2CC'
        document.getElementById('playerCircle').style.border = '2px solid transparent' 
        document.getElementById('playerX').style.backgroundColor = '#a9c7db'
        document.getElementById('playerX').style.padding = '0.10rem 0.75rem'
        document.getElementById('playerX').style.border = '2px solid rgb(101, 142, 169)'   
    } 
    if(currentPlayer == 'circle') {
        document.getElementById('playerX').style.backgroundColor = '#88B2CC'
        document.getElementById('playerX').style.border = '2px solid transparent' 
        document.getElementById('playerCircle').style.backgroundColor = '#a9c7db'
        document.getElementById('playerCircle').style.padding = '0.10rem 0.75rem'
        document.getElementById('playerCircle').style.border = '2px solid rgb(101, 142, 169)'    
    }

}

function firstPlayer() {
    if(window.location.href.includes("#x")) {
        currentPlayer = 'x' 
    } else {
        currentPlayer = 'circle'
    }
} firstPlayer()


for (let i = 0; i < classes.length; i++) {
    let boxElement = classes[i]

    function inputMark() {
        if (hasWinner) {
            return
        }
        if (currentPlayer == 'circle') {
            boxElement.classList.add(currentPlayer)
            countTurn()
        } else {
            boxElement.classList.add(currentPlayer)
            countTurn()
        }
        changeColor()
        changePlayer()
        checkWinner()
    }

    function countTurn() {
        if (currentPlayer == 'circle') {
            classIndex = classes.lastIndexOf(boxElement)
            circleTurn.push(classIndex)
        } else {
            classIndex = classes.lastIndexOf(boxElement)
            xTurn.push(classIndex)
        }
    }
    boxElement.addEventListener('click', inputMark, {once: true})
}

function changePlayer() {
    if (currentPlayer == 'circle') {
        currentPlayer = 'x'
    } else {
        currentPlayer = 'circle'
    }
}

function checkWinner() {
    for (let j = 0; j < winnerCombination.length; j++) {
        winner = winnerCombination[j]

        function checkTrue(counter) {
            return winner.includes(counter)
        }
        checkTrue()

        if (xTurn.length >= 3) {
            const newWinner = xTurn.map(checkTrue)
            const winCount = newWinner.filter(Boolean).length
            if (winCount >= 3) {
                console.log('Player X Wins!!')
                hasWinner = true
            }
        }
        if (circleTurn.length >= 3) {
            const newWinner = circleTurn.map(checkTrue)
            const winCount = newWinner.filter(Boolean).length

            if (winCount >= 3) {
                console.log('Player O Wins!!')
                hasWinner = true
            }
        }
    }
    if (hasWinner !== true) {
        checkDraw()
    }
}

function checkDraw() {
    if ((xTurn.length + circleTurn.length === 9)) {
        console.log('Its a Tie!')
    }
}