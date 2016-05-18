var options = {};
var functions = {};

options.grid = {
	canvas: document.getElementById('gridCanvas'),
	width: 20,
	height: 20,
};

options.canvas = {
	canvas: document.getElementById('mainCanvas'),
	width: 1141,
	height: 101,
	border: true,
	variableCount: 0,
	fontSize: options.grid.height * 0.75,
};

window.onload = function() {
	//INIT GRID
	functions.gridInit();
};