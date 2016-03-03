angular.module('ggpApp')

.controller('ToolsCtrl', function($scope, $location){

	$scope.goToComingSoon = function() {
		$location.url('/comingsoon');
	}

});