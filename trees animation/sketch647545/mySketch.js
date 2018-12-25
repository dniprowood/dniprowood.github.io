var tree_cnt = 0;
var num_trees = 20;
var branch_list;
var branch_index;
var leaf_list;
var leaf_index;
var leaf_size = 6;
var generate_tree = true;
var scale = 0.5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	colorMode(HSB, 255);
}

function randSign() {
	return random() < 0.5 ? -1 : 1;
}

function branch(sx, sy, sdir, dir_range, thickness, slength, segs, level) {
	var x, y, px, py, dir, len;
	x = sx, y = sy;
	var leaf_hue = 45+int(random()*45);
	for (var i = 0; i < segs; ++i) {
		px = x, py = y;

		// Randomize direction & length of the new segment and set x,y to the end point of this new segment
		dir = (random() * dir_range - dir_range / 2) * i / segs;
		len = random() * slength + slength;
		x += cos(sdir + dir) * len;
		y += sin(sdir + dir) * len;

		// Set the thickness and color and draw the segment
		var weight = pow(segs - i, 0.5) * thickness + 0.2;
		branch_list[branch_index++] = {
			"weight": weight,
			"dir": dir,
			"x": x,
			"y": y,
			"px": px,
			"py": py
		};

		var branch_chance = i / segs+0.1;
		if (random() < branch_chance) {
			// Make the new branch angle away from the current branch and adjust the settings a bit
			var bdir = sdir + dir + PI / 2.5 * (1 - i / segs) * randSign();
			var bdir_range = min(dir_range * 2.5, PI / 3);
			branch(x, y, bdir, bdir_range, thickness / 2, slength * 0.65, segs - 3, level+1);
		}
		else if (level > 1) {
			leaf_list[leaf_index++] = {
				"hue": leaf_hue,
				"value": int((1-i/segs)*100),
				"alpha": int((1-i/segs)*40)+20,
				"x": x,
				"y": y
			}
		}
	}
}

function draw() {
	if (generate_tree) {
		// Add some mist
		for (var v=0; v<height; ++v) {
			strokeWeight(1);
			stroke( 100, 23, 150, int(50/height*v));
			line(0, v, width, v);
		}
		branch_list = [];
		branch_index = 0;
		leaf_list = [];
		leaf_index = 0;
		scale = 0.5 + random()*0.5;
		// Start the tree with the main trunk
		branch(int(random() * width), height, -PI / 2, PI / 4, 10 * scale, height / 50 * scale, 18, 0);
		generate_tree = false;
		branch_index = 0;
		leaf_index = 0;
		if (++tree_cnt == num_trees) noLoop();
	} else {
		// Draw the tree
		for (var i = 0; i < 400; ++i) {
			if (branch_index < branch_list.length) {
				// Branch
				strokeWeight(branch_list[branch_index].weight);
				stroke(210, 30, 50);
				strokeCap(SQUARE);
				line(branch_list[branch_index].px, branch_list[branch_index].py, branch_list[branch_index].x, branch_list[branch_index].y);
				// Highlight
				strokeWeight(branch_list[branch_index].weight/9);
				stroke(24, 30, 160);
				strokeCap(PROJECT);
				var ox = cos(branch_list[branch_index].dir)*branch_list[branch_index].weight/2;
				var oy = sin(branch_list[branch_index].dir)*branch_list[branch_index].weight/2;
				line(branch_list[branch_index].px+ox, branch_list[branch_index].py+oy, branch_list[branch_index].x+ox, branch_list[branch_index].y+oy);
				// Next
				branch_index++;
			} else if (leaf_index < leaf_list.length) {
				// Leaf
				noStroke();
				fill(leaf_list[leaf_index].hue, 80, leaf_list[leaf_index].value, leaf_list[leaf_index].alpha);
				ellipse(leaf_list[leaf_index].x, leaf_list[leaf_index].y, int(random()*leaf_size) * scale, int(random()*leaf_size)+leaf_size * scale);
				// Next
				leaf_index++;
			}
			else {
				generate_tree = true;
				break;
			}
		}
	}
}