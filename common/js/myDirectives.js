angular.module('myDirectives', [])

.directive('gridProperty', function($location){
	return {

		restrict: 'A', 
		scope: {
			mall: '='
		}, 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/grid-property.html', 
		link: function(scope, element, attrs) {
			scope.getMall = function(id){
				console.log(id);
				$location.url('/property?id=' + id);
			}
		}

	}
})



















