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

.directive('collectionItem', function($location, localStorageService, $route){
	return {

		restrict: 'E', 
		scope: {
			favorite: '='
		}, 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/collection-item.html', 
		link: function(scope, element, attrs) {

			scope.viewProperty = function() {
				$location.url('/property?id=' + attrs.propid);
			}

			scope.removeProperty = function() {
				var lsCNames = localStorageService.get('collectionNames');
				var lsShowCollection = localStorageService.get('showCollection');

				// remove from Collection Names
				lsCNames.forEach(function(obj, index){
					if (attrs.collection === obj.name) {
						var props = obj.properties;
						props.forEach(function(obj, index){
							if (attrs.propid === obj.property_id) {
								//remove item
								props.splice(index,1);
								localStorageService.set('collectionNames', lsCNames);
							}
						});
					}
				});				

				//
				lsShowCollection.forEach(function(obj, index){					
					if (attrs.propid === obj.property_id) {
						lsShowCollection.splice(index,1);
						localStorageService.set('showCollection', lsShowCollection);
					}
			
				});
				
				$route.reload();
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















