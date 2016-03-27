angular.module('ggpApp')

.controller('PropertyCtrl', function(
	$scope, $location, $rootScope, $routeParams, 
	mfly, propertyData, CSVConverterSvc,
	localStorageService, Lightbox, ngDialog, Flash){

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
	$scope.openCollectionDialogBox = function() {
		ngDialog.open({ 
			template: 'common/tmpls/dialogs/popover.html', 
			className: 'ngdialog-theme-default', 
			scope: $scope,
			controller: function($scope) {

				var collections = [{
					name: 'Favorites', 
					properties: []	
				}];
			
				var lsCNames = localStorageService.get('collectionNames');
				if (lsCNames) {
					$scope.collections = lsCNames;
				} else {
					$scope.collections = collections;
				}

				// add collection name to list
				$scope.addCollectionName = function() {
					var obj = {
						name: $scope.collectionName, 
						properties: []
					};

					collections.push(obj);
					localStorageService.set('collectionNames', collections);
					$scope.collections = localStorageService.get('collectionNames');
					$scope.collectionName = '';
				}

				$scope.addToSpecificCollection = function(collection, mall) {
					var lsCNames = localStorageService.get('collectionNames');
					var successMessage = mall.property_name + ' was added to "' + collection.name + '" collection!';
					var infoMessage    = mall.property_name + ' has already been added to "' + collection.name + '" collection!';

					// right at the beginning
					if (!lsCNames) {
						collections.forEach(function(obj, i){
							obj.properties.push(mall);
						});
						localStorageService.set('collectionNames', collections);
						Flash.create('success', successMessage);
					} else {

						lsCNames.forEach(function(obj, index){
							if (obj.name === collection.name) {
								var props = obj.properties;
								if (props.length == 0) {
									props.push(mall);
									localStorageService.set('collectionNames', lsCNames);
	        						Flash.create('success', successMessage);
								} else {
									// check to make sure property hasn't been added to collection list
									var index = props.find(function(obj){
										if (obj.property_name === mall.property_name) {
											return obj;
										}
									});
									if (index) {
										Flash.create('danger', infoMessage);
									} else {
										obj.properties.push(mall);
									// 		// after adding property to array, add collections back to LS
										localStorageService.set('collectionNames', lsCNames);
										Flash.create('success', successMessage);
									}
								}
							}
						});
					}
					


				}
				
			}
		});

	};
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