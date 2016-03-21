angular.module('ggpApp')

.controller('GraphCtrl', function($scope, graphData){

  var graphs = [
    {name: 'Baybrook Mall', propId: '2009'},
    {name: 'Glendale Galleria CA', propId: '3802'},
    {name: 'Oakbrook Mall', propId: '4386'},
    {name: 'Stonebriar Center', propId: '3812'}, 
    {name: 'Stonestown Galleria', propId: '2173'}
  ];

  $scope.graphs = graphs;

  function initGraphObj(graphName , id) {
        var graphArray = [];
        var sum16      = 0; 
        var sum15      = 0; 
        var sum14      = 0; 
        var sum13      = 0; 
        var sum12      = 0; 

        for (var i=0; i < graphData.length; i++) {
            if (graphData[i].id === id && graphData[i].year === '2016') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum16 += number;
            }            
            if (graphData[i].id === id && graphData[i].year === '2015') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum15 += number;              
            }            
            if (graphData[i].id === id && graphData[i].year === '2014') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum14 += number;               
            }            
            if (graphData[i].id === id && graphData[i].year === '2013') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum13 += number;           
            }            
            if (graphData[i].id === id && graphData[i].year === '2012') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum12 += number;        
            }
        };

        graphArray.push(['2016' , sum16]);
        graphArray.push(['2015' , sum15]);
        graphArray.push(['2014' , sum14]);
        graphArray.push(['2013' , sum13]);
        graphArray.push(['2012' , sum12]);

        var graphObj = {};
        graphObj['key'] = graphName;
        graphObj['values'] = graphArray;
        var dataArray = [];
        dataArray.push(graphObj);
        return dataArray; 
  };

  $scope.showPropertyOnGraph = function(graph) {
    $scope.data = initGraphObj(graph.name , graph.propId);
  };

  $scope.options = {
            chart: {
                type: 'cumulativeLineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]/100; },

                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'Date',
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'Total Sales Volume',
                    axisLabelDistance: 20
                }
            }
        };

        // $scope.data = [
        //     {
        //         key: "Baybrook Mall",
        //         values: [ [ '2016' , 31406850] , [ '2015' , 21406850] , [ '2014' , 11406850] , [ '2013' , 27406850] , [ '2012' , 61406850]]
        //     }
        // ];

});