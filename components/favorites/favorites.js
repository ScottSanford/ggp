angular.module('ggpApp')

.controller('FavoritesCtrl', function($scope, localStorageService){

	var favorites = localStorageService.get('favorites');
	console.log(favorites);

	$scope.favorites = favorites;

});