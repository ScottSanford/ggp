angular.module('ggpApp')

.controller('FavoritesCtrl', function($scope, mfly,localStorageService){

	var favorites = localStorageService.get('favorites');
	console.log("Favorites :: ",favorites);

	

	mfly.search('@Banner').then(function(data){
		
		data.forEach(function(currentObj, index){
			var airshipID = currentObj.statusLabel;
			console.log(airshipID);
			favorites.forEach(function(c, i) {
				var localStorageID = c.property_id;
				if (airshipID === localStorageID) {
					var thumb = currentObj.thumbnailUrl;
					c['thumb'] = thumb;
				}
			});
		});

		$scope.favorites = favorites;

	});

});