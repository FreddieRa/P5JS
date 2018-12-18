/**
 * 
 * The p5.EasyCam library - Easy 3D CameraControl for p5.js and WEBGL.
 *
 *   Copyright 2018 by Thomas Diewald (https://www.thomasdiewald.com)
 *
 *   Source: https://github.com/diwi/p5.EasyCam
 *
 *   MIT License: https://opensource.org/licenses/MIT
 * 
 * 
 * explanatory notes:
 * 
 * p5.EasyCam is a derivative of the original PeasyCam Library by Jonathan Feinberg 
 * and combines new useful features with the great look and feel of its parent.
 * 
 * 
 */

/*

Feel free to use this, remix it, embed it, whatever you want just give credit.

All music from the awesome IncredFx, go check him out:
https://soundcloud.com/incredfx

*/


var easycam;


function setup() {
	setupEasyCam();
	background(255);

	sound = 1; // Used by load to check if sound has been properly loaded or not

	//Load the first song
	song = 1
	load(song) // This function just loads in a song by number

	radius = 150; // Radius of the circle made

	number = 50; // Number of points making up the circle
	size = 500 / number // Change the thickness of the blocks based on number so there is always a gap

	baseAngle = HALF_PI;
	angle = baseAngle; // Used to draw the circle of points

	frameRate(60);;

	fft = new p5.FFT(); // This allows us to then generate a waveform and spectrum

	amplitude = new p5.Amplitude();
	amplitude.setInput(sound);
	
	add = TWO_PI / number;
}


function draw() {
	drawEasyCam();
	normalMaterial();
	
	if (sound.isLoaded()) {
		if (sound.isPlaying() == false && sound.isPaused() == false) { // Will return true if a sound has just been loaded in
			sound.play();
			fft = new p5.FFT(); // Generate a new Fourier Transform for the new track
			amplitude.setInput(sound);
		}
	} else {
		sound.pause(); // This will trigger while waiting for a new track to load
	}

	magnitude = radius / 20
	angle = baseAngle;

	var spectrum = fft.analyze(); // This is what gives us the shape
	var waveform = fft.waveform(); // I am not using waveform but it's here if you want it
	////////

	for (var i = 0; i < number; i++) {
		push();
		spec = spectrum[i * 2]; // Most of the 1024 parts of the spectrum are unused, we only need 1-200ish really (does depend on the song)

		tallness = sq(map(spec, 0, 255, 0, 5)); // Squaring the map() just means there is a bigger difference between the highs and the lows

		level = amplitude.getLevel(); // Get the current volume

		x1 = sin(angle) * radius; // Get the inner coords of the point on the circle using trig
		y1 = cos(angle) * radius;

		modifier = (1 + tallness / 2) * (1 + level / 10); // This basically calculates the length of each line, play around with the values!
			
		translate(x1, y1, 5*modifier) // Move the box to its point on the circle and adjust the height so it appears to stay still
		rotateZ(-angle)
		box(size, size, 10*modifier)

		angle += add;
		pop();
	}
	//////	

}


// Custom functions

function keyPressed() {
	if(keyCode == RIGHT_ARROW){next()} // Next track (loops back to start if at end)
	if(keyCode == LEFT_ARROW){prev()} // Previous track (loops back to end if at start)
	if(keyCode == DOWN_ARROW){noLoop(); sound.pause()} // noLoop() is used to make sure the wave freezes
	if(keyCode == UP_ARROW){loop(); sound.play()}
	if(keyCode == 32){setOrtho *= -1}
	if(key == "M"){mute = !mute}
}

function next() {
	if (song < 6) {
		song++
	} else {
		song = 1
	}
	load(song)
}

function prev() {
	if (song > 1) {
		song--
	} else {
		song = 6
	}
	load(song)
}

function load(num) {
	if (sound != 1) {
		sound.stop();
	} // Stop current sound from playing, unless its the very first time loading
	sound = loadSound(num + '.mp3')
}





// Easy Cam Code (look at my Easy Cam Template sketch)


function setupEasyCam() {
	pixelDensity(1);
	setOrtho = 1;
	createCanvas(windowWidth, windowHeight, WEBGL);
	setAttributes('antialias', true);
	easycam = new Dw.EasyCam(this._renderer, {
		distance: 500,
		rotation : [0.81915, 0.57358, 0, 0]
	});
	easycam.setDistance(400, 2500);
}

function drawEasyCam() {
	if (!easycam) return;
	// projection
	var cam_dist = easycam.getDistance();
	var oscale = cam_dist * 0.001;
	var ox = width / 2 * oscale;
	var oy = height / 2 * oscale;
	if (setOrtho == 1) {
		ortho(-ox, +ox, -oy, +oy, -10000, 10000)
	}
	else{
		perspective()
	}
	easycam.setPanScale(0.004 / sqrt(cam_dist));
	ambientLight(150);
	pointLight(255, 255, 255, 100, 100, 100);
	background(255);
	noStroke();
}


function windowResized() {
	if (!easycam) return;
	resizeCanvas(windowWidth, windowHeight);
	easycam.setViewport([0, 0, windowWidth, windowHeight]);
}


(function() {

	var loadJS = function(filename) {
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", filename);
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	loadJS("https://rawgit.com/diwi/p5.EasyCam/master/p5.easycam.js");

	document.oncontextmenu = function() {
		return false;
	}
	document.onmousedown = function() {
		return false;
	}

})();