// set initial board status
function start_game(n) {
    score = 0;
    let board = [];
    document.getElementById("game-board").style.width = `${n*100}px`
    document.getElementById("game-board").style.height = `${n*100}px`
    for (let i = 0; i < n; i++) {
        board.push(new Array(n).fill(0));
    };
    board = place_tile(board, n);
    board = place_tile(board, n);
    draw_board(board, n);  
    return board;
};

// draw board on screen
function draw_board(board, n) {
    const b = document.getElementById('game-board');
    while(b.hasChildNodes()) {
        b.removeChild(b.firstChild);
    };

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] != 0) {
                var tile = document.createElement('div');
                tile.setAttribute('class', 'tile');
                tile.style.top = `${100 * i + 5}px`
                tile.style.left = `${100 * j + 5}px`
                tile.innerHTML = board[i][j];
                b.appendChild(tile);
                // console.log(i,j);
            };
        };
    };
};

// move tiles
function move(board, n, action) {
    // console.log(action);
    switch (action) {
        case "w":
            break;
        case "s":
            
            break;
        case "a":
          
            break;
        case "d":
        
            break;
    }

    board = place_tile(board, n);
    draw_board(board, n);
    return board;
};

// place tile on empty spots on grid
function place_tile(board, n) {
    let empty = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == 0) {
                empty.push([i,j]);
            };
        };
    };

    if (empty.length == 0) {
        console.log("game ended!"); // change this
    } else {
        const coords = empty[Math.floor(Math.random()*empty.length)];
        board[coords[0]][coords[1]] = 2;
    };
    return board;
};

// detect key press
function control(e) {
    if (e.code === "ArrowUp" || e.code === "KeyW") board = move(board, n, "w");
    else if (e.code === "ArrowDown" || e.code === "KeyS") board = move(board, n, "s");
    else if (e.code === "ArrowLeft" || e.code === "KeyA") board = move(board, n, "a");
    else if (e.code === "ArrowRight" || e.code === "KeyD") board = move(board, n, "d");
};

let n = 4;
var score = 0;
let board = start_game(n);

// event handler for moving tiles
document.addEventListener('keyup', control);

// event handler for restart button
document.getElementById("restart-button").addEventListener('click', () => {board = start_game(n);});