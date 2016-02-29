angular.module('ggpApp')

.controller('GridCtrl', function($scope, mfly){

	var dataId = 'a4ce3ae64bb34998bd28479d8b7f8201product234588';
	var mallFolderId = 'a4ce3ae64bb34998bd28479d8b7f8201product234543';

	mfly.getData(dataId).then(function(data){
		var jsonData = JSON.parse(data);
		console.log(jsonData);
		$scope.malls = jsonData;
	});

	mfly.getFolder(mallFolderId).then(function(data){
	})

	
});