angular.module('ggpApp')

.controller('MapCtrl', function($scope, mfly){

	mfly.search('@MallProperties').then(function(data){

		mfly.getFolder(data[0].id).then(function(data){
			$scope.properties = data;
			console.log(data);
		});

	});

	$scope.showPropertyOnMap = function(name) {
		$scope.chosenProperty = name;
		$scope.mapFacts = true;
	}

	// ESRI Map
	// adding httpS to the src links
	var esriMap = [
		{
			title: 'Baybook Mall', 
			src: 'https://ggp.maps.arcgis.com/apps/Embed/index.html?webmap=af251e9d1e96451ab44ed01d6210e604&amp;extent=-96.0303,29.0305,-94.2574,30.052&amp;zoom=true&amp;scale=true&amp;legend=true&amp;disable_scroll=false&amp;theme=light'
		}, 		
		{
			title: 'Glendale Galleria', 
			src: 'https://ggp.maps.arcgis.com/apps/Embed/index.html?webmap=97ad2f76361942799b223e584b8cfc59&amp;extent=-118.678,33.9428,-117.7915,34.4284&amp;zoom=true&amp;scale=true&amp;legend=true&amp;disable_scroll=false&amp;theme=light'
		}, 		
		{
			title: 'Oakbrook Center', 
			src: 'https://ggp.maps.arcgis.com/apps/Embed/index.html?webmap=af251e9d1e96451ab44ed01d6210e604&amp;extent=-96.0303,29.0305,-94.2574,30.052&amp;zoom=true&amp;scale=true&amp;legend=true&amp;disable_scroll=false&amp;theme=light'
		}, 		
		{
			title: 'Stonebriar Centre', 
			src: 'https://ggp.maps.arcgis.com/apps/Embed/index.html?webmap=21b5bbbd275c47a7bccab8fc985395d0&amp;extent=-97.2194,32.9454,-96.3329,33.4367&amp;zoom=true&amp;scale=true&amp;legend=true&amp;disable_scroll=false&amp;theme=light'
		}, 		
		{
			title: 'Stonestown Galleria', 
			src: 'https://ggp.maps.arcgis.com/apps/Embed/index.html?webmap=a3634606a4034b1a87d72177db066166&amp;extent=-122.8794,37.4331,-121.993,37.8978&amp;zoom=true&amp;scale=true&amp;legend=true&amp;disable_scroll=false&amp;theme=light'
		}
	];

	$scope.maps = esriMap;


});