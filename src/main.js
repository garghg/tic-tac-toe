var player = 1;
var squares = document.getElementsByClassName('square');
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var turnText = document.getElementById("turnText");

function checkWin(currentPlayer) {
    // Loop through each winning combination
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i];
        
        // Get the image elements in the squares
        const imgA = squares[a].querySelector("img");
        const imgB = squares[b].querySelector("img");
        const imgC = squares[c].querySelector("img");

        // Check if all squares have an image and if their data-player matches the current player
        if (imgA && imgB && imgC) {
            if (
                imgA.getAttribute("data-player") === currentPlayer.toString() &&
                imgB.getAttribute("data-player") === currentPlayer.toString() &&
                imgC.getAttribute("data-player") === currentPlayer.toString()
            ) {
                return true;
            }
        }
    }
    return false;
}

function checkTie() {
    // Check if all squares are filled (i.e., they have an image)
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML === "") {
            return false; // If there is an empty square, it's not a tie
        }
    }
    return true; // All squares are filled, it's a tie
}

function playerTurn() {
    // Apply the active player's shadow
    if (player === 1) {
        document.getElementById("player2").style.boxShadow = "none";
        document.getElementById("player1").style.boxShadow = "0px 0px 100px rgba(200, 0, 0, 1.2)";
        turnText.innerHTML = "<b>Turn: &nbsp </b> Red Player"
        player = 2; // Switch to player 2 after this turn
    } else {
        document.getElementById("player1").style.boxShadow = "none";
        document.getElementById("player2").style.boxShadow = "0px 0px 120px rgba(0, 80, 200, 1.2)";
        turnText.innerHTML = "<b>Turn: &nbsp </b> Blue Player"
        player = 1; // Switch to player 1 after this turn
    }
}

// Attach event listeners to each square
function initializeBoard() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {
            placeTurn(i);
        });
    }
}

function placeTurn(squareIndex) {
    var selectedSquare = squares[squareIndex];

    // If the square is already filled, do nothing
    if (selectedSquare.innerHTML !== "") {
        return;
    }

    // Create the image element for the current player's symbol
    var img = document.createElement("img");
    img.setAttribute("id", "x-o-img");
    img.setAttribute("draggable", "false");
    if (player === 1) {
        img.src = "../Img/x.png";  // Path to X image
        img.alt = "Player 1";
        img.setAttribute("data-player", "1");  // Set player 1 attribute
    } else if (player === 2) {
        img.src = "../Img/o.png";  // Path to O image
        img.alt = "Player 2";
        img.setAttribute("data-player", "2");  // Set player 2 attribute
    }
    img.width = 100;  // Set image width
    img.height = 100; // Set image height

    // Add the image to the selected square
    selectedSquare.appendChild(img);

    // Check if the current player has won
    if (checkWin(player)) {
        // Show the win message after placing the image
        setTimeout(() => {
            turnText.innerHTML = `<b>Player ${player} wins!</b>`;
            var resetBtn = document.createElement('button');
            resetBtn.innerHTML = "Reset Game";
            resetBtn.setAttribute('id', 'resetBtn')
            turnText.appendChild(resetBtn);
            resetBtn.addEventListener('click', function() {
                resetGame();
            });
        }, 50); // Adding a slight delay to ensure the image appears before the alert
        return; // Stop further checks if the game is won
    }

    // Check if the game is a tie (i.e., all squares are filled)
    if (checkTie()) {
        setTimeout(() => {
            turnText.innerHTML = `<b>It's a Tie!</b>`;
            var resetBtn = document.createElement('button');
            resetBtn.innerHTML = "Reset Game";
            resetBtn.setAttribute('id', 'resetBtn')
            turnText.appendChild(resetBtn);
            resetBtn.addEventListener('click', function() {
                resetGame();
            });
        }, 50); // Adding a slight delay to ensure the image appears before the alert
        return; // Stop further checks if it's a tie
    }

    // After placing the turn, update the player turn
    playerTurn();
}

function resetGame() {
    //reset player turn
    turnText.innerHTML = "<b>Turn: &nbsp </b> Blue Player";
    // Clear the board
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = ""; // Remove any images inside the squares
    }

    // Reset player to 1 (Player 1 starts again)
    player = 1;
    document.getElementById("player1").style.boxShadow = "none";
    document.getElementById("player2").style.boxShadow = "0px 0px 120px rgba(0, 80, 200, 1.2)";
}

// Initialize the game board when the page loads
window.onload = initializeBoard;
