angular.module('ggpApp')

.controller('MeetingsCtrl', function($scope, $rootScope, mfly, propertyData, moment, ngDialog){


    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();

    var eventList = [
	  {
        title: 'Gap Meeting',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        properties: [
        	{
        	 id: 1, 
        	 label: 'Oakbrook Mall', 
        	 propId: "1234"
        	},
        	{
        	 id: 2, 
        	 label: 'Maimi Mall', 
        	 propId: "1234"
        	},
        	{
        	 id: 3, 
        	 label: 'Chicago Mall', 
        	 propId: "1234"
        	}
        ],
        recursOn: 'year',
        draggable: true,
        resizable: true, 
        incrementsBadgeTotal: false
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
	   rObj['propeId'] = obj.property_id;
	   return rObj;
	});

	$scope.propertyList = reformattedProperties;

	$scope.example9settings = {
		enableSearch: true, 
		scrollableHeight: '300px',
    	scrollable: true, 
    	externalIdProp: ''
	};    

    $scope.eventClicked = function(event) {
    	console.log("Clicked :: ", event);
    };

    $scope.eventEdited = function(event) {
      	ngDialog.open({ 
      		template: 'common/tmpls/dialogs/editMeeting.html', 
      		className: 'ngdialog-theme-default', 
      		scope: $scope,
      		controller: function($scope) {
      			console.log(event);
      			$scope.meeting = event;

      			$scope.properties = event.properties;
      		}
      	});
    };

    $scope.eventDeleted = function(event, index) {
      $scope.events.splice(index, 1);
    };

    $scope.eventTimesChanged = function(event) {
      console.log('Dropped or resized', event);
    };


});
