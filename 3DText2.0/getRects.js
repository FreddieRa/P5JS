function getRects(array, bevel) {
	var mat = array
	var inner = Array(mat.length).fill(0).map(x => Array(mat.length).fill(0));
	var rects = []
	
	if (bevel) {
		for (var x = 0; x < mat.length; x++) {
			for (var y = 0; y < mat.length; y++) {
				var notEdge = (x > 0 && y > 0 && x <  (mat.length - 1) && y <  (mat.length - 1));
				var surrounded = (notEdge && mat[x - 1][y] && mat[x + 1][y] && mat[x][y - 1] && mat[x][y + 1]);
				if(surrounded){inner[x][y] = 1;}
			}
		}
		for(var item of getRects1(inner)){
			item.b = 1.5;
			rects.push(item)
		}
	}
	for(var item of getRects1(array)){
		item.b = 1;
		rects.push(item)
	}
	
	return rects
}

function getRects1(array) {
	var mat = array[0].map((col, i) => array.map(row => row[i]));


	const W = mat[0].length;
	const H = mat.length;

	// get the area covered by rectangles
	let totalRectArea = 0;
	for (let i = 0; i < W; ++i) {
		for (let j = 0; j < H; ++j) {
			totalRectArea += mat[j][i] > 0 ? 1 : 0;
		}
	}

	const rects = [];
	let rectArea = 0;

	// find all rectangle until their area matches the total
	while (rectArea < totalRectArea) {
		const rect = findNextRect();
		rects.push(rect);
		markRect(rect);
		rectArea += (rect.x2 - rect.x1 + 1) * (rect.y2 - rect.y1 + 1);
	}

	//console.log(rects);

	function findNextRect() {
		// find top left corner
		let foundCorner = false;
		const rect = {
			x1: 0,
			x2: W - 1,
			y1: 0,
			y2: H - 1
		};
		for (let i = 0; i < W; ++i) {
			for (let j = 0; j < H; ++j) {
				if (mat[j][i] === 1) {
					rect.x1 = i;
					rect.y1 = j;
					foundCorner = true;
					break;
				}
			}
			if (foundCorner) break;
		}
		// find bottom right corner
		for (let i = rect.x1; i <= rect.x2; ++i) {
			if (mat[rect.y1][i] !== 1) {
				rect.x2 = i - 1;
				return rect;
			}
			for (let j = rect.y1; j <= rect.y2; ++j) {
				if (mat[j][i] !== 1) {
					rect.y2 = j - 1;
					break;
				}
			}
		}
		return rect;
	}

	// mark rectangle so won't be counted again
	function markRect({
		x1,
		y1,
		x2,
		y2
	}) {
		for (let i = x1; i <= x2; ++i) {
			for (let j = y1; j <= y2; ++j) {
				mat[j][i] = 2;
			}
		}
	}
	return rects
}