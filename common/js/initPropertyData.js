angular.module('ggpApp')
.factory("initData", function($q, CSVConverterSvc) {
    
    return function(id){

        var deferred = $q.defer();

        mflyCommands.getData(id)
            .done(function(data){
                var jsonData = CSVConverterSvc.csvToJSON(data);
                deferred.resolve(jsonData);
            });

        return deferred.promise;

    }






});