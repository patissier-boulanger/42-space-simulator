import "./style.css";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import { loadAllModel } from "./utils/loaders";
import { PointLockWithY } from "./controller/pointLockController";

import { PlanetFactory } from "./factory/planetFactory";
import { GalaxyFactory } from "./factory/galaxyFactory";
import { AsteroidFactory } from "./factory/asteroidFactory";
import { Model } from "./objects/model";
import { Stars } from "./objects/stars";

class Simulator {
  constructor() {
    this._initialize();
  }

  async _initialize() {
    //basic setting
    this.canvas = document.querySelector("canvas.webgl");
    this.scene = new THREE.Scene();
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.clock = new THREE.Clock();
    this.previousTime = 0;

    //load model
    const modelStorage = {};
    [
      modelStorage.starTexture,
      modelStorage.polymapTexture,
      modelStorage.whaleModel,
      modelStorage.cubeMapModel,
      modelStorage.sunModel,
      modelStorage.mecuryModel,
      modelStorage.venusModel,
      modelStorage.earthModel,
      modelStorage.marsModel,
      modelStorage.jupiterModel,
      modelStorage.saturnModel,
      modelStorage.uranusModel,
      modelStorage.neptuneModel,
      modelStorage.plutoModel,
      modelStorage.cloudModel,
      modelStorage.leftGloveModel,
      modelStorage.rightGloveModel,
      modelStorage.spaceStationModel,
      modelStorage.astronautModel,
    ] = await loadAllModel();
    this.modelStorage = modelStorage;

    //add light
    this._addLight();

    //add camera
    this._addCamera();

    //add renderer
    this._addRenderer();

    //add post processing
    this._addPostProcessor();

    //add controller
    this.camera.position.set(1170624, 212379, 29717); // startpoint;
    this.controls = new PointLockWithY(
      this.camera,
      true,
      2000,
      0.825,
      this.canvas,
    );
    this.scene.add(this.controls.camera);
    this.controls.addListner();

    //add planets
    //why? 객체 생성의 캡슐화
    this.solarSystem = new PlanetFactory(this.scene, this.modelStorage);
    this.solarSystem.realize();

    //add Stars
    const stars = new Stars(this.scene, 1000, 12000000, 1000);
    stars.realize();

    //add galaxy
    const galaxys = new GalaxyFactory(this.scene);
    galaxys.realize();

    //add asteroid
    const asteroids = new AsteroidFactory(this.scene);
    asteroids.realize();

    //add 3d object
    this.leftGlove = new Model(this.scene, this.modelStorage.leftGloveModel);
    this.leftGlove.realize();
    this.leftGlove.setShadow();
    this.leftGlove.setScale(6);

    this.rightGlove = new Model(this.scene, this.modelStorage.rightGloveModel);
    this.rightGlove.realize();
    this.rightGlove.setShadow();
    this.rightGlove.setScale(28);

    const spaceStaion = new Model(
      this.scene,
      this.modelStorage.spaceStationModel,
    );
    spaceStaion.realize();
    spaceStaion.setShadow();
    spaceStaion.setScale(800);
    spaceStaion.setPosition(1080000, 200000, 50000);

    const astronaut = new Model(this.scene, this.modelStorage.astronautModel);
    astronaut.realize();
    astronaut.setShadow();
    astronaut.setScale(40);
    astronaut.setPosition(1189000, 200000, 0);
    astronaut.model.rotation.x = 1;

    //animate per 60fps
    this._tick();

    window.addEventListener(
      "resize",
      () => {
        this._onWindowResize();
      },
      false,
    );
  }

  _addLight() {
    const ambientLight = new THREE.AmbientLight("white", 1);
    const sunLight = new THREE.PointLight("indianred", 11, 60000000);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.position.set(1, 1, 1);

    this.scene.add(ambientLight, sunLight);
  }

  _addCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      this.size.width / this.size.height,
      1,
      250000000,
    );

    this.camera = camera;
  }

  _addRenderer() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("#030303"));

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.6;

    this.renderer = renderer;
    this.scene.background = this.modelStorage.cubeMapModel;
  }

  _addPostProcessor() {
    const effectComposer = new EffectComposer(this.renderer);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    effectComposer.setSize(this.size.width, this.size.height);

    const dotScreenPass = new DotScreenPass();
    const unrealBloomPass = new UnrealBloomPass();
    const renderPass = new RenderPass(this.scene, this.camera);

    effectComposer.addPass(renderPass);
    effectComposer.addPass(dotScreenPass);
    effectComposer.addPass(unrealBloomPass);

    unrealBloomPass.strength = 0.804;
    unrealBloomPass.radius = 0.1691;
    unrealBloomPass.threshold = 0.136;

    this.effectComposer = effectComposer;
  }

  _tick() {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.previousTime;
    this.previousTime = elapsedTime;

    this.controls.update(deltaTime);

    this.solarSystem.planets.forEach((planet) => {
      planet.revolve(elapsedTime);
      planet.rotate();
    });

    /**
     * Attach gloves to screen
     */
    this.leftGlove.model.position.copy(this.camera.position);
    this.leftGlove.model.rotation.set(
      this.camera.rotation.x,
      this.camera.rotation.y,
      this.camera.rotation.z,
    );

    this.leftGlove.model.translateZ(-5);
    this.leftGlove.model.translateY(-5);
    this.leftGlove.model.translateX(-6);
    this.leftGlove.model.rotateX(-1);
    this.leftGlove.model.rotateY(2);

    this.rightGlove.model.position.copy(this.camera.position);
    this.rightGlove.model.rotation.set(
      this.camera.rotation.x,
      this.camera.rotation.y,
      this.camera.rotation.z,
    );

    this.rightGlove.model.translateZ(-7);
    this.rightGlove.model.translateY(-5);
    this.rightGlove.model.translateX(7);
    this.rightGlove.model.rotateX(-1);
    this.rightGlove.model.rotateY(1);

    this.effectComposer.render();
    requestAnimationFrame(this._tick.bind(this));
  }

  _onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
  }
}

const app = new Simulator();

console.log(app);
