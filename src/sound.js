var Sound = {
	
	sounds: {
		'player.hit': 'player_explode.wav',
		'player.shoot': 'player_shoot.wav',
		'powerup': 'power_up.wav',
		'square.hit': 'square_explode.wav'
	},
	soundsLoaded: 0,
	audioPool: [],

	load: function() {
		createjs.Sound.addEventListener('fileload', this.soundLoaded);
		for (sound in this.sounds) {
			this.loadSound(sound);
		}
	},

	loadSound: function(soundId) {
		createjs.Sound.registerSound({
			id: soundId,
			src: "res/audio/" + this.sounds[soundId]
		})
	},

	play: function(soundId) {
		createjs.Sound.play(soundId);
	},

	soundLoaded: function(event) {
		var totalSounds = Object.keys(Sound.sounds).length;

		Sound.soundsLoaded++;
		if (Sound.soundsLoaded == totalSounds) {
			Sound.finishedLoading();
		}
	},

	finishedLoading: function() {
		console.log("All sounds loaded");
	}

}