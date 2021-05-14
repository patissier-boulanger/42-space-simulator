import * as THREE from "three";

let counter = 0;

const moveGroupAlongPath = (model, verticeArray, moveSpeedRate) => {
  const curve = new THREE.CatmullRomCurve3(verticeArray);

  if (counter <= 1) {
    const axis = new THREE.Vector3();
    const up = new THREE.Vector3(0, 0, 0);

    model.position.copy(curve.getPointAt(counter));
    const tangent = curve.getTangentAt(counter).normalize();
    axis.crossVectors(up, tangent).normalize();
    var radians = Math.acos(up.dot(tangent));
    model.quaternion.setFromAxisAngle(axis, radians);
    counter += moveSpeedRate;
  } else {
    counter = 0;
  }
};

export { moveGroupAlongPath };
