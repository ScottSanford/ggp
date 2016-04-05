angular.module('ggpApp')

.controller('GraphCtrl', function($scope, $window, graphData, demographics,localStorageService){

  //  ngShows
  $scope.chartOutputOne   = false;
  $scope.chartOutputTwo   = false;
  $scope.chartOutputThree = false;
  $scope.propToProp       = false;
  $scope.unitToUnit       = false; 
  $scope.categoryUnits    = false;
  $scope.buttonOne        = false;
  $scope.demoList         = false;
  $scope.neilsen          = false;
  $scope.demoChart        = false;
  $scope.showNeilsenGraph = false;
  // Initial List      \/\/\/
  //                    \/\/
  //                     \/ 

  var dropDownOne = [
    {label: 'Property', id: 1},
    {label: 'Property to Property', id: 2}, 
    {label: 'Demographics', id: 3}
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
        // hide any dropdowns that have already been shown 
        $scope.categoryUnits    = false;
        $scope.categoryList     = false;
        $scope.tenants          = false; 
        $scope.chartOutputOne   = false;
        $scope.chartOutputTwo   = false;
        $scope.chartOutputThree = false;
        $scope.propToProp       = false;
        $scope.unitToUnit       = false;
        $scope.demoList         = false;
        $scope.neilsen          = false;
        $scope.showNeilsenGraph = false;
       if (item.id == 1)  {
        $scope.propToProp       = true;
      } else if (item.id == 2) {
        $scope.unitToUnit       = true;
      } else {
        $scope.demoList = true;
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
    onItemSelect: function (item) {
      console.log(item);
      $scope.buttonOne     = true;
      $scope.categoryUnits = false;
      $scope.categoryList  = false;
      $scope.tenants      = false;
      $scope.chartOutputOne = false;
      $scope.chartOutputTwo = false;
      $scope.chartOutputThree = false;
      $scope.showNeilsenGraph = false;
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
    $scope.showNeilsenGraph = false;

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

  $scope.unitPropertiesEvents = {
    onItemSelect: function(item) {
      var stores = demographics.map(function(obj){
        var storeName = obj.storeName;
        var trimName = storeName.trim();
        return trimName;
      });

      stores.forEach(function(store){
        if (item.key === store) {
          console.log(store);
        }
      });

    }
  }

  $scope.getPropertyForUnits = function() {
      if ($scope.neilsen) {

        $scope.chartOutputOne = false;
        $scope.chartOutputTwo = false;
        $scope.chartOutputThree = false;
        $scope.showNeilsenGraph = false;
      } else {
        $scope.categoryUnits  = true;
        $scope.chartOutputOne = false;
        $scope.chartOutputTwo = false;
        $scope.chartOutputThree = false;
        $scope.showNeilsenGraph = false;
      }
  };
  //  Demographics Properties Stores     \/\/\/
  //                                      \/\/
  //                                       \/
  $scope.demoOptions = demographics;
  $scope.demoSelected = [];
  $scope.demoSettings = {
    displayProp: 'storeName', 
    externalIdProp: '',
    idProp: 'storeName',  
    smartButtonMaxItems: 1
  };

  $scope.getDemoCategories = function() {
      $scope.neilsen = true;
  }

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
      $scope.tenants      = false;
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
      $scope.tenants     = false;
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
      $scope.tenants     = true;
      $scope.categoryList = false;
      $scope.tenantsOptions = units;
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

  $scope.tenantsSelected = [];
  $scope.tenantsSettings = dropDownSettings('storeName');

  $scope.getUnitToUnits = function() {
    $scope.chartOutputThree = true;
    $scope.chartOutputOne = false;
    $scope.chartOutputTwo = false;
    var properties = $scope.tenantsSelected;

    var seriesNames = [];
    var chartData   = [];

    properties.forEach(function(obj, index){
      seriesNames.push(obj.storeName);
      $scope.series = seriesNames;

      chartData.push(unitChartPoints(obj.storeName, obj.key));
      $scope.data = chartData;
    }); 
  };
  
  //  Nielsen Categories  \/\/\/
  //                       \/\/
  //                        \/
  var nOptions = [
    {label: 'Race', id: 1, demo: 'race'},
    {label: 'Household', id: 2, demo: 'numHousehold'}, 
    {label: 'Age', id: 3, demo: 'age'}, 
    {label: 'Rent vs Own', id: 4, demo: 'homeStatus'} 
  ];

  $scope.nielsenOptions = nOptions;
  $scope.neilsenSelected = {};
  $scope.neilsenSettings = {
      selectionLimit: 1, 
      closeOnSelect: true, 
      displayProp: 'label', 
      externalIdProp: '',
      smartButtonMaxItems: 1
  };
  $scope.neilsenEvents = {
    onItemSelect: function(item) {

    }
  }

  $scope.getNeilsenGraph = function() {
      $scope.showNeilsenGraph = true;
      var selectedProps = $scope.demoSelected;
      var chartType = $scope.neilsenSelected; 
     
      var seriesData = [];
      
      for (var i = 0; i < selectedProps.length; i++) {
        var seriesObj = {};
        var store = selectedProps[i].storeName;
        seriesObj['name'] = store;
        if (chartType.demo == 'race') {
          var seriesVals = _.values(selectedProps[i].race);
        } else if (chartType.demo == 'age') {
          var seriesVals = _.values(selectedProps[i].age);
        } else if (chartType.demo === 'numHousehold') {
          var seriesVals = _.values(selectedProps[i].numHousehold);
        } 
        
        var seriesNumVals = seriesVals.map(function(num){
          var toNumber = Number(num);
          var subtract = toNumber - 100;
          return subtract;
        });

        seriesObj['data'] = seriesNumVals;
        seriesData.push(seriesObj);
      };
      var divisionNames;
      var chartTitle;

      if (chartType.demo === 'race') {
        divisionNames = ['White', 'Black', 'Hispanic', 'Asian', 'Other'];
        chartTitle = 'Mall Demographics - Race'
      } else if (chartType.demo === 'age') {
        divisionNames = ['18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75+'];
        chartTitle = 'Mall Demographics - Age'
      } else if (chartType.demo === 'numHousehold') {
        divisionNames = ['1 Person', '2 Person', '3 Person', '4 Person', '5+ Person'];
        chartTitle = 'Mall Demographics - Household Size'
      } else {
        console.log('Something went wrong!');
      }


      var hChartConfig = {
        options: {
            chart: {
                type: 'column'
            }
        },
        xAxis: {
            categories: divisionNames
        },
        yAxis: {
            title: {
                text: 'Index'
            }
        },
        title: {
          text: chartTitle
        },
        series: seriesData,
        loading: false
      } 
      $scope.chartConfig = hChartConfig;
  }

  //  Graph  \/\/\/
  //          \/\/
  //           \/

  
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

  //  HighCharts  \/\/\/
  //               \/\/
  //                \/

});