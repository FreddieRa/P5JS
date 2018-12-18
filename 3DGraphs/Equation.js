function cleanEquation(string) {
	if(string == ""){return 0}
	else{
		//xPart = (string.split('='))[1]
		
		restart = true;
		
		yPart = string.substr(0,string.indexOf('='));
		yPart = applyRegex(yPart)
		
		xPart = string.substr(string.indexOf('=')+1)
		xPart = applyRegex(xPart)
		//print(xPart)
		x = 5
		z = 5
		y = 5
		correct = true;	
		try {
  	  eval(xPart);
			eval(yPart);
		} 
		catch (e) {
			correct = false;
  	  print("Not a valid equation!");
		}	
		if(correct){
			if(yPart.split(' ').join('') == "y"){
				return [xPart]
			}
			else{
				return [xPart, yPart]	
			}
		}
		else {
			return 0
		}
	}
}

function plotEllipse(string, x, z) {
	string1 = string[0]
	string2 = string[1]
	if(Math.abs(x) <= 25 && Math.abs(z) <= 25){
		for(var y = -10; y < 10; y += 0.2){
			if(Math.abs(eval(string1)-eval(string2)) <= 2){
				plotX = (x*w)
				plotY = (y*yw*-1)
				plotZ = (z*w)
				//cArray.push([x,y,z])
				col = map(dist(0,0,0,plotX,plotY,plotZ), 0, 250, 0, 360)
				stroke(col, 100, 100)
			 
				push()
				translate(plotX, plotY, plotZ)
				sphere(1)
				pop()
				
			}
		}
	}
}

function plotEquation(string, x, z) {
	string1 = string[0]
	if(string){
		var y = eval(string1)*-1		
		plotX = (x*w)
		plotY = (y*yw)
		plotZ = (z*w)
		col = map(dist(0,0,0,plotX,plotY,plotZ), 0, 250, 0, 360)
		stroke(col, 100, 100)
		if(!cubes){vertex(plotX, plotY, plotZ)}
		else{
			push()
			translate(plotX, plotY, plotZ)
			box(2)
			pop()
		}
	}
}

function applyRegex(string) {
	var temp = string
	//temp = temp.replace("y = ", "")
	temp = temp.replace(/(\w*\([^\s()]+\)|[^\s+()]+)\^(\w*\([^\s()]+\)|[^\s,+()]+)/g, 'pow($1, $2)');			
	temp = temp.replace(/\be\b/g, "Math.E")
	temp = temp.replace(/\bfc\b/g, "frameCount")
	temp = temp.replace("pi", "Math.PI")
	//temp = temp.replace(/y/g, "z")
	return temp
}