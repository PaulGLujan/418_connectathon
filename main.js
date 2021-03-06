$(document).ready(initializeGame);

function initializeGame(){
    attachClickHandlers();
    
    $(".player1").find(".token1").hide();
    startMenu();

};

function attachClickHandlers(){
    $(".forfeitButton").on("click", resetGame);
    $(".column").on("click", piecePlacement);
    $("#playButton").on("click", getInput);
    $("#playButton").on("click", hideStartMenu);
    $("#playButton").on("click", resetGame);

    $('.gameBoard').on('mouseover', '.column0', hoverEffect);
    $('.gameBoard').on('mouseover', '.column1', hoverEffect);
    $('.gameBoard').on('mouseover', '.column2', hoverEffect);
    $('.gameBoard').on('mouseover', '.column3', hoverEffect);
    $('.gameBoard').on('mouseover', '.column4', hoverEffect);
    $('.gameBoard').on('mouseover', '.column5', hoverEffect);
    $('.gameBoard').on('mouseover', '.column6', hoverEffect);

    $('.gameBoard').on('mouseleave', '.column0', hoverEffectOff);
    $('.gameBoard').on('mouseleave', '.column1', hoverEffectOff);
    $('.gameBoard').on('mouseleave', '.column2', hoverEffectOff);
    $('.gameBoard').on('mouseleave', '.column3', hoverEffectOff);
    $('.gameBoard').on('mouseleave', '.column4', hoverEffectOff);
    $('.gameBoard').on('mouseleave', '.column5', hoverEffectOff);
    $('.gameBoard').on('mouseleave', '.column6', hoverEffectOff);
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
    tokenNumber: 1,
    points: 0,
    squareBonus: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesTied: 0,
};
player[1] = {
    name: "player2",
    tokenNumber: 2,
    points: 0,
    squareBonus: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesTied: 0,
};

var currentPlayer = player[0];

function placePlayerToken(piecesInRow, currentPlayer) {
    
    if (player[0].squareBonus === 0 && player[1].squareBonus === 0){
        if (currentPlayer === player[0]) {
            gameArray[piecesInRow][column_clicked].token = 1;
        } else if (currentPlayer === player[1]) {
            gameArray[piecesInRow][column_clicked].token = 2;
        }
    } else if (currentPlayer.squareBonus === 1){
        gameArray[piecesInRow][column_clicked].token = 3;
        //squareBonus modal HERE~~~~~~~~~~~~~~~~~~
        currentPlayer.squareBonus = 0
    }
    squareBonusCheck(gameArray, piecesInRow, currentPlayer, column_clicked);
}




function displayToken(piecesInRow, column_clicked) {
    if (gameArray[piecesInRow][column_clicked].token === 1) {
        $(".row" + piecesInRow + " .column" + column_clicked).addClass("showPlayer1")
    } else if (gameArray[piecesInRow][column_clicked].token === 2) {
        $(".row" + piecesInRow + " .column" + column_clicked).addClass("showPlayer2")
    } else if (gameArray[piecesInRow][column_clicked].token === 3) {
        $(".row" + piecesInRow + " .column" + column_clicked).addClass("showPlayer3")
    }
}

    function changeTurn() {
        if (currentPlayer === player[0]) {
            currentPlayer = player[1];
        } else if (currentPlayer === player[1]) {
            currentPlayer = player[0];
        };
    };

    function piecePlacement() {
        var jQueryObj = $(this);
        columnIndex(jQueryObj);
        var rowPieceShouldBePlaced = rowIndex();
        placePlayerToken(rowToPlacePiece, currentPlayer);
        displayToken(rowPieceShouldBePlaced, column_clicked);   
        var playerNumber = returnPlayerNumber(currentPlayer);
        removeAllSpinClass();
        winCondition(rowToPlacePiece, column_clicked, gameArray, currentPlayer);
        
        if (currentPlayer.squareBonus === 0){
            changeTurn();
        }

        //console.log('Piece placement function working');
        //console.log('This is: ', this);
    }

    function columnIndex(jQueryObj) {

        column_clicked = parseInt(jQueryObj.attr("id"));

        //console.log('The column clicked was: ', column_clicked);
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
function squareBonusCheck(gameArray, piecesInRow, currentPlayer, column_clicked) {
    if (piecesInRow <=6 && column_clicked <=5){
        if(piecesInRow >=1 && column_clicked >=0){
            if (gameArray[piecesInRow - 1][column_clicked + 1].token === currentPlayer.tokenNumber) {
                if (gameArray[piecesInRow - 0][column_clicked + 1].token === currentPlayer.tokenNumber && gameArray[piecesInRow - 1][column_clicked - 0].token === currentPlayer.tokenNumber) {
                    currentPlayer.squareBonus += 1;
                    console.log('SQUAREBONUS top right');
                    bonus();
                    return;
                };
            };
        };
    };
    if (piecesInRow <=6 && column_clicked <=6){
        if (piecesInRow >=1 && column_clicked >=1){
            if (gameArray[piecesInRow - 1][column_clicked - 1].token === currentPlayer.tokenNumber) {
                if (gameArray[piecesInRow - 0][column_clicked - 1].token === currentPlayer.tokenNumber && gameArray[piecesInRow - 1][column_clicked - 0].token === currentPlayer.tokenNumber) {
                    currentPlayer.squareBonus += 1;
                    console.log('SQUAREBONUS top left');
                    return;
                };
            };
        };
    };
    if (piecesInRow <=5 && column_clicked <=6){
        if (piecesInRow >=0 && column_clicked >=1){
            if (gameArray[piecesInRow + 1][column_clicked - 1].token === currentPlayer.tokenNumber) {
                if (gameArray[piecesInRow - 0][column_clicked - 1].token === currentPlayer.tokenNumber && gameArray[piecesInRow + 1][column_clicked - 0].token === currentPlayer.tokenNumber) {
                    currentPlayer.squareBonus += 1;
                    console.log('SQUAREBONUS bottom left');
                    bonus();
                    return;
                };
            };
        };
    };
    if (piecesInRow <=5 && column_clicked<=5){
        if (piecesInRow >=0 && column_clicked >=0){
            if (gameArray[piecesInRow + 1][column_clicked + 1].token === currentPlayer.tokenNumber) {
                if (gameArray[piecesInRow - 0][column_clicked + 1].token === currentPlayer.tokenNumber && gameArray[piecesInRow + 1][column_clicked - 0].token === currentPlayer.tokenNumber) {
                    currentPlayer.squareBonus += 1;
                    console.log('SQUAREBONUS bottom right');
                    bonus();
                    return;
                };
            };
        };
    };
};


    function winCondition(row, column, array, player) {
        // console.log('chickens');
        // console.log('row', row);
        // console.log('column', column)
        // console.log('array', array)
        // console.log('player:', player);
        row = Number(row);
        column = Number(column);
        if (array[row][column].token !== player.tokenNumber) {
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
                    while (array[check_row][check_column].token === player.tokenNumber) {
                        inline_counter += 1;
                        addSpin(check_row, check_column);
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
            if (inline_counter === 4) {

                win();
                console.log('winner winner chicken dinner for ' + player.name);
                return true
            } else if (inline_counter > 4) {
                bigWin();
                console.log('Extra big win!')
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
        $(".column").removeClass("showPlayer1");
        $(".column").removeClass("showPlayer2");
        $(".column").removeClass("showPlayer3");
        player[0].squareBonus = 0;
        player[1].squareBonus = 0;
        removeAllSpinClass();
        gameArray.length = 0;
        gameArray = [
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
        //console.log('Reset game function working.');
    }

//

//this will count the number of games played
    function gamesPlayed() {
        games_played = games_played + 1;
        //console.log("games played has been incremented", games_played);
        display_stats();

    }

//function to display the stats
function display_stats() {

        $("#gplayed1value").text(games_played-1);
        $("#gplayed2value").text(games_played-1);
        $("#gp1Wins").text(player[0].gamesWon);
        $("#gp2Wins").text(player[1].gamesWon);
        $("#gp1Lost").text(player[0].gamesLost);
        $("#gp2Lost").text(player[1].gamesLost);
    }

//reset the stats
    function reset_stats() {

        $("#gplayed1value").text("0");
        $("#gplayed2value").text("0");
        $("#gp1Wins").text("0");
        $("#gp2Wins").text("0");
        $("#gp1Lost").text("0");
        $("#gp2Lost").text("0");

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


    function hideWinModal() {
        $(".winModal").hide()
    }

function returnPlayerNumber (currentPlayer) {
    var player = currentPlayer.name;
    var playerNumber = 0;
    if( player === 'player1' ){
        playerNumber = 1;
    }
    else if( player === 'player2' ){
        playerNumber = 2;
    }
    return playerNumber
}
function startMenu(){
        document.getElementById('startModal').style.display='block';
        gamesPlayed();
        resetGame();

}
        var modal = document.getElementById('startModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//Clear start menu input field upon click so user can enter name:

$('#player1_input').focus(function() {
    $(this).val('');
});
$('#player2_input').focus(function() {
    $(this).val('');
});

function hideStartMenu() {
    document.getElementById('startModal').style.display='none'

}

function getInput() {
    player[0].name = $("#player1_input").val();
    player[1].name = $("#player2_input").val();
    $("#player1name").text(player[0].name);
    $("#player2name").text(player[1].name);

    console.log("This is the user input: ", player[0].name, player[1].name);
}

function win() {
    currentPlayer.gamesWon += 1;
    console.log("this is win function", currentPlayer.gamesWon);
    resetGame();
    gamesPlayed();
    display_stats();
    document.getElementById('winModal').style.display='block'
}


function bigWin () {
    currentPlayer.gamesWon += 1;
    resetGame();
    gamesPlayed();
    display_stats();
    document.getElementById('bigWinModal').style.display='block'
} 
// Get the modal
var bigwinmodal = document.getElementById('bigWinModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == bigwinmodal) {
        modal.style.display = "none";
    }
}

function addSpin ( row, column ) {
    var rowString = '.row' + row;
    var columnString = '.column' + column;

    $(rowString).find(columnString).addClass('spin_animation');
}

function removeAllSpinClass () {
    $('.gameBoard').find('*').removeClass('spin_animation');
}

function hoverEffect () {
    var classString = $(this).attr('class');
    classString = classString.slice(0, 7);
    classString = '.' + classString;
    $(classString).addClass('column_shadow');
}

function hoverEffectOff () {
    var classString = $(this).attr('class');
    classString = classString.slice(0, 7);
    classString = '.' + classString;
    $(classString).removeClass('column_shadow');
}

function bonus() {
        document.getElementById('bonusModal').style.display='block';

        var bonusmodal = document.getElementById('bonusModal');

window.onclick = function(event) {
    if (event.target == bonusmodal) {
        modal.style.display = "none";
    }
}}