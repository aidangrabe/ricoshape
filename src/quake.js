var Quake = {
	
	shake: function(magnitude, times) {
		var timeBetweenShakes = 25; // in milliseconds
		var halfMagnitude = magnitude / 2;

	    var func = function() {
	        rootContainer.position.x = Util.randomBetween(-halfMagnitude, halfMagnitude);
	        rootContainer.position.y = Util.randomBetween(-halfMagnitude, halfMagnitude);

	        times--;

	        if (times > 0) {
	             setTimeout(func, timeBetweenShakes);
	        } else {
	             rootContainer.x = 0;
	             rootContainer.y = 0;
	        }

	    };

	    setTimeout(func, timeBetweenShakes);
	}

}