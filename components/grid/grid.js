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

	// Delete when Final Project
	$scope.bayside = function() {
		return function predicateFunc(item) {
			if (item.property_name !== 'Bayside Marketplace') {
				return item;
			}			
		}
	};	
	$scope.marketplace = function() {
		return function predicateFunc(item) {
			if (item.property_name !== 'Market Place ') {
				return item;
			}			
		}
	};
	// Delete when Final Project

	$scope.slider = {
		range: {
			min: 0, 
			max: 3000000
		}, 
		minStart: 0, 
		maxEnd: 3000000
	};	

	$scope.filterGLA = function (minValue, maxValue) {
	  	minValue === undefined ? 0 : minValue;
  		maxValue === undefined ? 100000000 : maxValue;

	  	return function predicateFunc(item) {
	    	return minValue <= item.overview.gla && item.overview.gla <= maxValue;
	  	};
	};	

	$scope.median = {
		range: {
			min: 0, 
			max: 115000
		}, 
		minStart: 0, 
		maxEnd: 115000
	};

	$scope.filterMedian = function (minValue, maxValue) {
	  	minValue === undefined ? 0 : minValue;
  		maxValue === undefined ? 100000000 : maxValue;

	  	return function predicateFunc(item) {
	    	return minValue <= item.tradeArea.avg_income && item.tradeArea.avg_income <= maxValue;
	  	};
	};	

	$scope.stores = {
		range: {
			min: 0, 
			max: 325
		}, 
		minStart: 0, 
		maxEnd: 325
	};

	$scope.filterStores = function (minValue, maxValue) {
	  	minValue === undefined ? 0 : minValue;
  		maxValue === undefined ? 100000000 : maxValue;

	  	return function predicateFunc(item) {
	    	return minValue <= item.overview.stores && item.overview.stores <= maxValue;
	  	};
	};


	
});