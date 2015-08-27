(function() {
	var c = document.getElementById("myCanv");
	var ctx = c.getContext("2d");

	var draw = document.getElementById("opt");
	var clear = document.getElementById("clear")

	c.width = (window.innerWidth * 60)/100;

	addEvent(window, 'resize', function(e) {
		c.width = (window.innerWidth * 60)/100;
	}, false);

	addEvent(draw, 'submit', function(e) {
		var x = document.getElementById("startX").value;
		var y = document.getElementById("startY").value;
		var width = document.getElementById("width").value;
		var height = document.getElementById("height").value;
		ctx.fillStyle = '#000';
		ctx.fillRect(x,y,width,height);
		e.preventDefault();
	}, false);

	addEvent(clear, 'click', function(){
		ctx.clearRect(0,0,c.width, c.height);
	})

})();