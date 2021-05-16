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
import { PointLockWithY } from "./controller/pointLockController";

import { useHelpers } from "./utils/helpers";
import { loadAllModel } from "./utils/loaders";

const main = async () => {
  /**
   * Base Setting
   */
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  const gui = new dat.GUI();
  useHelpers(scene);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const orbitMaterial = new THREE.MeshToonMaterial({
    color: "white",
    side: THREE.BackSide,
  });

  // async load
  const [
    starTexture,
    polymapTexture,
    whaleModel,
    cubeMapModel,
    sunModel,
    mecuryModel,
    venusModel,
    earthModel,
    marsModel,
    jupiterModel,
    saturnModel,
    uranusModel,
    neptuneModel,
    plutoModel,
    cloudModel,
    leftGloveModel,
    rightGloveModel,
    spaceStationModel,
    astronautModel,
  ] = await loadAllModel();

  /**
   * Solar System plantes
   */

  const baseMeter = 500000;

  const sun = createPlanet(scene, sunModel);
  sun.setShadow();
  sun.setScale(baseMeter);
  sun.setPosition(0, 0, 0, 0);
  sun.setOutLine(orbitMaterial, 1.005);
  sun.realize();

  const mercury = createPlanet(scene, mecuryModel);
  mercury.realize();
  mercury.setShadow();
  mercury.setPosition(0, 0, 0, 0);
  mercury.setScale(baseMeter + 6000000);
  mercury.setOrbit(
    baseMeter + 300000,
    150,
    300,
    "indianred",
    Math.PI / 2 - 0.15,
  );

  const venus = createPlanet(scene, venusModel);
  venus.realize();
  venus.setShadow();
  venus.setScale(baseMeter + 6000000);
  venus.setOrbit(baseMeter + 400000, 150, 300, "indianred", Math.PI / 2);

  const earth = createPlanet(scene, earthModel);
  earth.realize();
  earth.setShadow();
  earth.setScale(baseMeter + 6000000);
  earth.setOrbit(baseMeter + 650000, 150, 300, "indianred", Math.PI / 2);

  const mars = createPlanet(scene, marsModel);
  mars.realize();
  mars.setShadow();
  mars.setScale(baseMeter + 6000000);
  mars.setOrbit(baseMeter + 850000, 150, 300, "indianred", Math.PI / 2);

  const jupiter = createPlanet(scene, jupiterModel);
  jupiter.realize();
  jupiter.setShadow();
  jupiter.setScale(baseMeter + 2000000);
  jupiter.setOrbit(baseMeter + 1550000, 150, 300, "indianred", Math.PI / 2);

  const saturn = createPlanet(scene, saturnModel);
  saturn.realize();
  saturn.setShadow();
  saturn.setScale(baseMeter + 1000000);
  saturn.setOrbit(baseMeter + 2050000, 150, 300, "indianred", Math.PI / 2);

  const uranus = createPlanet(scene, uranusModel);
  uranus.realize();
  uranus.setShadow();
  uranus.setScale(baseMeter + 6000000);
  uranus.setOrbit(baseMeter + 2250000, 150, 300, "indianred", Math.PI / 2);

  const neptune = createPlanet(scene, neptuneModel);
  neptune.realize();
  neptune.setShadow();
  neptune.setScale(baseMeter + 6000000);
  neptune.setOrbit(baseMeter + 2450000, 150, 300, "indianred", Math.PI / 2);

  const pluto = createPlanet(scene, plutoModel);
  pluto.realize();
  pluto.setShadow();
  pluto.setScale(baseMeter + 6000000);
  pluto.setOrbit(baseMeter + 2650000, 10, 300, "indianred", Math.PI / 2 - 50);

  createStars({
    scene,
    texture: starTexture,
    count: 80000,
    diffusionRate: 6000000,
    size: 2000,
  });

  const galaxy = createGalaxy(
    scene,
    15000,
    100,
    2045,
    6,
    0.18,
    0.2,
    3,
    "indianred",
    "#ff6030",
  );
  galaxy.realize();
  galaxy.setPosition(6800000, -570000, 0);
  galaxy.setScale(600, 600, 600);
  galaxy.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);

  const galaxy2 = createGalaxy(
    scene,
    10000,
    4,
    1005,
    6,
    2.2,
    0.2,
    1,
    "indianred",
    "indianred",
  );
  galaxy2.realize();
  galaxy2.setPosition(-500, 3470000, -2000000);
  galaxy2.setScale(300, 300, 300);
  galaxy2.setRotation(Math.PI / 2.5, Math.PI / 2.5, Math.PI / 2.5);

  const galaxy3 = createGalaxy(
    scene,
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
  galaxy3.realize();
  galaxy3.setPosition(-680000, 670000, -10000);
  galaxy3.setScale(400, 400, 400);
  galaxy3.setRotation(Math.PI / 3, 0, Math.PI / 3);

  //create object
  const leftGlove = createObject(scene, leftGloveModel.scene);
  leftGlove.realize();
  leftGlove.setShadow();
  leftGlove.setScale(6);

  const rightGlove = createObject(scene, rightGloveModel.scene);
  rightGlove.realize();
  rightGlove.setShadow();
  rightGlove.setScale(28);

  const spaceStaion = createObject(scene, spaceStationModel.scene);
  spaceStaion.realize();
  spaceStaion.setShadow();
  spaceStaion.setScale(800);
  spaceStaion.setPosition(880000, 200000, 50000);

  const astronaut = createObject(scene, astronautModel.scene);
  astronaut.realize();
  astronaut.setShadow();
  astronaut.setScale(40);
  astronaut.setPosition(989000, 200000, 0);
  astronaut.model.rotation.x = 1;
  // astronaut.model.rotation.z = 2;

  // const whale = createObject(scene, whaleModel);
  // whale.realize();
  // whale.setScale(500, 500, 500);
  // whale.setPosition(10000, 600000, 0);
  // whale.setShadow();
  // whale.animate(0);

  // const cloudGroup = new THREE.Group();
  // scene.add(cloudGroup);

  // const cloud = createObject(scene, cloudModel.scene.children[0].clone());
  // cloud.realize();
  // cloud.setScale(20, 20, 20);
  // cloud.setPosition(0, 0, 0);
  // cloud.setShadow();
  // cloudGroup.add(cloud.model);

  // const cloud2 = createObject(scene, cloudModel.scene.children[0].clone());
  // cloud2.realize();
  // cloud2.setScale(50, 50, 50);
  // cloud2.setPosition(0, 10000, 0);
  // cloud2.setShadow();
  // cloudGroup.add(cloud2.model);

  // const cloud3 = createObject(scene, cloudModel.scene.children[0].clone());
  // cloud3.realize();
  // cloud3.setScale(40, 40, 40);
  // cloud3.setPosition(15000, 15000, 15000);
  // cloud3.setShadow();
  // cloudGroup.add(cloud3.model);

  const asteroidGroup = new THREE.Group();
  scene.add(asteroidGroup);

  const asteroids = createAsteroid(
    asteroidGroup,
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
  asteroids.setPosition(0, 200000, 0);

  const asteroidGroup2 = new THREE.Group();
  scene.add(asteroidGroup2);

  const asteroids2 = createAsteroid(
    asteroidGroup2,
    135,
    400000,
    800000,
    10000,
    500000,
    100000,
    700000,
    20,
    2000,
  );
  asteroids2.setPosition(-700000, -500000, 900000);

  const asteroidGroup3 = new THREE.Group();
  scene.add(asteroidGroup3);

  const asteroids3 = createAsteroid(
    asteroidGroup3,
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
  asteroids3.setPosition(-3000000, -600000, 100000);

  const asteroidGroup4 = new THREE.Group();
  scene.add(asteroidGroup4);

  const asteroids4 = createAsteroid(
    asteroidGroup4,
    10,
    1000,
    1000000,
    5000,
    1000000,
    1000,
    300000,
    40,
    8000,
  );
  asteroids4.setPosition(700000, -600000, -900000);

  const asteroidGroup5 = new THREE.Group();
  scene.add(asteroidGroup5);

  const asteroids5 = createAsteroid(
    asteroidGroup5,
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
  asteroids5.setPosition(800000, 600000, -500000);

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight("indianred", 11, 60000000);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.position.set(1, 1, 1);

  scene.add(sunLight);

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    1,
    250000000,
  );

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    logarithmicDepthBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(new THREE.Color("#030303"));

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.6;

  scene.background = cubeMapModel;

  /**
   * Low poly background
   */
  // const rt = new THREE.WebGLCubeRenderTarget(polymapTexture.image.height);
  // rt.fromEquirectangularTexture(renderer, polymapTexture);
  // scene.background = rt.texture;

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
  effectComposer.addPass(dotScreenPass);
  effectComposer.addPass(unrealBloomPass);

  unrealBloomPass.strength = 0.704;
  unrealBloomPass.radius = 0.1691;
  unrealBloomPass.threshold = 0.236;

  /**
   * Pointer Lock with Y
   */

  //camera lookat
  camera.position.set(970624, 212379, 29717);
  const controls = new PointLockWithY(camera, true, 2000, 0.825, canvas);
  scene.add(controls.camera);
  controls.addListner();

  /**
   * Orbit control
   */

  // camera.position.y = 100000;
  // camera.position.set(970624, 212379, 29717);
  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;

  const clock = new THREE.Clock();
  let previousTime = 0;
  const tick = () => {
    /**
     * Base Time
     */
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    // console.log(deltaTime);
    // const deltaTime = clock.getDelta();
    // console.log(deltaTime);

    /**
     * Pointer Lock update
     */
    controls.update(deltaTime);

    /**
     * Attach gloves to screen
     */
    leftGlove.model.position.copy(camera.position);
    leftGlove.model.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z,
    );

    leftGlove.model.translateZ(-5);
    leftGlove.model.translateY(-5);
    leftGlove.model.translateX(-6);
    leftGlove.model.rotateX(-1);
    leftGlove.model.rotateY(2);

    rightGlove.model.position.copy(camera.position);
    rightGlove.model.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z,
    );

    rightGlove.model.translateZ(-7);
    rightGlove.model.translateY(-5);
    rightGlove.model.translateX(7);
    rightGlove.model.rotateX(-1);
    rightGlove.model.rotateY(1);

    /**
     * whale animation
     */
    // if (whale.animationMixer) {
    //   whale.animationMixer.update(deltaTime / 10);
    // }
    // whale.rotate(0.0001, "y");

    // moveGroupAlongPath(
    //   cloudGroup,
    //   [
    //     new THREE.Vector3(-1000000, 150000, -1000000),
    //     new THREE.Vector3(1000000, 150000, 1000000),
    //     new THREE.Vector3(-1000000, 150000, -1000000),
    //   ],
    //   0.0001,
    // );

    sun.rotate(0.0001);

    mercury.revolve(elapsedTime, 0.03, 20, baseMeter + 300000, 10);
    mercury.rotate(0.003);

    venus.revolve(elapsedTime, 0.03, 42, baseMeter + 400000, 0);
    venus.rotate(0.003);

    earth.revolve(elapsedTime, 0.03, 23, baseMeter + 650000, 0);
    earth.rotate(0.003);

    mars.revolve(elapsedTime, 0.03, 53, baseMeter + 850000, 0);
    mars.rotate(0.003);

    jupiter.revolve(elapsedTime, 0.03, 0, baseMeter + 1550000, 0);
    jupiter.rotate(0.003);

    saturn.revolve(elapsedTime, 0.03, 23, baseMeter + 2050000, 0);
    saturn.rotate(0.003);

    uranus.revolve(elapsedTime, 0.03, 62, baseMeter + 2250000, 0);
    uranus.rotate(0.003);

    neptune.revolve(elapsedTime, 0.03, 53, baseMeter + 2450000, 0);
    neptune.rotate(0.003);

    pluto.revolve(elapsedTime, 0.08, 73, baseMeter + 2650000, -50);
    pluto.rotate(0.003);

    // Update controls
    // controls.update();

    // Post processing Render

    effectComposer.render();
    // renderer.render(scene, camera);

    requestAnimationFrame(tick);
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

  /**
   * Resize
   */
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
  });

  /**
   * PointLightHelper
   */
  const sphereSize = 2;
  const pointLightHelper = new THREE.PointLightHelper(sunLight, sphereSize);
  scene.add(pointLightHelper);
};

main();
