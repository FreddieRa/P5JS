function Letter(letter, x, y, z, depth, size, resolution, bevelled = true, font = "Georgia", style = BOLD){
	this.letter = letter; // Letter
	this.pos = createVector(x, y, z); // Position
	this.depth = depth; // Depth in the z axis
	this.size = size; // Size that each "pixel" (cube) is
	this.res = resolution; // Number of cubes per character (higher is more detailed)
	this.bevelled = bevelled; // Outer two z-layers are smaller to give a 3D effect
	this.font = font;
	this.style = style;
	

	this.create = function() {
		// Create the 2D graphic
		var test = createGraphics(this.res, this.res);
		var array = [];

		// Draw the given character in the centre
		test.textAlign(CENTER, CENTER);
		test.textSize(this.res * 6 / 5)
		test.textFont(font);
		test.textStyle(style);
		test.background(255);
		test.text(this.letter, test.width / 2, test.height / 2);

		// Put all of the non-white pixels in an array as 1s
		test.loadPixels()
		for (var x = 0; x < test.width; x++) {
			array.push([]);
			for (var y = 0; y < test.height; y++) {
				if (test.get(x, y)[0] != 255) {
					array[x].push(1);
				} else {
					array[x].push(0);
				}
			}
		}

		return array;
	}

	this.array = this.create();
	this.rects = getRects(this.array, this.bevelled);
	
	this.show = function() {
		for(var Rect of this.rects){
			var w = Rect.x2 - Rect.x1 + 1;
			var h = Rect.y2 - Rect.y1 + 1;
			var xPos = Rect.x1 + w/2;
			var yPos = Rect.y1 + h/2;
			
			push();
			
			translate(this.pos.x + (xPos - this.res / 2) * this.size, this.pos.y + (yPos - this.res / 2) * this.size, this.pos.z);
			box(w * this.size, h * this.size, this.depth * this.size * Rect.b);
			
			pop();
			
		}
	}

}