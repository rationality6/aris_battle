import DashDust from "./DashDust";

class DashDusts extends Phaser.Physics.Arcade.Group {
  player: Phaser.Physics.Arcade.Sprite;
  
  constructor(scene, player) {
    super(scene.physics.world, scene);

    this.player = player

    this.createMultiple({
      frameQuantity: 1,
      active: false,
      visible: false,
      key: "dashDust",
      classType: DashDust,
    });
  }

  dash(lastDirection) {
    const dashDust = this.getFirstDead(false);

    if (!dashDust) {
      return;
    }

    dashDust.init(lastDirection, this.player.x, this.player.y)
  }
}

export default DashDusts;
