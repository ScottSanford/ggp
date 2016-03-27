angular.module('ggpApp')

.controller('FavoritesCtrl', function($scope, mfly,localStorageService, $route, ngDialog){

	var collectionNames = localStorageService.get('collectionNames');

	// for Dialog
	$scope.collections = collectionNames;

	$scope.openCollectionDialogBox = function () {
		ngDialog.open({ 
			template: 'common/tmpls/dialogs/favorite-collection.html', 
			className: 'ngdialog-theme-default', 
			scope: $scope,
			controller: function($scope) {
				$scope.chooseCollection = function(lsProps, title) {
					console.log("title :: ", title);
					
					localStorageService.set('collectionTitle', title);
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
	$scope.title = localStorageService.get('collectionTitle');
	$scope.favorites = localStorageService.get('showCollection');

	$scope.addNotesToCollection = function(notes) {
		var title = localStorageService.get('collectionTitle');

		collectionNames.forEach(function(obj, index){
			if (title.name === obj.name) {
				obj['notes'] = notes;
			}
		});
		localStorageService.set('collectionNames', collectionNames);
		console.log(localStorageService.get('collectionNames'));
	}

	$scope.removeFavorites = function() {
		localStorageService.remove('favorites');
		$route.reload();
	};

});