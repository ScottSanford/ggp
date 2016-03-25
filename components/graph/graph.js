angular.module('ggpApp')

.controller('GraphCtrl', function($scope, $window, graphData, localStorageService){
  //  ngShows
  $scope.propToProp    = false;
  $scope.unitToUnit    = false; 

  $scope.categoryUnits = false;
  $scope.propertyUnits = false;

  // Initial List      \/\/\/
  //                    \/\/
  //                     \/ 

  var dropDownOne = [
    {label: 'Property to Property', id: 1},
    {label: 'Unit to Unit', id: 2}
  ];

  $scope.initDropDown = dropDownOne;
  $scope.initDropDownSelected = {};
  $scope.initDropDownSettings = {
      selectionLimit: 1, 
      closeOnSelect: true, 
      externalIdProp: '', 
    };
  $scope.initDropDownEvents = {
    onItemSelect: function(item) {
      if (item.id == 1) {
        $scope.propToProp = true;
        $scope.unitToUnit = false;
      } else {
        $scope.unitToUnit = true;
        $scope.propToProp = false;
      }
    }
  };

  // Properties to Properties List   \/\/\/
  //                                  \/\/
  //                                   \/
  var uniques = _.map(_.groupBy(graphData,function(doc){
  return doc.id;
  }),function(grouped){
    return grouped[0];
  });

  $scope.propProperties = uniques;
  $scope.propSelected = [];
  $scope.propSettings = {
    displayProp: 'key', 
    externalIdProp: '', 
    idProp: 'key'
  };

  $scope.getProperties = function() {
    
    console.log($scope.propSelected);

    var properties = $scope.propSelected;

    var seriesNames = [];
    var chartData   = [];

    properties.forEach(function(obj, index){
      seriesNames.push(obj.key);
      $scope.series = seriesNames;

      chartData.push(lineChartPoints(obj.id));
      $scope.data = chartData;
    });

  };


  //  Choose Property for Category/Units Dropdown   \/\/\/
  //                                                 \/\/
  //                                                  \/

  $scope.unitProperties = uniques;
  $scope.unitSelected   = [];
  $scope.unitSettings   = {
    displayProp: 'key', 
    externalIdProp: '', 
    idProp: 'key', 
    selectionLimit: 1
  };

  $scope.getPropertyForUnits = function() {
      
      $scope.categoryUnits = true;

  };
    
  //  Category/Units Dropdown   \/\/\/
  //                             \/\/
  //                              \/
  var dropDownTwo = [
    {label: 'Category to Category', id: 1},
    {label: 'Unit to Unit', id: 2}
  ];

  $scope.categoryUnitsOptions  = dropDownTwo;
  $scope.categoryUnitsSelected = {};
  $scope.categoryUnitsSettings = {
    selectionLimit: 1, 
    closeOnSelect: true, 
    externalIdProp: '',
  };

  $scope.categoryOrUnit = function() {

    var selected = $scope.categoryUnitsSelected;
    // category
    if (selected.id == 1) {
      
      var unitSelected = $scope.unitSelected;
      
      var categories =  _.map(_.groupBy(graphData,function(data){
          if (unitSelected.key === data.key) {
            return data.category;
          }
        }),function(grouped){
          return grouped[0];
      });

      categories.pop();

      $scope.categoryList        = true;
      $scope.categoryListOptions = categories;

    } 
    // unit
    else {

      var unitSelected = $scope.unitSelected;

      var units =  _.map(_.groupBy(graphData,function(data){
          if (unitSelected.key === data.key) {
            return data.storeName;
          }
        }),function(grouped){
          return grouped[0];
      });

      units.pop();
      $scope.unitList        = true;
      $scope.unitListOptions = units;
    }
  }

  //  Category List  \/\/\/
  //                  \/\/
  //                   \/
  function dropDownSettings(_type) {
    return {
      displayProp: _type, 
      externalIdProp: '', 
      idProp: _type, 
      scrollableHeight: '300px',
      scrollable: true, 
      enableSearch: true
    }
  };

  $scope.categoryListSelected = [];
  $scope.categoryListSettings = dropDownSettings('category');
  $scope.getCategoryToCategory = function() {
    var selected = $scope.categoryListSelected;

    var seriesNames = [];
    var chartData   = [];

    selected.forEach(function(obj, index){
      seriesNames.push(obj.category);
      $scope.series = seriesNames;

      chartData.push(categoryChartPoints(obj.category, obj.key));
      $scope.data = chartData;
    });
  };

  //  Unit List  \/\/\/
  //              \/\/
  //               \/

  $scope.unitListSelected = [];
  $scope.unitListSettings = dropDownSettings('storeName');

  $scope.getUnitToUnits = function() {
    console.log($scope.unitListSelected);

    var properties = $scope.unitListSelected;

    var seriesNames = [];
    var chartData   = [];

    properties.forEach(function(obj, index){
      seriesNames.push(obj.storeName);
      $scope.series = seriesNames;

      chartData.push(unitChartPoints(obj.storeName, obj.key));
      $scope.data = chartData;
    }); 
  };
  
  
  $scope.labels = ["2012", "2013", "2014", "2015", "2016"];

  function lineChartPoints(_id) {
        var graph      = [];
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

  function unitChartPoints(_store, _property) {
        var graph      = [];
        var sum16      = 0; 
        var sum15      = 0; 
        var sum14      = 0; 
        var sum13      = 0; 
        var sum12      = 0; 
         
        for (var i=0; i < graphData.length; i++) {
            if ((graphData[i].storeName === _store) && 
                (graphData[i].year === '2016') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum16 += number;
            }            
            if ((graphData[i].storeName === _store) && 
                (graphData[i].year === '2015') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum15 += number;              
            }            
            if ((graphData[i].storeName === _store) && 
                (graphData[i].year === '2014') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum14 += number;               
            }            
            if ((graphData[i].storeName === _store) && 
                (graphData[i].year === '2013') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum13 += number;           
            }            
            if ((graphData[i].storeName === _store) && 
                (graphData[i].year === '2012') && 
                (graphData[i].key === _property)) {
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

  function categoryChartPoints(_category, _property) {
        var graph      = [];
        var sum16      = 0; 
        var sum15      = 0; 
        var sum14      = 0; 
        var sum13      = 0; 
        var sum12      = 0; 
         
        for (var i=0; i < graphData.length; i++) {
            if ((graphData[i].category === _category) && 
                (graphData[i].year === '2016') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum16 += number;
            }            
            if ((graphData[i].category === _category) && 
                (graphData[i].year === '2015') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum15 += number;              
            }            
            if ((graphData[i].category === _category) && 
                (graphData[i].year === '2014') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum14 += number;               
            }            
            if ((graphData[i].category === _category) && 
                (graphData[i].year === '2013') && 
                (graphData[i].key === _property)) {
                var total = graphData[i].total;
                var number = Number(total.replace(/[^0-9\.]+/g,""));
                sum13 += number;           
            }            
            if ((graphData[i].category === _category) && 
                (graphData[i].year === '2012') && 
                (graphData[i].key === _property)) {
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
    $scope.data = [lineChartPoints(graph.propId)];
    graphs.splice(index, 1);
    console.log(graphs);
  };  

  $scope.graphTwo = function(graph) {
    $scope.graphButtons = true;
    var newSeries = $scope.series;
    var newData   = $scope.data;

    newSeries.push(graph.label);
    $scope.series = newSeries;

    var chartData = lineChartPoints(graph.propId);
    console.log("Chart Data :: ", chartData);
    newData.push(chartData);
    $scope.data = newData;
  };

  $scope.resetButtons = function() {
    $window.location.reload();
  }


  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

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


});