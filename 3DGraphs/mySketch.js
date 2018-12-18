function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB)
	cam = createEasyCam()
	background(0,0,100);
	
	axes = 60*4
	lim = 30
	yw = 0.1
	space = 1.5
	size = space
	
	w = 4
	
	rev = 1
	
	equation = "y = x^2 + z^2"
	addButtons()
	equation = cleanEquation(equation)
	
	restart = false;
	cArray = []
	
	noiseDetail(8, 0.65);
	cubes = false;
}

function draw() {
	background(0,0,100)
	
	strokeWeight(0.5)
	stroke(0)
	fill(0)
	ambientMaterial(240, 100, 100)
	box(axes, 3, 3)
	ambientMaterial(120, 100, 100)
	box(3, axes, 3)
	ambientMaterial(360, 100, 100)
	box(3, 3, axes)
	
	noFill()
	strokeWeight(2)
	// Draw the first set of lines
	for(var x = balance(-1*lim); x < balance(lim)+space; x+=space){
		beginShape()
		for(var z = balance(-1*lim); z < balance(lim)+space; z+=space){
			if(equation.length == 1){
				plotEquation(equation, x, z)
			}
			else{
				plotEllipse(equation, x, z)
			}
		}
		endShape()
	}
	// Draw the second set of lines (comment out if using points)
	if(equation.length == 1){
		for(var z = balance(-1*lim); z < balance(lim)+space; z+=space){
			beginShape()
			for(var x = balance(-1*lim); x < balance(lim)+space; x+=space){
				plotEquation(equation, x, z)
			}
			endShape()
		}
	}
}

function balance(val){
	newval = val > 0 ? val + val%space : val - val%space
	return(newval)
}

function zoom(val) {
	lim = lim/val
	space = space/val
	w = w*val
}