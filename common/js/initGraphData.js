angular.module('ggpApp')
.factory("initGraphData", function($http, $q, CSVConverterSvc) {
    
    return function(graphDataID) {
        var deferred = $q.defer();

        mflyCommands.getData(graphDataID)
            .done(function(data){
                var jsonData = CSVConverterSvc.jsonGraph(data);
                deferred.resolve(jsonData);
            });

        return deferred.promise;
    }
});