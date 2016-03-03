angular.module('ggpApp')

.controller('MapCtrl', function($scope, mfly, esriLoader){

	mfly.search('@MallProperties').then(function(data){

		mfly.getFolder(data[0].id).then(function(data){
			$scope.properties = data;
		});

	});

	$scope.showPropertyOnMap = function(name) {
		$scope.mapFacts = true;
		$scope.chosenProperty = name;
	}

	// Ersi Map
    esriLoader.require(['esri/Map'], function(Map) {
        $scope.map = new Map({
            basemap: 'streets'
        });
    });

});