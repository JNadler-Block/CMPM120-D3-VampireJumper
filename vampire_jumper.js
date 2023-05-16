class Scene1 extends Phaser.Scene {
    
    constructor() {
        super('scene 1');
    }

	init() {
		this.score = 0;
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
			const x = Phaser.Math.Between(80, 280);
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

		this.scoreText = this.add.text(70, 10, 'Score: 0', { color: '#000', fontSize: 24 })
			.setScrollFactor(0)
			.setOrigin(0.5, 0);
    }

    update() {
        this.platforms.children.iterate(child => {
			const platform = child;

			const scrollY = this.cameras.main.scrollY;
			if (platform.y >= scrollY + 700)
			{
				platform.y = scrollY - Phaser.Math.Between(50, 100);
				platform.body.updateFromGameObject();
			}
		})
        
        const touchingDown = this.player.body.touching.down;

		if (touchingDown)
		{
			this.player.setVelocityY(-300);
			if (this.ty > this.player.y + 50 || this.ty < this.player.y - 50) {
				this.ty = this.player.y;
				this.score++;
				this.scoreText.text = `Score: ${this.score}`;
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
		if (this.player.y > bottomPlatform.y + 200)
		{
			//this.scene.start('game-over');
            console.log("Game over");
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

const game = new Phaser.Game({
    scale: {
        //mode: Phaser.Scale.FIT,
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
    scene: [Scene1],
    title: "Vampire Jumper",
});