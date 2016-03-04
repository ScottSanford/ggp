angular.module('ggpApp')

.controller('MapCtrl', function($scope, mfly){

	mfly.search('@MallProperties').then(function(data){

		mfly.getFolder(data[0].id).then(function(data){
			$scope.properties = data;
		});

	});

	$scope.showPropertyOnMap = function(name) {
		$scope.chosenProperty = name;
		$scope.mapFacts = true;
		$scope.googleMap = true;
	}

	// Google Map
	initMap();

	var map;
	function initMap() {

	  // Try HTML5 geolocation.
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };

	      var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];

 		  var styledMap = new google.maps.StyledMapType(styles,{
 		  	name: "Styled Map"
 		  });

		  var map = new google.maps.Map(document.getElementById('map'), {
		    center: pos,
		    zoom: 14, 
		    mapTypeControlOptions: {
            	mapTypeId: [google.maps.MapTypeId.ROADMAP,'map_style']
            }
		  });

	      map.setCenter(pos);
		  marker = new google.maps.Marker({
	        position: pos, 
			map: map
	  	  });

		  map.mapTypes.set('map_style', styledMap);
          map.setMapTypeId('map_style');

	    }, function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	    });
	  } else {
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	  }
	}




});