var app = angular.module('app', []);

app.controller('appCtrl', function($scope, $interval) {
	$scope.vars = [];
	$scope.stop = false;
	$scope.nextCycle = function() {
		if(!$scope.vars.length) {
			$scope.play();
			return false;
		}
		$scope.started = true;
		for(i = 0, count = $scope.vars.length; i < count; i++) {
			functions.nextCycle($scope.vars[i]);
		}
	};
	
	$scope.play = function() {

		if( !$scope.stop ) {
			$scope.stop = $interval(function() {
				$scope.nextCycle();
			}, 1000); 
		} else {
			$interval.cancel($scope.stop);
			$scope.stop = false;
		}
	};

	$scope.reset = function() {
		options.canvas.canvas.getContext('2d').clearRect(0, 0, options.canvas.width, options.canvas.height);
		options.canvas.variableCount = 0;
		$scope.vars = [];
		$scope.started = false;
		$scope.stop ? $scope.play() : '';
	}

	// Function checking if obj is already in array
	$scope.containsObject = function (obj, list) {
	  var i;
	  for (i = 0; i < list.length; i++) {
	    if (angular.equals(list[i], obj)) {
	      return true;
	    }
	  }
	  return false;
	};

	$scope.addVar = function(isValid) {

		if(isValid) {
			if(!$scope.containsObject($scope.customVar, $scope.vars)) {
				$scope.vars.push({name: $scope.customVar.name, value: false, prevValue: false, posX: 0});

				functions.initVariable($scope.vars[$scope.vars.length-1]);
			} else {
				
			}
			$scope.customVar = '';
		}
	};

	$scope.download = function (ev) {
		var tempCnv = document.createElement('canvas');
		var tempCtx = tempCnv.getContext('2d');

		tempCnv.width = options.canvas.width;
		tempCnv.height = options.canvas.height;


		tempCtx.drawImage(options.grid.canvas, 0, 0);
		tempCtx.drawImage(options.canvas.canvas, 0, 0);

		var dataURL = tempCnv.toDataURL('image/png');
		ev.target.href = dataURL;
		ev.target.download = 'przebieg.png'
		
	};

});

