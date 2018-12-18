/*

TODO: 
 - (DONE) Do check every x, and stop showing any runes with score 0 (i.e. none of it hs been completed yet)
 - (DONE - Redundant) Base off of centre of mass not first point
 - (DONE) Cycle through each point and base that off the first point, accepting the highest score as the correct one
 
 
*/


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255, 255, 255);
	noFill();
	strokeWeight(3);
	textAlign(CENTER, CENTER)
	textSize(32)
	
	// A 2D array of the shapes you have drawn, where each array is a seperate line
	shapes = [[]]
	
	// Imports the runes (node maps) from the third tab where defined
	maps = GenMaps()
	
	// Colour of the drawn rune
	col = color(0, 0, 0)
	
	// What the system considers the rune to be (empty until decided)
	rune = "";
	
	next = false; // After you submit a rune, if you start drawing it will auto-start a new one
	debug = false; // When you submit a rune will show what score it gave each rune
	guides = true; // Shows the green guides of the shape
}

function draw() {
	background(255)
	
	stroke(col)
	strokeWeight(3);
	noFill()
	
	// Draw the shapes drawn
	for(var i = 0; i < shapes.length; i++){
		drawPoints(shapes[i], false)
	}
		
	// Draw the faint outlines of the runes
	if(shapes[0].length > 1){
		for(var i = 0; i < maps.length; i++){
			if(rune == maps[i].name || rune == ""){
				if(guides){runCheck(simp(shapes, 10), 0.3, false, false)}
			}
		}
	}
	

	strokeWeight(1)
	stroke(0)
	fill(0)
	// If it recognises a spell, show it
	text(rune, width/2, height-100)

}


////////////////////////////////////////////// IO /////////////////////////////////////////////////////

// Draw

//	/*
function mouseDragged() {
	if(next){reset(); next = false}
	// Add to the most recent array the current point
	shapes[shapes.length-1].push({x: mouseX, y: mouseY})
	return false
}

// Create a new subarray when you release the button so it doesn't join up seperate parts
function mouseReleased() {
	shapes.push([])
}
//	*/

function mousePressed() {
	//shapes[shapes.length-1].push({x: mouseX, y: mouseY})
}



function keyPressed() {
	// Clear the screen and delete currently drawn shape
	if(key === 'X'){
		reset()
	}
	
	if(key === 'D'){
		debug = !(debug)
	}
	
	if(key === 'O'){
		guides =!(guides)
	}
	
	if(key === 'N'){
		shapes.push([]) // Used for alternate drawing mode (drawing point by point)
	}
	
	// "Submit" the shape to be checked against runes
	if(keyCode === 32){
		shapes = simp(shapes, 10)
		runCheck(shapes, 0.7, debug, true)
		next = true;
	}
		
	// Used for creating NodeMaps of runes, prints all drawn points in format required
	if(key == 'S'){
		shapes = simp(shapes, 10)
		print(JSON.stringify(this.shapes))
	}
}