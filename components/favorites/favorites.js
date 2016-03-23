angular.module('ggpApp')

.controller('FavoritesCtrl', function($scope, mfly,localStorageService, $route){

	var favorites = localStorageService.get('favorites');

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

	$scope.removeFavorites = function() {
		localStorageService.remove('favorites');
		$route.reload();
	};

});