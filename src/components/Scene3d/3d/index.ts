import createVertex from './createVertex';
import createEdge from './createEdge';
// @ts-ignore
import {GraphVisual} from '../../../types/3d';

export const initScene = (graph: GraphVisual) => {
	const { vertices, edges } = graph;

    const sceneEl = document.querySelector('a-scene');

    vertices.forEach((vertex, i) => {
        const vertexEl = createVertex(vertex);
        sceneEl?.appendChild(vertexEl);
    });

	edges.forEach((edge, i) => {
		const { v1, v2 } = edge;
		const edgeEl = createEdge(v1, v2);
		sceneEl?.appendChild(edgeEl);
	});
};


// export const initScene = (graph: GraphVisual) => {
//     const sceneEl = document.querySelector('a-scene');
//
//     const vertices: Vertex[] = [];
//
//     // graph.nodes.
//
// 	for (let i = -10; i < 11; i++) {
// 		vertices.push({
// 			x: 0.3 * i,
// 			y: 0.05 * i**3,
// 			z: 0.2 * i**2
// 		  });
// 	}
//
//     vertices.forEach((vertex, i) => {
//         const vertexEl = createVertex(vertex);
//
//         const nextVertexIndex = i + 1;
//
//         sceneEl?.appendChild(vertexEl);
//
//         if (nextVertexIndex < vertices.length) {
//             const nextVertex = vertices[nextVertexIndex];
//             const edgeEl = createEdge(vertex, nextVertex);
//             sceneEl?.appendChild(edgeEl);
//         }
//     });
// };
