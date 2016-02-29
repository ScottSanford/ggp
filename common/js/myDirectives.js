angular.module('myDirectives', [])

.directive('gridProperty', function(){
	return {

		restrict: 'A', 
		scope: {
			mall: '='
		}, 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/grid-property.html',

	}
})



















