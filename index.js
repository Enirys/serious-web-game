"use strict";

var Game = {
	canvasBg: undefined,
	ctxBg: undefined,
	imgSprite: undefined,
	winSprite: undefined,
	overSprite: undefined,
	projectileSprite: undefined,
	enemy: undefined,
	bgDrawX1: undefined,
	bgDrawX2: undefined,
	drawProjectileX: undefined,
	drawProjectileY: undefined,
	projectileDraw: undefined,
	playerDrawX: undefined,
	playerDrawY: undefined,
	enemySpawn: undefined,
	enemyDrawX: undefined,
	enemyDrawY: undefined,
	enemyLife: undefined,
	enemyDy: undefined,
	enemyDx: undefined,
	score: undefined,
	srcX: undefined,
	srcY: undefined,
	stage1Music: undefined,
	bossMusic: undefined,
	stage1Play: undefined, 
	bossPlay: undefined,
	introMusic: undefined,
	victoryMusic: undefined,
	victoryPlay1: undefined,
	victoryPlay2: undefined,
	lifeX: undefined,
	lifeY: undefined
};

//start function

Game.start = function () {
	Game.canvasBg = document.getElementById("myCanvas");
	Game.ctxBg = Game.canvasBg.getContext("2d");
	Game.canvasProjectile = document.getElementById("myCanvas");
	Game.ctxProjectile = Game.canvasProjectile.getContext("2d");
	Game.canvasPlayer = document.getElementById("myCanvas");
	Game.ctxPlayer = Game.canvasPlayer.getContext("2d");
	Game.canvasEnemy = document.getElementById("myCanvas");
	Game.ctxEnemy = Game.canvasEnemy.getContext("2d");
	Game.imgSprite = new Image();
	Game.imgSprite.src ="Sprites/sprite.png";
	Game.enemy = new Image();
	Game.enemy.src ="Sprites/enemy.png";
	Game.enemyDamage = new Image();
	Game.enemyDamage.src ="Sprites/enemyDamage.png";
	Game.projectileSprite = new Image();
	Game.projectileSprite.src = "Sprites/projectiles.png";
	Game.overSprite = new Image();
	Game.overSprite.src = "Sprites/gameOver.png";
	Game.stage1Music = new Audio();
	Game.stage1Music.src = "music/stage1V1.mp3";
	Game.winSprite = new Image();
	Game.winSprite.src = "Sprites/Youwin.png";
	Game.bossMusic = new Audio();
	Game.bossMusic.src = "music/boss.mp3";
	Game.victoryMusic = new Audio();
	Game.victoryMusic.src = "music/victory.mp3";
	Game.overMusic = new Audio();
	Game.overMusic.src = "music/over.mp3";
	Game.bgDrawX1 = 0;
	Game.bgDrawX2 = 1560;
	Game.playerDrawX = 100;
	Game.playerDrawY = 330;
	Game.enemyDrawX = 600;
	Game.enemyDrawY = 330;
	Game.enemyDx = 3;
	Game.enemyDy = -3;	
	Game.lifeX = 850;
	Game.lifeY = 500;
	Game.drawProjectileX = 850;
	Game.drawProjectileY = 498;
	Game.enemyLife = 50;
	Game.playerLife = 20;
	Game.enemyHits = 0;
	Game.score = 0;
	Game.srcX = 800;
	Game.srcY = 1200;
	Game.stage1Play = true;
	Game.bossPlay = false;
	Game.victoryPlay1 = false;
	Game.victoryPlay2 = false;
	Game.enemySpawn = false;
	Game.mainLoop();
};

//end of start function

document.addEventListener('DOMContentLoaded', Game.start);

/*---------------------Main functions---------------------*/

//update function
Game.update = function () {
	if((Game.stage1Play) && (Game.playerLife > 0)) {
		Game.stage1Music.play();
			if (Game.drawProjectileX > -69)
			{
				Game.drawProjectileX -= 15;
			}

	else if ((Game.drawProjectileX <= -69) && (Game.score < 200))
	{
		Game.score += 5;
		Game.drawProjectileX = 850;
		Game.drawProjectileY = Math.random() * 400;
	}

	if (Game.drawProjectileX <= (Game.playerDrawX + 50) && (Game.drawProjectileX >= Game.playerDrawX) && (Game.drawProjectileY <= (Game.playerDrawY + 145)) && (Game.drawProjectileY >= Game.playerDrawY)) {
		Game.score -= 5;
		Game.playerLife -=1;
		Game.drawProjectileX = 850;
		Game.drawProjectileY = Math.random() * 400;
	}
	}
	else
	{
		Game.stage1Music.pause();
	}

	if((Game.bossPlay) && (Game.playerLife > 0)) {
		Game.bossMusic.play();
		if (Game.drawProjectileX > -69)
		{
			Game.drawProjectileX -= 15;
		}
		else if (Game.drawProjectileX <= -69)
		{
			Game.drawProjectileX = (Game.enemyDrawX + 40);
			Game.drawProjectileY = (Game.enemyDrawY + 100);
		}	

		if (Game.drawProjectileX <= (Game.playerDrawX + 50) && (Game.drawProjectileX >= Game.playerDrawX) && (Game.drawProjectileY <= (Game.playerDrawY + 145)) && (Game.drawProjectileY >= Game.playerDrawY)) 
		{	
			Game.drawProjectileX = (Game.enemyDrawX + 40);
			Game.drawProjectileY = (Game.enemyDrawY + 100);
			Game.playerLife -=1;
		}
}

	if (Game.enemyLife == 0) {
		Game.bossPlay = false;
		Game.victoryPlay1 = true;
		Game.drawWinBg();
		Game.bossMusic.pause();
	}

	if (Game.victoryPlay1) {
		Game.victoryMusic.play();
		Game.victoryPlay1 = false;
		Game.victoryPlay2 = true;
	}
	if (Game.victoryPlay2) {
		Game.playerDrawY = 330;
		Game.playerDrawX += 5;
		Game.drawPlayer();
	}

	if(Game.playerLife == 0) {
		Game.bossMusic.pause();
		Game.stage1Music.pause();
		Game.overMusic.play();
		Game.drawOverBg();
	}
};
//end of update function

//draw function
Game.draw = function () {
		//Game.drawPlayer(Game.srcX,Game.srcY);

		if ((Game.score < 200) && (Game.playerLife > 0)) {
			Game.drawPlayer(Game.srcX,Game.srcY);
			Game.drawScore();
			Game.drawProjectile();
		}
		else if ((Game.score == 200) && (Game.playerLife > 0) && (Game.enemyLife != 0)) 
		{
			Game.stage1Play = false;
			Game.bossPlay = true;
			Game.drawPlayer(Game.srcX,Game.srcY);
			Game.drawEnemy();
		}

		if(Game.enemyDrawX == 600) {
			Game.enemySpawn = true;
		}

		if((Game.enemySpawn) && (Game.enemyLife != 0) && (Game.playerLife != 0)){
		Game.drawEnemyLife();
		Game.drawPlayerLife();
		Game.drawPlayer(Game.srcX,Game.srcY);
		Game.moveEnemy();
		Game.drawProjectile();
	}

};
//end of draw function

//mainLoop function
Game.mainLoop = function () {
	Game.moveBg();
	Game.update();
	Game.draw();
	window.setTimeout(Game.mainLoop, 1000/60);
};

//end of mainLoop function

//Moving background
Game.moveBg = function () {

	Game.bgDrawX1 -= 5;
	Game.bgDrawX2 -= 5;
	if (Game.bgDrawX1 <= -1560) {
		Game.bgDrawX1 = 1560;
	} else if (Game.bgDrawX2 <= -1560) {
		Game.bgDrawX2 = 1560;
	}
	Game.drawBg();
};

Game.drawBg = function () {
	Game.ctxBg.clearRect(0,0,800,600);
	Game.ctxBg.drawImage(Game.imgSprite,0,0,1600,600,Game.bgDrawX1,0,1600,600);
	Game.ctxBg.drawImage(Game.imgSprite,0,0,1600,600,Game.bgDrawX2,0,1600,600);
};

Game.drawWinBg = function () {
	Game.ctxBg.drawImage(Game.winSprite,0,0,800,600,0,0,800,600);
}

Game.drawOverBg = function () {
	Game.ctxBg.drawImage(Game.overSprite,0,0,800,600,0,0,800,600);
};

Game.drawPlayer = function (X,Y) {
	Game.ctxPlayer.drawImage(Game.imgSprite,X,Y,120,167,Game.playerDrawX,Game.playerDrawY,100,145);
};

Game.drawEnemy = function () {
	Game.ctxEnemy.drawImage(Game.enemy,0,0,110,170,Game.enemyDrawX,Game.enemyDrawY,110,160);
};

Game.drawProjectile = function () {
	Game.ctxProjectile.drawImage(Game.projectileSprite,0,0,69,11,Game.drawProjectileX,Game.drawProjectileY,69,11);
};

//Display score function
Game.drawScore = function () {
    Game.ctxPlayer.font = "16px Arial Black";
    Game.ctxPlayer.fillStyle = "white";
    Game.ctxPlayer.fillText("Score: "+Game.score, 8, 20);
}

//Display Player Life function
Game.drawPlayerLife = function () {
    Game.ctxPlayer.font = "16px Arial Black";
    Game.ctxPlayer.fillStyle = "white";
    Game.ctxPlayer.fillText("Player Lives: "+Game.playerLife, 8, 50);
}

//Display Enemy Life function
Game.drawEnemyLife = function () {
    Game.ctxPlayer.font = "16px Arial Black";
    Game.ctxPlayer.fillStyle = "white";
    Game.ctxPlayer.fillText("Enemy: "+Game.enemyLife, Game.canvasPlayer.width-100, 20);
}

//Moving Enemy function
Game.moveEnemy = function () {

	if(Game.enemyDrawX + Game.enemyDx > Game.canvasBg.width - 110 || Game.enemyDrawX + Game.enemyDx < Game.canvasBg.width/2){
		Game.enemyDx = -Game.enemyDx;
	}
	if(Game.enemyDrawY + Game.enemyDy > Game.canvasBg.height -270 || Game.enemyDrawY + Game.enemyDy < 0){
		Game.enemyDy = -Game.enemyDy;
	}
	Game.enemyDrawX += Game.enemyDx;
	Game.enemyDrawY += Game.enemyDy;
};
//end of Moving Enemy Function

//Moving Player function
Game.move = function (e) {

	if ((e.keyCode == 38) && (Game.playerDrawY > 10)) {
		Game.playerDrawY -= 25;

	}
	if ((e.keyCode == 40) && (Game.playerDrawY < 330)){
		Game.playerDrawY += 25;
	}
	if ((e.keyCode == 39) && (Game.playerDrawX < Game.canvasBg.width - 100)) {
		Game.playerDrawX += 25;

	}
	if ((e.keyCode == 37) && (Game.playerDrawX > 0)) {
		Game.playerDrawX -= 25;
	}

	if (e.keyCode == 32) {
		Game.srcX = 920;
		Game.srcY = 1200;
		Game.shoot = true;
		if (Game.playerDrawY >= Game.enemyDrawY && Game.playerDrawY < Game.enemyDrawY + 170){
		Game.ctxEnemy.drawImage(Game.enemyDamage,0,0,110,170,Game.enemyDrawX,Game.enemyDrawY,110,160);
		Game.enemyLife -=1;
		}
		if (Game.enemyLife == 0) {
			Game.enemyDrawY = 900;
			Game.enemyDrawX = 700;
		}
	}
};
//end of Moving Player function

document.onkeydown = Game.move;
