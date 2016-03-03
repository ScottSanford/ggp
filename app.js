angular.module("ggpApp", [
        'ngRoute', 
        'myDirectives', 
        'ui.bootstrap',
        'LocalStorageModule', 
        'bootstrapLightbox', 
        'ngTouch', 
        'nvd3'
        // 'esri.map'
        ])

        .config(function ($routeProvider, $compileProvider) { 

              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|https:\/\/)/);  
              
              $routeProvider
                .when('/', {
                    templateUrl: 'components/grid/grid.html',
                    controller: 'GridCtrl'
                })                 
                .when('/property', {
                    templateUrl: 'components/property/property.html',
                    controller: 'PropertyCtrl'
                })                 
                .when('/mall', {
                    templateUrl: 'components/mall/mall.html',
                    controller: 'MallCtrl'
                })                  
                .when('/space', {
                    templateUrl: 'components/space/space.html',
                    controller: 'SpaceCtrl'
                })                
                .when('/favorites', {
                    templateUrl: 'components/favorites/favorites.html',
                    controller: 'FavoritesCtrl'
                })                  
                .when('/tools', {
                    templateUrl: 'components/tools/tools.html',
                    controller: 'ToolsCtrl'
                })                  
                .when('/map', {
                    templateUrl: 'components/map/map.html',
                    controller: 'MapCtrl'
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
        