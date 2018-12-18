function Flag(x, y, size, team){
	this.x = x;
	this.y = y;
	this.sizex = size;
	this.sizey = size;
	this.team = team
	this.colour = teams[this.team]
	this.caught = false;
	this.enemy = this.team == 1 ? 0: 1;
	this.enemyPlayer = players[this.enemy]
	
	this.start = createVector(x, y);
	this.pos = createVector(x, y);
	
	this.update = function(){
		if(collideRectRect(this.pos.x-(this.sizex)/2, this.pos.y-(this.sizey)/2, this.sizex, this.sizey, 
											 this.enemyPlayer.pos.x-(this.enemyPlayer.sizex)/2, this.enemyPlayer.pos.y-(this.enemyPlayer.sizey)/2, this.enemyPlayer.sizex, this.enemyPlayer.sizey)
			||
			collideRectRect(this.pos.x-this.sizex/2 -1, this.pos.y - 16, 5, 80, 
											this.enemyPlayer.pos.x-(this.enemyPlayer.sizex)/2, this.enemyPlayer.pos.y-(this.enemyPlayer.sizey)/2, this.enemyPlayer.sizex, this.enemyPlayer.sizey)
			
			){
			this.caught = true;	
		}	
		if(this.caught){this.pos.set(this.enemyPlayer.pos.x,this.enemyPlayer.pos.y - 50) ; this.enemyPlayer.hasFlag = true}
		if(this.enemyPlayer.dead){this.caught = false; this.pos = this.start.copy(); this.enemyPlayer.hasFlag = false}
	}
	
	this.show = function(){
		fill(0)
		rect(this.pos.x-this.sizex/2 -1, this.pos.y - 16, 5, 80)		
		rect(this.pos.x-(this.sizex)/2, this.pos.y-(this.sizey)/2, this.sizex, this.sizey) // Collision rect
		
		fill(this.colour)
		rect(this.pos.x-(this.sizex*0.8)/2, this.pos.y-(this.sizey*0.8)/2, this.sizex*0.8, this.sizey*0.8)
	}	
}