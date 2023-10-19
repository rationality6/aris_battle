import PhaserSceneTool from "./PhaserSceneTool";
import Aris from "./entities/aris";

class GameScene extends PhaserSceneTool {
  player: any;
  zoomOnPlayer: boolean = false;

  constructor() {
    super("GameScene");
  }

  create() {
    this.setAnimation();

    this.player = new Aris(this, this.gameWidth / 2, this.gameHeight / 2);

    this.player2 = new Aris(
      this,
      this.gameWidth / 2 - 200,
      this.gameHeight / 2 - 100
    );

    this.player3 = new Aris(
      this,
      this.gameWidth / 2 + 200,
      this.gameHeight / 2 + 100
    );

    this.player2.setTint(0xff0000);
    this.player3.setTint(0x00ff00);

    this.createImageButton(50, 50, "kbb", () => {
      this.sound.play("peace");
    });

    this.createImageButton(100, 50, "kbb", () => {
      this.sound.play("tooMany");
    });

    this.createImageButton(300, 50, "kbb", () => {
      if (this.zoomOnPlayer) {
        return;
      }

      this.sound.play("fireball");

      this.player.bustShot.init(
        this.player.lastDirection,
        this.player.x,
        this.player.y
      );

      this.zoomOnPlayer = true;
      this.cameras.main.pan(this.player.x, this.player.y, 1000);
      this.cameras.main.zoomTo(2, 1000);
    });

    this.createImageButton(350, 50, "kbb", () => {
      this.gotHitEffect()
    });

    this.createImageButton(this.gameWidth - 30, 50, "kbb", () => {
      this.player3.setTint(0x00ff00);
    });
    this.createImageButton(this.gameWidth - 30, 110, "kbb", () => {
      this.player3.setTint(0x0000ff, 0x00ff00);
    });
    this.createImageButton(this.gameWidth - 30, 170, "kbb", () => {
      this.player3.setTint(0x0000ff);
    });
    this.createImageButton(this.gameWidth - 30, 230, "kbb", () => {
      this.player3.setTint(0xff0000);
    });
    this.createImageButton(this.gameWidth - 30, 290, "kbb", () => {
      this.player3.setTint(0xff0000, 0xff00ff, 0x00ff00);
    });
    this.createImageButton(this.gameWidth - 30, 350, "kbb", () => {
      this.player3.clearTint();
    });
  }

  createImageButton(x, y, key, callback) {
    let imageButton = this.add.image(x, y, key).setScale(0.05).setInteractive();

    imageButton.on("pointerdown", (pointer) => {
      callback();
    });
  }

  async gotHitEffect() {
    this.cameras.main.shake(700, 0.007);
    this.sound.play("hit");
    this.sound.play("yell");
    this.player.setTint(0xff0000);
    await this.setDelay(100);
    this.player.clearTint();
    await this.setDelay(100);
    this.player.setTint(0xff0000);
    await this.setDelay(100);
    this.player.clearTint();
  }

  setAnimation() {
    this.anims.create({
      key: "dashDust",
      frames: this.anims.generateFrameNumbers("dashDust", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "bustShot",
      frames: this.anims.generateFrameNumbers("bustShot", {
        start: 1,
        end: 15,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }

  update() {}
}

export default GameScene;
