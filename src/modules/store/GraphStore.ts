import {GraphVisual} from '../../types/3d';
import * as graphml from 'graphology-graphml/browser';
import {UndirectedGraph} from 'graphology';
import random from '../embedding/random';
import { makeAutoObservable } from 'mobx';
import React, {useContext} from 'react';

class GraphStore {
	public graphView: GraphVisual | null = null;
	private graphModel: UndirectedGraph | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setGraphData = (data: string) => {
		this.graphModel = graphml.parse(UndirectedGraph, data);
		this.graphView = random(this.graphModel!);
	}
}

const GraphStoreInstance = new GraphStore();
export const GraphStoreContext = React.createContext(GraphStoreInstance);
export const useGraphStore = () => useContext(GraphStoreContext);

export default GraphStoreInstance;
