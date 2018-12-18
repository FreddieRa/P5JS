function particle(x,y, fire, vel = true) {
	if(fire){this.length = random(5,9)}
	else{this.length = random(2,5)}
	this.position = createVector(x,y);
	if(vel){this.velocity = createVector(random(-5, 5), random(-5, 5));}
	else	 {this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));}
	if(vel){this.acceleration = createVector(0.01,1/6);}
	else	 {this.acceleration = createVector(0.01,0.01);}
	this.time = 0
	
	this.rot = createVector(0,0,0)
	this.rotvel = createVector(random(0,0.1),random(0,0.1),random(0,0.1))
	

	this.update = function() {
		this.rot.add(this.rotvel)
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.rotate(random(-0.1, 0.1))
		this.time ++
	}
	this.colour = random(255);
	// 320 = nice red
	
	this.show = function() {
		if(fire){fill(color(255, 255-this.time*4, 10, 255-(this.time*2)))}
		else{normalMaterial()}
		push()
		translate(this.position)
		rotateX(this.rot.x)
		rotateY(this.rot.y)
		rotateZ(this.rot.z)	
		box(this.length)
		pop()
	}
}