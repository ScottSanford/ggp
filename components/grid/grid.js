angular.module('ggpApp')

.controller('GridCtrl', function($scope, mfly, propertyData){

	$scope.malls = propertyData;

	mfly.getFolder('a4ce3ae64bb34998bd28479d8b7f8201product235988').then(function(data){
		for (var i=0; i< data.length; i++) {

			var airshipID = data[i].propertyId; 
			console.log(airshipID);

		}
	});

	mflyCommands.search('@Banner').done(function(data){
		$scope.thumbnail = data[0].thumbnailUrl;
	});

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