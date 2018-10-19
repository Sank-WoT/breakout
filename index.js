var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bricksArea = {
	rowCount: 3,
	columnCount: 5,
	createBricksArea: function() {
		var bricks = [];
		for(var i = 0; i < this.columnCount; i++) {
			bricks[i] = [];
			for(var j = 0; j < this.rowCount; j++) {
				bricks[i][j] = { x: 0, y: 0, status: 1};
			}
		}
		return bricks;
	}
};

var brick = {
	width: 75,
	height: 20,
	padding: 10,
	offsetTop: 30,
	offsetLeft: 30,
	color: "#0095DD"
};

var bricks = bricksArea.createBricksArea();

var ball1 = {
	x: (canvas.width - 75) / 2,
	y: canvas.height - 10,
	dx: 2,
	dy: -2,
	radius: 10,
	color: "red"
};


var paddle = { 
	x: (canvas.width - 75) / 2,
	y: canvas.height - 10,
	width: 100,
	height: 10,
	color: "blue",
	speed: 7
};

var game = {
	key: {
		rightPressed: false,
		leftPressed: false
	},

    play: function(ball, paddle, brick, bricks, bricksArea) {
    	this.clear();
    	this.draw(ball, paddle, brick, bricks, bricksArea);
		this.moveBall(ball);
		this.movePaddle(this.key.rightPressed, paddle, this.key.leftPressed);
		this.checkLeaveGameArea(ball, paddle);
    },

    clear() {
    	ctx.clearRect(0,0, canvas.width, canvas.height);
    },

    draw(ball, paddle, brick, bricks, bricksArea) {
    	this.drawBall(ball);
		this.drawPaddle(paddle);
    	this.drawBricks(brick, bricks, bricksArea);
    	this.collisionDetection(ball, brick, bricks, bricksArea);
    },

    collisionDetection(ball, brick, bricks, bricksArea) {
	    for(var i=0; i < bricksArea.columnCount; i++) {
	        for(var j=0; j < bricksArea.rowCount; j++) {
	            var b = bricks[i][j];
	            if(b.status == 1) {
					if(ball.x > b.x && ball.x < b.x + brick.width && ball.y > b.y && ball.y < b.y + brick.height) {
                		ball.dy = -ball.dy;
                		b.status = 0;
            		}
	            }
	        }
	    }
	},

    drawBricks(brick, bricks, bricksArea) {
    	for(var i = 0; i < bricksArea.columnCount; i++) {
        	for(var j = 0; j < bricksArea.rowCount; j++) {
        		if(bricks[i][j].status == 1) {
	        		var brickX = (i*(brick.width + brick.padding)) + brick.offsetLeft;
	            	var brickY = (j*(brick.height + brick.padding)) + brick.offsetTop;
	            	bricks[i][j].x = brickX;
	            	bricks[i][j].y = brickY;
		            ctx.beginPath();
		            ctx.rect(brickX, brickY, brick.width, brick.height);
		            ctx.fillStyle = brick.color;
		            ctx.fill();
		            ctx.closePath();
	        	}
	        }
	    }
    },

    drawBall: function(ball) {
		ctx.beginPath();
		ctx.arc(ball.x, ball.y , ball.radius, 10, 75);
		ctx.fillStyle = ball.color;
		ctx.fill();
		ctx.closePath();
    },

    drawPaddle: function(paddle) {
		ctx.beginPath();
	    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
	    ctx.fillStyle = paddle.color;
	    ctx.fill();
	    ctx.closePath();
    },

    moveBall: function(ball) {
    	ball.x += ball.dx;
		ball.y += ball.dy;
    },

    movePaddle(right, paddle, left) {
    	if(right && paddle.x < canvas.width - paddle.width) {
		    paddle.x += paddle.speed;
		}
		else if(left && paddle.x) {
		    paddle.x -= paddle.speed;
		}

        if(paddle.x < 0) {
        	paddle.x = 0;
        }
    },

    checkLeaveGameArea: function(ball, paddle) {
        if(ball.y + ball.dy < 0) {
    	    ball.dy = -ball.dy;
        } else if(ball.y + ball.dy >  canvas.height - ball.radius) {
        	if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            	ball.dy = -ball.dy;
        	} else {
        		alert("Game Over");
        		document.location.reload();
        	}
        }
    
		if(ball.x + ball.dx < 0 || ball.x + ball.dx > canvas.width - ball.radius) {
		    ball.dx = -ball.dx;
		}
    }
};

setInterval(function() {game.play(ball1, paddle, brick, bricks, bricksArea);}, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        game.key.rightPressed = true;
    }
    else if(e.keyCode == 37) {
        game.key.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        game.key.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        game.key.leftPressed = false;
    }
}
