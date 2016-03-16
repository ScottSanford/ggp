angular.module('ggpApp')

.controller('GridCtrl', function($scope, mfly, propertyData){

	mfly.search('@Banner').then(function(data){
		
		data.forEach(function(currentObj, index){
			var airshipID = currentObj.statusLabel;
			
			propertyData.forEach(function(c, i) {
				var csvID = c.property_id;
				if (airshipID === csvID) {
					var thumb = currentObj.thumbnailUrl;
					c['thumb'] = thumb;
				}
			});
		});

		$scope.malls = propertyData;
		
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