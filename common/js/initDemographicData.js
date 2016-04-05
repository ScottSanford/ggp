angular.module('ggpApp')
.factory("initDemographicData", function($http, $q, CSVConverterSvc) {
    
    return function(demographicsDataID) {
        var deferred = $q.defer();

        mflyCommands.getData(demographicsDataID)
            .done(function(data){
                var jsonData = CSVConverterSvc.demographics(data);
                deferred.resolve(jsonData);
            });

        return deferred.promise;
    }
});