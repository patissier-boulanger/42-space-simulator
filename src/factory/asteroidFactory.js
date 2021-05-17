import * as THREE from "three";

import { Asteroid } from "../objects/asteroid";

class AsteroidFactory {
  constructor(scene) {
    this.scene = scene;
  }

  realize() {
    const smallAsteroids = new THREE.Group();
    const smallAsteroidFields = new Asteroid(
      smallAsteroids,
      this.scene,
      70,
      100000,
      200000,
      100000,
      30000,
      10000,
      30000,
      100,
      1000,
    );
    this.scene.add(smallAsteroidFields.model);
    console.log(smallAsteroidFields.model);
    // smallAsteroidFields.model.setPosition(0, 400000, 0);
  }
}

export { AsteroidFactory };
