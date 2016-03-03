angular.module('ggpApp')

.controller('PropertyCtrl', function($scope, $location, $routeParams, mfly, localStorageService, Lightbox){

	var propertyID = $routeParams.id;
	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

    $scope.status = true;

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
								$scope.photos = photoArray;
							})
						}
					}
				})

				$scope.mall = value;


			    $scope.addToFavorites = function(){
			    	if ($scope.status) {
			    		var lsArr = localStorageService.get('favorites');
			   
			    		var favsArr = [];
			    		//collect from ls first then add to existing
			    		favsArr.push(value);
			      		localStorageService.set('favorites', favsArr);
			    	} else {
						localStorageService.remove('favorites');
			    	}
			      	$scope.status = !$scope.status;
			    }

			}


		});


	});

	$scope.goToMall = function() {
		$location.url('/mall?id=' + propertyID);
	}	

	$scope.goToSpace = function() {
		$location.url('/space?id=' + propertyID);
	}

	$scope.openLightboxModal = function (index) {
	    Lightbox.openModal($scope.photos, index);
	};


});