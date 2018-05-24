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


var games_played = 0;
var attempts = 0;
var piecesInColumn = 0;

var gameArray = [
    [
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
    ],

    [
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
    ],

    [
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
    ],
    [
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
    ],
    [
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
    ],
    [
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
    ],
    [
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
        {token: null},
    ],

];

//reset game will reset the Game array to "empty" and will reset and refresh stats
function resetGame() {
    var gameArray = [
        [
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
        ],

        [
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
        ],

        [
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
        ],
        [
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
        ],
        [
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
        ],
        [
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
        ],
        [
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
            {token: null},
        ],

    ];
    reset_stats();
    display_stats();
}
//

//this will count the number of games played
function gamesPlayed() {
    games_played = games_played + 1;
    console.log("games played has been incremented");
    reset_stats();
    display_stats();

}
//function to display the stats
function display_stats() {

    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);

    /* if we want to include some sort of "accuracy"

    if(attempts > 0){
        accuracy = ((matches/attempts) * 100).toFixed(0) + '%';
        $(".accuracy .value").text(accuracy);
    } else {
        accuracy = 0 + '%';
        $(".accuracy .value").text(accuracy);
    }*/
}

//reset the stats
function reset_stats() {

    games_played = 0;
    attempts = 0;
}

//this is the reset button function
function resetButton() {
    $("#resetbutton").on("click", resetGame());


//count the number of pieces in column, we will start at 0,0 and go down the column to see how many pieces are present
function getNewTokenRow( column, array ) {
    var newTokenRow = array.length - 1;
    // debugger
    while ( array[newTokenRow][column].token !== null ) {
        newTokenRow -= 1; 
        if ( newTokenRow < 0 ){
            console.log('The column is full.')
            return 
        }
    }
    return newTokenRow
}


//Functions for win and draw modals

function winModal(){
    $(".winModal").show()
}
function drawModal(){
    $(".drawModal").show()
}
function hideWinModal() {
    $(".winModal").hide()
}
function hidDrawModal () {
    $(".drawModal").hide()
}


