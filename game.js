const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let buildings;
let cursors;
let gameOver = false;
let score = 0;
let scoreText;

function preload() {
    // Load images or assets here if needed
    // this.load.image('player', 'path_to_player_image.png');
    // this.load.image('building', 'path_to_building_image.png');
}

function create() {
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    buildings = this.physics.add.group({
        key: 'building',
        repeat: 5,
        setXY: { x: 400, y: 500, stepX: 200 }
    });

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, buildings, hitBuilding, null, this);
}

function update() {
    if (gameOver) {
        return;
    }

    if (cursors.space.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

    buildings.children.iterate(function (building) {
        if (building.x < -building.width) {
            building.x = game.config.width + building.width;
            score += 10;
            scoreText.setText('Score: ' + score);
        } else {
            building.x -= 2;
        }
    });
}

function hitBuilding (player, building) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
    scoreText.setText('Game Over! Score: ' + score);
}
