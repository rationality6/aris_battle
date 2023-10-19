class BustShot extends Phaser.Physics.Arcade.Sprite {
  lastDirection: number;
  effectName: string;
  player: any;

  constructor(scene, player) {
    super(scene, 0, 0, "bustShot");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.player = player

    this.effectName = "bustShot";

    this.setAngle(90);
    this.setScale(4);

    this.setVisible(false)

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  async init(lastDirection, x, y) {
    this.lastDirection = lastDirection;
    this.player.middleOfAction = true;

    this.scene.sound.play("super");

    this.x = x;
    this.y = y;

    if (this.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipY(false);
      this.x += 265;
    } else {
      this.setFlipY(true);
      this.x -= 265;
    }
    this.y -= 11;

    await this.scene.setDelay(2100);

    this.activateProjectile(true);
    
    this.play("bustShot");

    this.on(
      "animationcomplete",
      (animation) => {
        if (animation.key === this.effectName) {
          this.activateProjectile(false);
          this.player.middleOfAction = false;
        }
      },
      this
    );
  }

  activateProjectile(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

  update() {
    this.y = this.player.y;
  }
}

export default BustShot;
