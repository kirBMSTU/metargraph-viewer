import {GraphVisual} from '../../types/3d';
import * as graphml from 'graphology-graphml/browser';
import {UndirectedGraph} from 'graphology';
import random from '../embedding/random';

class GraphStore {
	public graphView: GraphVisual | null = null;
	private graphModel: UndirectedGraph | null = null;

	setData(data: string) {
		const graph = graphml.parse(UndirectedGraph, data);

		const visualGraphModel = random(graph);

		this.graphModel = graph;
		this.graphView = visualGraphModel;
	}
}

export default new GraphStore();
