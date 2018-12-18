function addPoints() {
		px = random(lowX, upX)
		py = random(-lowY, -upY)
		if(plotEquation(equation, px) < py){pointsin.push([px,py])}
		else{points.push([px,py])}
}

function showPoints() {
		for(var i = 0; i < points.length; i++){
			noStroke()
			fill(255,0,0)
			ellipse(w + points[i][0]*spaceY, h + points[i][1]*spaceY, 10)
		}
		
		for(var i = 0; i < pointsin.length; i++){
			noStroke()
			fill(0,255,0)
			ellipse(w + pointsin[i][0]*spaceY, h + pointsin[i][1]*spaceY, 10)
		}
}

function showArea() {
		curveArea = (pointsin.length/(points.length + pointsin.length)) * area
		fill(255)
		stroke(0)
		strokeWeight(1)
		rect(width/2 - input.width/2, height - 150, 200, 40)
		fill(0)
		noStroke()
		text("Area: " + curveArea, width/2 - input.width/2 + 20, height - 125)
}