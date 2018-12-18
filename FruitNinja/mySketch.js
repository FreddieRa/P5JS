/*
A javascript take on the mobile game, but with better colours.

Interesting problems:
 - "Splitting" the fruit, lining up the halves with the original model to look seamless-ish (functions -> splitt)
 - Outlines around the bombs (fruit -> bomb -> this.show)
 - Mouse trail, suprisingly close looking with not too much work (functions -> renderCut)
 - Showing the scoreboard and X's since WebGL doesn't support text (functions -> renderScore/renderXs)
 - Changing combo colours (functions -> renderCombo/toRGB)
*/


function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	ortho(0, width, -height, 0, 0.1, 1000);
	background(255);
	
	loadFruits()
	
	bomb = loadModel("bomb.obj")
	
	song = loadSound("soundtrack.mp3")
	cut1 = loadSound("cut1.mp3")
	cut2 = loadSound("cut2.mp3")
	cut3 = loadSound("cut3.mp3")

	fruits = []
	halves = []
	bombs = []
	particles = []
	
	mousePos = []
	
	
	size = 80 // Size of the bounding box for collisions
	
	score = 0
	strikes = 0
	
	board = createGraphics(200, 40) // Scoreboard
	xs = createGraphics(152, 60) // X's showing strikes
	comboText = createGraphics(600, 70) // Showing the combo when it comes up
	
	persec = 0.75 // How many fruit spawn per second
	fruitPerBomb = 5
	end = false; // Gameover?
	
	tstart = 20
	timer = tstart
	combo = 0
	
	mute = false;
	
	colType = 0;
	colours = [140, 231, 290];
	normalCol = random(colours);
	fire = false;

}


function draw() {	
	background(255)
	
	if(song.isLoaded() && !song.isPlaying()){song.play()}
	
	//Splashscreen
	/*
	normalMaterial()
	translate(width/2-50, height/2)
	scale(600)
	rotateZ(-45)
	model(pineapple)
	*/
	
	// Check for gameover
	if(strikes >= 3){
		endGame()
		song.stop()
	}
	
	if(!mute){song.setVolume(1)}
	else{song.setVolume(0)}
	
	// Add fruit
	if(frameCount % int(60/persec) == 0){add()}
	// Add bombs
	if(frameCount % int((60*fruitPerBomb)/persec) == 0){addBomb()}
	
	// Render the particle effects fof destroyed bombs
	showFire()
	
	// Render the score and X's in the top left/right corners
	renderScore()
	renderXs()
	
	// When a "combo" is reached, display it
	if(combo > 2){
		renderCombo()
	}
	
	// Show the mouse "trail"
	renderCut()
	
	// Smoothly delete the mouse trail when it's not being added to
	if(!(mouseIsPressed)){mousePos.splice(0,1)}
	
	normalMaterial()
	
	
	fruitCollision() // Show fruits and deal with colisions
	renderHalves() // Show halves
	bombCollision() // Show bombs and deal with collisions
	
	// Increase how many fruit are spawing
	if(frameCount % 120 == 0){if(persec < 6){persec += 0.1}}
	
	// Decrement timer
	if(timer > 0){timer --}
		
	if(frameCount % 2 == 0){mousePos.splice(0,1)}
	
}