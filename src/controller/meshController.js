import * as THREE from "three";

const moveMesh = (mesh, time) => {
  mesh.position.x = Math.cos(time / 10) * 2000;
  mesh.position.z = Math.sin(time / 10) * 2000;
};

const rotatePlanet = () => {};

export { moveMesh };
