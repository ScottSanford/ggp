angular.module('ggpApp')
.factory("initMapData", function($http, $q, CSVConverterSvc) {
    
    return function(mapDataId) {
        var deferred = $q.defer();

        mflyCommands.getData(mapDataId)
            .done(function(data){
                var jsonData = CSVConverterSvc.jsonMap(data);
                deferred.resolve(jsonData);
            });

        return deferred.promise;
    }
});