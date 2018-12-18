function makeMaps() {
	map1 = [	
		// These are the four walls to stop players leaving the map
		[cx, -5, width, 5], 
		[cx, height+5, width, 5], 
		[-5, cy, 5, height], 
		[width+5, cy, 5, height],
		
		// Central columns
		[cx, cy-150, 100, 200],
		[cx, cy-250, 200, 100],
		[cx, cy+150, 100, 200],
		[cx, cy+250, 200, 100],
		
		// Bottom parts
		[cx/2, cy+350, 100, 300],
		[cx/2 + 50, cy+250, 100, 100],
		[(cx*3)/2, cy+350, 100, 300],
		[(cx*3)/2 - 50, cy+250, 100, 100],
		
		// Top parts
		[cx/2, cy-350, 100, 300],
		[cx/2 + 50, cy-250, 100, 100],
		[(cx*3)/2, cy-350, 100, 300],
		[(cx*3)/2 - 50, cy-250, 100, 100]		
	]
	
	map2 = [
		// These are the four walls to stop players leaving the map
		[cx, -5, width, 5], 
		[cx, height+5, width, 5], 
		[-5, cy, 5, height], 
		[width+5, cy, 5, height],
	
		// Central columns
		[cx, cy-50, 100, 100],
		//[cx, cy-150, 250, 150],
		[cx, cy+50, 100, 100],
		//[cx, cy+50, 250, 150],
	]
	
	map3 = [
		// These are the four walls to stop players leaving the map
		[cx, -5, width, 5], 
		[cx, height+5, width, 5], 
		[-5, cy, 5, height], 
		[width+5, cy, 5, height],
	
		// Central columns
		//[cx, cy-50, 100, 100],
		[cx, cy-220, 250, 150],
		//[cx, cy+50, 100, 100],
		[cx, cy+220, 250, 150],
	]
	
	maps = [map1, map2, map3]
}