(function() {
	//var
	var c = document.getElementById("myCanv");
	var ctx = c.getContext("2d");

	var form = document.getElementById("opt");
	var clear = document.getElementById("clear");
	var submit = document.getElementById("draw");
	var type = document.getElementById("type");
	var strokeWidth = document.getElementById("sWidth");
	var fillFlag;

	//Select options 
	R.addEvent(type, 'change', function() {
		var fieldset = document.getElementById("userOpt");
		while(fieldset.firstChild) {
			fieldset.removeChild(fieldset.firstChild);
		}
		switch(type.value) {
			//Opcje dla Prostokątów
			case 'rect':
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
				wLabel.appendChild(wInput);
				hLabel.appendChild(hInput);
				fieldset.appendChild(wLabel);
				fieldset.appendChild(hLabel);
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

	//Resize canvas
	R.addEvent(window, "resize", function(e) {
		if(window.innerWidth > 800){

			c.width = (window.innerWidth * 60)/100;
		} else {
			document.getElementById("container").style.display = 'block';
		}
	}, false);

	//Draw element
	R.addEvent(form, "submit", function(e) {

		var x = document.getElementById("startX").value;
		var y = document.getElementById("startY").value;

		ctx.fillStyle = '#' + document.getElementById("colorPicker").value;
		ctx.strokeStyle = '#' + document.getElementById("colorPicker").value;
		switch(type.value) {
			case 'rect':
				ctx.beginPath();
				var width = document.getElementById("width").value;
				var height = document.getElementById("height").value;
				
				if(fillFlag) {
					ctx.rect(x,y,width,height);
					ctx.fill();
				} else {
					ctx.rect(x-0.5,y-0.5,width,height);
				 	ctx.stroke();
				}
				break;
			case 'circle':
				var radius = document.getElementById("radius").value;
				ctx.beginPath();
				ctx.arc(x,y,radius,0,2*Math.PI, false);
				ctx.lineWidth = strokeWidth.value
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


	//Symulating change on first select option
	var ev = document.createEvent("HTMLEvents");
	ev.initEvent("change", true, true);
	type.dispatchEvent(ev);




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



	c.width = (window.innerWidth * 60)/100;
})();