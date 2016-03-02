angular.module('ggpApp')

.controller('MapCtrl', function($scope, mfly){

	console.log('Map control is ready to rock and roll! 8-)');

	mfly.search('@MallProperties').then(function(data){

		mfly.getFolder(data[0].id).then(function(data){
			$scope.properties = data;
		});

	});

	$scope.showPropertyOnMap = function(name) {
		$scope.mapFacts = true;
		$scope.chosenProperty = name;
	}

});