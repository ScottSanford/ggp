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
        recursOn: 'year',
        draggable: true,
        resizable: true, 
        incrementsBadgeTotal: false
      }
    ];

    $scope.events = eventList;

    $scope.addMeeting = function() {
    	var meeting = {
    		title: 'New event', 
    		type: 'important', 
    		draggable: true, 
    		resizable: true
    	}
    	$scope.events.push(meeting);
    }

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

			    	$scope.events.push(meeting);
			    	$scope.closeThisDialog();

			    }
			}
		});
    };

    $scope.eventClicked = function(event) {
      console.log('Clicked', event);
    };

    $scope.eventEdited = function(event) {
      ngDialog.open({ template: 'common/tmpls/dialogs/popupTmpl.html', className: 'ngdialog-theme-default' });
    };

    $scope.eventDeleted = function(event) {
      console.log("Deleted", event);;
    };

    $scope.eventTimesChanged = function(event) {
      console.log('Dropped or resized', event);
    };


});
