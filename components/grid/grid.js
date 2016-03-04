angular.module('ggpApp')

.controller('GridCtrl', function($scope, mfly){

	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

	mfly.getData(dataId).then(function(data){
		var jsonData = JSON.parse(data);
		$scope.malls = jsonData;
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