import PhaserSceneTool from "./PhaserSceneTool";
import Aris from "./entities/aris";

class GameScene extends PhaserSceneTool {
  player: any;

  constructor() {
    super("GameScene");
  }

  create() {
    this.anims.create({
      key: "dashDust",
      frames: this.anims.generateFrameNumbers("dashDust", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.player = new Aris(this, this.gameWidth / 2, this.gameHeight / 2);
    let player2 = new Aris(
      this,
      this.gameWidth / 2 - 200,
      this.gameHeight / 2 - 100
    );
    let player3 = new Aris(
      this,
      this.gameWidth / 2 + 200,
      this.gameHeight / 2 + 100
    );

    let buttonSound = this.add
      .image(50, 50, "kbb")
      .setScale(0.05)
      .setInteractive();

    buttonSound.on("pointerdown", (pointer) => {
      this.sound.play("peace");
    });

    let buttonSound2 = this.add
      .image(100, 50, "kbb")
      .setScale(0.05)
      .setInteractive();

    buttonSound2.on("pointerdown", (pointer) => {
      this.sound.play("super");
    });

    let buttonSound3 = this.add
      .image(150, 50, "kbb")
      .setScale(0.05)
      .setInteractive();

    buttonSound3.on("pointerdown", (pointer) => {
      this.sound.play("tooMany");
    });
  }
  actionOnClick() {
    console.log("click");
  }

  update() {}
}

export default GameScene;
