class ParticleManager {

	constructor(particleLayer, shadowLayer) {
		this.particleLayer = particleLayer;
		this.shadowLayer = shadowLayer;

		this.particles = [];
		this.deadParticles = [];
	}

	burstAt(x, y, color, amount) {
		for (let i = 0; i < amount; i++) {
			const particle = this.newParticle();
			particle.sprite.x = x;
			particle.sprite.y = y;
			particle.sprite.tint = color;
		}
	}

	burstInDirectionAt(x, y, color, direction, wiggle, amount) {
		for (let i = 0; i < amount; i++) {
			const particle = this.newParticle();
			particle.sprite.x = x;
			particle.sprite.y = y;
			particle.sprite.tint = color;
			particle.direction = direction - wiggle + Math.random() * wiggle * 2;
		}
	}

	newParticle() {
		let particle = this.deadParticles.pop();
		if (particle === undefined) {
			// create new particle
			particle = new Particle();
			this.particles.push(particle);
			this.particleLayer.addChild(particle.sprite);
			this.shadowLayer.addChild(particle.shadow);
		}
		particle.alive = true;
		particle.life = 40;
		particle.startLife = 40;
		particle.direction = Math.random() * Math.PI * 2;
		particle.speed = Util.randomBetween(particle.minSpeed, particle.maxSpeed);
		return particle;
	}

	update(delta) {
		for (let particle of this.particles) {

			if (particle.alive) {

				particle.life -= delta;

				if (particle.life < 0) {
					particle.alive = false;
					this.deadParticles.push(particle);
				} else {
					const scale = 1 * (particle.life / particle.startLife);
					particle.sprite.scale.x = scale;
					particle.sprite.scale.y = scale;
					particle.sprite.x += Math.sin(particle.direction) * particle.speed * delta;
					particle.sprite.y -= Math.cos(particle.direction) * particle.speed * delta;
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