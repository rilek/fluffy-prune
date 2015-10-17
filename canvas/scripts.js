(function() {
	//var init
	var options = {
		'cont' : 'optContainer',
		'barWidth' : 250,


	};
	Okienko.counter = Okienko.counter || 0;
	var that = this;

	var okienkoStartowe = new Okienko ({
		'name' : 'Nowy kształt',

		// CREATE SELECT BOXES
		'select': [{
			'label': 'Typ:',
			'name': 'select1',
			'options': [{
				'value': 'rect',
				'selected': 'selected',
				'text': 'Prostokąt'
			}, {
				'text': 'Koło',
				'value': 'circle',
			}, {
				'text': 'Krzywa',
				'value': 'arc'
			}] //end of options
			} // end of 1
		], // end of selects

		// CREATE INPUTS
		'input' : [
			{
				'label' : 'Współrzędna X:',
				'name' : 'startX',
				'attributes' : {
					'type' : 'number',
					'placeholder' : '0',
					'required' : 'required'
				} // end of attributes
			}, {	//end of 1
				'label' : 'Współrzędna Y:',
				'name' : 'startY',
				'attributes' : {
					'type' : 'number',
					'placeholder' : '0',
					'required' : 'required'
				}, // end of attributes
			}, {// end of 2
				'label' : 'Kolor:',
				'name' : 'color',
				'attributes' : {
					'class' : 'color',
					'value' : '000000'
				},
			}
		], // end of input

		//CREATE RADIO BUTTONS
		'radioBox' : [
			{
				'label': 'Typ wypełnienia',
				'name': 'fill',
				'radios': [
					{
						'text': 'Pełne',
						'value': 'fill',
						'id': 'fill',
						'checked': 'checked'
					},
					{
						'text': 'Obrys',
						'value': 'stroke',
						'id': 'stroke'
					}
				] // end of options
			} // end of radio
		], // end of radioBox
		'input customBox strokeCh' : [
			{
				'label': 'Szer. obrysu',
				'name': 'strokeWidth',
				'attributes': {
					'type': 'number',
					'id': 'sWidth',
					'value': '1',

				},
				'customBox': true,
				'customId': 'strokeCh'
			}
		],
		'input customBox fillCh' : [
			{
				'label': 'szer. wypelnienia',
				'name': 'fillWidth'
			}
		],
		'input customBox rectCh' : [
		{
			'label': 'Szerokość',
			'name' : 'rectWidth',
			'attributes': {
				'type': 'number',
				'id': 'rectWidth'
			},
			'customBox': true,
			'customId': 'rectDimensionsCh'
		}, {
			'label': 'Wysokość',
			'name': 'rectHeight',
			'attributes': {
				'type': 'number',
				'id': 'rectHeight'
			},
			'customBox': true,
			'customId': '',
		}
		],
		'input circDimensions' : []

	});
/*
	var okienkoStartowe = new Okienko ({
		'name' : 'Nowy Kształt',
		'input' : [
			{
				'label' : 'Współrzędna X:',
				'name' : 'startX',
				'attributes' : {
					'type' : 'number',
					'placeholder' : '0',
					'required' : 'required'
				} // end of attributes
			},	//end of 1
			{
				'label' : 'Współrzędna Y:',
				'name' : 'startY',
				'attributes' : {
					'type' : 'number',
					'placeholder' : '0',
					'required' : 'required'
				}, // end of attributes

			}, // end of 2
			{
				'label' : 'Wybierz kolor',
				'name' : 'color',
				'attributes' : {
					'class' : 'color',
					'value' : '000000'
				},

			}
		], // end of input


	});
*/
	var c = document.getElementById("myCanv");
	var ctx = c.getContext("2d");
	
	var optionDiv = document.getElementById(options.cont);
	var form = document.getElementsByClassName("opt")[0];
	var clear = document.getElementById("clear");
	var submit = document.getElementById("draw");
	var type = document.getElementById("type");
	var strokeWidth = document.getElementById("sWidth");
	var closeButton = document.getElementById("close"); 
	
	var fillFlag;
	var menuOpen = 1;



	R.addEvent(optionDiv, 'change', function(e){
		e = e || event;
	  var target = e.target || e.srcElement;

	  if(target.nodeName == 'SELECT') {
	  	R.assert(true, 'select');

	  } else if (target.nodeName == 'INPUT') {
			
			var parentChild = target.parentNode.childNodes;
			for(i=0, count = parentChild.length; i<count; i++) {

				R.assert(true, parentChild[i].value);
				var parentValue = parentChild[i].value || '';
				var targetTarget = document.getElementById(target.id + 'Ch') || '';
				if(target.id == parentValue){
					
					var targetClass = targetTarget.className == 'hidden' ? '' : 'hidden';
					targetTarget.className = targetClass;
					R.assert(true, parentChild[i].value+'Ch');
				} else {
					targetTarget.className = 'hidden';
				}
			}
	 	}
	});


	/*
	
	R.addEvent(optionDiv, 'change', function(e){
		e = e || event;
	  var target = e.target || e.srcElement;
	  
	  if(target.value || target.checked){
		  var parentChild = target.parentNode.childNodes;
		  var targetId = target.value;
		  
		  for(var i = 0, count = parentChild.length; i < count; i++) {
		  	var parentValue = parentChild[i].value;
		  	var tT = document.getElementById(parentValue + 'Ch') || 
		  					 document.getElementById(target[i] + 'Ch');
		  	R.assert(targetId == parentValue || targetId == target[i].value, target[i] + ' / ' + parentValue );
		  	if(targetId == parentValue){
		  		tT.className = '' ? tT.className = 'hidden' : tT.className = '';
		  	} else {
		  		tT.className = 'hidden';
		  	}
		  }
		}


	});

	*/
	/*
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
*/

	//Resize canvas
	R.addEvent(window, "resize", function() {
		var d = c.parentNode;
		var inMemCanvas = document.createElement("canvas");
		inMemCanvas.width = c.width;
	    inMemCanvas.height = c.height;
	    inMemCanvas.getContext('2d').drawImage(c, 0, 0);
	    var newWidth;

		// resize my canvas as needed, probably in response to mouse events
		if(window.innerWidth > 500){
			newWidth = (window.innerWidth * 100)/100 - menuOpen*options.barWidth - 49;

		} else {
			newWidth = (window.innerWidth * 100)/100;
		}
		c.width = newWidth;
		c.height = (window.innerHeight * 100)/100 - 10;
		
		ctx.drawImage(inMemCanvas, 0, 0);
		
	}, false);

	R.addEvent(closeButton, 'click', function(){
		
		if(menuOpen) {
			menuOpen = 0;
			optionDiv.style.right = -(options.barWidth) + 'px';
			closeButton.childNodes[0].innerHTML = '<';
			window.dispatchEvent(ev);

		} else {
			menuOpen = 1;
			optionDiv.style.right = 0 + 'px';
			closeButton.childNodes[0].innerHTML = '>';
			window.dispatchEvent(ev);

		}
	},false);


	//Symulating change on first select option
	var ev = document.createEvent("HTMLEvents");
	ev.initEvent("change", true, true);
	//type.dispatchEvent(ev);
	//fill.dispatchEvent(ev);
	ev.initEvent("resize",true,true);
	window.dispatchEvent(ev);


	//Init 
	//strokeWidth.parentNode.className = 'hidden';
	//optionDiv.style.width = options.barWidth + 'px';
	//closeButton.style.right = options.barWidth + 'px';





























// Creating window class
	function Okienko(obj) {
		var windowOptions = {
			'endNode' : 'optContainer',
			'width' : '300px',
		}
		Okienko.counter = Okienko.counter || 0;
		var that = this;

				//Init function
		(function() {

			Okienko.customCounter = 0;

			// Init form and fieldset nodes
			var form = document.getElementById('form ' + Okienko.counter);
			var fieldset = document.createElement('fieldset');
			if(form === null) {
				form = document.createElement('form');
				form.id = 'form' + Okienko.counter++;
				form.className = 'optForm';
			}
			form.appendChild(fieldset);

			var start = new Date().getTime();
			var cont = document.getElementById(windowOptions['endNode']);
			var div = document.createElement('div');
			div.className = 'optWindow';
			div.style.width = options.barWidth + 'px';
			cont.appendChild(div);

			var isCustom = function(obj, key) {
				if(key.indexOf('customBox') != -1){
					fieldset = document.createElement('fieldset');
					fieldset.className = 'custom';
					fieldset.id = key.split(' ')[2];
					fieldset.className = 'hidden';
					return true;
				}
			};
			var isCustomEnd = function() {
				if(isCutomized) {
					form.appendChild(fieldset);
					fieldset = temp;
					isCutomized = false;
				}
			}

			//Search through whole object
			for(key in obj) {
				var temp = fieldset;
				var isCutomized = false;
				isCutomized = isCustom(obj, key);

				switch (true) {

					// Case: title
					case (key.indexOf('name') != -1): { 
						var h1 = document.createElement('h1');
						var text = document.createTextNode(obj[key]);
						h1.appendChild(text);
						div.appendChild(h1);
						break;	
					}

					// Case: input
					case (key.indexOf('input') != -1): {
						for(i = 0; i < obj[key].length ; i++){
							

							var p = document.createElement('p');
							var input = document.createElement('input');
							if(obj[key][i]['label']) {
								var label = document.createElement('label');
								label.textContent = obj[key][i]['label'] || '';
								//set attributes
								R.setAttributes(label, 
								{
									'for': obj[key][i]['name']
								});
								p.appendChild(label);
							}
							R.setAttributes(input, 
							{
								'name': obj[key][i]['name'],
								'id': obj[key][i]['name']
							});
							R.setAttributes(input, obj[key][i]['attributes']);

							//append
							p.appendChild(input);
							fieldset.appendChild(p);

							//if follow class
							if(obj[key][i]['follow']) {
								var clearfix = document.createElement('div');
								var prevClearfix = p.previousSibling;
								if(prevClearfix.className == 'clearfix') {
									prevClearfix.parentNode.removeChild(prevClearfix);
								}
								clearfix.className = 'clearfix';
								p.previousSibling.className = 'follow';
								fieldset.appendChild(clearfix);
							}
						}
						div.appendChild(form);
						isCustomEnd();
						break;
					}

					//Case: select
					case (key.indexOf('select') != -1): {						
						for(var i = 0, count = obj[key].length; i < count; i++) {	
							var p = document.createElement('p');
							if(obj[key][i]['label']) {
								var label = document.createElement('label');
								label.textContent = obj[key][i]['label'] || '';
								R.setAttributes(label, 
								{
									'for': obj[key][i]['name']
								});
								p.appendChild(label);
							}

							var select = document.createElement('select');

						//   'select'[i]
							if(obj[key][i]['options']) {
								for(var j = 0, 
									  count2 = obj[key][i]['options'].length;
									  j < count2;
									  j++) {
									var optionNode = document.createElement('option');
									optionNode.textContent = obj[key][i]['options'][j]['text'];
									R.setAttributes(optionNode, obj[key][i]['options'][j]);
									select.appendChild(optionNode); 
								}
							}
												
								R.setAttributes(select, 
								{
									'name': obj[key][i]['name'],
									'id': obj[key][i]['name']
								});
							
							// append everything
							
							p.appendChild(select);
							fieldset.appendChild(p);

							//if 'follow' class
							if(obj[key][i]['follow']) {

								var clearfix = document.createElement('div');
								var prevClearfix = p.previousSibling;
								if(prevClearfix.className == 'clearfix') {
									prevClearfix.parentNode.removeChild(prevClearfix);
								}
								clearfix.className = 'clearfix';
								p.previousSibling.className = 'follow';
								fieldset.appendChild(clearfix);
							}
						}
						break;
					}

					// Case: radioBox
					case (key.indexOf('radioBox') != -1):
						for(var i = 0, count = obj[key].length; i < count; i++) {
							var p = document.createElement('p');
							if(obj[key][i]['label']) {
								var label = document.createElement('label');
								label.setAttribute('for', obj[key][i]['name']);
								label.textContent = obj[key][i]['label'];
								p.appendChild(label);
							}	
							for(var j = 0, count2 = obj[key][i]['radios'].length; 
								  j < count2; j++) {
								var radio = document.createElement('input');
								R.setAttributes(radio,{
									'name': obj[key][i]['name'],
									'id': obj[key][i]['radios'][j]['id'] ,
									'value': obj[key][i]['radios'][j]['value']
								});
								if(obj[key][i]['radios'][j]['checked']) {
									radio.setAttribute('checked', 'checked');
								}
								radio.setAttribute('type', 'radio');
								p.appendChild(radio);
								p.appendChild(document.createTextNode(obj[key][i]['radios'][j]['text']));
							}
							fieldset.appendChild(p);
						}
						break;

					// Case: checkBox
					case (key.indexOf('checkBox') != -1):
						for(i = 0, count = obj[key].length; i < count; i++) {
							var p = document.createElement('p');
							if(obj[key][i]['label']) {
								var label = document.createElement('label');
								label.setAttribute('for', obj[key][i]['name']);
								label.textContent = obj[key][i]['label'];
								p.appendChild(label);
							}	
							for(j = 0, count2 = obj[key][i]['checks'].length; j < count2; j++) {
								var checkBox = document.createElement('input');
								R.setAttributes(checkBox,{
									'name': obj[key][i]['name'],
									'id': obj[key][i]['checks'][j]['id'] ,
									'value': obj[key][i]['checks'][j]['value']
								});
								if(obj[key][i]['checks'][j]['checked']) {
									checkBox.setAttribute('checked', 'checked');
								}
								checkBox.setAttribute('type', 'checkbox');
								
								p.appendChild(checkBox);
								p.appendChild(document.createTextNode(obj[key][i]['checks'][j]['text']));
							}
							fieldset.appendChild(p);
						}
						break;

					default: {
						R.assert(true, "brak");
						break;
					}

				}
				

			}
			div.appendChild(form);
			
			var end = new Date().getTime() - start;
			console.log('Czas utworzenia okienka: ' + end + ' ms');
		})();
	}


})();