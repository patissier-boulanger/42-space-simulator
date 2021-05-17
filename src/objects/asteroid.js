import * as THREE from "three";

import { generateRandomNumber } from "../utils/randomNumberGenerator";
import { Object } from "../objects/object2";

class Asteroid extends Object {
  constructor(
    AsteroidField,
    scene,
    count,
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
    minScale,
    maxScale,
  ) {
    super();
    this.model = AsteroidField;
    this.scene = scene;
    this.count = count;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.minZ = minZ;
    this.maxZ = maxZ;
    this.minScale = minScale;
    this.maxScale = maxScale;
  }

  create() {
    for (let i = 0; i < this.count; i++) {
      const x = generateRandomNumber(this.minX, this.maxX); // Get the x position using cosinus
      const z = generateRandomNumber(this.minY, this.maxY); // Get the z position using sinus
      const y = generateRandomNumber(this.minZ, this.maxZ);

      const asteroidGeometry = new THREE.DodecahedronGeometry(2, 0);
      const asteroidMaterial = new THREE.MeshStandardMaterial({
        color: "#b2b6b1",
      });

      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

      asteroid.castShadow = true;
      asteroid.receiveShadow = true;

      asteroid.scale.set(
        generateRandomNumber(this.minScale, this.maxScale),
        generateRandomNumber(this.minScale, this.maxScale),
        generateRandomNumber(this.minScale, this.maxScale),
      );

      asteroid.position.set(x, y, z);

      asteroid.rotation.z = (Math.random() - 0.5) * 0.5;
      asteroid.rotation.y = (Math.random() - 0.5) * 0.5;

      this.model.add(asteroid);
    }
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const createAsteroid = (
  group,
  count,
  minX,
  maxX,
  minY,
  maxY,
  minZ,
  maxZ,
  minScale,
  maxScale,
) => {
  for (let i = 0; i < count; i++) {
    const x = getRandomArbitrary(minX, maxX); // Get the x position using cosinus
    const z = getRandomArbitrary(minY, maxY); // Get the z position using sinus
    const y = getRandomArbitrary(minZ, maxZ);

    const asteroidGeometry = new THREE.DodecahedronGeometry(2, 0);
    const asteroidMaterial = new THREE.MeshStandardMaterial({
      color: "#b2b6b1",
    });

    const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

    asteroid.castShadow = true;
    asteroid.receiveShadow = true;

    asteroid.scale.set(
      getRandomArbitrary(minScale, maxScale),
      getRandomArbitrary(minScale, maxScale),
      getRandomArbitrary(minScale, maxScale),
    );

    asteroid.position.set(x, y, z);

    asteroid.rotation.z = (Math.random() - 0.5) * 0.5;
    asteroid.rotation.y = (Math.random() - 0.5) * 0.5;

    group.add(asteroid);
  }

  return {
    group,
    setPosition(x, y, z) {
      this.group.position.set(x, y, z);
    },
  };
};

export { createAsteroid, Asteroid };
