import * as THREE from "three";

const createPlanet = (scene, model, startPosition, outlineBaseModel) => {
  return {
    scene,
    model: model.scene,
    startPosition,
    outlineBaseModel,

    setShadow() {
      this.model.castShadow = true;
      this.model.receiveShadow = true;
    },

    setOutLine(outLineMaterial, outLineWidth) {
      const cloneModel = this.model.clone();
      cloneModel.traverse((child) => {
        if (child.isMesh) child.material = outLineMaterial;
      });
      cloneModel.scale.multiplyScalar(outLineWidth);
      this.outlineBaseModel = cloneModel;
      this.scene.add(cloneModel);
    },

    setScale(scale) {
      this.model.scale.set(scale, scale, scale);
    },

    setPosition(x, y, z, distanceFromAxis) {
      this.model.position.set(x + distanceFromAxis, y, z);
    },

    setOrbit(radius, thickness, segments, color, xAxis) {
      const orbitGeometry = new THREE.TorusGeometry(
        radius,
        thickness,
        segments,
        segments,
      );
      const orbitMaterial = new THREE.MeshStandardMaterial({
        color,
        side: THREE.DoubleSide,
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.castShadow = true;
      orbit.receiveShadow = true;
      orbit.rotation.x = xAxis;
      this.scene.add(orbit);
    },

    revolve(
      timer,
      rotationSpeedRate,
      startPosition,
      distanceFromAxis,
      rotationHeight,
    ) {
      this.model.position.set(
        Math.cos(timer * rotationSpeedRate + startPosition) * distanceFromAxis,
        Math.sin(timer * rotationSpeedRate + startPosition) * rotationHeight,
        Math.sin(timer * rotationSpeedRate + startPosition) * distanceFromAxis,
      );
    },

    rotate(rotateSpeedRate) {
      this.model.rotation.y += rotateSpeedRate;
    },

    realize() {
      this.scene.add(this.model);
    },
  };
};

export { createPlanet };
