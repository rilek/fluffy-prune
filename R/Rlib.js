var R = {};

//Funkcja sprawdzająca prawda/fałsz
//Funckja pobiera warunek oraz wiadomość do wyświetlenia
	R.assert = function(value, message) {
		var results = document.getElementById('results');
		if(results === null) {
			results = document.createElement('ul');
			results.id = 'results';
			document.getElementsByTagName('body')[0].appendChild(results);
		}
		var li = document.createElement('li');
		var text = document.createTextNode(message);
		li.appendChild(text);
		li.className = (value ? 'pass' : 'fail');
		results.appendChild(li);
	};

//Funkcja zamieniająca zagniezdzone ul na menu wielopoziomowe
	R.createMenu = function(event) {
		var list = document.getElementsByTagName('ul');
		for(var i = 0; i < list.length; i++) {
			var parent = list[i].parentNode;
			if(parent.nodeName == 'LI') {
				var sign = document.createTextNode('+ ');
				parent.firstChild
					  .insertBefore(sign,parent.firstChild.childNodes[0]);
				parent.className = 'node';
				list[i].style.display = 'none';
			}
		}
		var toggleMenu = function(e) {
			
			var t = e.target.parentNode;
			var tc = t.className;
			if(tc.indexOf('node') != -1) {
				var a = t.childNodes[0].innerHTML;
				var menuList = t.childNodes[2];
				menuList.style.display = 
					(menuList.style.display == 'none') ? 'block' : 'none';
				R.assert(true, 'a');
				t.childNodes[0].innerHTML = (a.indexOf('+') != -1) ? a.replace('+', '-') : a.replace('-','+');
				e.preventDefault();
			}
		};
		document.getElementById('menu').addEventListener(event, toggleMenu, false);
	};

//dodaj event
	R.addEvent = function(obj, evType, fn, useCapture){
	  if (obj.addEventListener){
	    obj.addEventListener(evType, fn, useCapture);
	    return true;
	  } else if (obj.attachEvent){
	    var r = obj.attachEvent("on"+evType, fn);
	    return r;
	  } else {
	    alert("Handler could not be attached");
	  }
	}

//multiple setAttribute
/*
	node, {
	'attr':'value'
	'attr2':'value2'
}
*/
R.setAttributes = function(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
};


R.animate = function (elem,style,to,time,unit,from) {
    if( !elem) return;
    var start = new Date().getTime();
    var timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem.style[style] = (from+step*(to-from)) + unit;
            if(step == 1) clearInterval(timer);
        },25);
    elem.style[style] = from+unit;
}