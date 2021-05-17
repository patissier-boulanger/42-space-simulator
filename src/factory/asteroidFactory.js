import * as THREE from "three";
import { createAsteroid } from "../objects/asteroid";

class AsteroidFactory {
  constructor(scene) {
    this.scene = scene;
  }

  realize() {
    const smallAsteroidGroup = new THREE.Group();
    const smallAsteroidField = createAsteroid(
      smallAsteroidGroup,
      70,
      10000,
      2000000,
      1000,
      300000,
      1000,
      300000,
      10,
      3000,
    );
    this.scene.add(smallAsteroidField.group);
    smallAsteroidField.setPosition(0, 1400000, 0);

    const mediumAsteroidGroup = new THREE.Group();
    const mediumAsteroidField = createAsteroid(
      mediumAsteroidGroup,
      45,
      40000,
      800000,
      10000,
      500000,
      100000,
      700000,
      20,
      3000,
    );
    this.scene.add(mediumAsteroidField.group);
    mediumAsteroidField.setPosition(-2500000, -500000, 900000);

    const largeAsteroidGroup = new THREE.Group();
    const largeAsteroidField = createAsteroid(
      largeAsteroidGroup,
      20,
      4000,
      1000000,
      5000,
      1000000,
      1000,
      300000,
      40,
      8000,
    );
    this.scene.add(largeAsteroidField.group);
    largeAsteroidField.setPosition(-6000000, -1200000, 200000);

    const largeAsteroidGroup2 = new THREE.Group();
    const largeAsteroidField2 = createAsteroid(
      largeAsteroidGroup2,
      20,
      4000,
      1000000,
      5000,
      1000000,
      1000,
      300000,
      40,
      8000,
    );
    this.scene.add(largeAsteroidField2.group);
    largeAsteroidField2.setPosition(6000000, -1200000, -200000);

    const mediumAsteroidGroup2 = new THREE.Group();
    const mediumAsteroidField2 = createAsteroid(
      mediumAsteroidGroup2,
      30,
      1000,
      1000000,
      5000,
      1000000,
      1000,
      300000,
      40,
      5000,
    );
    mediumAsteroidField2.setPosition(1600000, 1200000, 100000);
  }
}

export { AsteroidFactory };
