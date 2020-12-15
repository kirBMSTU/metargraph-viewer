(function() {
  window.calcDistance = (cord1, cord2) => {
    const { x: x1, y: y1, z: z1 } = cord1;
    const { x: x2, y: y2, z: z2 } = cord2;
    
    const x = (x2 - x1)**2;
    const y = (y2 - y1)**2;
    const z = (z2 - z1)**2;
    
    return Math.sqrt(x + y + z);
  }
})()