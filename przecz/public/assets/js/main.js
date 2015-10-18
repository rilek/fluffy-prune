var options = {};
var functions = {};

options.grid = {
	width: 20,
	height: 20,
};

options.canvas = {
			width: 1141,
			height: 101,
			border: true,
			variableCount: 0,
			fontSize: options.grid.height*0.75,
};

options.canvas.canvas = document.getElementById("mainCanvas");
options.grid.canvas = document.getElementById("gridCanvas");


window.onload = function() {

	//INIT GRID
	functions.gridInit();
	
};