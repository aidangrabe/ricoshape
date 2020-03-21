const Quake = {
	
	shake: function(stage, magnitude, times) {
		const timeBetweenShakes = 25; // in milliseconds
		const halfMagnitude = magnitude / 2;

	    var func = function() {
	        stage.position.x = Util.randomBetween(-halfMagnitude, halfMagnitude);
	        stage.position.y = Util.randomBetween(-halfMagnitude, halfMagnitude);

	        times--;

	        if (times > 0) {
	             setTimeout(func, timeBetweenShakes);
	        } else {
	             stage.x = 0;
	             stage.y = 0;
	        }

	    };

	    setTimeout(func, timeBetweenShakes);
	}

}