function addButtons() {
	input = createInput();
	input.size(200, 40)
	input.value(equation)
	input.position(w - input.width/2, height - 200);

	upXButton = createInput();
	upXButton.size(60, 20)
	upXButton.value(upX)
	upXButton.position(100, 20);

	lowXButton = createInput();
	lowXButton.size(60, 20)
	lowXButton.value(0)
	lowXButton.position(100, 80);


	addButton = createButton('Go');
	addButton.size(40, 40)
	addButton.position(w - input.width/2 + 200, height - 200)
	addButton.mousePressed(function(){start = !start; 
																		lowX = int(lowXButton.value());
																		upX = int(upXButton.value()); 
																		upY = slider.value()
																		area = (upX-lowX)*(upY-lowY)
																	 })
	
	slider = createSlider(0, 100, upY);
	slider.position(20, 110);
}

function showLabels() {
	xinnerspace = 5
	yinnerspace = 15
	xspace = 0
	yspace = 60
	x = 20
	y = 20
	boxw = 70
	boxh = 18
	fill(255)
	strokeWeight(1)
	rect(x, y, boxw, boxh)	
	rect(x, y + yspace, boxw, boxh)
	fill(0)
	noStroke()
	text("Upper:", x + xinnerspace, y + yinnerspace)
	text("Lower:", x + xinnerspace, y + yspace + yinnerspace)
	text(slider.value(), 160, 125)
}