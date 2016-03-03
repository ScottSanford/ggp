angular.module('ggpApp')

.controller('MallCtrl', function($scope, $location, $routeParams, mfly){

	var propertyID = $routeParams.id;
	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

	mfly.getData(dataId).then(function(data){
		
		var jsonData = JSON.parse(data);
		
		jsonData.forEach(function(value,key){
			
			if (propertyID === value.id) {

				$scope.mall = value;

				mfly.getFolder(value.id).then(function(data){
					for (var i=0; i < data.length; i++) {
						if (data[i].name === 'Mall View') {
							mfly.getFolder(data[i].id).then(function(data){
								$scope.slides = data;
							})
						}
					}
				})

			}

		});

	});

	$scope.goToProperty = function(id) {
		console.log(id);
		$location.url('/property?id=' + id);
	}




});