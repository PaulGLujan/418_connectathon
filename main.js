$(document).ready(initializeGame);

function initializeGame(){
    attachClickHandlers();
    currentPlayer = player[0];
};
function attachClickHandlers(){
    $(".forfeitButton").on("click", resetGame);
    $(".column").on("click", piecePlacement);

};


// GLOBAL VARIABLES

var column_clicked = null;
var row_clicked = null;
var rowToPlacePiece = null;
var putPieceInRow = 0;
var games_played = 0;
var attempts = 0;
var piecesInColumn = 0;
// ----------------


var player = [];
player[0] = {
    name: "player1",
    points: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesTied: 0,
};
player[1] = {
    name: "player2",
    points: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesTied: 0,
};


function placePlayerToken(piecesInRow) {
    if (currentPlayer === player[0]) {
        gameArray[piecesInRow][column_clicked].token = 1;
    } else if (currentPlayer === player[1]) {
        gameArray[piecesInRow][column_clicked].token = 2;
    }
}




function displayToken(piecesInRow, column_clicked) {
    if (gameArray[piecesInRow][column_clicked].token === 1) {
        $(".row" + piecesInRow + " .column" + column_clicked).addClass("showPlayer1")

    } else if (gameArray[piecesInRow][column_clicked].token === 2) {
        $(".row" + piecesInRow + " .column" + column_clicked).addClass("showPlayer2")
    }
}

    function changeTurn() {
        if (currentPlayer === player[0]) {
            currentPlayer = player[1];
        } else if (currentPlayer === player[1]) {
            currentPlayer = player[0];
        }
        ;
    };

    function piecePlacement() {
        var jQueryObj = $(this);
        columnIndex(jQueryObj);
        var rowPieceShouldBePlaced = rowIndex();
        placePlayerToken(rowToPlacePiece);
        displayToken(rowPieceShouldBePlaced, column_clicked);
        changeTurn();
        console.log('Piece placement function working');
        console.log('This is: ', this);
    }

    function columnIndex(jQueryObj) {

        column_clicked = jQueryObj.attr("id");

        console.log('The column clicked was: ', column_clicked);
    }


    function rowIndex() {
        for (i = 6; i >= 0; i--) {
            if (gameArray[i][column_clicked].token < 1) {
                rowToPlacePiece = i;
                return rowToPlacePiece;
            }
        }
    }

    function rowForPiece() {
        putPieceInRow = piecesInColumn - 1;
        return putPieceInRow;
    };


// 2x2 SQUARE BONUS
    function squareBonusCheck(boardArrayClick) {
        if (boardArray[row - 1][column + 1] === 'X') {
            if (boardArray[row - 0][column + 1] === 'X' && boardArray[row - 1][column - 0] === 'X') {
                console.log('SQUAREBONUS top right');
                return;
            }
            ;
        }
        ;
        if (boardArray[row - 1][column - 1] === 'X') {
            if (boardArray[row - 0][column - 1] === 'X' && boardArray[row - 1][column - 0] === 'X') {
                console.log('SQUAREBONUS top left');
                return;
            }
            ;
        }
        ;
        if (boardArray[row + 1][column - 1] === 'X') {
            if (boardArray[row - 0][column - 1] === 'X' && boardArray[row + 1][column - 0] === 'X') {
                console.log('SQUAREBONUS bottom left');
                return;
            }
            ;
        }
        ;
        if (boardArray[row + 1][column + 1] === 'X') {
            if (boardArray[row - 0][column + 1] === 'X' && boardArray[row + 1][column - 0] === 'X') {
                console.log('SQUAREBONUS bottom right');
                return;
            }
            ;
        }
        ;
    };

    function winCondition(row, column, array, player) {
        if (array[row][column].token !== player) {
            return false
        }
        var row_direction_array = [0, -1, -1, -1];
        var column_direction_array = [-1, 1, 0, -1];

        for (var x = 0; x < row_direction_array.length; x++) {
            var row_direction = row_direction_array[x];
            var column_direction = column_direction_array[x];

            var check_row = row + row_direction;
            var check_column = column + column_direction;
            var inline_counter = 1;

            for (var i = 0; i < 2; i++) {
                if (array[check_row] === undefined) {
                }
                else if (array[check_row][check_column] === undefined) {
                }
                else {
                    while (array[check_row][check_column].token === player) {
                        inline_counter += 1;
                        check_row += row_direction;
                        check_column += column_direction;
                        if (array[check_row] === undefined) {
                            break
                        }
                        else if (array[check_row][check_column] === undefined) {
                            break
                        }
                    }
                }
                row_direction *= -1;
                column_direction *= -1;
                check_row = row + row_direction;
                check_column = column + column_direction;
            }
            if (inline_counter >= 4) {
                return true
            }
        }
        return false
    }




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
            [ //column 0

                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
            ],

            [ //column 1

                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
            ],

            [ //column 2

                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
            ],
            [  //column 3

                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
            ],
            [ //column 4

                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
            ],
            [ //column 5

                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
                {token: null},
            ],
            [ //column 6

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
        console.log('Reset game function working.');
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


//count the number of pieces in column, we will start at 0,0 and go down the column to see how many pieces are present
    function getNewTokenRow(column, array) {
        var newTokenRow = array.length - 1;
        while (array[newTokenRow][column].token !== null) {
            newTokenRow -= 1;
            if (newTokenRow < 0) {
                console.log('The column is full.');
                return
            }
        }
        return newTokenRow
    }


//Functions for win and draw modals

    function winModal() {
        $(".winModal").show()
    }

    function drawModal() {
        $(".drawModal").show()
    }

    function hideWinModal() {
        $(".winModal").hide()
    }

    function hidDrawModal() {
        $(".drawModal").hide()
    }


