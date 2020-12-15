(function() {
  window.calcAngles = (cord1, cord2) => {
    const { x: x1, y: y1, z: z1 } = cord1;
    const { x: x2, y: y2, z: z2 } = cord2;
    const THREE = window.THREE;
    
    const vector = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1);
    
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, 1, 0);
    const zAxis = new THREE.Vector3(0, 0, 1);
    
    const angleX = THREE.Math.radToDeg(vector.angleTo(xAxis));
    const angleY = THREE.Math.radToDeg(vector.angleTo(yAxis));
    const angleZ = THREE.Math.radToDeg(vector.angleTo(zAxis));
    
    console.log('x:', x2, x1, x2 > x1)
    
    return [y2 < y1 ? angleZ - 90 : 90 - angleZ, 0, y2 > y1 ? angleX - 90 : 90 - angleX].join(' ');
  }
})()

// const lenX = x2 - x1;
//     const lenY = y2 - y1;
//     const lenZ = z2 - z1;

//     const tgX = lenY / lenZ;
//     const tgY = lenX / lenZ;
//     const tgZ = lenX / lenY;
    
//     const angleX = isNan(tgX) ? Math.tan(tgX) * 180 / Math.PI : ;
//     const angleY = Math.tan(tgY) * 180 / Math.PI;
//     const angleZ = Math.tan(tgZ) * 180 / Math.PI;