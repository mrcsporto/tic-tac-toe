# A SIMPLE TIC-TAC-TOE GAME IN JAVASCRIPT

## (1) Grid layout

### The game grid is represented by the array classes as follows:

[0] [1] [2]
[3] [4] [5]
[6] [7] [8]

The [classes] (array elements) holds '.box' class value if not occupied.

## (2) inputMark() function

The function runs inside a loop that goes through the array [classes]
The function is activated by a click event up in the array [classes]
When a '.box' is clicked, the current value of the player is inserted into the respective HTML class

And runs fout functions:
    countTurn()
    changePlayer()
    checkWinner()
    changeColor()

## (3) hasWinner

### checkWinner()
The loop obtained an Array [newWinner] by calling the function checkTrue() with map() method
This function will loop through the winner's Array to check if the [xTurn] or [circleTurn] Arrays match any winning combination
winCount variable will filter into the newWinner Array only the true
If winCount variable has 3 or more true then will input true on hasWinner variable
