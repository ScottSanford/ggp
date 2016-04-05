angular.module('ggpApp')
.factory('CSVConverterSvc', function () {

    var CSVConverterSvc = {

        jsonProperty: function(content) {

                var lines=content.split('\n');
                var result = [];
                var start = 0;
                var separator = ',';
                var columnCount = lines[0].split(separator).length;

                var headers = [];
          
                headers=lines[0].split(separator);
                start = 1;
                  

                for (var i=start; i<lines.length; i++) {
                    var obj = {};
                    var currentline=lines[i].split(new RegExp(separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                    if ( currentline.length === columnCount ) {
                        
                        obj = {
                            property_id: currentline[0], 
                            property_name: currentline[1],
                            description: currentline[2], 
                            address: {
                                street: currentline[3], 
                                city: currentline[4], 
                                state: currentline[5], 
                                zip: currentline[6]
                            },
                            phone: currentline[7], 
                            website: currentline[8], 
                            location: {
                                cross_street: currentline[9], 
                                interstate_access: currentline[10]
                            }, 
                            overview: {
                                metro_center: currentline[11], 
                                property_type: currentline[12], 
                                anchor_tenants: currentline[13], 
                                stores: currentline[14], 
                                gla: currentline[15], 
                                parking: currentline[16], 
                                opened: currentline[17], 
                                renovated: currentline[18]
                            },
                            tradeArea: {
                                area_population: currentline[19], 
                                projected_pop: currentline[20], 
                                median_age: currentline[21], 
                                avg_income: currentline[22]
                            }
                        };

                        result.push(obj);
                    }
                }
                // console.log("AFter filter :: ", result);
                return result;
        }, 

        jsonMap: function(content) {

                var lines=content.split('\n');
                var result = [];
                var start = 0;
                var separator = ',';
                var columnCount = lines[0].split(separator).length;

                var headers = [];
          
                headers=lines[0].split(separator);
                start = 1;
                  

                for (var i=start; i<lines.length; i++) {
                    var obj = {};
                    var currentline=lines[i].split(new RegExp(separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                    if ( currentline.length === columnCount ) {
                        
                        obj = {
                            idMall: currentline[0],
                            tradeArea: {
                                type: 'tradeArea',
                                tradeAreaWebmap: currentline[1], 
                                tradeAreaExtent: currentline[2]
                            }, 
                            avgIncome: {
                                type: 'avgIncome',
                                avgIncomeWebmap: currentline[3], 
                                avgIncomeExtent: currentline[4]
                            }, 
                            employeeDensity: {
                                type: 'employeeDensity',
                                employeeDensityWebmap: currentline[5], 
                                employeeDensityExtent: currentline[6] 
                            }, 
                            aerial: {
                                type: 'aerial',
                                aerialWebmap: currentline[7], 
                                aerialExtent: currentline[8]
                            }
                        };
                        result.push(obj);
                    }
                }
                // console.log("AFter filter :: ", result);
                return result;
        }, 

        jsonGraph: function(content) {
                var lines=content.split('\n');
                var result = [];
                var start = 0;
                var separator = ',';
                var columnCount = lines[0].split(separator).length;

                var headers = [];
          
                headers=lines[0].split(separator);
                start = 1;
                  

                for (var i=start; i<lines.length; i++) {
                    var obj = {};
                    var currentline=lines[i].split(new RegExp(separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                    if ( currentline.length === columnCount ) {
                        
                        obj = {
                            id: currentline[0], 
                            key: currentline[1], 
                            storeName: currentline[2],
                            category: currentline[7],
                            year: currentline[12], 
                            total: currentline[26]
                        };
                        result.push(obj);
                    }
                }
                // console.log("AFter filter :: ", result);
                return result;
        }, 

        demographics: function(content) {
                var lines=content.split('\n');
                var result = [];
                var start = 0;
                var separator = ',';
                var columnCount = lines[0].split(separator).length;

                var headers = [];
          
                headers=lines[0].split(separator);
                start = 1;
                  

                for (var i=start; i<lines.length; i++) {
                    var obj = {};
                    var currentline=lines[i].split(new RegExp(separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                    if ( currentline.length === columnCount ) {
                        
                        obj = {
                            storeName: currentline[0],
                            race: {
                                white: currentline[1],
                                black: currentline[2],
                                hispanic: currentline[3],
                                asian: currentline[4],
                                other: currentline[5]
                            }, 
                            numHousehold: {
                                one: currentline[6], 
                                two: currentline[7], 
                                three: currentline[8], 
                                four: currentline[9], 
                                five: currentline[10]
                            }, 
                            age: {
                                one: currentline[11], 
                                two: currentline[12], 
                                three: currentline[13], 
                                four: currentline[14], 
                                five: currentline[15], 
                                six: currentline[16], 
                                seven: currentline[17] 
                            }, 
                            homeStatus: {
                                owns: currentline[18], 
                                rents: currentline[19]
                            }
                        };
                        result.push(obj);
                    }
                }
                // console.log("AFter filter :: ", result);
                return result;
        }

    }

    return CSVConverterSvc;

});