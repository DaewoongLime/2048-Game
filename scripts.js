// set initial board status
function start_game(n) {
    let board = [];
    for(let i = 0; i < n; i++) {
        board.push(new Array(n));
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


let n = 4;
let board = start_game(n);
console.log(board)


