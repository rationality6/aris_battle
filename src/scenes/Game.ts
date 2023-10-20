import PhaserSceneTool from "./PhaserSceneTool";
import Aris from "./entities/aris";

class GameScene extends PhaserSceneTool {
  player: any;
  zoomOnPlayer: boolean = false;

  bg: any;

  constructor() {
    super("GameScene");
  }

  create() {
    this.setAnimation();

    // this.bg = this.add
    //   .tileSprite(0, 0, 600, 800, "bgClouds")
    //   .setOrigin(0, 0)
    //   .setScale(3);
    // this.bgMountains = this.add
    //   .tileSprite(0, 0, 600, 800, "bgMountains")
    //   .setOrigin(0, 0)
    //   .setScale(3);
    // this.bgTrees = this.add
    //   .tileSprite(0, 0, 600, 800, "bgTrees")
    //   .setOrigin(0, 0)
    //   .setScale(3);

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
      this.sound.play("toFather");
    });

    this.createImageButton(100, 50, "kbb", () => {
      this.sound.play("peace");
    });

    this.createImageButton(150, 50, "kbb", () => {
      this.sound.play("blasphemy");
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
      this.gotHitEffect();
    });

    this.createImageButton(400, 50, "kbb", async () => {
      if (this.player.middleOfAction) {
        return;
      }

      this.sound.play("swosh_sound1");

      const slashEffect0 = this.add.sprite(
        this.player.x,
        this.player.y,
        "slashEffect"
      );
      slashEffect0.play("slashEffect").setScale(2);

      this.player.middleOfAction = true;
      const defaultX = this.player.x;
      this.player.alpha = 0.7;

      this.player.x = defaultX + 20;
      await this.setDelay(100);
      this.player.x = defaultX - 20;
      await this.setDelay(100);
      this.player.x = defaultX + 20;
      await this.setDelay(100);
      this.player.x = defaultX - 20;
      await this.setDelay(100);
      this.player.x = defaultX;
      await this.setDelay(100);

      slashEffect0.destroy();

      this.player.alpha = 1;
      this.player.middleOfAction = false;
    });

    this.createImageButton(450, 50, "kbb", () => {
      this.drawCircleEffect();
    });
  }

  async basicAttack() {
    if (this.player.middleOfAction) {
      return;
    }

    this.sound.play("swosh_sound1");

    const slashEffect0 = this.add.sprite(
      this.player.x + 300,
      this.player.y,
      "slashEffect"
    );
    slashEffect0.setAngle(225);
    slashEffect0.play("slashEffect").setScale(3);

    this.player.middleOfAction = true;

    await this.setDelay(500);
    slashEffect0.destroy();

    this.player.alpha = 1;
    this.player.middleOfAction = false;
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

    this.anims.create({
      key: "slashEffect",
      frames: this.anims.generateFrameNumbers("slashEffect", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }

  async drawCircleEffect() {
    const circle = new Phaser.Geom.Circle(250, 300, 280);

    const graphics = this.add.graphics({ fillStyle: { color: 0xa9fbe0 } });
    graphics.fillCircleShape(circle);
    graphics.setDepth(-1)
    await this.setDelay(500);
    graphics.fillStyle(0x31f6ff);

    // const graphics2 = this.add.graphics({ fillStyle: { color: 0x31f6ff } });
    // graphics2.fillCircleShape(circle);

    let circle2 = this.add.circle(350, 350, 280, 0x31f6ff, 0.5).setDepth(-1);
    await this.setDelay(500);
    circle2.fillColor = 0xff0000;
  }

  update() {
    // this.bg.tilePositionX += 0.01;
    // this.bgMountains.tilePositionX += 0.1;
    // this.bgTrees.tilePositionX += 0.2;
  }
}

export default GameScene;
