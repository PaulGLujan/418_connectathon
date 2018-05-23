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
}

function winCondition (row, column, array, player) {
    if ( array[row][column].token !== player ){
        return false
    }
    var row_direction_array = [0, -1, -1, -1];
    var column_direction_array = [-1, 1, 0, -1];

    for (var x = 0; x < row_direction_array.length; x++){
    var row_direction = row_direction_array[x];
    var column_direction = column_direction_array[x];

    var check_row = row+row_direction;
    var check_column = column+column_direction;
    var inline_counter = 1;
    
        for ( var i = 0; i < 2; i++ ) { 
            if ( array[check_row] === undefined) {
            } 
            else if( array[check_row][check_column] === undefined){
            }
            else {
                while( array[check_row][check_column].token === player){
                    inline_counter += 1;
                    check_row += row_direction; check_column += column_direction;
                    if ( array[check_row] === undefined ) {
                        break
                    }
                    else if ( array[check_row][check_column] === undefined ) {
                        break
                    }
                }
            }
            row_direction *= -1; 
            column_direction *= -1;
            check_row = row+row_direction;
            check_column = column+column_direction;
        }
        if ( inline_counter >= 4 ){
            return true
        }
    }
    return false
}