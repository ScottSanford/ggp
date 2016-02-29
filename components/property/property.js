angular.module('ggpApp')

.controller('PropertyCtrl', function($scope, $routeParams, mfly){

	var propertyID = $routeParams.id;
	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';

	mfly.getData(dataId).then(function(data){
		var jsonData = JSON.parse(data);

		jsonData.forEach(function(value,key){
			if (propertyID === value.id) {
				console.log(value);
				$scope.mall = value;
			}
		})
	});

});