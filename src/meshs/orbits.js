import * as THREE from "three";

const createOrbit = ({
  scene,
  outerDiameter,
  innerDiameter,
  segments,
  xAxis,
}) => {
  const orbitGeometry = new THREE.RingGeometry(
    outerDiameter,
    innerDiameter,
    segments,
  );
  const orbitMaterial = new THREE.MeshStandardMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });

  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);

  orbit.position.set(0, 0, 0);
  orbit.rotation.x = xAxis;

  scene.add(orbit);
};

export { createOrbit };
