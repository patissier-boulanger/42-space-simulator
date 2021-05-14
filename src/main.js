import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import * as dat from "dat.gui";

import { createStars } from "./meshs/stars";
import { createPlanet } from "./meshs/planet";
import { createGalaxy } from "./meshs/galaxy";
import { createObject } from "./meshs/object";
import { createAsteroid } from "./meshs/asteroid";

import { moveGroupAlongPath } from "./controller/meshController";

import { useHelpers } from "./utils/helpers";
import { loadAllModel } from "./utils/loaders";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

useHelpers(scene);

const gui = new dat.GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const orbitMaterial = new THREE.MeshToonMaterial({
  color: "white",
  side: THREE.BackSide,
});

const main = async () => {
  //async load
  const [
    starTexture,
    polymapTexture,
    whaleModel,
    cubeMapModel,
    sunModel,
    earthModel,
    saturnModel,
    jupiterModel,
    uranusModel,
    neptuneModel,
    mecuryModel,
    plutoModel,
    marsModel,
    venusModel,
    spaceShipModel,
    cloudModel,
    astronautModel,
  ] = await loadAllModel();

  //Create solarSystem
  const sun = createPlanet(scene, sunModel);
  sun.setShadow();
  sun.setScale(250000);
  sun.setPosition(0, 0, 0, 0);
  sun.setOutLine(orbitMaterial, 1.01);
  sun.realize();

  const mercury = createPlanet(scene, mecuryModel);
  mercury.realize();
  mercury.setShadow();
  mercury.setScale(800000);
  mercury.setOutLine(orbitMaterial, 1.01);
  mercury.setOrbit(200000, 50, 300, "indianred", Math.PI / 2 - 0.15);

  const venus = createPlanet(scene, venusModel);
  venus.realize();
  venus.setShadow();
  venus.setScale(1000000);
  venus.setOutLine(orbitMaterial, 1.01);
  venus.setOrbit(260000, 50, 300, "indianred", Math.PI / 2);

  const earth = createPlanet(scene, earthModel);
  earth.realize();
  earth.setShadow();
  earth.setScale(1000000);
  earth.setOutLine(orbitMaterial, 1.01);
  earth.setOrbit(380000, 50, 300, "indianred", Math.PI / 2);

  const mars = createPlanet(scene, marsModel);
  mars.realize();
  mars.setShadow();
  mars.setScale(1000000);
  mars.setOutLine(orbitMaterial, 1.01);
  mars.setOrbit(500000, 150, 300, "indianred", Math.PI / 2);

  const jupiter = createPlanet(scene, jupiterModel);
  jupiter.realize();
  jupiter.setShadow();
  jupiter.setScale(800000);
  jupiter.setOutLine(orbitMaterial, 1.01);
  jupiter.setOrbit(600000, 150, 300, "indianred", Math.PI / 2);

  const saturn = createPlanet(scene, saturnModel);
  saturn.realize();
  saturn.setShadow();
  saturn.setScale(800000);
  saturn.setOutLine(orbitMaterial, 1.01);
  saturn.setOrbit(700000, 150, 300, "indianred", Math.PI / 2);

  const uranus = createPlanet(scene, uranusModel);
  uranus.realize();
  uranus.setShadow();
  uranus.setScale(800000);
  uranus.setOutLine(orbitMaterial, 1.01);
  uranus.setOrbit(500000, 150, 300, "indianred", Math.PI / 2);

  const neptune = createPlanet(scene, neptuneModel);
  neptune.realize();
  neptune.setShadow();
  neptune.setScale(800000);
  neptune.setOutLine(orbitMaterial, 1.01);
  neptune.setOrbit(600000, 150, 300, "indianred", Math.PI / 2);

  const pluto = createPlanet(scene, plutoModel);
  pluto.realize();
  pluto.setShadow();
  pluto.setScale(1000000);
  pluto.setOutLine(orbitMaterial, 1.01);
  pluto.setOrbit(800000, 100, 300, "indianred", Math.PI / 2 - 50);

  createStars({
    scene,
    texture: starTexture,
    count: 80000,
    diffusionRate: 6000000,
    size: 2000,
  });

  const galaxy = createGalaxy(
    scene,
    600,
    50,
    15,
    6,
    0.18,
    0.2,
    3,
    "indianred",
    "#ff6030",
  );
  galaxy.realize();
  galaxy.setPosition(600000, 70000, 0);
  galaxy.setScale(3000, 3000, 3000);
  galaxy.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);

  const galaxy2 = createGalaxy(
    scene,
    4000,
    40,
    150,
    5,
    0.2,
    0.2,
    3,
    "indianred",
    "indianred",
  );
  galaxy2.realize();
  galaxy2.setPosition(-5000000, 0, -20000);
  galaxy2.setScale(3000, 3000, 3000);
  galaxy2.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);

  const galaxy3 = createGalaxy(
    scene,
    100000,
    1600,
    15,
    6,
    1.2,
    1.2,
    3,
    "#f79320",
    "#85301b",
  );
  galaxy3.realize();
  galaxy3.setPosition(1000000, -700000, -100000);
  galaxy3.setScale(30000, 30000, 30000);
  galaxy3.setRotation(Math.PI / 3, 0, Math.PI / 3);

  //create object
  const astronaut = createObject(scene, astronautModel.scene);
  astronaut.realize();
  astronaut.setScale(100, 100, 100);
  astronaut.setPosition(190000, 30000, 0);
  astronaut.setShadow();

  const whale = createObject(scene, whaleModel);
  whale.realize();
  whale.setScale(1300, 1300, 1300);
  whale.setPosition(10000, 1200000, 0);
  whale.setShadow();
  whale.animate(0);

  const spaceShip = createObject(scene, spaceShipModel.scene);
  spaceShip.realize();
  spaceShip.setScale(3000, 3000, 3000);
  spaceShip.setPosition(180000, 30000, 0);
  spaceShip.setShadow();
  spaceShip.model.rotation.x = -Math.PI / 2;

  const cloudGroup = new THREE.Group();
  scene.add(cloudGroup);

  const cloud = createObject(scene, cloudModel.scene.children[0].clone());
  cloud.realize();
  cloud.setScale(20, 20, 20);
  cloud.setPosition(0, 0, 0);
  cloud.setShadow();
  cloudGroup.add(cloud.model);

  const cloud2 = createObject(scene, cloudModel.scene.children[0].clone());
  cloud2.realize();
  cloud2.setScale(50, 50, 50);
  cloud2.setPosition(0, 10000, 0);
  cloud2.setShadow();
  cloudGroup.add(cloud2.model);

  const cloud3 = createObject(scene, cloudModel.scene.children[0].clone());
  cloud3.realize();
  cloud3.setScale(40, 40, 40);
  cloud3.setPosition(15000, 15000, 15000);
  cloud3.setShadow();
  cloudGroup.add(cloud3.model);

  const asteroidGroup = new THREE.Group();
  scene.add(asteroidGroup);

  const asteroids = createAsteroid(
    asteroidGroup,
    50,
    100000,
    200000,
    100000,
    30000,
    10000,
    30000,
    100,
    1000,
  );
  asteroids.setPosition(0, 300000, 0);

  const asteroidGroup2 = new THREE.Group();
  scene.add(asteroidGroup2);

  const asteroids2 = createAsteroid(
    asteroidGroup2,
    25,
    400000,
    800000,
    10000,
    30000,
    100000,
    300000,
    200,
    2000,
  );
  asteroids2.setPosition(-800000, -600000, 900000);

  const asteroidGroup3 = new THREE.Group();
  scene.add(asteroidGroup3);

  const asteroids3 = createAsteroid(
    asteroidGroup3,
    20,
    400000,
    1000000,
    500000,
    1000000,
    100000,
    300000,
    400,
    8000,
  );
  asteroids3.setPosition(-4000000, -600000, 400000);

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight("white", 0.324);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight("indianred", 4, 6000000);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);

  sunLight.position.set(1, 1, 1);
  scene.add(sunLight);

  const sphereSize = 2000;
  const pointLightHelper = new THREE.PointLightHelper(sunLight, sphereSize);
  scene.add(pointLightHelper);

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
  });

  /**
   * Camera
   */
  // Base camera
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   sizes.width / sizes.height,
  //   1000,
  //   20000000000000,
  // );
  // camera.position.set(0, 200, 10000);
  // scene.add(camera);

  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    1000,
    20000000000000,
  );
  scene.add(camera);
  camera.position.set(190000, 30000, 0);
  camera.lookAt(scene.position);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 10));
  renderer.setClearColor(new THREE.Color("#030303"));

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.6;

  const rt = new THREE.WebGLCubeRenderTarget(polymapTexture.image.height);
  rt.fromEquirectangularTexture(renderer, polymapTexture);
  // scene.background = rt.texture;
  // scene.background = cubeMapModel;

  /**
   * Post Processing
   */
  const effectComposer = new EffectComposer(renderer);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  effectComposer.setSize(sizes.width, sizes.height);

  const dotScreenPass = new DotScreenPass();
  const unrealBloomPass = new UnrealBloomPass();
  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);
  // effectComposer.addPass(dotScreenPass);
  effectComposer.addPass(unrealBloomPass);

  unrealBloomPass.strength = 0.819;
  unrealBloomPass.radius = 0.191;
  unrealBloomPass.threshold = 0.6;

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (whale.animationMixer) {
      whale.animationMixer.update(deltaTime / 10);
    }
    whale.rotate(0.0001, "y");

    spaceShip.rotate(0.005, "z");

    moveGroupAlongPath(
      cloudGroup,
      [
        new THREE.Vector3(-1000000, 150000, -1000000),
        new THREE.Vector3(1000000, 150000, 1000000),
        new THREE.Vector3(-1000000, 150000, -1000000),
      ],
      0.0001,
    );

    sun.rotate(0.0001);

    mercury.revolve(elapsedTime, 0.03, 20, 200000, 1300);
    mercury.rotate(0.003);

    venus.revolve(elapsedTime, 0.03, 42, 260000, 0);
    venus.rotate(0.003);

    earth.revolve(elapsedTime, 0.03, 23, 380000, 0);
    earth.rotate(0.003);

    mars.revolve(elapsedTime, 0.03, 53, 500000, 0);
    mars.rotate(0.003);

    jupiter.revolve(elapsedTime, 0.03, 13, 600000, 0);
    jupiter.rotate(0.003);

    saturn.revolve(elapsedTime, 0.03, 23, 700000, 0);
    saturn.rotate(0.003);

    uranus.revolve(elapsedTime, 0.03, 62, 500000, 0);
    uranus.rotate(0.003);

    neptune.revolve(elapsedTime, 0.03, 53, 600000, 0);
    neptune.rotate(0.003);

    pluto.revolve(elapsedTime, 0.08, 73, 800000, -20000);
    pluto.rotate(0.003);

    // Update controls
    controls.update();

    // Post processing Render
    effectComposer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  /**
   * Gui
   */

  const sunlightFolder = gui.addFolder("sunlight");
  sunlightFolder.add(sunLight, "intensity").min(0).max(100).step(1);

  const ambientLightFolder = gui.addFolder("ambientLight");
  ambientLightFolder.add(ambientLight, "intensity").min(0).max(1).step(0.001);

  gui.add(unrealBloomPass, "enabled");
  gui.add(unrealBloomPass, "strength").min(0).max(2).step(0.001);
  gui.add(unrealBloomPass, "radius").min(0).max(2).step(0.001);
  gui.add(unrealBloomPass, "threshold").min(0).max(1).step(0.001);
};

main();
