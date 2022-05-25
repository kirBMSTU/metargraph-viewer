import { observer } from 'mobx-react-lite';
import React, { useRef, useEffect, useCallback } from 'react';
import ForceGraph3D, { GraphData, ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-3d';
import { useThemeStore } from '../../modules/store/ThemeStore';
import ThreeForceGraph from 'three-forcegraph';
import * as THREE from 'three';
import * as d3 from 'd3';
import { useGraphStore } from '../../modules/store/GraphStore';


/** Сила, которая направляет все вершины-дети к их раскрытым родителям */
function forceNestedToParents() {
    let nodes: NodeObject[];
  
    function force(alpha: number) {
        nodes?.forEach((vertex: NodeObject) => {
            const [, parentId] = String(vertex.id)?.match(/(.*)::.*/) || [];
            const parent = nodes.find(v => v.id === parentId);

            if (parent) {
                const k = alpha * 0.5;

                vertex.x! += (parent.x! - vertex.x!) * k;
                vertex.y! += (parent.y! - vertex.y!) * k;
                vertex.z! += (parent.z! - vertex.z!) * k;
            }
        })
    }
  
    function initialize() {}
  
    force.initialize = function(_nodes: NodeObject[]) {
        nodes = _nodes;
        initialize();
    };
  
    return force;
}

const ForceGraph: React.FC = () => {
    const graphRef = useRef<ForceGraphMethods | undefined>();
    const { colorBackground, colorVertex } = useThemeStore();
    const { expandNode, getNested, graphDataNormalized } = useGraphStore();

    useEffect(() => {
        const fg = graphRef.current as ForceGraphMethods;

        if (!fg) return;

        // @ts-ignore
        fg.d3Force('charge', d3.forceManyBody().strength((vertex: NodeObject) => {
            // @ts-ignore
            const match = vertex.id.match(/(.*)::.*/);
        
            return match ? -1500 : -1500;
        }));

        fg.d3Force('center', forceNestedToParents());

        // @ts-ignore
        fg.d3Force('link').distance((link: LinkObject) => {
            console.log('force', link);

            const { source, target } = link;

            const sourceNested = getNested(source as NodeObject);
            const sourceHasNested = Boolean(sourceNested.nodes.length);
            
            const targetNested = getNested(target as NodeObject);
            const targetHasNested = Boolean(targetNested.nodes.length);

            const distance = sourceHasNested || targetHasNested ? 250 : 10;
            return distance;
        });
    }, [graphRef.current]);

    return (
        <ForceGraph3D
            ref={graphRef}
            numDimensions={3}
            nodeLabel='id'
            graphData={graphDataNormalized}
            linkOpacity={1}
            backgroundColor={colorBackground}
            linkWidth={1}
            onNodeClick={expandNode}
            showNavInfo={false}
            nodeThreeObject={
                (vertex: NodeObject) => {
                    const group = new THREE.Group();

                    const nested = getNested(vertex);
                    const hasNested = Boolean(nested.nodes.length);

                    const nestedLevel = String(vertex.id).split('::').length

                    const sphereRadius = hasNested ? 200 * nestedLevel : 15;
                    const sphereOpacity = hasNested ? 0.2 : 1;

                    // @ts-ignore
                    const geometry = new THREE.SphereGeometry(sphereRadius, 32, 16);
                    const material = new THREE.MeshBasicMaterial({
                        color: colorVertex,
                        opacity: sphereOpacity,
                        transparent: hasNested,
                        wireframe: hasNested,
                    });
                    const sphere = new THREE.Mesh(geometry, material);
                    group.add(sphere);

                    const nestedGraph = new ThreeForceGraph()
                        .nodeRelSize(4)
                        .linkColor('yellow') // todo fix
                        // @ts-ignore
                        .d3Force('charge', d3.forceManyBody().strength(-1500))
                        .graphData(nested);
                    
                    group.add(nestedGraph);
                    return group;
                }
            }
        />
    )
};

export default observer(ForceGraph)