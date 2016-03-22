angular.module('ggpApp')

.controller('GraphCtrl', function($scope, graphData){

  var graphs = [
    {label: 'Baybrook Mall', propId: '2009', id: 1},
    {label: 'Glendale Galleria CA', propId: '3802', id: 2},
    {label: 'Oakbrook Mall', propId: '4386', id: 3},
    {label: 'Stonebriar Center', propId: '3812', id: 4}, 
    {label: 'Stonestown Galleria', propId: '2173', id: 5}
  ];

  $scope.graphs = graphs; 

  Chart.defaults.global.scaleLabel = function(label){

    var commas = label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 

    var dollarSign = "$" + commas;

    return dollarSign;
  }


  Chart.defaults.global.tooltipTemplate = function(label){
    
    return label.datasetLabel + ': $' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  };   

  Chart.defaults.global.multiTooltipTemplate = function(label){
    
    return label.datasetLabel + ': $' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }; 
  
  $scope.labels = ["2012", "2013", "2014", "2015", "2016"];

  function graphArray(_id) {
        var graph = [];
        var sum16      = 0; 
        var sum15      = 0; 
        var sum14      = 0; 
        var sum13      = 0; 
        var sum12      = 0; 
         
        for (var i=0; i < graphData.length; i++) {
            if (graphData[i].id === _id && graphData[i].year === '2016') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum16 += number;
            }            
            if (graphData[i].id === _id && graphData[i].year === '2015') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum15 += number;              
            }            
            if (graphData[i].id === _id && graphData[i].year === '2014') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum14 += number;               
            }            
            if (graphData[i].id === _id && graphData[i].year === '2013') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum13 += number;           
            }            
            if (graphData[i].id === _id && graphData[i].year === '2012') {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum12 += number;        
            }
        };

        graph.push(sum16);
        graph.push(sum15);
        graph.push(sum14);
        graph.push(sum13);
        graph.push(sum12);

        return graph;
  };

  $scope.listTwo = false;
  
  $scope.graphOne = function(graph, index) {
    $scope.listTwo = true;
    $scope.series = [graph.label];
    $scope.data = [graphArray(graph.propId)];
    graphs.splice(index, 1);
    console.log(graphs);
  };  

  $scope.graphTwo = function(graph) {
    var newSeries = $scope.series;
    var newData   = $scope.data;

    newSeries.push(graph.label);
    $scope.series = newSeries;

    var chartData = graphArray(graph.propId);
    console.log("Chart Data :: ", chartData);
    newData.push(chartData);
    $scope.data = newData;
  };


  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

});