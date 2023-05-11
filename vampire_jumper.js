class Scene1 extends Phaser.Scene {
    
    constructor() {
        super('scene 1');
    }

    preload() {
        this.load.image('vampire', 'assets/Vampire.png');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.w = this.scale.width;
        this.h = this.scale.height;

        let ground = this.add.rectangle(0, this.h * 0.95, this.w, this.h * 0.051, 0x989898).setOrigin(0, 0);
        this.ground = this.physics.add.existing(ground, true);
        console.log(this.ground);

        this.player = this.physics.add.sprite(this.w * 0.5, this.h * 0.78, 'vampire').setScale(this.w * 0.0005);
        this.player.setVelocityY(100);
        this.cameraFollowing = false;
		this.cameras.main.setDeadzone(this.w * 1.5);
        this.player.body.checkCollision.up = false
		this.player.body.checkCollision.left = false
		this.player.body.checkCollision.right = false

        this.physics.add.collider(this.ground, this.player);
    }

    update() {
        const touchingDown = this.player.body.touching.down;
        //console.log(this.player.body.touching);

		if (touchingDown)
		{
			this.player.setVelocityY(-200);
		}
        else if (this.player.y < this.h * 0.6) {
            this.player.setVelocityY(0);
        }

        if (this.player.y < this.h * 0.1 && !this.cameraFollowing) {
            this.cameras.main.startFollow(this.player, false, 1, 1, 0, this.h * 0.35);
            this.cameraFollowing = true;
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
            debug: true ,
            gravity: {
                y: 200
            },
        },
    },
    backgroundColor: 0x656565,
    scene: [Scene1],
    title: "Vampire Jumper",
});