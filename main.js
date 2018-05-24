$(document).ready(initializeGame);

function initializeGame(){
    attachClickHandlers();
};
function attachClickHandlers(){
    $(".resetButton").on("click", resetGame);
    $(".gameColumn").on("click", dropPiece);
    $(".          ").on("click",         );
};

// GLOBAL VARIABLES
var playerTurn = null;
// ----------------
function changeTurn(){
    if (playerTurn === 1){
        playerTurn = 2;
    } else if (playerTurn === 2){
        playerTurn = 1;
    };
};

// GLOBAL VARIABLES
var piecesInColumn = 7;
var rowPiecePlace = 0;
// ----------------
function getRowForPiece(piecesInColumn){
        rowPiecePlace = piecesInColumn -1;
    return rowPiecePlace;
};

// 2x2 SQUARE BONUS
function squareBonusCheck(boardArrayClick){
    if (boardArray[row - 1][column + 1] === 'X'){
        if (boardArray[row - 0][column + 1] === 'X' && boardArray[row - 1][column - 0] === 'X'){
            console.log('SQUAREBONUS top right');
            return;
        };
    };
    if (boardArray[row-1][column-1] === 'X'){
        if (boardArray[row-0][column-1] === 'X' && boardArray[row-1][column-0] === 'X'){
            console.log('SQUAREBONUS top left');
            return;
        };
    };
    if (boardArray[row+1][column-1] === 'X'){
        if (boardArray[row-0][column-1] === 'X' && boardArray[row+1][column-0] === 'X'){
            console.log('SQUAREBONUS bottom left');
            return;
        };
    };
    if (boardArray[row+1][column+1] === 'X'){
        if (boardArray[row-0][column+1] === 'X' && boardArray[row+1][column-0] === 'X'){
            console.log('SQUAREBONUS bottom right');
            return;
        };
    };
};