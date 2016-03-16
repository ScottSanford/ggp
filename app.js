angular.module("ggpApp", [
        'ngRoute', 
        'myDirectives', 
        'myFilters',
        'ui.bootstrap',
        'mwl.calendar',
        'LocalStorageModule', 
        'bootstrapLightbox', 
        'ngTouch', 
        'nvd3', 
        'ui-rangeSlider'
        ])

        .config(function ($routeProvider, $compileProvider) { 

              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:|https:\/\/)/);
              
              $routeProvider
                .when('/', {
                    templateUrl: 'components/grid/grid.html',
                    controller: 'GridCtrl', 
                    resolve: {
                        propertyData: function(initData) {
                            return initData('a4ce3ae64bb34998bd28479d8b7f8201product236173');
                        }
                    }
                })                 
                .when('/property', {
                    templateUrl: 'components/property/property.html',
                    controller: 'PropertyCtrl', 
                    resolve: {
                        propertyData: function(initData) {
                            return initData('a4ce3ae64bb34998bd28479d8b7f8201product236173');
                        }
                    }
                })                                
                .when('/favorites', {
                    templateUrl: 'components/favorites/favorites.html',
                    controller: 'FavoritesCtrl'
                })                 
                .when('/meetings', {
                    templateUrl: 'components/meetings/meetings.html',
                    controller: 'MeetingsCtrl', 
                    resolve: {
                        propertyData: function(initData) {
                            return initData('a4ce3ae64bb34998bd28479d8b7f8201product236173');
                        }
                    }
                })                  
                .when('/tools', {
                    templateUrl: 'components/tools/tools.html',
                    controller: 'ToolsCtrl'
                })                  
                .when('/map', {
                    templateUrl: 'components/map/map.html',
                    controller: 'MapCtrl', 
                    resolve: {
                        mapData: function(initMapData) {
                            return initMapData('a4ce3ae64bb34998bd28479d8b7f8201product235900');
                        }, 
                        propertyData: function(initData) {
                            return initData('a4ce3ae64bb34998bd28479d8b7f8201product236173');
                        }
                    }
                })                  
                .when('/graph', {
                    templateUrl: 'components/graph/graph.html',
                    controller: 'GraphCtrl'
                })                  
                .when('/comingsoon', {
                    templateUrl: 'components/comingsoon/comingsoon.html',
                    controller: 'ComingSoonCtrl'
                })                  
                .otherwise({
                    redirectTo: '/'
                });
          });
        