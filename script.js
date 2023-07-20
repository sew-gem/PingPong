

const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const user = {
    x: 0,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    color: "white",
    score: 0
}

const com = {
    x: canvas.width - 10,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    color: "white",
    score: 0
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    color: "white",
    speed: 5,
    velocityX: 5,
    velocityY: 5
}

const net = {
    x: canvas.width/2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "white"
}



const framePerSecond = 50;
setInterval(game, 1000/framePerSecond); //call game(); 50 times every second

    

function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawNet(){
    for(let i = 0; i <= canvas.height; i += 15){
        drawRect(net.x, net.y+i, net.width, net.height, net.color);
    }
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color){
    context.fillStyle = color;
    context.font = "40px fantasy";
    context.fillText(text, x, y);
}

function render(){
    //clear canvas
    drawRect(0, 0, canvas. width, canvas.height, "balck");
    drawRect(user.score, canvas.width/4, canvas.height/5, "white");
    drawRect(user.score, 3*canvas. width/4, canvas.height/5, "white");

    //draw net
    drawNet();

    //draw score
    drawText(user.score, canvas.width/4, canvas.height/5, "white");
    drawText(com.score, 3*canvas.width/4, canvas.height/5, "white");

    //draw paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    //draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}



//control the user paddle
canvas.addEventListener("mousemove", movePaddle);
function movePaddle(event){
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height/2;
}

//collision detect
function collision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bototm > p.top;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function game(){
    update(); 
    render();
}
render();

function update(){
    //update the ball
    ball.x += velocityX; 
    ball.y += velocityY; 
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }
 
    //simple AI to control the com paddle
    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    //update collide
    let player = (ball.x < canvas.width/2) ? user : com;
    if(collision(ball, player)){
        let collidePoint = (ball.y - (player.y + player.height/2));

        //normalization
        collidePoint = collidePoint/(player.height/2);

        //calculate angle in radian
        let angleRad = (Math.PI/4) * collidePoint;

        // x direction of the ball when it's hit
        let direction = (ball.x < canvas.width/2) ? 1 : -1;

        //change velocity x & y
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY =            ball.speed * Math.sin(angleRad);

        //eveytime the ball hit a paddle, speed increse
        ball.speed += 0.1;
    }

        //update score
        if(ball.x - ball.radis < 0){
            com.score++;
            resetBall();
        }else if(ball.x + ball.radius > canvas.width){
            user.score++;
            resetBall();
        }

}


let computerLevel = 0.1;
com.y += (ball.y - (com.y + com.height/2)) * computerLevel