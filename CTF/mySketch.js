function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	//rectMode(CENTER);
	textAlign(CENTER)
	noStroke();
	textSize(32)
	cx = width/2;
	cy = height/2;
	
	current = 0;

	makeMaps();
	map = map1;
	
	// Team colours, controls, and starting positions
	teams = [color(255, 20, 20), color(35, 180, 255)];
	controls = [[87, 65, 83, 68],[UP_ARROW, LEFT_ARROW, DOWN_ARROW, RIGHT_ARROW]];
	starts = [[200, height/2], [width-200, height/2]];
	flagstarts = [[90, height/2], [width-90, height/2]];
	
	
	// Max velocity of the players
	maxSpeed = 8;
	speed = 0.5;
	
	players = [];
	obstacles = [];
	flags = []
	
	// How large the "safety strip" is on both sides
	safety = 60;
	
	// How many players
	number = 2;
	
	// How long it takes to respawn (in seconds)
	respawn = 3
	
	// Add in new players, and also mark them as obstacles
	for(var i = 0; i < number; i++){
		temp = new Player(starts[i][0], starts[i][1], 45, i);
		players.push(temp);
		obstacles.push(temp);
	}
	
	// Put in all the obstacles
	for(var i = 0; i < map.length; i++){
		block = map[i]
		obstacles.push(new Obstacle(block[0], block[1], block[2], block[3]));
	}
	
	// Spawn the flags
	for(var i = 0; i < number; i++){
		flags.push(new Flag(flagstarts[i][0], flagstarts[i][1], 35, i))
	}
	
}

function draw() {
	background(200);
	
	//if(frameCount % 600 == 0){changeMap()};
	
	// Draw both coloured halves
	fill(teams[0]);
	rect(safety,0,cx, height)
	fill(teams[1]);
	rect(cx,0,cx-safety, height)
	
	for(var i = 0; i < players.length; i++){
		for(var j = 0; j < obstacles.length; j++){
			if(j != i){ // Doesn't need to check against itself
				players[i].collide(obstacles[j])
				if(obstacles[j] instanceof Obstacle){ // Players get drawn separately 
					obstacles[j].show();
				}
			}
		}
		players[i].update();
		players[i].show();	
		
		if(players[i].score >= 10){
			background(255)
			fill(0)
			textSize(100)
			text("Player " + (players[i].team + 1) + " wins!", cx, cy)
		}
	}
	
	// Show the flags
	for(var i = 0; i < flags.length; i++){
		flags[i].update();
		flags[i].show();
	}

}





function keyPressed() {
	if(keyCode ==  32){changeMap()}
}


function changeMap(){
	current = (current + 1) % 3
	map = maps[current]
	
	obstacles = obstacles.slice(0, 4)
	
	for(var i = 0; i < map.length; i++){
		block = map[i]
		obstacles.push(new Obstacle(block[0], block[1], block[2], block[3]));
	}
	
}