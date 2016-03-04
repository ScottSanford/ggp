angular.module('ggpApp')

.controller('PropertyCtrl', function($scope, $location, $routeParams, mfly, localStorageService, Lightbox){

	var propertyID = $routeParams.id;
	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

	mfly.getData(dataId).then(function(data){
		
		var jsonData = JSON.parse(data);
		
		jsonData.forEach(function(value,key){
			
			if (propertyID === value.id) {

				mfly.getFolder(value.id).then(function(data){
					for (var i=0; i < data.length; i++) {
						if (data[i].name === 'Gallery') {
							mfly.getFolder(data[i].id).then(function(data){
								var photoArray = [];
								for (var i=0; i< data.length; i++){
									var obj = {};
									obj['url'] = data[i].thumbnailUrl;
									photoArray.push(obj);
								}

								// scope for view
								$scope.photosOnView = data;								
								// scope for lightbox
								$scope.photos = photoArray;

								$scope.openLightboxModal = function (index) {
								    Lightbox.openModal($scope.photos, index);
								};

							})
						}
					}
				})

				$scope.mall = value;

			}


		});


	});
	
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

	$scope.goToMall = function() {
		$location.url('/mall?id=' + propertyID);
	}	

	$scope.goToSpace = function() {
		$location.url('/space?id=' + propertyID);
	}

});