import { Planet } from "../objects/planet";

class PlanetFactory {
  constructor(scene, modelStorage) {
    this.scene = scene;
    this.modelStorage = modelStorage;
    this.planets = [];
  }

  realize() {
    const sun = new Planet(
      this.scene,
      this.modelStorage.sunModel,
      0,
      0,
      0.0001,
      0,
      0,
    );
    sun.setShadow();
    sun.setScale(700000);
    sun.addToScene();

    const mercury = new Planet(
      this.scene,
      this.modelStorage.mecuryModel,
      20,
      0.007,
      0.0001,
      500000 + 600000,
      10,
    );
    mercury.setShadow();
    mercury.setScale(500000 + 6000000);
    mercury.setOrbit(
      500000 + 600000,
      150,
      300,
      "indianred",
      Math.PI / 2 - 0.15,
    );
    mercury.addToScene();

    const venus = new Planet(
      this.scene,
      this.modelStorage.venusModel,
      42,
      0.007,
      0.0001,
      500000 + 800000,
      10,
    );
    venus.setShadow();
    venus.setScale(500000 + 6000000);
    venus.setOrbit(500000 + 800000, 150, 300, "indianred", Math.PI / 2);
    venus.addToScene();

    const earth = new Planet(
      this.scene,
      this.modelStorage.earthModel,
      32,
      0.007,
      0.0001,
      500000 + 1200000,
      10,
    );
    earth.setShadow();
    earth.setScale(500000 + 8000000);
    earth.setOrbit(500000 + 1200000, 150, 300, "indianred", Math.PI / 2);
    earth.addToScene();

    const mars = new Planet(
      this.scene,
      this.modelStorage.marsModel,
      52,
      0.007,
      0.0001,
      500000 + 1600000,
      10,
    );
    mars.setShadow();
    mars.setScale(500000 + 8000000);
    mars.setOrbit(500000 + 1600000, 150, 300, "indianred", Math.PI / 2);
    mars.addToScene();

    const jupiter = new Planet(
      this.scene,
      this.modelStorage.jupiterModel,
      62,
      0.007,
      0.0001,
      500000 + 2200000,
      10,
    );
    jupiter.setShadow();
    jupiter.setScale(500000 + 5000000);
    jupiter.setOrbit(500000 + 2200000, 150, 300, "indianred", Math.PI / 2);
    jupiter.addToScene();

    const saturn = new Planet(
      this.scene,
      this.modelStorage.saturnModel,
      22,
      0.007,
      0.0001,
      500000 + 4800000,
      10,
    );
    saturn.setShadow();
    saturn.setScale(500000 + 5000000);
    saturn.setOrbit(500000 + 4800000, 150, 300, "indianred", Math.PI / 2);
    saturn.addToScene();

    const uranus = new Planet(
      this.scene,
      this.modelStorage.uranusModel,
      42,
      0.007,
      0.0001,
      500000 + 6800000,
      10,
    );
    uranus.setShadow();
    uranus.setScale(500000 + 5000000);
    uranus.setOrbit(500000 + 6800000, 150, 300, "indianred", Math.PI / 2);
    uranus.addToScene();

    const neptune = new Planet(
      this.scene,
      this.modelStorage.neptuneModel,
      62,
      0.007,
      0.0001,
      500000 + 8800000,
      10,
    );
    neptune.setShadow();
    neptune.setScale(500000 + 5000000);
    neptune.setOrbit(500000 + 8800000, 150, 300, "indianred", Math.PI / 2);
    neptune.addToScene();

    const pluto = new Planet(
      this.scene,
      this.modelStorage.plutoModel,
      22,
      0.007,
      0.0001,
      500000 + 10800000,
      -50,
    );
    pluto.setShadow();
    pluto.setScale(500000 + 8000000);
    pluto.setOrbit(500000 + 10800000, 150, 300, "indianred", Math.PI / 2 - 50);
    pluto.addToScene();

    this.planets.push(sun);
    this.planets.push(mercury);
    this.planets.push(venus);
    this.planets.push(earth);
    this.planets.push(mars);
    this.planets.push(jupiter);
    this.planets.push(saturn);
    this.planets.push(uranus);
    this.planets.push(neptune);
    this.planets.push(pluto);
  }
}

export { PlanetFactory };
