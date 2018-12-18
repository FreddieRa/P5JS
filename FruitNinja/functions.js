// Loading

function loadFruits() {
	
	// Whole and two halves of pineapple
	pineapple = loadModel("pineapple.obj")
	pineappleh1 = loadModel("pineapple1.obj")
	pineappleh2 = loadModel("pineapple2.obj")
	
	// Whole and two halves of apple
	apple = loadModel("apple.obj")
	appleh1 = loadModel("apple1.obj")
	appleh2 = loadModel("apple2.obj")
	
	// Whole and two halves of bannana
	bannana = loadModel("bannana.obj")
	bannanah1 = loadModel("bannana1.obj")
	bannanah2 = loadModel("bannana2.obj")
}


// Collisions

function fruitCollision() {
	for(var i = 0; i < fruits.length; i++){
		current = fruits[i]
		current.update()
		current.show()
		if(mouseIsPressed && ((mouseX < current.pos.x + size/2)&&(mouseX > current.pos.x - size/2)&&(mouseY < current.pos.y + size/2)&&(mouseY > current.pos.y - size/2))){
			splitt(current) // "Split" into halves
			playSound()
			addFire(current.pos.x, current.pos.y, false, 10) // Add "normal" colour particles
			fruits.splice(i, 1);
			i--;
			score ++;
			updateCombo();
		}
		
		// Remove if offscreen
		if(current.pos.y > height*2){
			fruits.splice(i, 1)
			i--;
			score -= 5;
		}		
	}
}


function bombCollision() {
	for(var i = 0; i < bombs.length; i++){
		current = bombs[i]
		current.update()
		current.show()
		if(mouseIsPressed && ((mouseX < current.pos.x + size/2)&&(mouseX > current.pos.x - size/2)&&(mouseY < current.pos.y + size/2)&&(mouseY > current.pos.y - size/2))){
			addFire(current.pos.x, current.pos.y, true, 50) // Spawn explosion particles
			bombs.splice(i, 1);
			i--;
			strikes ++;
			combo = 0;
		}
		
		// Remove if off screen
		if(current.pos.y > height*2){
			bombs.splice(i, 1)
		}		
	}
}


////////////////



// Rendering grpahics

function renderScore() {
	// Scoreboard graphic
	board.fill(255)
	board.textSize(32)
	board.rect(0,0,198, 38)
	board.fill(0)
	board.text("Score: " + score, 20, 30)
	
	// Scoreboard display
	push()
	translate(210, 50)
	texture(board)
	plane(200, 40)
	pop()	
}

function renderCombo() {
	// Combo text
	col = toRGB(combo*30) // Convert an HSB representation of combo to RBG
	comboText.background(255)
	comboText.textSize(60)
	comboText.strokeWeight(3)
	comboText.fill(col.r, col.g, col.b)
	comboText.stroke(col.r, col.g, col.b)
	comboText.text(combo + " Fruit Combo", 20, 50)
	
	// Combo display
	push()
	translate(width/2+100, 200)
	texture(comboText)
	plane(600, 70)
	pop()	
}


function renderXs() {
	// Scoreboard graphic
	xs.background(0)
	xs.fill(255)
	xs.textSize(42)
	xs.rect(0,0,150, 58)
	
	// Outlines
	xs.fill(255)
	xs.stroke(0)
	xs.strokeWeight(2)
	xs.text("X X X", 20, 50)
	
	// Red fill
	xs.fill(255,0,0)
	xs.text("X ".repeat(strikes), 20, 50)
	
	// Scoreboard display
	push()
	translate(width-210, 50)
	texture(xs)
	plane(152, 60)
	pop()	
}


////////////////


// Rendering other

function renderCut() {
	colour()
	beginShape()
	for(var i = 0; i < mousePos.length; i++){
		vertex(mousePos[i][0],mousePos[i][1])
		if(fire){addFire(mousePos[i][0],mousePos[i][1], true, 1, false)}
	}
	if(mousePos.length > 0){
		curveVertex(mousePos[0][0],mousePos[0][1])
	}
	endShape()
}


function colour() {
	switch(colType){
		case 0:
			fill(0)
			break;
		case 1:
			col = toRGB(frameCount % 360)
			fill(col.r, col.g, col.b)
			break;
		case 2:
			col = toRGB(normalCol)
			fill(col.r, col.g, col.b)
			break;
		case 3:
			col = toRGB(normalCol)
			stroke(col.r, col.g, col.b)
			strokeWeight(5)
			fill(255)
			break;
		case 4:
			fill(255)
			stroke(255)
			break;
	}
}

function renderHalves() {
	for(var i = 0; i < halves.length; i++){
		current = halves[i]
		current.update()
		current.show()	
	}
}

function showFire() {
	for(var i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].show();
	}
	if(particles.length > 200){particles.splice(0,1)}
}

/////////////



// Adding

function addFire(x, y, fire, num, vel = true) {
	for(var j = 0; j < num; j++) {
			// square = new particle(mouseX, mouseY);
			square = new particle(x, y, fire, vel)//, object.vel);
			particles.push(square);
	}
	if(particles.length > 100){
		particles.splice(0,1)
	}
}

function add(){
	fruit = new Fruit()
	fruits.push(fruit)
}

function addBomb(){
	temp = new Bomb()
	bombs.push(temp)
}


function splitt(obj){
	h1 = new Fruit()	
	h1.pos = obj.pos
	h1.rot = obj.rot
	h1.start(1)
	if		 (obj.model == apple){h1.model = appleh1}
	else if(obj.model == pineapple){h1.model = pineappleh1}
	else if(obj.model == bannana){h1.model = bannanah1}
	h2 = Object.assign({}, obj)	
	h2.pos = obj.pos
	h2.rot = obj.rot
	h2.start(-1)
	if		 (obj.model == apple){h2.model = appleh2}
	else if(obj.model == pineapple){h2.model = pineappleh2}
	else if(obj.model == bannana){h2.model = bannanah2}
	halves.push(h1)
	halves.push(h2)
}

////////////////////////

// Audio
function playSoundtrack() {
	if(song.isLoaded()){
		song.play()
	}
}

function playSound() {
	sound = random([cut1, cut2, cut3])		
	sound.setVolume(0.5)
	if(!mute){sound.play()}
}

/////////



// Misc

function endGame() {
		end = createGraphics(width*2, height*2)
		end.background(255)
		end.fill(0)
		end.textSize(100)
		end.text("GAME OVER", width + 200, height + 200)
		texture(end)
		push()
		translate(100,100, -10)
		plane(width*2, height*2)
		pop()
		frameRate(0)
}


function updateCombo(){
	if(timer > 0){
		combo ++;
		if(combo > 2){score += combo}
		timer = tstart;
	}	
	else{
		timer = tstart;
		combo = 1;
	}
}

function toRGB(h, s=1, v=1) {
    var r, g, b, i, f, p, q, t;
		h /= 360
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
///////////////////////////

// IO

function mouseDragged(){
	mousePos.push([mouseX, mouseY])
	if(mousePos.length > 5){
		mousePos.splice(0,1)
	}
	normalCol = random(colours)
	return false;
}


function keyPressed(){
	if(key == "M"){mute = !mute}
	if(keyCode == 32){
		colType = (colType + 1) % 5
	}
}

///////////////////////////