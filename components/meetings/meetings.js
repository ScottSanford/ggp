angular.module('ggpApp')

.controller('MeetingsCtrl', function($scope, $location, $rootScope, mfly, propertyData, moment, ngDialog){


    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();

    var eventList = [
	  {
        title: 'Gap Meeting',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(16, 'hours').toDate(),
        properties: [
        	{
        	 id: 1, 
        	 label: 'Oakbrook Center', 
        	 propId: "4386"
        	},
        	{
        	 id: 2, 
        	 label: 'Baybrook', 
        	 propId: "2009"
        	},
        	{
        	 id: 3, 
        	 label: 'Glendale Galleria', 
        	 propId: "3802"
        	}
        ],
        recursOn: 'year',
        draggable: true,
        resizable: true, 
        incrementsBadgeTotal: false, 
        notes: 'Here are some notes about the meeting! This Meeting Builder is badass! ;)'
      }
    ];

    $scope.events = eventList;

    $scope.isCellOpen = false;

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
			    	console.log("Meeting :: ", meeting);
			    	$scope.events.push(meeting);
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

	$scope.example9settings = {
		enableSearch: true, 
		scrollableHeight: '300px',
    	scrollable: true, 
    	externalIdProp: ''
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

      			$scope.goToProperty = function(id) {
      				$scope.closeThisDialog();
      				$location.url('/property?id=' + id);
      			}
      		}
      	});
    };

    $scope.deleteMeeting = function(event, index) {
      $scope.events.splice(index, 1);
    };

    $scope.eventTimesChanged = function(event) {
      console.log('Dropped or resized', event);
    };

    $scope.openStartDate = function() {
 		$scope.showStartDatePicker = true;
    };    

    $scope.openEndDate = function() {
 		$scope.showEndDatePicker = true;
    };
});
