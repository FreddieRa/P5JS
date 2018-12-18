function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	rectMode(CENTER);
	noStroke();
	textSize(18);
	textAlign(CENTER, CENTER);
	rate = 5;
	
	code = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>."
	//code = ""
	
	// This is the string that gets written to when new commands are added 
	updatedCode = "";
	
	input = createInput();
	input.position(width/2 - input.width/2, 100);
	
	
	// Possible instructions
	instructions = ["<", ">", "[", "]", "+", "-", "."];
	
	// Initialise with Hello World code;
	run(code);
	
	// Initalising the array
	array = [];
	
	// Number of cells
	num = 30;

	// Space between boxes
	spacing = width/num;
	
	// Load up the cells
	for(var i = 0; i < num; i++){
		array.push(new Cell(i*spacing + spacing/2, height/2, spacing, 0));
	}
	
	// Starting cell
	current = num/2 - 4;

	// Current output
	output = "";
	
}

function draw() {
	background(255);
	frameRate(rate);
	fill(255);
	textSize(20);
	
	updatedCode = input.value();
	updatedCode = updatedCode.replace(/\s+/g,"");
	//if(updatedCode == ""){updatedCode == input.value()}
	//text(code, width/2, 100)
	
	// Draw the cells, with the current one highlighted in green
	for(var j = 0; j < array.length; j++){
		if(j == current){array[j].show('green'); }
		else{array[j].show('white')}	
	}
	
	// Draw the BF code showing current command in green
	tSize = (20-(map(code.length, 0, 500, 0, 15)))*1.5
	textSize(tSize);
	for(var k = 0; k < code.length; k++){
		if(k == c){fill('green'); textSize(tSize*1.5)}
		else{fill('black'); textSize(tSize)}
		text(code[k], k*cspacing + cspacing, height/2 - 100)
	}
	
	// Draw the BF code showing current command in green
	//for(var m = 0; m < updatedCode.length; m++){
	//	text(updatedCode[m], m*(width/updatedCode.length) + (width/updatedCode.length)/2, 200)
	//}
	
	// Actual Interpreter
	if(c < code.length){
		
		// Go to the left cell
		if (code[c] == '<') {
			if (current > 0) {
				current -= 1;
			}
		} 
		
		// Go to the right cell
		else if (code[c] == '>') {
			current += 1;
			//if (array.length <= current) {
			//	array.push(0);
			//}
		}
		
		// Increment cell value
		else if (code[c] == '+') {
			array[current].update(1);
		} 
		
		// Decrement cell value
		else if (code[c] == '-') {
			if (array[current].value > 0) {
				array[current].update(-1);
			}
		} 
		
		// Output the ASCII value of the current cell
		else if (code[c] == '.') {
			//print(String.fromCharCode(array[pointerLocation]))
			output += String.fromCharCode(array[current].value);
		} 
		
		// Get an input, either a number or a letter (but uses the letter's ASCII code)
		else if (code[c] == ',') {
			x = input("Input:")
			try {
				y = Number(x)
			} catch (error) {
				y = x.charCodeAt()
			}
			array[current].value = y;
		} 
		
		// Start a loop while the value of current cell is not 0, otherwise skip to past the corresponding ']'
		else if (code[c] == '[') {
			if (array[current].value == 0) {
				open_braces = 1
				while (open_braces > 0) {
					c += 1
					if (code[c] == '[') {
						open_braces += 1
					} else if (code[c] == ']') {
						open_braces -= 1
					}
				}
			}
		} 
		
		// Return to the corresponding '['
		else if (code[c] == ']') {
			open_braces = 1
			while (open_braces > 0) {
				c -= 1
				if (code[c] == '[') {
					open_braces -= 1
				} else if (code[c] == ']') {
					open_braces += 1
				}
				c -= 1
			}
		}
		
		// Go to next code command
		c += 1;
	}
	
	fill(0);
	
	// Print current output
	textSize(80);
	text(output, width/2, height-100);
	
	// Print the code that is being written
	textSize(20-(map(updatedCode.length, 0, 500, 0, 15)));
	text(updatedCode, width/2, 200);
}


function run(newCode) {
	// Reset cells
	array = [];
	for(var l = 0; l < this.num; l++){
		array.push(new Cell(l*this.spacing + this.spacing/2, height/2, this.spacing, 0));
	}
	
	// Set the code to what's written
	code = newCode;
	cnum = code.length;
	cspacing = width/(cnum*1.01);
	
	// Start from the beginning of the new code
	c = 0;
	
	// Reset code that's being written
	updatedCode = "";
}



function Cell(x, y, size, value){
	this.x = x;
	this.y = y;
	this.size = size;
	this.value = value;
	
	this.show = function(colour) {
		fill(colour);
		rect(x, y, this.size, 40);
		fill(0);
		textSize(this.size/2);
		text(this.value, x, y);
	}
	
	this.update = function(value) {
		this.value += value;
	}
}





function keyTyped() {
	if(keyCode == LEFT_ARROW){
		current -= 1
	}
	else if(keyCode == RIGHT_ARROW){
		current += 1
	}
	else if(keyCode == UP_ARROW){
		array[current].update(1);
	}
	else if(keyCode == DOWN_ARROW){
		array[current].update(-1);
	}	
	else if(keyCode == 32){
		if(rate==5){rate=60}
		else{rate=5}
	}
	else if(keyCode == ENTER){
		run(updatedCode);
	}
	else if(keyCode == BACKSPACE){
		updatedCode = updatedCode.slice(0, -1);
	}
	else if(instructions.includes(key)){
		updatedCode += key;
	}
}