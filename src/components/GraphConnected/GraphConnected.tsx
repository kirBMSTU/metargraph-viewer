import { useGraphStore } from '../../modules/store/GraphStore';
import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../../modules/store/ThemeStore';
import { graphVisualToForceGraph } from '../../modules/normalizers/forceGraph';
import { GraphData } from 'react-force-graph-3d';
import ForceGraph from '../ForceGraph';
import { observer } from 'mobx-react';


export const GraphConnected = observer(() => {
    const graphStore = useGraphStore();
    const [forceGraphData, setForceGraphData] = useState<GraphData | null>(null);
    const { colorVertex, colorEdge, colorBackground } = useThemeStore();

    useEffect(() => {
        fetch('example.graphml')
            .then(data => data.text())
            .then(xml => graphStore.setGraphData(xml));
    }, []);

    useEffect(() => {
        if (graphStore.graphView) {
            setForceGraphData(graphVisualToForceGraph(graphStore.graphView, colorVertex, colorEdge));
        }
    }, [colorEdge, colorVertex, graphStore.graphView, colorBackground]);

    const getNested = (vertexID?: string | number) => graphVisualToForceGraph(graphStore.getNested(vertexID), colorVertex, colorEdge)

    if (!forceGraphData) {
        return null;
    }

    return (
        <ForceGraph
            data={forceGraphData}
            onNodeClick={graphStore.expandNode}
            checkNodeVisibility={graphStore.checkNodeVisibility}
            getNodeSize={graphStore.getNodeSize}
            getNested={getNested}
        />
    )
});