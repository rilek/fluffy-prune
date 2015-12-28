var count = 123;

(function () {

	var amount = count.toString().split("");

	for (var i = 0; i <= amount.length - 1; i++) {
		var span = document.createElement('span');
		span.className = 'circ';
		span.textContent = amount[i];
		document.getElementById('visitorsCounter').appendChild(span);
		
	};


})();