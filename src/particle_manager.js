
var ParticleManager = {

	particles: [],
	deadParticles: [],
	
	burstAt: function(x, y, color, amount) {
		for (i = 0; i < amount; i++) {
			var particle = this.newParticle();
			particle.sprite.x = x;
			particle.sprite.y = y;
			particle.sprite.tint = color;
		}
	},

	burstInDirectionAt: function(x, y, color, direction, wiggle, amount) {
		for (i = 0; i < amount; i++) {
			var particle = this.newParticle();
			particle.sprite.x = x;
			particle.sprite.y = y;
			particle.sprite.tint = color;
			particle.direction = direction - wiggle + Math.random() * wiggle * 2;
		}
	},

	newParticle: function() {
		var particle = this.deadParticles.pop();
		if (particle === undefined) {
			// create new particle
			particle = new Particle();
			this.particles.push(particle);
			particleLayer.addChild(particle.sprite);
			shadowLayer.addChild(particle.shadow);
		}
		particle.alive = true;
		particle.life = 700;
		particle.startLife = 700;
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

				particle.shadow.x = particle.sprite.x;
				particle.shadow.y = particle.sprite.y;
				particle.shadow.width = particle.sprite.width + 2;
				particle.shadow.height = particle.sprite.height + 2;
			}

			particle.sprite.visible = particle.alive;
			particle.shadow.visible = particle.alive;

		}
	}

};