angular.module('ggpApp')

.controller('MeetingsCtrl', function($scope, mfly, propertyData, moment, ngDialog){




    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    $scope.events = [
	  {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true, 
        incrementsBadgeTotal: false
      }
    ];

    $scope.isCellOpen = true;

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

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

});
