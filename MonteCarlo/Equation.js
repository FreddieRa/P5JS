function cleanEquation(string) {
	if(string == ""){return 0}
	else{
		xPart = (string.split('='))[1]
		xPart = applyRegex(xPart)
		
		x = 5
		correct = true;	
		try {
  	  eval(xPart);
		} 
		catch (e) {
			correct = false;
  	  print("Not a valid equation!");
		}	
		if(correct){
			return xPart
		}
		else {
			return 0
		}
	}
}

function plotEquation(string, x) {	
	if(string){
		y = eval(string)*-1		
		plotX = (w + x*spaceY)
		plotY = (h + y*spaceY)
		curveVertex(plotX, plotY)
		return y
	}
}

function applyRegex(string) {
	var temp = string
	
	temp = temp.replace(/(\w*\([^\s()]+\)|[^\s+()]+)\^(\w*\([^\s()]+\)|[^\s,+()]+)/g, 'pow($1, $2)');		
	temp = temp.replace("e", "Math.E")
	temp = temp.replace("pi", "Math.PI")
	
	return temp
}