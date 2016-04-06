angular.module('ggpApp')

.controller('GraphCtrl', function($scope, $window, graphData, demographics,localStorageService){

  //  ngShows
  $scope.chartOutputOne        = false;
  $scope.chartOutputTwo        = false;
  $scope.chartOutputThree      = false;

  $scope.showMultiProp         = false;
  $scope.showOneProp           = false; 
  $scope.showDemographics      = false;

  $scope.showOnePropCategories = false;
  $scope.showNielsen           = false;

  $scope.showCategories        = false;
  $scope.showTenants           = false;

  $scope.showNielsenGraph      = false;
  // Analysis Type  \/\/\/
  //                 \/\/
  //                  \/ 

  var dropDownOne = [
    {label: 'Property', id: 1},
    {label: 'Property to Property', id: 2}, 
    {label: 'Demographics', id: 3}
  ];



  $scope.analysisType = dropDownOne;
  $scope.analysisTypeSelected = {};
  $scope.analysisTypeSettings = {
      selectionLimit: 1, 
      closeOnSelect: true, 
      externalIdProp: '', 
      smartButtonMaxItems: 1
  };
  $scope.analysisTypeEvents = {
    onItemSelect: function(item) {
        // hide any dropdowns that have already been shown 
        $scope.chartOutputOne        = false;
        $scope.chartOutputTwo        = false;
        $scope.chartOutputThree      = false;

        $scope.showMultiProp         = false;
        $scope.showOneProp           = false; 
        $scope.showDemographics      = false;

        $scope.showOnePropCategories = false;
        $scope.showNielsen           = false;

        $scope.showCategories        = false;
        $scope.showTenants           = false;

        $scope.showNielsenGraph      = false;
       if (item.id == 1)  {
        $scope.showOneProp           = true;
      } else if (item.id == 2) {
        $scope.showMultiProp         = true;
      } else {
        $scope.showDemographics      = true;
      }
    }
  };

  // Multiple Properties  \/\/\/
  //                       \/\/
  //                        \/
  var uniques = _.map(_.groupBy(graphData,function(doc){
  return doc.id;
  }),function(grouped){
    return grouped[0];
  });

  $scope.mutliProps = uniques;
  $scope.mutliPropsSelected = [];
  $scope.mutliPropsSettings = {
    displayProp: 'key', 
    externalIdProp: '', 
    idProp: 'key', 
    smartButtonMaxItems: 1
  };

  $scope.getProperties = function() {
    $scope.showMainGraph    = true;
    var properties = $scope.mutliPropsSelected;

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
    $scope.showNielsenGraph = false;

  };

  //  One Property   \/\/\/
  //                  \/\/
  //                   \/

  $scope.oneProp = uniques;
  $scope.onePropSelected   = {};
  $scope.onePropSettings   = {
    displayProp: 'key', 
    externalIdProp: '', 
    idProp: 'key', 
    selectionLimit: 1, 
    smartButtonMaxItems: 1
  };

  $scope.onePropEvents = {
    onItemSelect: function(item) {
      $scope.chartOutputOne        = false;
      $scope.chartOutputTwo        = false;
      $scope.chartOutputThree      = false;

      $scope.showCategories        = false;
      $scope.showTenants           = false;
      
      $scope.showOnePropCategories = false;
      $scope.showNielsen           = false;

      $scope.showNielsenGraph      = false;
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
      if ($scope.showNielsen) {  
        $scope.chartOutputOne        = false;
        $scope.chartOutputTwo        = false;
        $scope.chartOutputThree      = false;

        $scope.showNielsenGraph      = false;
        $scope.showTenants           = false;
        $scope.showOnePropCategories = false;
      } else {
        $scope.chartOutputOne        = false;
        $scope.chartOutputTwo        = false;
        $scope.chartOutputThree      = false;

        $scope.showOnePropCategories = true;
        $scope.showNielsenGraph      = false;
        $scope.showTenants           = false;
      }
  };
  //  Demographics Properties Stores     \/\/\/
  //                                      \/\/
  //                                       \/
  $scope.demographics = demographics;
  $scope.demographicsSelected = [];
  $scope.demographicsSettings = {
    displayProp: 'storeName', 
    externalIdProp: '',
    idProp: 'storeName',  
    smartButtonMaxItems: 2
  };
  $scope.demoEvents = {
    onItemSelect: function() {
      $scope.showNielsen = false;
    }, 
    onItemDeselect: function() {
      $scope.showNielsen = false;
    }
  }

  $scope.getDemoCategories = function() {
      $scope.showNielsen = true;
  }

  //  One Property Categories   \/\/\/
  //                             \/\/
  //                              \/
  var dropDownTwo = [
    {label: 'Category to Category', id: 1},
    {label: 'Tenant to Tenant', id: 2}
  ];

  $scope.onePropCategoriesOptions  = dropDownTwo;
  $scope.onePropCategoriesSelected = {};
  $scope.onePropCategoriesSettings = {
    selectionLimit: 1, 
    closeOnSelect: true, 
    externalIdProp: '',
    smartButtonMaxItems: 1
  };
  $scope.onePropCategoriesEvents = {
    onItemSelect: function() {
      $scope.showCategories = false;
      $scope.showTenants    = false;
    }
  }

  $scope.categoriesOrTenants = function() {
    $scope.chartOutputOne   = false;
    $scope.chartOutputTwo   = false;
    $scope.chartOutputThree = false;
    var selected = $scope.onePropCategoriesSelected;
    // category
    if (selected.id == 1) {
      
      var unitSelected = $scope.onePropSelected;
      
      var categories =  _.map(_.groupBy(graphData,function(data){
          if (unitSelected.key === data.key) {
            return data.category;
          }
        }),function(grouped){
          return grouped[0];
      });

      categories.pop();

      $scope.showCategories = true;
      $scope.showTenants    = false;
      $scope.categories     = categories;

    } 
    // unit
    else {

      var unitSelected = $scope.onePropSelected;

      var units =  _.map(_.groupBy(graphData,function(data){
          if (unitSelected.key === data.key) {
            return data.storeName;
          }
        }),function(grouped){
          return grouped[0];
      });

      units.pop();
      $scope.showTenants    = true;
      $scope.showCategories = false;
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

  $scope.categoriesSelected = [];
  $scope.categoriesSettings = dropDownSettings('category');

  $scope.getCategoriesGraph = function() {
    $scope.showMainGraph  = true;
    $scope.chartOutputTwo = true;

    $scope.chartOutputOne   = false;
    $scope.chartOutputThree = false;
    var selected = $scope.categoriesSelected;

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

  $scope.getshowOneProps = function() {
    $scope.showMainGraph    = true;

    $scope.chartOutputThree = true;
    $scope.chartOutputOne   = false;
    $scope.chartOutputTwo   = false;
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
    {label: 'Age', id: 3, demo: 'age'}
  ];

  $scope.nielsenOptions = nOptions;
  $scope.nielsenSelected = {};
  $scope.nielsenSettings = {
      selectionLimit: 1, 
      closeOnSelect: true, 
      displayProp: 'label', 
      externalIdProp: '',
      smartButtonMaxItems: 1
  };

  $scope.getNielsenGraph = function() {
      $scope.showMainGraph = false;
      $scope.showNielsenGraph = true;
      var selectedProps = $scope.demographicsSelected;
      var chartType = $scope.nielsenSelected; 
     
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
                type: 'column', 
                width: 700,
                height:500
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