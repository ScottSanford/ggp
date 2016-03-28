angular.module("ggpApp", [
        'ngRoute', 
        'myDirectives', 
        'myFilters',
        'ui.bootstrap',
        'mwl.calendar',
        'LocalStorageModule', 
        'bootstrapLightbox', 
        'ngTouch', 
        'ui-rangeSlider',
        'ngDialog', 
        'angularjs-dropdown-multiselect', 
        'ngPinchZoom', 
        'chart.js', 
        'ngFlash'
        ])

        .config(function ($routeProvider, $compileProvider, LightboxProvider, ChartJsProvider) { 
              LightboxProvider.templateUrl = 'components/lightbox/lightbox.html';
              ChartJsProvider.setOptions({ 
                    // scaleLabel: "<%=value%>"
              });
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
                .when('/collections', {
                    templateUrl: 'components/collections/collections.html',
                    controller: 'CollectionsCtrl'
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
                    controller: 'GraphCtrl', 
                    resolve: {
                        graphData: function(initGraphData) {
                            return initGraphData('a4ce3ae64bb34998bd28479d8b7f8201product236779');
                        }
                    }
                })                  
                .when('/comingsoon', {
                    templateUrl: 'components/comingsoon/comingsoon.html',
                    controller: 'ComingSoonCtrl'
                })                  
                .otherwise({
                    redirectTo: '/'
                });
          });
        