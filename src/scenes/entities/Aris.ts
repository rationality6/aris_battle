import DashDusts from "./DashDusts";

class Aris extends Phaser.Physics.Arcade.Sprite {
  private cursors: any;
  lastDirection: number = Phaser.Physics.Arcade.FACING_RIGHT;
  moveSpeed: number = 200;
  dashdusts: any;

  constructor(scene: any, x: number, y: number) {
    super(scene, x, y, "aris");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.4);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.dashdusts = new DashDusts(this.scene, this);

    this.scene.tweens.add({
      targets: this,
      y: this.y + 50,
      duration: 1300,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  update() {
    const { left, right, space, up } = this.cursors;
    const onFloorValue = this.body.onFloor();
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    if (left.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
      this.setVelocityX(-this.moveSpeed);
      this.setFlipX(true);
      this.dashdusts.dash(this.lastDirection);
    } else if (right.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
      this.setVelocityX(this.moveSpeed);
      this.setFlipX(false);
      this.dashdusts.dash(this.lastDirection);
    } else {
      this.setVelocityX(0);
    }
  }
}

export default Aris;
