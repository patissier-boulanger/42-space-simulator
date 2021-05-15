import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = function () {
  console.log("Loading complete!");
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(`Items loaded: ${itemsLoaded}/${itemsTotal}`);
};

loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

const gltfLoader = new GLTFLoader(loadingManager);
const fbxLoader = new FBXLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

const _loadModel = (url, loader) => {
  return new Promise((resolve) => {
    loader.load(url, resolve);
  });
};

const _promisyfyModels = () => {
  const loadStarTexture = _loadModel("/textures/stars/star.png", textureLoader);

  const loadPolymapTexture = _loadModel(
    "/textures/skybox/panorama.png",
    textureLoader,
  );

  const loadFbxTexture = _loadModel(
    "/textures/objects/whale/whale.fbx",
    fbxLoader,
  );

  const loadcubeTexture = _loadModel(
    [
      "/textures/skybox/SkyboxX-.png",
      "/textures/skybox/SkyboxX+.png",
      "/textures/skybox/SkyboxY-.png",
      "/textures/skybox/SkyboxY+.png",
      "/textures/skybox/SkyboxZ-.png",
      "/textures/skybox/SkyboxZ+.png",
    ],
    cubeTextureLoader,
  );

  const gltfUrls = [
    "/textures/planets/sun.gltf",
    "/textures/planets/earth.gltf",
    "/textures/planets/saturn.gltf",
    "/textures/planets/jupiter.gltf",
    "/textures/planets/uranus.gltf",
    "/textures/planets/neptune.gltf",
    "/textures/planets/mecury.gltf",
    "/textures/planets/pluto.gltf",
    "/textures/planets/mars.gltf",
    "/textures/planets/venus.gltf",
    "/textures/objects/spaceShip/cuteSpaceship.gltf",
    "/textures/objects/cloud/cloud.gltf",
    "/textures/astronaut/scene.gltf",
    "/textures/test/sun/sun.gltf",
    "/textures/test/jupiter/jupiter.gltf",
    "/textures/gloves/leftGlove/scene.gltf",
    "/textures/gloves/rightGlove/rightGlove.gltf",
  ];

  const gltfPromises = gltfUrls.map((url) => {
    return _loadModel(url, gltfLoader);
  });

  return [
    loadStarTexture,
    loadPolymapTexture,
    loadFbxTexture,
    loadcubeTexture,
    ...gltfPromises,
  ];
};

const loadAllModel = () => {
  console.log("started");
  return Promise.all(_promisyfyModels());
};

export { loadAllModel };
