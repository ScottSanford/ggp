angular.module('ggpApp')

.controller('PropertyCtrl', function($scope, $routeParams, mfly){

	var propertyID = $routeParams.id;
	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

	mfly.getData(dataId).then(function(data){
		
		var jsonData = JSON.parse(data);

		jsonData.forEach(function(value,key){
			if (propertyID === value.id) {

				$scope.mall = value;

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