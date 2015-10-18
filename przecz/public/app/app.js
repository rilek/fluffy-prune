var app = angular.module('app', []);

app.controller('appCtrl', function($scope) {
	$scope.vars = [];

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
				$scope.vars.push({name: $scope.customVar.name, value: true});
				functions.initVariable($scope.customVar);
			} else {
				
			}
			$scope.customVar = '';
		}
	};


});

