class Scene1 extends Phaser.Scene {
    
    constructor() {
        super('scene 1');
    }

	init() {
		this.score = -1;
	}

    preload() {
        this.load.image('vampire', 'assets/Vampire.png');
        this.load.image('platform', 'assets/Platform.png');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.cameras.main.fadeIn(1000);

        this.w = this.scale.width;
        this.h = this.scale.height;

        let ground = this.add.rectangle(0, this.h * 0.95, this.w, this.h * 0.5, 0x989898).setOrigin(0, 0);
        this.ground = this.physics.add.existing(ground, true);

        this.platforms = this.physics.add.staticGroup();

        for (let i = -1; i < 4; i++)
		{
			const x = Phaser.Math.Between(55, 300);
			const y = 150 * i;
	
			const platform = this.platforms.create(x, y, 'platform');
			platform.scale = 0.3;
	
			const body = platform.body;
			body.updateFromGameObject();
		}

        this.player = this.physics.add.sprite(this.w * 0.5, this.h * 0.78, 'vampire').setScale(this.w * 0.0004);
        this.player.setVelocityY(100);
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 0);
		this.cameras.main.setDeadzone(this.w * 1.5);
        this.player.body.checkCollision.up = false;
		this.player.body.checkCollision.left = false;
		this.player.body.checkCollision.right = false;

        this.physics.add.collider(this.ground, this.player);
        this.physics.add.collider(this.platforms, this.player);

		this.ty = 0;

		this.scoreText = this.add.text(70, 10, 'Score: 0', { color: '#000000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)
			.setStroke(0x000000, 1);

		this.levelText = this.add.text(280, 10, 'Level 1', { color: '#000000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)
			.setStroke(0x000000, 1);

		this.directions = this.add.text(175, 80, 'Use <- and -> to move left and right.', { color: '#ffffff', fontSize: 14})
			.setScrollFactor(0)
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 3);		
    }

    update() {
        this.platforms.children.iterate(child => {
			const platform = child;

			const scrollY = this.cameras.main.scrollY;
			if (platform.y >= scrollY + 700)
			{
				platform.x = Phaser.Math.Between(55, 300);
				platform.y = scrollY - Phaser.Math.Between(50, 100);
				platform.body.updateFromGameObject();
			}
		})
        
        const touchingDown = this.player.body.touching.down;

		if (touchingDown)
		{
			this.player.setVelocityY(-310);
			if (this.ty > this.player.y + 50 || this.ty < this.player.y - 50) {
				this.ty = this.player.y;
				this.score++;
				this.scoreText.text = `Score: ${this.score}`;
				if (this.score === 2) {
					this.tweens.add({
						targets: this.directions,
						alpha: 0,
						ease: "Linear",
						duration: 1000, 
					});
				}
				else if (this.score === 10) {
					this.scene.start('victory 1');
				}
			}
		}


        this.horizontalWrap(this.player);

        if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-100);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(100);
		}
		else
		{
			this.player.setVelocityX(0);
		}

        
		const bottomPlatform = this.findBottomMostPlatform();
		if (this.player.y > bottomPlatform.y + 100)
		{
			this.scene.start('game over 1');
		}
    }

    // https://github.com/ourcade/infinite-jumper-template-phaser3
    horizontalWrap(player)
	{
		const halfWidth = player.displayWidth * 0.5;
		const gameWidth = this.w;
		if (player.x < -halfWidth)
		{
			player.x = gameWidth + halfWidth;
		}
		else if (player.x > gameWidth + halfWidth)
		{
			player.x = -halfWidth;
		}
	}

    // https://github.com/ourcade/infinite-jumper-template-phaser3
    findBottomMostPlatform()
	{
		const platforms = this.platforms.getChildren();
		let bottomPlatform = platforms[0];

		for (let i = 1; i < platforms.length; i++)
		{
			const platform = platforms[i];

			// discard any platforms that are above current
			if (platform.y < bottomPlatform.y)
			{
				continue;
			}

			bottomPlatform = platform;
		}

		return bottomPlatform;
	}
}

class Scene2 extends Phaser.Scene {
    
    constructor() {
        super('scene 2');
    }

	init() {
		this.score = -1;
	}

    preload() {
        this.load.image('vampire', 'assets/Vampire.png');
        this.load.image('platform', 'assets/Platform.png');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.cameras.main.fadeIn(1000);

        this.w = this.scale.width;
        this.h = this.scale.height;

        let ground = this.add.rectangle(0, this.h * 0.95, this.w, this.h * 0.5, 0x989898).setOrigin(0, 0);
        this.ground = this.physics.add.existing(ground, true);

        this.platforms = this.physics.add.staticGroup();

        for (let i = -1; i < 4; i++)
		{
			const x = Phaser.Math.Between(40, 310);
			const y = 150 * i;
	
			const platform = this.platforms.create(x, y, 'platform');
			platform.scale = 0.25;
	
			const body = platform.body;
			body.updateFromGameObject();
		}

        this.player = this.physics.add.sprite(this.w * 0.5, this.h * 0.78, 'vampire').setScale(this.w * 0.0004);
        this.player.setVelocityY(100);
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 0);
		this.cameras.main.setDeadzone(this.w * 1.5);
        this.player.body.checkCollision.up = false;
		this.player.body.checkCollision.left = false;
		this.player.body.checkCollision.right = false;

        this.physics.add.collider(this.ground, this.player);
        this.physics.add.collider(this.platforms, this.player);

		this.ty = 0;

		this.scoreText = this.add.text(70, 10, 'Score: 0', { color: '#000000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)
			.setStroke(0x000000, 1);

		this.levelText = this.add.text(280, 10, 'Level 2', { color: '#000000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)
			.setStroke(0x000000, 1);
    }

    update() {
        this.platforms.children.iterate(child => {
			const platform = child;

			const scrollY = this.cameras.main.scrollY;
			if (platform.y >= scrollY + 700)
			{
				platform.x = Phaser.Math.Between(40, 310);
				platform.y = scrollY - Phaser.Math.Between(50, 100);
				platform.body.updateFromGameObject();
			}
		})
        
        const touchingDown = this.player.body.touching.down;

		if (touchingDown)
		{
			this.player.setVelocityY(-310);
			if (this.ty > this.player.y + 50 || this.ty < this.player.y - 50) {
				this.ty = this.player.y;
				this.score++;
				this.scoreText.text = `Score: ${this.score}`;
				if (this.score === 20) {
					this.scene.start('victory 2');
				}
			}
		}


        this.horizontalWrap(this.player);

        if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-100);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(100);
		}
		else
		{
			this.player.setVelocityX(0);
		}

        const bottomPlatform = this.findBottomMostPlatform()
		if (this.player.y > bottomPlatform.y + 100)
		{
			this.scene.start('game over 2');
		}
    }

    // https://github.com/ourcade/infinite-jumper-template-phaser3
    horizontalWrap(player)
	{
		const halfWidth = player.displayWidth * 0.5;
		const gameWidth = this.w;
		if (player.x < -halfWidth)
		{
			player.x = gameWidth + halfWidth;
		}
		else if (player.x > gameWidth + halfWidth)
		{
			player.x = -halfWidth;
		}
	}

    // https://github.com/ourcade/infinite-jumper-template-phaser3
    findBottomMostPlatform()
	{
		const platforms = this.platforms.getChildren();
		let bottomPlatform = platforms[0];

		for (let i = 1; i < platforms.length; i++)
		{
			const platform = platforms[i];

			// discard any platforms that are below current
			if (platform.y < bottomPlatform.y)
			{
				continue;
			}

			bottomPlatform = platform;
		}

		return bottomPlatform;
	}
}

class Scene3 extends Phaser.Scene {
    
    constructor() {
        super('scene 3');
    }

	init() {
		this.score = -1;
	}

    preload() {
        this.load.image('vampire', 'assets/Vampire.png');
        this.load.image('platform', 'assets/Platform.png');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.cameras.main.fadeIn(1000);

        this.w = this.scale.width;
        this.h = this.scale.height;

        let ground = this.add.rectangle(0, this.h * 0.95, this.w, this.h * 0.5, 0x989898).setOrigin(0, 0);
        this.ground = this.physics.add.existing(ground, true);

        this.platforms = this.physics.add.staticGroup();

        for (let i = -1; i < 4; i++)
		{
			const x = Phaser.Math.Between(40, 310);
			const y = 150 * i;
	
			const platform = this.platforms.create(x, y, 'platform');
			platform.scale = 0.2;
	
			const body = platform.body;
			body.updateFromGameObject();
		}

        this.player = this.physics.add.sprite(this.w * 0.5, this.h * 0.78, 'vampire').setScale(this.w * 0.0004);
        this.player.setVelocityY(100);
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 0);
		this.cameras.main.setDeadzone(this.w * 1.5);
        this.player.body.checkCollision.up = false;
		this.player.body.checkCollision.left = false;
		this.player.body.checkCollision.right = false;

        this.physics.add.collider(this.ground, this.player);
        this.physics.add.collider(this.platforms, this.player);

		this.ty = 0;

		this.scoreText = this.add.text(70, 10, 'Score: 0', { color: '#000000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)
			.setStroke(0x000000, 1);

		this.levelText = this.add.text(280, 10, 'Level 3', { color: '#000000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0)
			.setStroke(0x000000, 1);
    }

    update() {
        this.platforms.children.iterate(child => {
			const platform = child;

			const scrollY = this.cameras.main.scrollY;
			if (platform.y >= scrollY + 700)
			{
				platform.x = Phaser.Math.Between(40, 310);
				platform.y = scrollY - Phaser.Math.Between(50, 100);
				platform.body.updateFromGameObject();
			}
		})
        
        const touchingDown = this.player.body.touching.down;

		if (touchingDown)
		{
			this.player.setVelocityY(-310);
			if (this.ty > this.player.y + 50 || this.ty < this.player.y - 50) {
				this.ty = this.player.y;
				this.score++;
				this.scoreText.text = `Score: ${this.score}`;
				if (this.score === 30) {
					this.scene.start('victory 3');
				}
			}
		}


        this.horizontalWrap(this.player);

        if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-100);
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(100);
		}
		else
		{
			this.player.setVelocityX(0);
		}

        const bottomPlatform = this.findBottomMostPlatform()
		if (this.player.y > bottomPlatform.y + 100)
		{
			this.scene.start('game over 3');
		}
    }

    // https://github.com/ourcade/infinite-jumper-template-phaser3
    horizontalWrap(player)
	{
		const halfWidth = player.displayWidth * 0.5;
		const gameWidth = this.w;
		if (player.x < -halfWidth)
		{
			player.x = gameWidth + halfWidth;
		}
		else if (player.x > gameWidth + halfWidth)
		{
			player.x = -halfWidth;
		}
	}

    // https://github.com/ourcade/infinite-jumper-template-phaser3
    findBottomMostPlatform()
	{
		const platforms = this.platforms.getChildren();
		let bottomPlatform = platforms[0];

		for (let i = 1; i < platforms.length; i++)
		{
			const platform = platforms[i];

			// discard any platforms that are below current
			if (platform.y < bottomPlatform.y)
			{
				continue;
			}

			bottomPlatform = platform;
		}

		return bottomPlatform;
	}
}

class GameOver1 extends Phaser.Scene {
	constructor() {
        super('game over 1');
    }
	
	create() {
		this.cameras.main.setBackgroundColor('#000000');

		this.add.text(175, 140, 'Game Over', { color: '#ffffff', fontSize: 40 })
		.setOrigin(0.5, 0.5)
		.setStroke(0x000000, 5);

		this.add.text(175, 250, 'You need to reach a score of 10 to beat this level.', { color: '#ffffff', fontSize: 18 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setWordWrapWidth(200);

		let tryagain = this.add.text(175, 350, 'Try Again', { color: '#ffffff', fontSize: 40 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => tryagain.setColor('#bf0000'))
			.on('pointerout', () => tryagain.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 1');
				});
			});
	}
}

class GameOver2 extends Phaser.Scene {
	constructor() {
        super('game over 2');
    }
	
	create() {
		this.cameras.main.setBackgroundColor('#000000');

		this.add.text(175, 140, 'Game Over', { color: '#ffffff', fontSize: 40 })
		.setOrigin(0.5, 0.5)
		.setStroke(0x000000, 5);

		this.add.text(175, 250, 'You need to reach a score of 20 to beat this level.', { color: '#ffffff', fontSize: 18 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setWordWrapWidth(200);

		let tryagain = this.add.text(175, 350, 'Try Again', { color: '#ffffff', fontSize: 40 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => tryagain.setColor('#bf0000'))
			.on('pointerout', () => tryagain.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 2');
				});
			});
	}
}

class GameOver3 extends Phaser.Scene {
	constructor() {
        super('game over 3');
    }
	
	create() {
		this.cameras.main.setBackgroundColor('#000000');

		this.add.text(175, 140, 'Game Over', { color: '#ffffff', fontSize: 40 })
		.setOrigin(0.5, 0.5)
		.setStroke(0x000000, 5);

		this.add.text(175, 250, 'You need to reach a score of 30 to beat this level.', { color: '#ffffff', fontSize: 18 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setWordWrapWidth(200);

		let tryagain = this.add.text(175, 350, 'Try Again', { color: '#ffffff', fontSize: 40 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => tryagain.setColor('#bf0000'))
			.on('pointerout', () => tryagain.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 3');
				});
			});
	}
}

class Victory1 extends Phaser.Scene {
	constructor() {
        super('victory 1');
    }
	
	create() {
		this.cameras.main.setBackgroundColor('#000000');

		this.add.text(175, 140, 'Congratulations!', { color: '#ffffff', fontSize: 32 })
		.setOrigin(0.5, 0.5)
		.setStroke(0x000000, 5);

		this.add.text(175, 250, 'You have beaten level 1.\n\nThe next level will have smaller platforms.', { color: '#ffffff', fontSize: 18 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setWordWrapWidth(200);

		let nextlevel = this.add.text(170, 360, 'Next Level', { color: '#ffffff', fontSize: 32 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => nextlevel.setColor('#00cf00'))
			.on('pointerout', () => nextlevel.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 2');
				});
			});
	}
}

class Victory2 extends Phaser.Scene {
	constructor() {
        super('victory 2');
    }
	
	create() {
		this.cameras.main.setBackgroundColor('#000000');

		this.add.text(175, 140, 'Congratulations!', { color: '#ffffff', fontSize: 32 })
		.setOrigin(0.5, 0.5)
		.setStroke(0x000000, 5);

		this.add.text(175, 250, 'You have beaten level 2.\n\nThe next level will have smaller platforms.', { color: '#ffffff', fontSize: 18 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setWordWrapWidth(200);

		let nextlevel = this.add.text(170, 360, 'Next Level', { color: '#ffffff', fontSize: 32 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => nextlevel.setColor('#00cf00'))
			.on('pointerout', () => nextlevel.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 3');
				});
			});
	}
}

class Victory3 extends Phaser.Scene {
	constructor() {
        super('victory 3');
    }
	
	create() {
		this.cameras.main.setBackgroundColor('#000000');

		this.add.text(175, 140, 'Congratulations!', { color: '#ffffff', fontSize: 32 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5);

		this.add.text(175, 220, 'You have beaten Vampire Jumper! Which level would you like to replay?', { color: '#ffffff', fontSize: 18 })
			.setOrigin(0.5, 0.5)
			.setAlign('center')
			.setStroke(0x000000, 5)
			.setWordWrapWidth(300);

		let level1 = this.add.text(170, 320, 'Level 1', { color: '#ffffff', fontSize: 32 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => level1.setColor('#00cf00'))
			.on('pointerout', () => level1.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 1');
				});
			});

		let level2 = this.add.text(170, 380, 'Level 2', { color: '#ffffff', fontSize: 32 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => level2.setColor('#00cf00'))
			.on('pointerout', () => level2.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 2');
				});
			});

		let level3 = this.add.text(170, 440, 'Level 3', { color: '#ffffff', fontSize: 32 })
			.setOrigin(0.5, 0.5)
			.setStroke(0x000000, 5)
			.setInteractive()
			.on('pointerover', () => level3.setColor('#00cf00'))
			.on('pointerout', () => level3.setColor('#ffffff'))
			.on('pointerdown', () => {
				this.cameras.main.fadeOut(500, 0,0,0);
				this.time.delayedCall(500, () => {
					this.scene.start('scene 3');
				});
			});
	}
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 350,
        height: 575
    },
    physics: {
        default: 'arcade',
        arcade: { 
            //debug: true ,
            gravity: {
                y: 200
            },
        },
    },
    backgroundColor: 0x656565,
    scene: [Scene1, GameOver1, Victory1, Scene2, GameOver2, Victory2, Scene3, GameOver3, Victory3],
    title: "Vampire Jumper",
});