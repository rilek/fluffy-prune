(function() {
// Initialize variables
var gridCanvas = document.getElementById("gridCanvas");
var mainCanvas = document.getElementById("mainCanvas");
var gridCtx = gridCanvas.getContext('2d');
options.grid = {
	width: 20,
	height: 20,
};



functions.gridInit = function() {
	gridCtx.save();

	// Init size
	gridCanvas.width = options.canvas.width;
	gridCanvas.height = options.canvas.height;

	// Vertical grid lines
	for (var x = 0.5; x < options.canvas.width; x += options.grid.width) {
	  gridCtx.moveTo(x, 0);
	  gridCtx.lineTo(x, options.canvas.height);
	}

	// Horizontal grid lines
	for (var x = 0.5; x < options.canvas.height; x += options.grid.height) {
	  gridCtx.moveTo(0, x);
	  gridCtx.lineTo(options.canvas.width, x);
	}

	gridCtx.strokeStyle = '#eee';
	gridCtx.stroke();

	gridCtx.restore();
};




})();