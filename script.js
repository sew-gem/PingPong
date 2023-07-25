//board
let board;
let context;
let boardHeight = 500;
let boardWidth = 500;

//player
let playerWidth = 10;
let playerHeight = 50;

let player1 = {
    x:10,
    y: boardHeight/2,
    width: playerWidth,
    height: playerHeight
}


window.onload = function(){
    board = document.getElementById("board");
    context = board.getContext("2d");
    board.height = boardHeight;
    board.width = boardWidth;

    //draw intital player1
    context.fillstyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
}