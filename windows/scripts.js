(function() {

	function Okienko(obj) {
		var windowOptions = {
			'endNode': 'optContainer',
			'width': '300px',
		}
		Okienko.counter = Okienko.counter || 0;
		var that = this;

			var isCustom = function(i,f) {
				var temp = f;
				R.assert(true, obj[key][i]['customBox']);
				if(obj[key]['customBox']){
					R.assert(true, 'dupa');
					temp = fieldset;
					fieldset = document.createElement("fieldset");
					fieldset.className = 'custom';
					fieldset.id = 'customBox ' + Okienko.counter;
				}
			};


		//Init function
		(function() {

			// Init form and fieldset nodes
			var form = document.getElementById('form ' + Okienko.counter);
						if(form === null) {
							form = document.createElement('form');
							form.id = 'form' + Okienko.counter++;
							form.className = 'optForm';
						}
			
						
			var fieldset = document.createElement('fieldset');
			var start = new Date().getTime();
			var cont = document.getElementById(windowOptions['endNode']);
			var div = document.createElement('div');
			div.className = 'optWindow';
			div.style.width = windowOptions.width;
			cont.appendChild(div);




			//Search through whole object
			for(key in obj) {

				switch (true) {

					// case: title
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
						break;
					}

					//Case: select
					case (key.indexOf('select') != -1): {
						
						for(i = 0, count = obj[key].length; i < count; i++) {	
						
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
								
								for(j = 0, 
									  count = obj[key][i]['options'].length;
									  j < count;
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
						div.appendChild(form)
						break;
					}

					// Case: radioBox and checkBox
					case (key.indexOf('radioBox') != -1):
						for(i = 0, count = obj[key].length; i < count; i++) {
							var p = document.createElement('p');
							if(obj[key][i]['label']) {
								var label = document.createElement('label');
								label.setAttribute('for', obj[key][i]['name']);
								label.textContent = obj[key][i]['label'];
								p.appendChild(label);
							}	
							for(j = 0, count2 = obj[key][i]['radios'].length; j < count2; j++) {
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
					}
				}
			}
			console.log(new Date().getTime() - start);
			form.appendChild(fieldset);
		})();


	}

//	INIT
	var okienkoinne = new Okienko({
		'name': 'Dupa',
		'input 1': [
			{
				'label': 'Brak',
				'name': 'Brak',
				'attributes': {
					'type': 'password',
					'class': 'hidden'
				}
			}
		],

	});

	var okienkoStartowe = new Okienko ({
		// CREATE TITLE 
		'name': 'Sraka',

		// CREATE INPUTS
		'input1': 
		[
			{
				'label': 'X:',
				'name': 'coordX',
				'attributes': {
					'type': 'number',
					'class': 'ups',
					'placeholder': 'lel',
				} // end of attributes
			},	//end of 1
			{
				'label': 'Y:',
				'name': 'coordY',
				'attributes': {
					'type': 'password',
				}, // end of attributes
				'follow': true
			}, // end of 2
			{
				'label': 'Wybierz kolor',
				'name': 'color',
				'attributes': {
					'class': 'color',
					'value': '000000'
				}, // end of attributes
			}, // end of 3
		], // end of inputs

		// CREATE SELECT BOXES
		'select': [{
			'label': 'Select 1',
			'name': 'select1',
			'options': [{
				'value': 'none',
				'selected': 'selected',
				'text': 'Hehe'
			},{
				'value': 'Tez',
				'text': 'heheh'
			}], //end of options
			}, // end of 1
			{
			'label': 'Select 2',
			'name': 'select2',
			'options': [{
				'value': 'yup',
				'selected': 'selected',
				'text': 'yup',
			}, {
				'value': 'samehere',
				'text': 'Same here'
			}]
			}
		], // end of selects

		// CREATE RADIO BOXES
		'radioBox': [{
			'label': 'RadioBoxy',
			'name': 'test',
			'radios': 
			[
				{
				'text': 'Tak',
				'value' : 'tak',
				'id': 'none',
				}, {
				'text' : 'nie',
				'value': 'nie',
				'id': 'dupa',
				'checked': 'checked'
				}
			]
		},
		{
			'label': 'i tu!',
			'radios': [{
				'text': 'brakk',
				'value': 'si'
			}]
		}],
		'checkBox': [{
			'label': 'CheckBoxy',
			'name': 'test',
			'checks': 
			[
				{
				'text': 'Tak',
				'value' : 'tak',
				'id': 'none',
				}, {
				'text' : 'nie',
				'value': 'nie',
				'id': 'dupa',
				'checked': 'checked'
				}
			]
		},
		{
			'label': 'i tu!',
			'checks': [{
				'text': 'brakk',
				'value': 'si'
			}]
		}]
	});

})();
