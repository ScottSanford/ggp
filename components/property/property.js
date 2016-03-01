angular.module('ggpApp')

.controller('PropertyCtrl', function($scope, $routeParams, mfly, localStorageService){

	var propertyID = $routeParams.id;
	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

    $scope.status = true;

	mfly.getData(dataId).then(function(data){
		
		var jsonData = JSON.parse(data);
		console.log(jsonData);
		jsonData.forEach(function(value,key){
			if (propertyID === value.id) {

				$scope.mall = value;


			    $scope.addToFavorites = function(){
			    	if ($scope.status) {
			    		var lsArr = localStorageService.get('favorites');
			    		console.log(lsArr);
			    		var favsArr = [];
			    		//collect from ls first then add to existing
			    		favsArr.push(value);
			      		localStorageService.set('favorites', lsArr);
			    	} else {
						localStorageService.remove('favorites');
			    	}
			      	$scope.status = !$scope.status;
			    }

				mfly.getFolder(mallFolderId).then(function(data){

					data.forEach(function(mflyValue, mflyKey){

						if (value.name === mflyValue.name) {
							mfly.getFolder(mflyValue.id).then(function(data){
								$scope.photos = data;
							});
						}

					})
				});
			}
		});


	});


});