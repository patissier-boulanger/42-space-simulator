import * as THREE from "three";

const useHelpers = (scene) => {
  const axesHelper = new THREE.AxesHelper(50);

  // const gridHelper = new THREE.GridHelper(4000, 4000);
  scene.add(axesHelper);
};

export { useHelpers };
