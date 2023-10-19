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

    this.createImageButton(250, 50, "kbb", () => {
      this.player.bustShot.init(
        this.player.lastDirection,
        this.player.x,
        this.player.y
      );
      this.player2.bustShot.init(
        this.player2.lastDirection,
        this.player2.x,
        this.player2.y
      );
      this.player3.bustShot.init(
        this.player3.lastDirection,
        this.player3.x,
        this.player3.y
      );
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
      this.cameras.main.zoomTo(3, 1000);
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

  update() {
    this.clearZoomIfOnZoom();
  }

  clearZoomIfOnZoom() {
    if (this.zoomOnPlayer) {
      this.input.on("pointerdown", (pointer) => {
        this.cameras.main.pan(this.gameWidth / 2, this.gameHeight / 2, 3000);
        this.cameras.main.zoomTo(1, 3000);
        this.zoomOnPlayer = false;
      });
    }
  }
}

export default GameScene;
