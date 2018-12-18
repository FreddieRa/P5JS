function Player(x, y, size, team){
	this.x = x;
	this.y = y;
	
	this.sizex = size;
	this.sizey = size;
	
	this.team = team;
	this.enemy = this.team == 1 ? 0: 1;
	
	this.colour = teams[team];
	this.controls = controls[team];
	
	this.hasFlag = false;
	
	this.score = 0;
	
	this.dead = false;
	this.killable = true;
	this.timer = 0;
	this.alpha = 255;
	
	this.zone = this.team;
	
	this.start = createVector(x, y)
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.vel.limit(maxSpeed);
	
	this.offset = this.size/2
	
	this.update = function(){
		this.enemyPlayer = players[this.enemy]
		if(!this.dead){
			if(keyIsDown(this.controls[0])){this.vel.y -= speed} // Up
			if(keyIsDown(this.controls[1])){this.vel.x -= speed} // Left
			if(keyIsDown(this.controls[2])){this.vel.y += speed} // Down
			if(keyIsDown(this.controls[3])){this.vel.x += speed} // Right
			this.pos.add(this.vel);
			this.vel.mult(0.95); // Friction to slow you down
		}
		// If dead...
		else{
			if(this.timer <= 0){ // Check if no longer dead and reset variables
				this.dead = false;
				this.timer = 5 * 60;
				this.alpha = 255;
			}
			else{
				this.timer --;
			}
		}
		
		this.checkZone() // Find out what zone to check whether or not you can be killed
	}
	
	this.show = function(){
		// Black box
		fill(0, this.alpha)
		rect(this.pos.x-this.sizex/2, this.pos.y-this.sizey/2, this.sizex, this.sizey)
		fill(0)
		text(this.score, this.start.x, 50)
		// Inner colour
		fill(this.colour)
		rect(this.pos.x-(this.sizex*0.8)/2, this.pos.y-(this.sizey*0.8)/2, this.sizex*0.8, this.sizey*0.8)		
	}
	
	this.checkZone = function() {
		
		this.touchdown = function(){
			if(this.zone == this.team){
				if(this.hasFlag){
					this.score ++;
					this.die()		
					this.enemyPlayer.die()
				}
			}
			else{this.killable = false;}
		}
		
		if(this.pos.x < cx){
			if(this.pos.x < safety){
				this.touchdown()		
			}
			else{this.zone = 0; this.killable = true;}
		}
			
		if(this.pos.x > cx){
			if(this.pos.x > width-safety){
				this.touchdown()	
			}
			else{this.zone = 1; this.killable = true;}
		}
		
	} // Close checkZone
	
	
	// Fade out and go back to the start where you can't move for a certain amount of time
	this.die = function() {
		if(this.killable){
			this.dead = true;
			this.pos = this.start.copy();
			this.timer = respawn * 60;
			this.alpha = 120;
			this.vel.set(0,0)
		}
	}

	
	// This function takes both a player and obstacle object and checks for collisions using the p5.collide2d library
	this.collide = function(other){
		if(collideRectRect(this.pos.x-this.sizex/2, this.pos.y-this.sizey/2, this.sizex, this.sizey, other.pos.x-other.sizex/2, other.pos.y-other.sizey/2, other.sizex, other.sizey)){
			if(other instanceof Player && !this.dead){ // If the other object is a player, push them back and see if they die,, but only if you are allive
				other.vel.add(this.vel);
				//other.pos.add(other.vel);
				if(other.zone != other.team){
					other.die()
				}
			}
			
			this.vel.mult(-0.8); // Bounce back
			this.pos.add(this.vel);
		}
	}
}