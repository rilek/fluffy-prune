(function() {
	//var init
	var c = document.getElementById("myCanv");
	var ctx = c.getContext("2d");
	var options = document.getElementsByClassName("options")[0];
	var form = document.getElementsByClassName("opt")[0];
	var clear = document.getElementById("clear");
	var submit = document.getElementById("draw");
	var type = document.getElementById("type");
	var strokeWidth = document.getElementById("sWidth");
	var closeButton = document.getElementById("close"); 
	var fillFlag;
	var menuOpen = 1;
	//Select options 
	R.addEvent(type, 'change', function() {
		var fieldset = document.getElementById("userOpt");
		while(fieldset.firstChild) {
			fieldset.removeChild(fieldset.firstChild);
		}
		switch(type.value) {
			//Opcje dla Prostokątów
			case 'rect':
				var wP = document.createElement("p");
				var hP = document.createElement("p");
				var wLabel = document.createElement("label");
				var hLabel = document.createElement("label");
				var wInput = document.createElement("input");
				var hInput = document.createElement("input");
				wLabel.setAttribute("for", "width");
				hLabel.setAttribute("for", "height");
				R.setAttributes(wInput, {
					'name' : 'width',
					'id' : 'width',
					'type' : 'number',
					'placeholder' : '0',
					'required' : ''
				});
				R.setAttributes(hInput, {
					'name' : 'height',
					'id' : 'height',
					'type' : 'number',
					'placeholder' : '0',
					'required' : ''
				});
				wText = document.createTextNode("Szerokość ");
				hText = document.createTextNode("Wysokość ");
				wLabel.appendChild(wText);
				hLabel.appendChild(hText);
				hLabel.appendChild(hInput);
				wP.appendChild(wLabel);
				wP.appendChild(wInput);
				hP.appendChild(hLabel);
				hP.appendChild(hInput);
				fieldset.appendChild(wP);
				fieldset.appendChild(hP);
				break;
			//Opcje dla Elips
			case 'circle':
				var rLabel = document.createElement("label");
				var rInput = document.createElement("input");
				var rText = document.createTextNode("Promień");
				R.setAttributes(rInput, {
					'name' : 'radius',
					'id' : 'radius',
					'type' : 'number',
					'placeholder' : '0'
				});
				rLabel.appendChild(rText);
				rLabel.appendChild(rInput);
				fieldset.appendChild(rLabel);
				break;
			case 'arc':
				break;
			default:
				break;
		}
	});

	//Draw element
	R.addEvent(form, "submit", function(e) {
		var x = document.getElementById("startX").value;
		var y = document.getElementById("startY").value;
		var sWidth = strokeWidth.value;

		ctx.fillStyle = '#' + document.getElementById("colorPicker").value;
		ctx.strokeStyle = '#' + document.getElementById("colorPicker").value;
		ctx.lineWidth = sWidth;
		
		if(sWidth % 2) {
			x -= 0.5;
			y -= 0.5;
		}
		
		switch(type.value) {
			case 'rect':
				ctx.beginPath();
				var width = document.getElementById("width").value;
				var height = document.getElementById("height").value;

				ctx.rect(x,y,width,height);

				if(fillFlag) {
					ctx.fill();
				} else {
				 	ctx.stroke();
				}
				break;
			case 'circle':
				var radius = document.getElementById("radius").value;
				ctx.beginPath();
				ctx.arc(x,y,radius,0,2*Math.PI, false);
				
				if(fillFlag) {
					ctx.fill();
				} else {
				 	ctx.stroke();
				}
				break;
			case 'arc':
				break;
			default:
				break;
		}
		e.preventDefault();
	}, false);

	//Clear element
	R.addEvent(clear, "click", function(){
		ctx.clearRect(0,0,c.width, c.height);
	})

	// Creat filled/stroked rectangle
	R.addEvent(document.getElementById("fill"),
			   'click',
			    function(){
		fillFlag = true;
		strokeWidth.parentNode.className = 'hidden';
	});

	R.addEvent(document.getElementById("stroke"),
			  'click', 
			  function(){
		fillFlag = false;
		strokeWidth.parentNode.className = '';
	});

	//Resize canvas
	R.addEvent(window, "resize", function() {

		var tempCanvas = document.createElement('canvas');
		tempCanvas.width = c.width;
		tempCanvas.height = c.height;

		// save your canvas into temp canvas
		tempCanvas.getContext('2d').drawImage(c, 0, 0);

		// resize my canvas as needed, probably in response to mouse events
		if(window.innerWidth > 500){
		c.width = (window.innerWidth * 100)/100 - menuOpen*298 - 49;
		} else {
			c.width = (window.innerWidth * 100)/100;
		}
		c.height = (window.innerHeight * 100)/100 - 10;

		// draw temp canvas back into myCanvas, scaled as needed
		c.getContext('2d').drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, c.width, c.height)

	}, false);

	R.addEvent(closeButton, 'click', function(){
		if(menuOpen) {
			menuOpen = 0;
			options.style.right = -298 + 'px';
			closeButton.childNodes[0].innerHTML = '<';
			window.dispatchEvent(ev);

		} else {
			menuOpen = 1;
			options.style.right = 0 + 'px';
			closeButton.childNodes[0].innerHTML = '>';
			window.dispatchEvent(ev);

		}
	},false);


	//Symulating change on first select option
	var ev = document.createEvent("HTMLEvents");
	ev.initEvent("change", true, true);
	type.dispatchEvent(ev);
	fill.dispatchEvent(ev);
	ev.initEvent("resize",true,true);
	window.dispatchEvent(ev);


	//Init 
	strokeWidth.parentNode.className = 'hidden';
})();