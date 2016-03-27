angular.module('ggpApp')

.controller('FavoritesCtrl', function($scope, mfly,localStorageService, $route, ngDialog){

	var favorites = localStorageService.get('favorites');
	var collectionNames = localStorageService.get('collectionNames');
	$scope.collections = collectionNames;

	$scope.openCollectionDialogBox = function () {
		ngDialog.open({ 
			template: 'common/tmpls/dialogs/favorite-collection.html', 
			className: 'ngdialog-theme-default', 
			scope: $scope,
			controller: function($scope) {
				$scope.chooseCollection = function(lsProps) {
					console.log(lsProps);

					mfly.search('@Banner').then(function(data){
							
						data.forEach(function(currentObj, index){
							var airshipID = currentObj.statusLabel;
							
							lsProps.forEach(function(c, i) {
								var localStorageID = c.property_id;
								if (airshipID === localStorageID) {
									var thumb = currentObj.thumbnailUrl;
									c['thumb'] = thumb;
								}
							});
						});
						localStorageService.set('showCollection', lsProps);

						$route.reload();
            			$scope.closeThisDialog();

					});

				}
			}
		});
	};

	$scope.favorites = localStorageService.get('showCollection');
		

	// mfly.search('@Banner').then(function(data){
		
	// 	data.forEach(function(currentObj, index){
	// 		var airshipID = currentObj.statusLabel;
			
	// 		favorites.forEach(function(c, i) {
	// 			var localStorageID = c.property_id;
	// 			if (airshipID === localStorageID) {
	// 				var thumb = currentObj.thumbnailUrl;
	// 				c['thumb'] = thumb;
	// 			}
	// 		});
	// 	});

	// 	$scope.favorites = favorites;
	// 	console.log($scope.favorites);

	// });

	$scope.removeFavorites = function() {
		localStorageService.remove('favorites');
		$route.reload();
	};

});