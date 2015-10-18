(function() {

var mainCanvas = options.canvas.canvas,
		mainCtx = mainCanvas.getContext('2d'),
		wrapper = document.getElementById("canvas-wrapper");


// Set initial canvas dimensions
mainCanvas.width = options.canvas.width;
mainCanvas.height = options.canvas.height;

functions.initVariable = function (varObj) {
	
	// Increment amount of variables
	options.canvas.variableCount++;
	
	// Check amount of height 
	checkHeight();

	// Save context settings
	mainCtx.save();

	// Draw variables name
	mainCtx.font = options.canvas.fontSize + 'px Calibri';
	mainCtx.textAlign = 'center';
	mainCtx.fillText(
		varObj.name, 
		options.grid.width*1.5, 
		options.canvas.variableCount*options.grid.height*2 - options.grid.height*0.25
	);
	
	// Set variable's starting coordinations
	varObj.startPosX = options.grid.width;
	varObj.startPosY = options.canvas.variableCount*options.grid.height*2;
	varObj.posX = varObj.startPosX+options.grid.width*2;
	varObj.posY = varObj.startPosY;

	// Draw start line
	mainCtx.strokeStyle = '#33aa33';
	mainCtx.lineWidth = 2;
	mainCtx.beginPath();
	mainCtx.moveTo( varObj.startPosX , varObj.startPosY );
	mainCtx.lineTo( varObj.posX , varObj.posY );
	mainCtx.stroke();

	// Restore context settings 
	mainCtx.restore();


}

// FUNCTION Check available height
function checkHeight() {
		if(options.canvas.variableCount*options.grid.height*2 > options.canvas.height) {
		
		// Init temporary canvas
		var tempCnv = document.createElement('canvas');
		var tempCtx = tempCnv.getContext('2d');
		
		// Set dimensions
		tempCnv.width = mainCanvas.width;
		tempCnv.height = mainCanvas.height;

		// Redraw current canvas content
		tempCtx.drawImage(mainCanvas, 0, 0);

		//
		options.canvas.height += options.grid.height*2;
		options.grid.canvas.getContext('2d').clearRect(0, 0, options.grid.width, options.grid.height);
				
		// Init new grid canvas
		functions.gridInit();
		
		// Set new height
		mainCanvas.height = options.canvas.height;
		
		// Draw old content back
		mainCtx.drawImage(tempCnv, 0, 0);
	}
}

// FUNCTION New cycle
functions.nextCycle = function (varObj) {

	var context = options.canvas.canvas.getContext('2d');
	context.save();

	varObj.newPosX = varObj.posX + options.grid.width;

	if (varObj.value == varObj.prevValue) {
		varObj.newPosY = varObj.posY;

		context.beginPath();
		context.moveTo(varObj.posX, varObj.posY);
		context.lineTo(varObj.newPosX, varObj.newPosY);

	} else if (varObj.value) {

		varObj.newPosY = varObj.posY - options.grid.height;

		context.beginPath();
		context.moveTo(varObj.posX, varObj.posY);
		context.lineTo(varObj.posX, varObj.newPosY);
		context.lineTo(varObj.newPosX, varObj.newPosY);

	} else {
		varObj.newPosY = varObj.posY + options.grid.height;

		context.beginPath();
		context.moveTo(varObj.posX, varObj.posY);
		context.lineTo(varObj.posX, varObj.newPosY);
		context.lineTo(varObj.newPosX, varObj.newPosY);
	}
	varObj.prevValue = varObj.value;
	varObj.posX += options.grid.width;
	varObj.posY = varObj.newPosY;

	context.strokeStyle = '#33aa33';
	context.lineWidth = 2;
	context.stroke();
	context.restore();
}


})();



