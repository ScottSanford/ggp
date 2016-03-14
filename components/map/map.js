angular.module('ggpApp')

.controller('MapCtrl', function($scope, mfly, mapData){

	mapData.then(function(data){
		console.log(data);
	});


	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';

	mfly.getData(dataId).then(function(data){
		var jsonData = JSON.parse(data);
		for (var i =0; i < data.length; i++) {
			for (var y = 0; y < mapData.length; y++) {
				if (data[i].mapId === data[y].IdMall) {
					console.log(data[y]);
					return data[y];
				}
			}
		}
	});

	mfly.search('@MallProperties').then(function(data){

		mfly.getFolder(data[0].id).then(function(data){
			
			$scope.properties = data;
		});

	});

	$scope.showPropertyOnMap = function(name) {
		$scope.chosenProperty = name;
		$scope.mapFacts = true;
	}


});