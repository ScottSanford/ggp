angular.module('ggpApp')

.controller('PropertyCtrl', function(
	$scope, $location, $routeParams, 
	mfly, propertyData, CSVConverterSvc,
	localStorageService, Lightbox){

	for (var i =0; i <propertyData.length; i++) {
		if ($routeParams.id === propertyData[i].property_id) {
			$scope.mall = propertyData[i];
		}
	}

	mfly.getFolder("a4ce3ae64bb34998bd28479d8b7f8201product235988").then(function(data){
		for (var i = 0; i < data.length; i++) {
			if (data[i].propertyId === $routeParams.id) {
				mfly.getFolder(data[i].id).then(function(data){
					$scope.names = data;
				});
			}
		}
	});

	$scope.showPhotos = function(id) {
		mfly.getFolder(id).then(function(data){
			var photoArray = [];
			
			for (var i=0; i < data.length; i++) {
				var obj = {};
				obj['url'] = data[i].thumbnailUrl;
				photoArray.push(obj);
			}

			$scope.photos = photoArray
			$scope.photosOnView = data;


			$scope.openLightboxModal = function (index) {
			    Lightbox.openModal($scope.photos, index);
			};


		});
	}
	
	var lsFavorites = localStorageService.get('favorites');
	var lsStatus = localStorageService.get('status');
	if (lsFavorites) {
		lsFavorites.forEach(function(val, key){
			if (val.id === $routeParams.id) {
				
				$scope.status = lsStatus !== undefined ? false : true; // orange star

			} else {
				$scope.status = true; // white star
			}
		});
	} 

	if (lsFavorites === null || lsFavorites.length === 0) {
		$scope.status = true;
	} 

	$scope.addToFavorites = function(mall){
		
		var favoriteList = localStorageService.get('favorites') || [];

		favoriteList.push(mall);
		localStorageService.set('favorites', favoriteList);
		localStorageService.set('status', "false");
		$scope.status = !$scope.status;

	}

	$scope.removeFromFavorites = function(mall) {
		var favoriteList = localStorageService.get('favorites');
		var newList = favoriteList.filter(function(item){
			if (item.name !== mall.name) {
				return item;
			}
		});
		localStorageService.set('favorites', newList);
		console.log(localStorageService.get('favorites'));
		localStorageService.set('status', "true");

		$scope.status = !$scope.status;
	}

});