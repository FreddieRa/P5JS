function keyPressed() {
	switch(keyCode) {
		case ENTER:
			if(input.value() != ""){equation = cleanEquation(input.value()); points = []; pointsin = []; start = false;}
			else{equation = "y=0"}
			break;
		case UP_ARROW:
			adjustment = adjustment == 1 ? 10 : 1
			break;
	}
}

function mouseWheel(event) {
	temp = event.delta
	if(temp > 0){
		z += deltaZoom
	}
	else if(temp < 0 && z > 2){
		z -= deltaZoom
	}
  return false;
}


function mouseDragged() {
	w += mouseX - pmouseX
	h += mouseY - pmouseY	
}

function doubleClicked() {
	w = width/2
	h = height/2
	z = 20
}

function setStep() {
	for(key in zooms){
		if(z > key){
			step = zooms[key]
			lineStep = quality[key]
			deltaZoom = deltaZooms[key]
		}
	}	
}

function lim(xy, val){
	if(xy == "x"){
		return val*2*z + int((width/2-w)/38)
	}
	else{
		return val*2*z + int((height/2-h)/38)
	}
}

function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}