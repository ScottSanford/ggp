angular.module('ggpApp')

.controller('PropertyCtrl', function(
	$scope, $location, $rootScope, $routeParams, 
	mfly, propertyData, CSVConverterSvc,
	localStorageService, Lightbox){

	$scope.mapNav     = false;
	$scope.compareNav = false;
	
	for (var i =0; i <propertyData.length; i++) {
		if ($routeParams.id === propertyData[i].property_id) {
			$scope.mall = propertyData[i];
		}
	}

	// go through properties array
	mfly.getFolder("a4ce3ae64bb34998bd28479d8b7f8201product235988").then(function(data){
		for (var i = 0; i < data.length; i++) {
			if (data[i].propertyId === $routeParams.id) {

				// show Map Nav
				if (data[i].propertyId === '2009' || 
				data[i].propertyId === "3802" ||
				data[i].propertyId === '3812' ||
				data[i].propertyId === '2173') {
					$scope.mapNav = true;
				}

				// show Compare Nav
				if (data[i].propertyId === '2009' || 
				data[i].propertyId === "3802" ||
				data[i].propertyId === '4386' ||
				data[i].propertyId === '3812' ||
				data[i].propertyId === '2173') {
					$scope.compareNav = true;
				}

				mfly.getFolder(data[i].id).then(function(data){

					$scope.selected = 1;
					$scope.banner = data[0].thumbnailUrl;

					// Gallery Folder Names
					$scope.folderNames = data;

					// show first Folder Thumbnails on View on Initialize 
					mfly.getFolder(data[1].id).then(function(data){
							var photoArray = [];
							
							for (var i=0; i < data.length; i++) {
								var obj = {};
								obj['url'] = data[i].thumbnailUrl;
								obj['id'] = data[i].id;
								photoArray.push(obj);
							};
						

							$scope.photos = photoArray;

							$scope.openLightboxModal = function (index) {
							    Lightbox.openModal($scope.photos, index);
							};

					});			
					
				});
			}
		}
	});

	$scope.showPhotos = function(id, index) {
		$scope.selected = index;
		mfly.getFolder(id).then(function(data){
			var photoArray = [];
			
			for (var i=0; i < data.length; i++) {
				var obj = {};
				obj['url'] = data[i].thumbnailUrl;
				obj['id']  = data[i].id;
				photoArray.push(obj);
			}

			$scope.photos = photoArray;

			$scope.openLightboxModal = function (index) {
			    Lightbox.openModal($scope.photos, index);
			};

		});
	};

	$rootScope.goToAnnotations = function(id) {
		mfly.openItem(id);
	};

	// Add to Favorites \/\/\/
	//                   \/\/
	//                    \/
	
	var lsFavorites = localStorageService.get('favorites');
	var lsStatus = localStorageService.get('status');
	if (lsFavorites) {
		lsFavorites.forEach(function(val, key){
			if (val.property_id === $routeParams.id) {
				
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
			if (item.property_name !== mall.property_name) {
				return item;
			}
		});
		localStorageService.set('favorites', newList);
		console.log(localStorageService.get('favorites'));
		localStorageService.set('status', "true");

		$scope.status = !$scope.status;
	}

	// Navigation       \/\/\/
	//                   \/\/
	//                    \/	


	$scope.goToMap = function() {
		$location.url('map');
	};	

	$scope.goToCompare = function() {
		var id = $routeParams.id;
		$location.url('graph?id=' + id);
	}

	$scope.goToMeetingBuilder = function() {
		$location.url('meetings');
	};
















});