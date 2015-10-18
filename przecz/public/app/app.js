var app = angular.module('app', []);

app.controller('appCtrl', function($scope, $interval) {
	$scope.vars = [];
	$scope.stop = false;
	$scope.nextCycle = function() {
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


});

