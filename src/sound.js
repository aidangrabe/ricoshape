var Sound = {
	
	sounds: {
		'player.hit': 'player_explode.wav',
		'player.shoot': 'player_shoot.wav',
		'square.hit': 'square_explode.wav'
	},
	soundsLoaded: 0,
	audioPool: [],

	load: function() {
		for (sound in this.sounds) {
			// update the resource so it points to the correct location
			this.sounds[sound] = "res/audio/" + this.sounds[sound];

			var audio = new Audio(this.sounds[sound]);
			audio.addEventListener('canplaythrough', this.soundLoaded, false);
		}
	},

	play: function(soundName) {
		var audio = this.audioPool.pop();

		if (audio === undefined) {
			audio = new Audio();
			audio.addEventListener('ended', this.soundFinishedPlaying)
		}

		audio.src = this.sounds[soundName];

		console.log("soundPoolSize: " + this.audioPool.length);

		audio.play();
	},

	soundLoaded: function(event) {
		var totalSounds = Object.keys(Sound.sounds).length;

		Sound.soundsLoaded++;
		console.log("num sounds loaded: " + totalSounds);
		console.log("total sounds: " + totalSounds);
		if (Sound.soundsLoaded == totalSounds) {
			Sound.finishedLoading();
		}
	},

	soundFinishedPlaying: function(event) {
		Sound.audioPool.push(this);
	},

	finishedLoading: function() {
		console.log("All sounds loaded");
	}

}