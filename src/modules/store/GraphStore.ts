import { GraphVisual } from '../../types/3d';
import * as graphml from 'graphology-graphml/browser';
import { UndirectedGraph } from 'graphology';
import { makeAutoObservable } from 'mobx';
import React, { useContext } from 'react';
import meta from '../embedding/meta';

class GraphStore {
  private graphModel: UndirectedGraph | null = null;
  private _expandedNodes = new Set<string>();

  constructor() {
    makeAutoObservable(this);
  }

  setGraphData = (data: string) => {
    this.graphModel = graphml.parse(UndirectedGraph, data);
  };

  expandNode = (id?: string | number): void => {
    this._expandedNodes.add(String(id));
  };

  checkNodeVisibility = (id?: string | number): boolean => {
    return true; //!this._expandedNodes.has(String(id));
  };

  getNodeSize = (id?: string | number): number => {
    return this._expandedNodes.has(String(id)) ? 10000 : 1;
  };

  getNested = (id?: string | number): GraphVisual => {
    const vertices =
      this.graphView?.vertices.filter((vertex) => {
        const [, parent] = vertex.id.match(/(.*)\:\:.*/) || [];
        return Boolean(parent === id);
      }) ?? [];

    const edges =
      this.graphView?.edges.filter(
        ({ v1, v2 }) =>
          vertices.find((v) => v.id === v1.id) &&
          vertices.find((v) => v.id === v2.id)
      ) ?? [];

    return {
      edges,
      vertices,
    };
  };

  get graphView(): GraphVisual | null {
    if (!this.graphModel) return null;
    // @ts-ignore
    return meta(this.graphModel, [...this._expandedNodes]);
  }
}

const GraphStoreInstance = new GraphStore();
export const GraphStoreContext = React.createContext(GraphStoreInstance);
export const useGraphStore = () => useContext(GraphStoreContext);

export default GraphStoreInstance;
