function Fruit() {
	this.pos = createVector(random(100, width-100), height, 0)
	this.vel = createVector(random(-5, 5),random(-15, -10),0)
	this.acc = createVector(0,0.2,0)
	this.model = random([apple, pineapple, bannana])
	
	this.rot = createVector(0,0,0)
	this.rotvel = createVector(random(0,0.1),random(0,0.1),this.vel.x*0.02)
	
	this.update = function() {
		this.pos.add(this.vel)
		this.vel.add(this.acc)		
		this.rot.add(this.rotvel)
	}
	
	this.start = function(val) {
		this.vel = createVector(random(30,60)*val,0.2,0)
		this.acc = createVector(0,0.8,0)
	}
	
	this.show = function() {
			push()
			normalMaterial()
			translate(this.pos)
			rotateX(this.rot.x)
			rotateY(this.rot.y)
			rotateZ(this.rot.z)			
			scale(200)
			model(this.model)
			pop()
	}
}


function Bomb() {
	this.pos = createVector(random(0, width), height, 0)
	this.vel = createVector(random(-5, 5),random(-25, -20),0)
	this.acc = createVector(0,0.8,0)
	this.model = bomb
	
	this.rot = createVector(0,0,0)
	this.rotvel = createVector(random(0,0.1),random(0,0.1),this.vel.x*0.02)
	
	this.update = function() {
		this.pos.add(this.vel)
		this.vel.add(this.acc)		
		this.rot.add(this.rotvel)
	}

	this.show = function() {
			push()
			ambientMaterial(10)			
			//specularMaterial(5)
			push()
			stroke(0)
			translate(this.pos)
			rotateX(this.rot.x)
			rotateY(this.rot.y)
			rotateZ(this.rot.z)			
			scale(200)
			model(bomb)
			pop()
			
			// Draw the outline
			push()
			// Red
			strokeWeight(5)
			stroke(255,0,0)
			ambientMaterial(255,0,0)
			// Colourful
			//normalMaterial()
			translate(this.pos.x, this.pos.y, this.pos.z-200)
			rotateX(this.rot.x)
			rotateY(this.rot.y)
			rotateZ(this.rot.z)			
			scale(220)
			model(bomb)
			pop()
	}
}