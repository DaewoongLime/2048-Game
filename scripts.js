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

    const tileColors = {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e',
        4096: '#edb914',
        8192: '#edaa00',
        16384: '#e89c00',
        default: '#000000'
    };
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] != 0) {
                var tile = document.createElement('div');
                tile.setAttribute('class', 'tile');
                tile.style.backgroundColor = tileColors[board[i][j]];
                tile.style.top = `${100 * i + 5}px`;
                tile.style.left = `${100 * j + 5}px`;
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
    let moved = false;
    switch (action) {
        case "w":
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (board[j][i] == 0) {
                        for (let k = j+1; k < n; k++) {
                            if (board[k][i] != 0) {
                                board[j][i] = board[k][i];
                                board[k][i] = 0;
                                moved = true;
                                break;
                            };
                        };
                    };
                    for (let k = j+1; k < n; k++) {
                        if (board[k][i] != 0) {
                            if (board[k][i] == board[j][i]) {
                                board[j][i] += board[k][i];
                                board[k][i] = 0;   
                                score += board[j][i];
                                moved = true;
                            };
                            break;
                        };
                    };
                };
            };
            break;
        case "s":
            for (let i = 0; i < n; i++) {
                for (let j = n-1; j >= 0; j--) {
                    if (board[j][i] == 0) {
                        for (let k = j-1; k >= 0; k--) {
                            if (board[k][i] != 0) {
                                board[j][i] = board[k][i];
                                board[k][i] = 0;
                                moved = true;
                                break;
                            };
                        };
                    };
                    for (let k = j-1; k >= 0; k--) {
                        if (board[k][i] != 0) {
                            if (board[k][i] == board[j][i]) {
                                board[j][i] += board[k][i];
                                board[k][i] = 0;
                                score += board[j][i];
                                moved = true;
                            };
                            break;
                        };
                    };
                };
            };
            break;
        case "a":
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (board[i][j] == 0) {
                        for (let k = j+1; k < n; k++) {
                            if (board[i][k] != 0) {
                                board[i][j] = board[i][k];
                                board[i][k] = 0;
                                moved = true;
                                break;
                            };
                        };
                    };
                    for (let k = j+1; k < n; k++) {
                        if (board[i][k] != 0) { 
                            if (board[i][k] == board[i][j]) {
                                board[i][j] += board[i][k];
                                board[i][k] = 0;
                                score += board[i][j];
                                moved = true;
                            };
                            break;
                        };
                    };
                };
            };
            break;
        case "d":
            for (let i = 0; i < n; i++) {
                for (let j = n-1; j >= 0; j--) {
                    if (board[i][j] == 0) {
                        for (let k = j-1; k >= 0; k--) {
                            if (board[i][k] != 0) {
                                board[i][j] = board[i][k];
                                board[i][k] = 0;
                                moved = true;
                                break;
                            };
                        };
                    };
                    for (let k = j-1; k >= 0; k--) {
                        if (board[i][k] != 0) { 
                            if (board[i][k] == board[i][j]) {
                                board[i][j] += board[i][k];
                                board[i][k] = 0;
                                score += board[i][j];
                                moved = true;
                            };
                            break;
                        };
                    };
                };
            };
            break;
    }

    if (moved) {
        document.getElementById("score").innerHTML = score;
        board = place_tile(board, n);
        draw_board(board, n);
    };

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