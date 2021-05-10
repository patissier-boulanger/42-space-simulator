import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { createStars } from "./meshs/stars";
import { createPlanet } from "./meshs/planet";
import { createOrbit } from "./meshs/orbits";

import { moveMesh } from "./controller/meshController";

import { useHelpers } from "./utils/helpers";
import { loadAllModel } from "./utils/loaders";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const main = async () => {
  // helpers
  useHelpers(scene);
  // Debug
  const gui = new dat.GUI();

  //async load
  const [
    starTexture,
    skyboxTexture,
    astronautModel,
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
  ] = await loadAllModel();

  const sun = sunModel.scene;
  sun.scale.set(800, 800, 800);
  sun.position.set(600, 0, 0);
  // sun.castShadow = true;
  // sun.receiveShadow = true;
  scene.add(sun);

  const venus = venusModel.scene;
  venus.scale.set(600, 600, 600);
  venus.position.set(-350, 0, 0);
  venus.castShadow = true;
  venus.receiveShadow = true;
  scene.add(venus);

  const mars = marsModel.scene;
  mars.scale.set(600, 600, 600);
  mars.position.set(-250, 0, 0);
  mars.castShadow = true;
  mars.receiveShadow = true;
  scene.add(mars);

  const pluto = plutoModel.scene;
  pluto.scale.set(600, 600, 600);
  pluto.position.set(-50, 0, 0);
  pluto.castShadow = true;
  pluto.receiveShadow = true;
  scene.add(pluto);

  const mecury = mecuryModel.scene;
  mecury.scale.set(600, 600, 600);
  mecury.position.set(-150, 0, 0);
  mecury.castShadow = true;
  mecury.receiveShadow = true;
  scene.add(mecury);

  const neptune = neptuneModel.scene;
  neptune.scale.set(600, 600, 600);
  neptune.position.set(150, 0, 0);
  neptune.castShadow = true;
  neptune.receiveShadow = true;
  scene.add(neptune);

  const jupiter = jupiterModel.scene;
  jupiter.scale.set(600, 600, 600);
  jupiter.position.set(200, 0, 0);
  jupiter.castShadow = true;
  jupiter.receiveShadow = true;
  scene.add(jupiter);

  const saturn = saturnModel.scene;
  saturn.scale.set(400, 400, 400);
  saturn.position.set(-400, 0, 0);
  saturn.castShadow = true;
  saturn.receiveShadow = true;
  scene.add(saturn);

  const earth = earthModel.scene;
  earth.scale.set(800, 800, 800);
  earth.position.set(0, 0, 0);
  earth.castShadow = true;
  earth.receiveShadow = true;
  scene.add(earth);

  const uranus = uranusModel.scene;
  uranus.scale.set(800, 800, 800);
  uranus.position.set(-200, 0, 0);
  uranus.castShadow = true;
  uranus.receiveShadow = true;
  scene.add(uranus);

  //stars
  createStars({
    scene,
    texture: starTexture,
    count: 50000,
    diffusionRate: 20000,
    size: 10,
  });

  //skybox
  // scene.background = skyboxTexture;

  /**
   * Test cube
   */
  const rotatePlanetParameter = {
    scene,
    x: 100,
    y: 0,
    z: 0,
    radius: 100,
    axisFromParent: 0,
    widthSegment: 200,
    heightSegment: 200,
  };
  const rotatePlanet = createPlanet(rotatePlanetParameter);

  const testOrbitParameter = {
    scene,
    outerDiameter: 1000,
    innerDiameter: 999,
    segments: 300,
    xAxis: Math.PI / 2,
  };
  createOrbit(testOrbitParameter);

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight("white", 0.2);
  // gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight("white", 2, 1000);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);

  // gui.add(sunLight, "intensity").min(0).max(1000).step(0.001);

  sunLight.position.set(1, 1, 1);
  scene.add(sunLight);

  const sphereSize = 2;
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
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    200000,
  );
  camera.position.set(0, 200, 100);
  scene.add(camera);

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
  renderer.setClearColor(new THREE.Color("#13162E"));

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //move planet
    moveMesh(rotatePlanet, elapsedTime);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  /**
   * Gui
   */

  // const testPlanet = gui.addFolder("Test Planet");
  // testPlanet
  //   .add(testPlanetParameter, "radius")
  //   .min(0)
  //   .max(1000)
  //   .step(1)
  //   .onFinishChange(() => {
  //     createPlanet(testPlanetParameter);
  //   });

  // testPlanet
  //   .add(testPlanetParameter, "x")
  //   .min(0)
  //   .max(100)
  //   .step(0.1)
  //   .onFinishChange(() => {
  //     createPlanet(testPlanetParameter);
  //   });
};

main();
