import { Galaxy } from "../objects/galaxy";

class GalaxyFactory {
  constructor(scene) {
    this.scene = scene;
  }

  realize() {
    const smallGalaxy = new Galaxy(
      this.scene,
      1500,
      100,
      2045,
      6,
      0.18,
      0.2,
      3,
      "indianred",
      "#ff6030",
    );
    smallGalaxy.create();
    smallGalaxy.setPosition(10800000, -5700000, 0);
    smallGalaxy.setScale(600, 600, 600);
    smallGalaxy.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);
    smallGalaxy.addToScene();

    const mediumGalaxy = new Galaxy(
      this.scene,
      20000,
      4,
      5005,
      6,
      5.2,
      0.2,
      1,
      "indianred",
      "indianred",
    );
    mediumGalaxy.create();
    mediumGalaxy.setPosition(-500, 10470000, -2000000);
    mediumGalaxy.setScale(300, 300, 300);
    mediumGalaxy.setRotation(Math.PI / 2.5, Math.PI / 2.5, Math.PI / 2.5);
    mediumGalaxy.addToScene();

    const grandGalaxy = new Galaxy(
      this.scene,
      20000,
      52,
      850,
      6,
      2.2,
      1.2,
      3,
      "#f79320",
      "#85301b",
    );
    grandGalaxy.create();
    grandGalaxy.setPosition(-680000, 670000, -10000);
    grandGalaxy.setScale(400, 400, 400);
    grandGalaxy.setRotation(Math.PI / 3, 0, Math.PI / 3);
    grandGalaxy.addToScene();
  }
}

export { GalaxyFactory };
