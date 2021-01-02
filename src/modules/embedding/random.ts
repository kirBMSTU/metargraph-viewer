import {Edge, GraphVisual, Vertex} from '../../types/3d';
import {UndirectedGraph} from 'graphology';
import {BOUNDARY_SIZE} from '../../constants';

const randCord = () => Math.random() * BOUNDARY_SIZE;

export default (graph: UndirectedGraph): GraphVisual => {
	// @ts-ignore
	const verticesEntries = [...graph.nodeEntries()];

	const vertices = verticesEntries.map(([id]: any[]) => {
		const vertex: Vertex = {
			id,
			x: randCord(),
			y: randCord() - 5,
			z: randCord() - 10,
		};

		return vertex;
	});

	// @ts-ignore
	const edgesEntries = [...graph.edgeEntries()];

	const edges = edgesEntries
		.map(([key, attrs, source, target]: any[]) => {
			const v1 = vertices.find(({id}) => id === source);
			const v2 = vertices.find(({id}) => id === target);

			if (!(v1 && v2)) return null;

			const edge: Edge = {
				v1,
				v2,
			};

			return edge;
		})
		.filter(edge => edge !== null);

	// @ts-ignore
	window.__graph__ = graph;

	return {
		vertices,
		edges,
	} as GraphVisual;
};
