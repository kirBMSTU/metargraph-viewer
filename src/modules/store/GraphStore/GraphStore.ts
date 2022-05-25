import * as graphml from 'graphology-graphml/browser';
import { UndirectedGraph } from 'graphology';
import { makeAutoObservable } from 'mobx';
import { ILocalStore } from '../../../utils/useLocalStore';
import { EdgeEntry, NodeEntry } from 'graphology-types';
import { GraphData, LinkObject, NodeObject } from 'react-force-graph-3d';

class GraphStore implements ILocalStore {
  private graphModel: UndirectedGraph | null = null;
  private _expandedNodes = new Set<string>();

  constructor(graphData?: string) {
    makeAutoObservable(this);

    if (graphData) {
      this.setGraphData(graphData);
    }
  }

  setGraphData = (data: string) => {
    this.graphModel = graphml.parse(UndirectedGraph, data);
  };

  /** Раскрыть метавершину, чтобы увидеть ее содержимое */
  expandNode = (vertex: NodeObject): void => {
    this._expandedNodes.add(String(vertex.id));
  };

  /** Получить содержимое метавершины */
  getNested = (vertex: NodeObject): { nodes: NodeObject[]; links: LinkObject[]; } => {
    const nodes =
      (this.vertices.filter((v) => {
        const [, parentId] = v.node.match(/(.*)::.*/) || [];
        return Boolean(parentId === vertex.id);
      }) ?? []).map(({ node: id, attributes }) => ({...attributes, id}));

    const links =
      this.edges.filter(
        ({ source, target }: EdgeEntry) =>
          nodes.find((v) => v.id === source) &&
          nodes.find((v) => v.id === target)
      ) ?? [];

    return {
      links,
      nodes
    };
  };

  /** Все вершины метаграфа, вне зависимости от состояния родителей */
  get allVertices(): NodeEntry[] {
    return [...this.graphModel?.nodeEntries() ?? [] as NodeEntry[]];
  }

  /** Только видимые вершины (без скрытых внутри неразвернутых метавершин) */
  get vertices(): NodeEntry[] {
    const excludeCollapsed = this.allVertices.filter((vertex: NodeEntry) => {
        const match = vertex.node.match(/(.*)::.*/);
        const isComplex = Boolean(match);

        if (!isComplex) {
            return true;
        }

        const [, parentId] = match || [];
        return this._expandedNodes.has(parentId);
    })

    return excludeCollapsed;
  }

  /** Все ребра метаграфа, вне зависимости от состояние вершин, которые они соединяют */
  get allEdges(): EdgeEntry[] {
    return [...this.graphModel?.edgeEntries() ?? [] as EdgeEntry[]];
  }

  /**
   * Только видимые ребра метаграфа
   * (без ребер, начало и/или конец которых скрыты внутри неразвернутых метавершин)
   */
  get edges(): EdgeEntry[] {
    console.log(this.allEdges);
    return this.allEdges.filter((edge: EdgeEntry) => {
      const match1 = edge.source.match?.(/(.*)::.*/);
      const match2 = edge.target.match?.(/(.*)::.*/);

      const isComplex1 = Boolean(match1);
      const isComplex2 = Boolean(match2);
      
      if (!isComplex1 && !isComplex2) return true;

      const [, parent1] = match1 || [];
      const [, parent2] = match2 || [];

      return this._expandedNodes.has(parent1) && this._expandedNodes.has(parent2);
    });
  }

  /** Данные о вершинах и ребрах метаграфа, нормализованные для react-force-graph-3d */
  get graphDataNormalized(): GraphData {
    return {
      nodes: this.vertices.map(({ node: id, attributes }) => ({ ...attributes, id })),
      links: this.edges
    }
  }

  destroy(): void {}
}

export default GraphStore;
