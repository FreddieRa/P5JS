function addButtons() {
	input = createInput();
	input.size(200, 40)
	input.value(equation)
	input.position(width / 2 - input.width / 2, height - 200);
	
	
	//labelSpace = createDiv("Number of boxes")
	//labelSpace.position(30, 85)
	//sliderSpace = createSlider(0.5, 1, 1 / space, 0.01);
	//sliderSpace.position(20, 110);
	//sliderSpace.input(function() {
	//	space = 1 / sliderSpace.value()
	//})
	

	labelYw = createDiv("Y-Scale")
	labelYw.position(30, 150)
	inputYw = createInput();
	inputYw.size(60, 20)
	inputYw.value(0.1)
	inputYw.position(30, 175);
	inputYw.input(function() {
		yw = inputYw.value()
	})


	examples = {
		"y = x^2 + z^2": 0.1,
		"y = x^2 * z^2": 0.0002,
		"y = sin(x+z)": 10,
		"y = log(x^2 + z^2)": 15,
		"y = e^(x*z)": 1,
		"y = (sin(x*4))*(cos(201*(z*4) + (fc/10)))": 20,
		"y = sin(dist(x/2,z/2,0,0) - fc/8)": 10,
		"y = 1-abs(x+z)-abs(z-x) + 60": 2,
		"y = abs(x)*abs(z)": 0.2,
		"y = (x+z)*(sin(z))": 2,
		"y = Math.tanh(x) / Math.tanh(z)": 100,
		"y = sign(tan(x*z))": 100,
		"y = dist(x, z, 0, 0) > 10 ? 10 : 1": 10,
		"y = abs((z^2)/x)*-1 + abs((x^2)/z)*-1":0.5,
		"y = sin(fc/2 - Math.abs(x) - Math.abs(z))": 10,
		"y = noise(x/200 + fc/100, z/200 + fc/100) - 0.5": 100,
		"y = (x^2 + z^2) * pow(abs(sin(fc/8))*.6, sin(fc/8)) * .6": 0.1,
		"0.2*(y-1)^2 = -0.3*(x-1)^2 - 0.3*(z-1)^2 + 15": 3,
	}

	selectExamples = createSelect()
	selectExamples.position(input.x + input.width, input.y)
	selectExamples.size(19, input.height)
	for (example in examples) {
		selectExamples.option(example)
	}
	selectExamples.changed(function() {
		input.value(selectExamples.value());
		equation = cleanEquation(input.value())
		inputYw.value(examples[selectExamples.value()])
		yw = examples[selectExamples.value()]
	})
}



function keyPressed() {
	switch (keyCode) {
		case ENTER:
			if (input.value() != "") {
				equation = cleanEquation(input.value());
			} else {
				equation = ["y=0"]
			}
			break;
		case UP_ARROW:
			zoom(2)
			break;
		case DOWN_ARROW:
			zoom(0.5)
			break;
		case 219:
			space *= 1.5
			break;
		case 221:
			space *= (2/3)
			break;
		case 163:			
			break;
	}
}