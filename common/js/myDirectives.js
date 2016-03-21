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
				$location.url('/property?id=' + id);
			}
		}

	}
})

.directive('iconMenu', function($location){
	return {

		restrict: 'E', 
		scope: {
			mall: '='
		}, 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/icon-menu.html', 
		link: function(scope, element, attrs) {
			scope.goToFavorites = function() {
				$location.url('/favorites');
			}			
			scope.goToTools = function() {
				$location.url('/tools');
			}
		}

	}
})

.directive('favoriteProperty', function($location){
	return {

		restrict: 'E', 
		scope: {
			favorite: '='
		}, 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/favorite-property.html', 
		link: function(scope, element, attrs) {

			scope.viewProperty = function() {
				$location.url('/property?id=' + attrs.propid);
			}

		}

	}
})

.directive('breadCrumbs', function($location){
	return {

		restrict: 'E', 
		scope: {
			favorite: '='
		}, 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/breadcrumbs.html', 
		link: function(scope, element, attrs) {
			
		}

	}
})


.directive('myFrame', function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        replace: true,
        transclude: true,
        template: '<iframe id="map" scrolling="no"><p>Your browser does not support iframes.</p></iframe>',
        link: function (scope, element, attrs) {
            element.attr('src', attrs.iframeSrc);
        }
    };
});















