// Draw a shape given a set of points (and circles around the point if enabled)
function drawPoints(dict, ellipses){
		beginShape()
		for(var j = 0; j < dict.length; j++){
			p = dict[j];
			vertex(p.x, p.y)
			if(ellipses){ellipse(p.x, p.y, 30)}
		}
		endShape()	
}


function reset(){	
	maps = GenMaps()
	col = color(0,0,0)
	rune = ""
	shapes = [[]]
	background(255)	
}



function runCheck(shape, tolerance, debug, final){
		var max = tolerance;
		var maxlength = 0;
		for(var i = 0; i < maps.length; i++){
			maxval = tolerance;
			for(var j = 0; j < maps[i].merged.length; j++){
				var result = getCurrent(maps[i], shape, maps[i].merged[j])
				var current = result[0]
				var merged = result[1]
				// Flatten array
				result = current.check(merged)
				val =  result[0]/result[1]				
				
				if(debug){
					print(current.name + ": " + val)
				}
				
				if(val > maxval){
					maxval = val;
					alpha = Math.pow((val*5), 2)
					c = color(0, 255, 0, alpha)
					stroke(c)
					current.show()
				}
			}
			
			
			if(debug){
				print(maxval)
			}
				
				
			if(maxval > tolerance){
				if(final){
					if((max-val <= 0.1 && result[1] > maxlength) || (maxval > max)){
						max = val;
						maxlength = result[1]
			  		rune = current.name
						col = color(0, 255, 0)
					}
				}
			}
		}
}





// This takes a shape, and a rune to match it to, and syncs the rune to the shape so they can be compared
function getCurrent(map, shape, coords){
	// Creates a copy of 
	var current = Object.assign({}, map);
	var merged = merge(shape);

	var maxDx = MaxDifference(merged.map(point => point.x));
	var maxDy = MaxDifference(merged.map(point => (height-point.y)));
	
	var scalex = 1/(map.maxDy/maxDy)
	var scaley = 1/(map.maxDx/maxDx)
	var scale = Math.max(scalex, scaley)
	
	current.points = translatePoints(merged[0].x, merged[0].y, scale, intermsof(current.points, coords.x, coords.y))
	current.merged = translateMerged(merged[0].x, merged[0].y, scale, merge(intermsof([current.merged], coords.x, coords.y)))
		
	return [current, merged]
}

function translatePoints(x, y, factor, array){
	var newarray = [[]]
	for(var i = 0; i < array.length; i++){
		for(var j = 0; j < array[i].length; j++){
			var tempx = array[i][j].x*factor + x
			var tempy = array[i][j].y*factor + y
			newarray[i].push({x: tempx, y: tempy})
		}
		newarray.push([])
	}
	return newarray
}

function translateMerged(x, y, factor, array){
	var newarray = []
	for(var i = 0; i < array.length; i++){
		var tempx = array[i].x*factor + x
		var tempy = array[i].y*factor + y
		newarray.push({x: tempx, y: tempy})
	}
	return newarray
}



// Takes a 2D array and simplifies all the subarrays
function simp(array, val){
	var newarray = [[]]
	for(var i = 0; i < array.length; i++){
		newarray[i] = simplify(array[i], val)
	}
	return newarray
}

function merge(array){
	return ([].concat.apply([], array))
}



function intermsof(array, x, y){
	newarray = [[]]	
	for(var i = 0; i < array.length; i++){
		for(var j = 0; j < array[i].length; j++){
			var tempx = array[i][j].x - x
			var tempy = array[i][j].y - y
			newarray[i].push({x: tempx, y: tempy})
		}
		newarray.push([])
	}	
	return newarray
}


function MaxDifference(array){
  let maxDiff = 0;
  for(let x = 0; x < array.length; x++){
    for(let y = x+1; y < array.length; y++){
        if(maxDiff < Math.abs(array[y] - array[x])){
            maxDiff = Math.abs(array[y] - array[x])
        }
    }
  }
  return maxDiff;
}