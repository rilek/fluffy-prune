(function() {
var mainCanvas = document.getElementById("mainCanvas"),
		mainCtx = mainCanvas.getContext('2d'),
		wrapper = document.getElementById("canvas-wrapper");

options.canvas = {
			width: 1141,
			height: 201,
			border: true,
			variableCount: 0,
			fontSize: options.grid.height*0.75,
		};

mainCanvas.width = options.canvas.width;
mainCanvas.height = options.canvas.height;
wrapper.style.height = options.canvas.height + 20 + 'px';

functions.initVariable = function (varObj) {
	options.canvas.variableCount++;
	varObj.startPosX = options.grid.width;
	varObj.startPosY = options.canvas.variableCount*options.grid.height*2;

	mainCtx.save();

	mainCtx.font = options.canvas.fontSize + 'px Calibri';
	mainCtx.textAlign = 'center';
	mainCtx.fillText(
		varObj.name, 
		options.grid.width*1.5, 
		options.canvas.variableCount*options.grid.height*2 - options.grid.height*0.25
	);
	
	mainCtx.strokeStyle = '#33aa33';
	mainCtx.lineWidth = 2;
	mainCtx.beginPath();
	mainCtx.moveTo( varObj.startPosX , varObj.startPosY );
	mainCtx.lineTo( varObj.startPosX+options.grid.width*2, varObj.startPosY );
	mainCtx.stroke();

	mainCtx.restore();
}

})();
