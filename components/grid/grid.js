angular.module('ggpApp')

.controller('GridCtrl', function($scope, mfly){

	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234567';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

	mfly.getData(dataId).then(function(data){
		var jsonData = JSON.parse(data);
		// console.log(jsonData);
		$scope.malls = jsonData;
	});

	$scope.goToMall = function(id) {
		console.log(id);
	}

	mfly.getFolder(mallFolderId).then(function(data){
		console.log(data);
	})

	$scope.data = {
    	repeatSelect: null,
    	availableOptions: [
      	{id: '1', name: '< 500,000 sq ft'},
      	{id: '2', name: '500,000 - 1,000,000 sq ft'},
      	{id: '3', name: '1,000,000'}
    	]
   };

	
});