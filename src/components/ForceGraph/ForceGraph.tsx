import { observer } from 'mobx-react-lite';
import React, { useRef, useEffect, useCallback } from 'react';
import ForceGraph3D, { GraphData, ForceGraphMethods, NodeObject } from 'react-force-graph-3d';
import { useThemeStore } from '../../modules/store/ThemeStore';
import ThreeForceGraph from 'three-forcegraph';
import * as THREE from 'three';
import * as d3 from 'd3';

type Props = {
    data: GraphData;
    onNodeClick: (id?: string | number) => void;
    checkNodeVisibility: (id?: string | number) => boolean;
    getNodeSize: (id?: string | number) => number;
    getNested: (id?: string | number) => GraphData;
};


function customFn() {
    let nodes: NodeObject[];
  
    function force(alpha: number) {
        nodes?.forEach(vertex => {
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
  
    force.initialize = function(_nodes: any[]) {
        nodes = _nodes;
        initialize();
    };
  
    return force;
  }

export const ForceGraph: React.FC<Props> = observer((props: Props) => {
    const graphRef = useRef<ForceGraphMethods | undefined>();
    const { colorBackground, colorVertex } = useThemeStore();

    useEffect(() => {
        const fg = graphRef.current as ForceGraphMethods;

        if (!fg) return;

        // @ts-ignore
        fg.d3Force('charge', d3.forceManyBody().strength((vertex) => {
            // @ts-ignore
            const match = vertex.id.match(/(.*)::.*/);
        
            return match ? -1500 : -1500;
        }));

        fg.d3Force('center', customFn());

        // @ts-ignore
        fg.d3Force('link').distance(link => {
            const { source, target } = link;

            const sourceNested = getNested(source);
            const sourceHasNested = Boolean(sourceNested.nodes.length);
            
            const targetNested = getNested(target);
            const targetHasNested = Boolean(targetNested.nodes.length);

            const distance = sourceHasNested || targetHasNested ? 250 : 10;
            return distance;
        });
    }, [graphRef.current]);

    const onNodeClick = useCallback((node: NodeObject) => { props.onNodeClick(node.id) }, [props, props.onNodeClick]);
    const getNested = useCallback((node: NodeObject) => props.getNested(node.id), [props, props.getNested]);

    return (
        <ForceGraph3D
            ref={graphRef}
            numDimensions={3}
            nodeLabel='id'
            graphData={props.data}
            linkOpacity={1}
            backgroundColor={colorBackground}
            linkWidth={1}
            onNodeClick={onNodeClick}
            showNavInfo={false}
            nodeThreeObject={
                (vertex) => {
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
                        .linkColor('yellow')
                        // @ts-ignore
                        .d3Force('charge', d3.forceManyBody().strength(-1500))
                        .graphData(nested);
                    
                    group.add(nestedGraph);
                    return group;
                }
            }
        />
    )
});