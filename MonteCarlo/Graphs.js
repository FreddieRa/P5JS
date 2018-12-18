function drawGrid() {
	spaceY = height/(z)
	spaceX = width/(z)
	stroke(0, 120)
	strokeWeight(1)
	noFill()
	val = 100*step
	drawLine(equation)
	drawVerticals()
	drawHorizontals()
}

function drawAxes() {
	fill(0)
	stroke(0)
	strokeWeight(3)
	line(0, h, width, h)
	line(w, 0, w, height)	
}


////////// Components
// for(var i = lim("x",-1) - (lim("x",-1) % step); i < lim("x",1); i += lineStep) {

function drawLine(equation, col = color(0)) {
	beginShape()
	for(var i = -val/adjustment; i < val/adjustment; i += lineStep) {
		strokeWeight(2)
		stroke(col)
		noFill()
		plotEquation(equation, i)
	}
	endShape()	
}

function drawVerticals() {
	for(var i = -val; i < val; i += step) {
			strokeWeight(1)
			stroke(0, 120)
			line(w + i*spaceY, 0, w + i*spaceY, height)
			
			stroke(0, 200)
			text(toFixed(i,2), w + i*spaceY, h)
	}		
}

function drawHorizontals() {
	for(var i = -val; i < val; i += step) {
		strokeWeight(1)
		stroke(0, 120)
		line(0, h + i*spaceY, width, h + i*spaceY)
		
		stroke(0, 200)
		text(toFixed(-i,2), w, h + i*spaceY)
	}	
}