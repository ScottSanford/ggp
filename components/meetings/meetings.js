angular.module('ggpApp')

.controller('MeetingsCtrl', function($scope, $location, $route, $rootScope, mfly, propertyData, moment, ngDialog, localStorageService){


    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.todayDate = Date.now();

    // LocalStorage

    var eventList = [
    {
        title: 'Gap Meeting',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),      
        endsAt: moment().startOf('day').add(8, 'hours').toDate(),      
        properties: [
         {id: 1, label: 'Oakbrook Center', propId: "4386"},
         {id: 2, label: 'Baybrook', propId: "2009"},
         {id: 3, label: 'Glendale Galleria', propId: "3802"}
        ],
        recursOn: 'year',
        draggable: true,
        resizable: true, 
        incrementsBadgeTotal: true, 
        notes: 'Here are some notes about the meeting! This Meeting Builder is badass! ;)'
      },
      {
        title: 'Starbucks Meeting',
        type: 'success',
        startsAt: moment().startOf('day').add(8, 'hours').toDate(),      
        startsAt: moment().startOf('day').add(9, 'hours').toDate(),      
        properties: [
         {id: 1, label: 'Oakbrook Center', propId: "4386"},
         {id: 2, label: 'Baybrook', propId: "2009"},
         {id: 3, label: 'Glendale Galleria', propId: "3802"}
        ],
        recursOn: 'year',
        draggable: true,
        resizable: true, 
        incrementsBadgeTotal: true, 
        notes: 'Here are some notes about the meeting!'
      }
    ];

    var ls = localStorageService.get('calendar');

    if (ls) {

      $scope.events = ls;

    } else {

      $scope.events = eventList;

    }

    $scope.isCellOpen = true;

    $scope.createMeeting = function() {
    ngDialog.open({ 
      template: 'common/tmpls/dialogs/createMeeting.html', 
      className: 'ngdialog-theme-default', 
      scope: $scope,
      controller: function($scope) {

          $scope.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
          };

          $scope.addMeetingToCalendar = function(meeting) {
            
            meeting['recursOn']    = 'year';
            meeting['draggable']   = false;
            meeting['resizeable']  = true;
            meeting['properties']  = $scope.selectedProperties;
            meeting['collectionProperties'] = $scope.selectedCollection[0].properties;

            var start = meeting.startTime;
            var end   = meeting.endTime;
            
            var lsCalendar = localStorageService.get('calendar') || [];
            console.log('Meeting -->', meeting);
            lsCalendar.push(meeting);
            localStorageService.set('calendar', lsCalendar);

            $route.reload();
            $scope.closeThisDialog();

          }
      }
    });
    };

  $scope.selectedProperties = [];

  var reformattedProperties = propertyData.map(function(obj, index){ 
     var rObj = {};
     rObj['label']   = obj.property_name;
     rObj['id']      = index + 1;
     rObj['propId'] = obj.property_id;
     return rObj;
  });

  $scope.propertyList = reformattedProperties;

  $scope.selectedCollection = [];
  var lscollectionNames = localStorageService.get('collectionNames');
  $scope.collectionList = lscollectionNames;
  $scope.collectionSettings = {
    displayProp: 'name', 
    externalIdProp: '', 
    idProp: 'name', 
    smartButtonMaxItems: 1
  };

  $scope.dropDownSettings = {
      enableSearch: true, 
      scrollableHeight: '300px',
      scrollable: true, 
      externalIdProp: '', 
      smartButtonMaxItems: 3,
  };    

    $scope.meetingDetails = function(event) {
        ngDialog.open({ 
          template: 'common/tmpls/dialogs/editMeeting.html', 
          className: 'ngdialog-theme-default', 
          scope: $scope,
          controller: function($scope) {
            console.log("Meeting Details :: ", event);
            $scope.meeting = event;

            $scope.properties = event.properties;
            $scope.collection = event.collectionProperties;

            $scope.goToProperty = function(id) {
              $scope.closeThisDialog();
              $location.url('/property?id=' + id);
            }
          }
        });
    };

    $scope.deleteMeeting = function(meeting) {
      var lsList = localStorageService.get('calendar');
      for (var i=0; i<lsList.length; i++) {
        if (meeting.title === lsList[i].title ) {
          lsList.splice(i, 1);
        }
      }
      localStorageService.set('calendar', lsList);
      $route.reload();
    };


    $rootScope.showStartDatePicker = false;

    $scope.openStartDate = function() {

       $scope.showStartDatePicker = !$scope.showStartDatePicker;
       
    };    

    $rootScope.showEndDatePicker = false;

    $scope.openEndDate = function() {

       $scope.showEndDatePicker = !$scope.showEndDatePicker;
       
    };    

});
