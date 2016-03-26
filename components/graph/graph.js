angular.module('ggpApp')

.controller('GraphCtrl', function($scope, $window, graphData, localStorageService){
  //  ngShows
  $scope.chartOutputOne   = false;
  $scope.chartOutputTwo   = false;
  $scope.chartOutputThree = false;
  $scope.propToProp    = false;
  $scope.unitToUnit    = false; 
  $scope.categoryUnits = false;
  $scope.buttonOne     = false;

  // Initial List      \/\/\/
  //                    \/\/
  //                     \/ 

  var dropDownOne = [
    {label: 'Property', id: 1},
    {label: 'Property to Property', id: 2}
  ];

  $scope.initDropDown = dropDownOne;
  $scope.initDropDownSelected = {};
  $scope.initDropDownSettings = {
      selectionLimit: 1, 
      closeOnSelect: true, 
      externalIdProp: '', 
      smartButtonMaxItems: 1
    };
  $scope.initDropDownEvents = {
    onItemSelect: function(item) {
      if (item.id == 2) {
        $scope.propToProp    = true;

        $scope.unitToUnit    = false;

        $scope.categoryUnits = false;
        $scope.categoryList  = false;
        $scope.unitList      = false;
        $scope.chartOutputOne = false;
        $scope.chartOutputTwo = false;
        $scope.chartOutputThree = false;
      } else {
        $scope.unitToUnit = true;
        $scope.propToProp = false;
        $scope.chartOutputOne = false;
        $scope.chartOutputTwo = false;
        $scope.chartOutputThree = false;
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
    idProp: 'key', 
    smartButtonMaxItems: 1
  };
  $scope.unitPropertiesEvents = {
    onItemSelect: function () {
      $scope.buttonOne     = true;
      $scope.categoryUnits = false;
      $scope.categoryList  = false;
      $scope.unitList      = false;
      $scope.chartOutputOne = false;
      $scope.chartOutputTwo = false;
      $scope.chartOutputThree = false;
    }
  }

  $scope.getProperties = function() {
    
    var properties = $scope.propSelected;

    var seriesNames = [];
    var chartData   = [];

    properties.forEach(function(obj, index){
      seriesNames.push(obj.key);
      $scope.series = seriesNames;

      chartData.push(lineChartPoints(obj.id));
      $scope.data = chartData;
    });

    $scope.chartOutputOne = true;
    $scope.chartOutputTwo = false;
    $scope.chartOutputThree = false;

  };


  //  Choose Property for Category/Units Dropdown   \/\/\/
  //                                                 \/\/
  //                                                  \/

  $scope.unitProperties = uniques;
  $scope.unitSelected   = {};
  $scope.unitSettings   = {
    displayProp: 'key', 
    externalIdProp: '', 
    idProp: 'key', 
    selectionLimit: 1, 
    smartButtonMaxItems: 1
  };

  $scope.getPropertyForUnits = function() {
      
      $scope.categoryUnits  = true;
      $scope.chartOutputOne = false;
      $scope.chartOutputTwo = false;
      $scope.chartOutputThree = false;
  };
    
  //  Category/Units Dropdown   \/\/\/
  //                             \/\/
  //                              \/
  var dropDownTwo = [
    {label: 'Category to Category', id: 1},
    {label: 'Tenant to Tenant', id: 2}
  ];

  $scope.categoryUnitsOptions  = dropDownTwo;
  $scope.categoryUnitsSelected = {};
  $scope.categoryUnitsSettings = {
    selectionLimit: 1, 
    closeOnSelect: true, 
    externalIdProp: '',
    smartButtonMaxItems: 1
  };
  $scope.categoryUnitsEvents = {
    onItemSelect: function() {
      $scope.categoryList  = false;
      $scope.unitList      = false;
    }
  }

  $scope.categoryOrUnit = function() {
    $scope.chartOutputOne = false;
    $scope.chartOutputTwo = false;
    $scope.chartOutputThree = false;
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

      $scope.categoryList = true;
      $scope.unitList     = false;
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
      $scope.unitList     = true;
      $scope.categoryList = false;
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
      enableSearch: true, 
      smartButtonMaxItems: 1
    }
  };

  $scope.categoryListSelected = [];
  $scope.categoryListSettings = dropDownSettings('category');
  $scope.getCategoryToCategory = function() {
    $scope.chartOutputTwo = true;
    $scope.chartOutputOne = false;
    $scope.chartOutputThree = false;
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
    $scope.chartOutputThree = true;
    $scope.chartOutputOne = false;
    $scope.chartOutputTwo = false;
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