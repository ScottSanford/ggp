angular.module('ggpApp')

.controller('MapCtrl', function($scope, mfly, mapData, propertyData){

	var filteredArray = propertyData.filter(function(prop){
		if (prop.property_id === '2009' || 
			prop.property_id === "3802" ||
			prop.property_id === '4386' ||
			prop.property_id === '3812' ||
			prop.property_id === '2173') {
			return prop;
		}
	});

	$scope.properties = filteredArray;

	$scope.showPropertyOnMap = function(obj) {

		$scope.chosenProperty = obj;
		$scope.mapFacts = true;

		$scope.mapTypeList = true;
	 	var maps = [
			{
				type: 'Trade Area',
				propId: obj.property_id, 
				mapType: 'tradeArea'
			},
			{
				type: 'Average Income',
				propId: obj.property_id, 
				mapType: 'avgIncome'
			},
			{
				type: 'Employee Density',
				propId: obj.property_id, 
				mapType: 'employeeDensity'
			},
			{
				type: 'Aerial',
				propId: obj.property_id, 
				mapType: 'aerial'
			}
		];
	
		$scope.mapTypes = maps;
		$scope.showMap  = false;

		$scope.openMapType = function(mapType, id) {

			$scope.showMap = true;
			// iterate through mapData
			for (var i = 0; i < mapData.length; i++) {
				// if id matches map id in array
				if (id === mapData[i].idMall) {
					// find matching property
					for (var y in mapData[i]) {
						// find matching property
						if (mapType === y) {
							var mapTypeObj = mapData[i][mapType];

							var webmap = mapType + 'Webmap';
							var extent = mapType + 'Extent';

							var w = mapTypeObj[webmap];
							var e = mapTypeObj[extent];

							var newEValue = e.slice(1, e.length -1);
	

							var url = 'https://ggp.maps.arcgis.com/apps/Embed/index.html?webmap=' +
									w + '&amp;extent=' +
									newEValue + '&amp;zoom=true&amp;scale=true&amp;legend=true&amp;disable_scroll=false&amp;theme=light';
							console.log(url);
							$scope.mapSrc = url;

						}
					}
				}
			}
		}

	}


});