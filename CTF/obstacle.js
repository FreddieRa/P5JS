function Obstacle(x, y, sizex, sizey){
	this.x = x;
	this.y = y;
	this.sizex = sizex;
	this.sizey = sizey;
	
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);	
	
	this.show = function(){
		fill(0)
		rect(this.pos.x-this.sizex/2, this.pos.y-this.sizey/2, this.sizex, this.sizey)
		fill(0)
		rect(this.pos.x-this.sizex/2, this.pos.y-this.sizey/2, this.sizex, this.sizey)
	}	
}