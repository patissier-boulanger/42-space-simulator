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
    sun2Model,
    jupiter2Model,
    leftGloveModel,
    rightGloveModel,
  ] = await loadAllModel();

  /**
   * Solar System plantes
   */

  // const sun = createPlanet(scene, sunModel);
  // sun.setShadow();
  // sun.setScale(250000);
  // sun.setPosition(0, 0, 0, 0);
  // sun.setOutLine(orbitMaterial, 1.01);
  // sun.realize();

  const sun = createPlanet(scene, sun2Model);
  sun.setShadow();
  sun.setScale(5000);
  // sun.model.scale.multiplyScalar(500);
  sun.setPosition(0, 0, 0, 0);
  sun.setOutLine(orbitMaterial, 1.01);
  sun.realize();

  // const mercury = createPlanet(scene, mecuryModel);
  // mercury.realize();
  // mercury.setShadow();
  // mercury.setScale(60000);
  // mercury.setOutLine(orbitMaterial, 1.01);
  // mercury.setOrbit(20, 5, 300, "indianred", Math.PI / 2 - 0.15);

  // const venus = createPlanet(scene, venusModel);
  // venus.realize();
  // venus.setShadow();
  // venus.setScale(100);
  // venus.setOutLine(orbitMaterial, 1.01);
  // venus.setOrbit(26, 5, 300, "indianred", Math.PI / 2);

  // const earth = createPlanet(scene, earthModel);
  // earth.realize();
  // earth.setShadow();
  // earth.setScale(100);
  // earth.setOutLine(orbitMaterial, 1.01);
  // earth.setOrbit(380, 50, 300, "indianred", Math.PI / 2);

  // const mars = createPlanet(scene, marsModel);
  // mars.realize();
  // mars.setShadow();
  // mars.setScale(100);
  // mars.setOutLine(orbitMaterial, 1.01);
  // mars.setOrbit(500, 150, 300, "indianred", Math.PI / 2);

  const jupiter = createPlanet(scene, jupiter2Model);
  jupiter.realize();
  jupiter.setShadow();
  jupiter.setScale(800);
  jupiter.setOutLine(orbitMaterial, 1.01);
  jupiter.setOrbit(800, 1, 300, "indianred", Math.PI / 2);

  // const saturn = createPlanet(scene, saturnModel);
  // saturn.realize();
  // saturn.setShadow();
  // saturn.setScale(800);
  // saturn.setOutLine(orbitMaterial, 1.01);
  // saturn.setOrbit(700, 150, 300, "indianred", Math.PI / 2);

  // const uranus = createPlanet(scene, uranusModel);
  // uranus.realize();
  // uranus.setShadow();
  // uranus.setScale(800);
  // uranus.setOutLine(orbitMaterial, 1.01);
  // uranus.setOrbit(500, 150, 300, "indianred", Math.PI / 2);

  // const neptune = createPlanet(scene, neptuneModel);
  // neptune.realize();
  // neptune.setShadow();
  // neptune.setScale(800);
  // neptune.setOutLine(orbitMaterial, 1.01);
  // neptune.setOrbit(600, 150, 300, "indianred", Math.PI / 2);

  // const pluto = createPlanet(scene, plutoModel);
  // pluto.realize();
  // pluto.setShadow();
  // pluto.setScale(1000);
  // pluto.setOutLine(orbitMaterial, 1.01);
  // pluto.setOrbit(800, 100, 300, "indianred", Math.PI / 2 - 50);

  // createStars({
  //   scene,
  //   texture: starTexture,
  //   count: 800,
  //   diffusionRate: 6000,
  //   size: 50,
  // });

  // const galaxy = createGalaxy(
  //   scene,
  //   600,
  //   5,
  //   15,
  //   6,
  //   0.18,
  //   0.2,
  //   3,
  //   "indianred",
  //   "#ff6030",
  // );
  // galaxy.realize();
  // galaxy.setPosition(600, 700, 0);
  // galaxy.setScale(30, 30, 30);
  // galaxy.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);

  // const galaxy2 = createGalaxy(
  //   scene,
  //   4000,
  //   4,
  //   150,
  //   5,
  //   0.2,
  //   0.2,
  //   3,
  //   "indianred",
  //   "indianred",
  // );
  // galaxy2.realize();
  // galaxy2.setPosition(-500, 0, -200);
  // galaxy2.setScale(300, 300, 300);
  // galaxy2.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);

  // const galaxy3 = createGalaxy(
  //   scene,
  //   10000,
  //   32,
  //   15,
  //   6,
  //   1.2,
  //   1.2,
  //   3,
  //   "#f79320",
  //   "#85301b",
  // );
  // galaxy3.realize();
  // galaxy3.setPosition(100, -700, -100);
  // galaxy3.setScale(300, 300, 300);
  // galaxy3.setRotation(Math.PI / 3, 0, Math.PI / 3);

  //create object
  const leftGlove = createObject(scene, leftGloveModel.scene);
  leftGlove.realize();
  leftGlove.setShadow();
  leftGlove.setScale(6);

  const rightGlove = createObject(scene, rightGloveModel.scene);
  rightGlove.realize();
  rightGlove.setShadow();
  rightGlove.setScale(28);

  // const astronaut = createObject(scene, astronautModel.scene);
  // astronaut.realize();
  // astronaut.setScale(10, 10, 10);
  // astronaut.setPosition(0, 0, 0);
  // astronaut.setShadow();

  // const whale = createObject(scene, whaleModel);
  // whale.realize();
  // whale.setScale(130, 130, 130);
  // whale.setPosition(100, 1200, 0);
  // whale.setShadow();
  // whale.animate(0);

  // const spaceShip = createObject(scene, spaceShipModel.scene);
  // spaceShip.realize();
  // spaceShip.setScale(3000, 3000, 3000);
  // spaceShip.setPosition(180000, 30000, 0);
  // spaceShip.setShadow();
  // spaceShip.model.rotation.x = -Math.PI / 2;

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

  // const asteroidGroup = new THREE.Group();
  // scene.add(asteroidGroup);

  // const asteroids = createAsteroid(
  //   asteroidGroup,
  //   50,
  //   100000,
  //   200000,
  //   100000,
  //   30000,
  //   10000,
  //   30000,
  //   100,
  //   1000,
  // );
  // asteroids.setPosition(0, 300000, 0);

  // const asteroidGroup2 = new THREE.Group();
  // scene.add(asteroidGroup2);

  // const asteroids2 = createAsteroid(
  //   asteroidGroup2,
  //   25,
  //   400000,
  //   800000,
  //   10000,
  //   30000,
  //   100000,
  //   300000,
  //   200,
  //   2000,
  // );
  // asteroids2.setPosition(-800000, -600000, 900000);

  // const asteroidGroup3 = new THREE.Group();
  // scene.add(asteroidGroup3);

  // const asteroids3 = createAsteroid(
  //   asteroidGroup3,
  //   20,
  //   400000,
  //   1000000,
  //   500000,
  //   1000000,
  //   100000,
  //   300000,
  //   400,
  //   8000,
  // );
  // asteroids3.setPosition(-4000000, -600000, 400000);

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight("white", 0.324);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight("indianred", 4, 60000);
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
    20000,
  );
  camera.position.y = 10;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
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

  // dotScreenPass.uniforms["scale"].value = 10;
  unrealBloomPass.strength = 0.819;
  unrealBloomPass.radius = 0.191;
  unrealBloomPass.threshold = 0.6;

  /**
   * Pointer Lock with Y
   */
  const clock = new THREE.Clock();
  const controls = new PointLockWithY(camera, true, 500, 0.825, canvas);
  scene.add(controls.camera);
  controls.addListner();

  /**
   * Orbit control
   */
  // scene.add(camera);
  // orbit controls
  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;

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

    // if (whale.animationMixer) {
    //   whale.animationMixer.update(deltaTime / 10);
    // }
    // whale.rotate(0.0001, "y");

    // spaceShip.rotate(0.005, "z");

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

    // mercury.revolve(elapsedTime, 0.03, 20, 200, 1300);
    // mercury.rotate(0.003);

    // venus.revolve(elapsedTime, 0.03, 42, 260, 0);
    // venus.rotate(0.003);

    // earth.revolve(elapsedTime, 0.03, 23, 380, 0);
    // earth.rotate(0.003);

    // mars.revolve(elapsedTime, 0.03, 53, 500, 0);
    // mars.rotate(0.003);

    jupiter.revolve(elapsedTime, 0.03, 13, 800, 0);
    // jupiter.rotate(0.003);

    // saturn.revolve(elapsedTime, 0.03, 23, 700, 0);
    // saturn.rotate(0.003);

    // uranus.revolve(elapsedTime, 0.03, 62, 500, 0);
    // uranus.rotate(0.003);

    // neptune.revolve(elapsedTime, 0.03, 53, 600, 0);
    // neptune.rotate(0.003);

    // pluto.revolve(elapsedTime, 0.08, 73, 800, -20);
    // pluto.rotate(0.003);

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
