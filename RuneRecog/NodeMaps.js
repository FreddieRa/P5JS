// The class used for all runes
function NodeMap(name, points){
	this.name = name
	this.points = points
	this.merged = [].concat.apply([], this.points)
	// Radius of error
	this.r = 30;
	this.r2 = this.r * this.r
	this.maxDy = MaxDifference(this.merged.map(point => (height-point.y)))
	this.maxDx = MaxDifference(this.merged.map(point => point.x))
	
	
	this.show = function(){
		for(var i = 0; i < this.points.length; i++){
			drawPoints(this.points[i], false)
		}
	}
	
	// Checks to see what percentage of drawn points coincide with points on the rune
	this.check = function(drawnPoints){
		var result = 0;
		for(var i = 0; i < this.merged.length; i++){
			for(var j = 0; j < drawnPoints.length; j++){
				if(this.contains(this.merged[i], drawnPoints[j])){result++; break;}
			}			
		}
		return [result, this.merged.length]
	}
	
	// Simply checks if one point in the radius of another
	this.contains = function(p1, p2) {
    let d = Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2);
    return d <= this.r2;
  }
	
	this.translatePoints = function (x, y, factor, array){
		for(var i = 0; i < array.length; i++){
			for(var j = 0; j < array[i].length; j++){
				var tempx = array[i][j].x*factor + x
				var tempy = array[i][j].y*factor + y
				this.points[i][j] = {x: tempx, y: tempy}
			}
		}
	}
	
	this.translateMerged = function(x, y, factor, array){
		for(var i = 0; i < array.length; i++){
			var tempx = array[i].x*factor + x
			var tempy = array[i].y*factor + y
			this.merged[i] = {x: tempx, y: tempy}
		}
	}
}




// Easy way to store all the rune maps to be shared across tabs
function GenMaps(){
	// Coordinate based maps
	spells = [
		["Fire I", [[{"x":550,"y":480},{"x":541,"y":132},{"x":546,"y":333},{"x":643,"y":301},{"x":653,"y":488}]]],
		["Fire II", [[{"x":520,"y":553},{"x":526,"y":137},{"x":705,"y":246},{"x":525,"y":350},{"x":705,"y":461},{"x":514,"y":547}],[]]],
		["Frost I", [[{"x":448,"y":522},{"x":448,"y":232},{"x":638,"y":318},{"x":827,"y":226},{"x":871,"y":539}],[]]],
		["Frost II", [[{"x":523,"y":575},{"x":543,"y":247},{"x":694,"y":301}],[{"x":539,"y":368},{"x":629,"y":405}],[]]],
		["Arcane Ray", [[{"x":474,"y":591},{"x":492,"y":231},{"x":467,"y":180},{"x":392,"y":183},{"x":348,"y":223},{"x":337,"y":259},{"x":345,"y":316},{"x":388,"y":356},{"x":934,"y":367}],[{"x":765,"y":180},{"x":782,"y":582}],[]]],
		["Arcane Blast", [[{"x":494,"y":549},{"x":499,"y":229},{"x":425,"y":228},{"x":395,"y":262},{"x":386,"y":303},{"x":410,"y":353},{"x":441,"y":369},{"x":851,"y":375}],[{"x":722,"y":229},{"x":735,"y":542}],[{"x":497,"y":370},{"x":602,"y":451},{"x":729,"y":373}]]],
		["Affliction I", [[{"x":539,"y":544},{"x":685,"y":374},{"x":593,"y":309},{"x":499,"y":388},{"x":721,"y":558}],[]]],
		["Affliction II", [[{"x":522,"y":413},{"x":519,"y":229},{"x":774,"y":423},{"x":777,"y":236},{"x":522,"y":415}],[{"x":519,"y":228},{"x":637,"y":112},{"x":777,"y":234}],[{"x":637,"y":194},{"x":608,"y":229},{"x":648,"y":253},{"x":679,"y":225},{"x":636,"y":193}],[{"x":522,"y":417},{"x":775,"y":424}]]],
		["Fireworks", [[{"x":566,"y":598},{"x":584,"y":213},{"x":1074,"y":469},{"x":519,"y":457}],[{"x":830,"y":466},{"x":834,"y":593}],[{"x":1073,"y":476},{"x":1086,"y":610}],[],[]]],
		["Polymorph", [[{"x":500,"y":417},{"x":503,"y":174},{"x":849,"y":430},{"x":852,"y":175},{"x":503,"y":417}]]],
		["Decurse", [[{"x":703,"y":306},{"x":521,"y":363},{"x":707,"y":474},{"x":536,"y":589},{"x":718,"y":669}]]],
		["Ice Lance", [[{"x":617,"y":499},{"x":619,"y":189}],[{"x":494,"y":254},{"x":619,"y":181},{"x":751,"y":257}]]],
		["Pushback", [[{"x":499,"y":260},{"x":760,"y":254},{"x":548,"y":359},{"x":690,"y":373},{"x":764,"y":422},{"x":764,"y":489},{"x":724,"y":532},{"x":646,"y":555},{"x":557,"y":555},{"x":512,"y":487}]]],
		["Manashield", [[{"x":609,"y":224},{"x":613,"y":654}],[{"x":609,"y":358},{"x":565,"y":399},{"x":612,"y":455},{"x":666,"y":408},{"x":610,"y":354}]]],
		["Light", [[{"x":698,"y":237},{"x":603,"y":312},{"x":509,"y":242},{"x":503,"y":544},{"x":604,"y":493},{"x":688,"y":570}]]]
	]
	
	for(var i = 0; i < spells.length; i++){
		spells[i] = new NodeMap(spells[i][0], spells[i][1])
	}
	return spells
}