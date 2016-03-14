angular.module('ggpApp')

.controller('GridCtrl', function($scope, propertyData){

	$scope.malls = propertyData;

	mflyCommands.search('@Banner').done(function(data){
		$scope.images = data[0].thumbnailUrl;
		console.log($scope.images);

	})

	$scope.slider = {
		range: {
			min: 0, 
			max: 3000000
		}, 
		minStart: 0, 
		maxEnd: 3000000
	};


	$scope.byRange = function (minValue, maxValue) {
	  	minValue === undefined ? 0 : minValue;
  		maxValue === undefined ? 100000000 : maxValue;

	  	return function predicateFunc(item) {
	    	return minValue <= item.overview.gla && item.overview.gla <= maxValue;
	  	};
	};


	
});