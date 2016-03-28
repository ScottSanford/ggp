angular.module('ggpApp')

.controller('CollectionsCtrl', function($scope, mfly,localStorageService, $route, ngDialog){

	var collectionNames = localStorageService.get('collectionNames');
	
	$scope.title = localStorageService.get('collectionTitle');
	$scope.favorites = localStorageService.get('showCollection');
	
	// if there is no collection the very first time, open Dialog
	if (!$scope.favorites) {
		openInitCollectionDialog();
	}
	// for Dialog
	$scope.collections = collectionNames;


	$scope.openCollectionDialogBox = function () {
		openInitCollectionDialog();
	};

	function openInitCollectionDialog() {
		ngDialog.open({ 
			template: 'common/tmpls/dialogs/favorite-collection.html', 
			className: 'ngdialog-theme-default', 
			scope: $scope,
			controller: function($scope) {
				$scope.chooseCollection = function(lsProps, title) {
					
					$scope.onCollectionSelect = function() {
						
					};

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
	}

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