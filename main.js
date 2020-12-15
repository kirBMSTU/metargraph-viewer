const graphmljs = require(['https://unpkg.com/graphml-js@0.4.0/dist/graphml.js'], (r) => console.log(r));

const sceneEl = document.querySelector('a-scene');

function createVertex(x, y, z) {
  const entity = document.createElement('a-entity');

  entity.setAttribute('material', 'color: #444');
  entity.setAttribute('shadow', true);
  entity.setAttribute('geometry', "primitive: sphere; radius: 0.05");
  entity.setAttribute('position', [x, y, z].join(' '));

  return entity;
}

function createEdge(cord1, cord2) {
  const { x: x1, y: y1, z: z1 } = cord1;
  const { x: x2, y: y2, z: z2 } = cord2;

  const entity = document.createElement('a-entity');
  entity.setAttribute('meshline', 'lineWidth: 4; color: yellow; path: ' + [x1, y1, z1].join(' ') + ', ' + [x2, y2, z2].join(' ') + ';');

  return entity;
}

fetch('test.graphml')
  .then(data => data.text())
  .then(data => {
    console.log(data);
  })
const vertexes = [];

// for (let i = -10; i < 11; i++) {
//   vertexes.push({
//     x: 0.3 * i, 
//     y: 0.05 * i**3,
//     z: 0.2 * i**2
//   });
// }



vertexes.forEach((vertex, i) => {
  const {x, y, z} = vertex;
  const vertexEl = createVertex(x ,y, z);

  const nextVertexIndex = i + 1;
  const nextVertex = vertexes[nextVertexIndex] || {}; //todo: remove & add proverka

  sceneEl.appendChild(vertexEl);

  if (nextVertexIndex !== vertexes.length) {
    const edgeEl = createEdge(vertex, nextVertex);
    sceneEl.appendChild(edgeEl); 
  }
});