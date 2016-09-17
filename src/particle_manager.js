
var ParticleManager = {

	particles: [],
	deadParticles: [],
	
	burstAt: function(x, y, amount) {
		for (i = 0; i < amount; i++) {
			var particle = this.newParticle();
			particle.sprite.x = x;
			particle.sprite.y = y;
		}
		console.log("num particles: " + this.particles.length);
	},

	newParticle: function() {
		var particle = this.deadParticles.pop();
		if (particle === undefined) {
			// create new particle
			particle = new Particle();
			this.particles.push(particle);
			particleLayer.addChild(particle.sprite);
		}
		particle.alive = true;
		particle.life = 500;
		particle.startLife = 500;
		particle.direction = Math.random() * Math.PI * 2;
		particle.speed = Util.randomBetween(particle.minSpeed, particle.maxSpeed);
		return particle;
	},

	update: function(delta) {
		for (particle of this.particles) {

			if (particle.alive) {

				particle.life -= delta;

				if (particle.life < 0) {
					particle.alive = false;
					this.deadParticles.push(particle);
				} else {
					var scale = 1 * (particle.life / particle.startLife);
					particle.sprite.scale.x = scale;
					particle.sprite.scale.y = scale;
					particle.sprite.x += Math.sin(particle.direction) * particle.speed / delta;
					particle.sprite.y -= Math.cos(particle.direction) * particle.speed / delta;
				}
			}

			particle.sprite.visible = particle.alive;

		}
	}

};