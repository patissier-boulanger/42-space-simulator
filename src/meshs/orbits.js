import * as THREE from "three";

const createOrbit = ({
  scene,
  outerDiameter,
  innerDiameter,
  segments,
  xAxis,
}) => {
  const orbitGeometry = new THREE.TorusGeometry(
    outerDiameter,
    innerDiameter,
    segments,
    segments,
  );
  const orbitMaterial = new THREE.MeshStandardMaterial({
    color: "indianred",
    side: THREE.DoubleSide,
  });

  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);

  orbit.castShadow = true;
  orbit.receiveShadow = true;
  orbit.position.set(0, 0, 0);
  orbit.rotation.x = xAxis;

  scene.add(orbit);
};

export { createOrbit };
