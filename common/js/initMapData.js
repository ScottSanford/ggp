angular.module('ggpApp')
.factory("mapData", function($http, $q, CSVConverterSvc) {
    
    return function() {
        var deferred = $q.defer();

        var mapDataId = 'a4ce3ae64bb34998bd28479d8b7f8201product235900';

        mflyCommands.getData(mapDataId)
            .done(function(data){
                var jsonData = CSVConverterSvc.csvToJSON(data, CSVConverterSvc.mapObj());
                deferred.resolve(jsonData);
            });

        return deferred.promise;
    }
});