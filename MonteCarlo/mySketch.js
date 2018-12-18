/*
Results
Each run for 600 frames; 10 spawned per second; lowX = 0; upX = 3
Actual value = 9
10 - 12.846941204475126
15 - 11.580050293378038
20 - 11.287128712871286
25 - 10.098335854765507
30 - 9.465831644870141
35 - 10.300146412884335
40 - 9.310344827586206
45 - 8.667967364313586
50 - 9.829515183803942
100 - 10.02411298656562

*/

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	w = width/2
	h = height/2
	z = 20 // Zoom Level
	equation = "y = x^2"
	stored = []
	
	lowX = 0
	upX = 3
	
	lowY = 0
	upY = 30
	
	addButtons()
	
	equation = cleanEquation(equation)

	area = (upX-lowX)*(upY-lowY)	
	
	points = []
	pointsin = []

	start = true;
	
	adjustment = 1;
	
	perFrame = 50; // How many points are added each frame (higher is faster to converge but may lag)
	
	zooms = {0: 0.1, 2: 1, 20: 1, 40: 2, 60: 5, 100: 10, 150: 20}
	deltaZooms = {0: 2, 2: 2, 20: 2, 40: 2, 60: 5, 100: 10, 150: 20}
	quality = {0: 0.02, 2: 0.05, 20: 0.1, 40: 0.15, 60: 0.25, 100: 0.5, 150: 1}
}

function draw() {
	background(255)
	setStep()
	drawGrid()
	drawAxes()
	
	if(start){
		for(var i = 0; i < perFrame; i ++){
			addPoints()
		}
		showPoints()
		showArea()
	}
	showLabels()
	
	// 30 second cut off for testing
	//if(frameCount >= (600)){start = false; print(curveArea); noLoop()}

}