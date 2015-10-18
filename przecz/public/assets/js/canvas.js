(function() {

// Set canvas names
var mainCanvas = options.canvas.canvas,
		mainCtx = mainCanvas.getContext('2d');

// Set initial canvas dimensions
mainCanvas.width = options.canvas.width;
mainCanvas.height = options.canvas.height;

// Function initializing time signal
functions.initVariable = function (varObj) {
	
	// Increment variables counter
	options.canvas.variableCount++;
	
	// Check available of height 
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
	mainCtx.lineTo( varObj.posX + 1 , varObj.posY );
	mainCtx.stroke();

	// Restore context settings 
	mainCtx.restore();
};

// FUNCTION Check available height
function checkHeight() {
	// i
	if(options.canvas.variableCount*options.grid.height*2 > options.canvas.height) {
	
	// Init temporary canvas
	var tempCnv = document.createElement('canvas');
	var tempCtx = tempCnv.getContext('2d');
	
	// Set dimensions
	tempCnv.width = mainCanvas.width;
	tempCnv.height = mainCanvas.height;

	// Redraw current canvas content
	tempCtx.drawImage(mainCanvas, 0, 0);

	// Clear canvas
	options.grid.canvas.getContext('2d').clearRect(0, 0, options.grid.width, options.grid.height);

	// Increase canvas height
	options.canvas.height += options.grid.height*2;		

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

	// Next X position
	varObj.newPosX = varObj.posX + options.grid.width;

	// If state didn't change
	if (varObj.value == varObj.prevValue) {

		varObj.newPosY = varObj.posY;

		context.beginPath();
		context.moveTo(varObj.posX, varObj.posY);
		context.lineTo(varObj.newPosX + 1, varObj.newPosY);

	// If rising edge
	} else if (varObj.value) {

		varObj.newPosY = varObj.posY - options.grid.height;

		context.beginPath();
		context.moveTo(varObj.posX, varObj.posY);
		context.lineTo(varObj.posX, varObj.newPosY);
		context.lineTo(varObj.newPosX + 1, varObj.newPosY);

	// If falling edge
	} else {

		varObj.newPosY = varObj.posY + options.grid.height;

		context.beginPath();
		context.moveTo(varObj.posX, varObj.posY);
		context.lineTo(varObj.posX, varObj.newPosY);
		context.lineTo(varObj.newPosX + 1, varObj.newPosY);
	}


	// Draw
	context.strokeStyle = '#33aa33';
	context.lineWidth = 2;
	context.stroke();
	context.restore();

	// Set new and prev variables as current
	varObj.prevValue = varObj.value;
	varObj.posX += options.grid.width;
	varObj.posY = varObj.newPosY;
};


})();



