// set initial board status
function start_game(n) {
    let board = [];
    for(let i = 0; i < n; i++) {
        board.push(new Array(n).fill(0));
    };
    coords = [];
    for(let i = 0; i < 4; i++) {
        coords.push(Math.floor(Math.random()*n));
    };
    while(coords[0] == coords[1] && coords[2] == coords[3]) {
        coords[1] = Math.floor(Math.random()*n);
        coords[3] = Math.floor(Math.random()*n);
    };
    board[coords[0]][coords[2]] = 2;
    board[coords[1]][coords[3]] = 2;    
    return board;
};

// draw board on screen
function draw_board(board, n) {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(board[i][j] != 0) {
                var tile = document.createElement('div');
                tile.setAttribute('class', 'tile');
                tile.style.top = `${100 * i + 5}px`
                tile.style.left = `${100 * j + 5}px`
                tile.innerHTML = board[i][j];
                document.getElementById('game-board').appendChild(tile);
                // console.log(i,j);
            };
        };
    };
};

let n = 4;
let board = start_game(n);
draw_board(board,n);


