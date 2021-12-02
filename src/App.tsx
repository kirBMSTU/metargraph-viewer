import React, {useEffect, useState} from 'react';
// @ts-ignore
import Toolbar from './components/Toolbar';
import {Scene3d} from './components/Scene3d/Scene3d';
import {observer} from 'mobx-react';
import ThemeStore, {useThemeStore, ThemeStoreContext} from './modules/store/ThemeStore';
import GraphStore, {useGraphStore, GraphStoreContext} from './modules/store/GraphStore';
import ForceGraph3D, {GraphData} from 'react-force-graph-3d';
import {graphVisualToForceGraph} from "./modules/normalizers/forceGraph";


const App: React.FC = observer(() => {
	const { graphView, setGraphData } = useGraphStore();
	const [forceGraphData, setForceGraphData] = useState<GraphData | null>(null);
	const { colorVertex, colorEdge, colorBackground } = useThemeStore();
	useEffect(() => {
		fetch('example.graphml')
			.then(data => data.text())
			.then(xml => setGraphData(xml));
	}, []);

	useEffect(() => {
		if (graphView) {
			setForceGraphData(graphVisualToForceGraph(graphView, colorVertex, colorEdge));
		}
	}, [colorEdge, colorVertex, graphView]);

    // @ts-ignore
    return (
    	<ThemeStoreContext.Provider value={ThemeStore}>
			<GraphStoreContext.Provider value={GraphStore}>
				<Toolbar />
				{/*{graphView && (*/}
				{/*	<Scene3d graph={graphView}*/}
				{/*			 colorVertex={colorVertex}*/}
				{/*			 colorEdge={colorEdge}*/}
				{/*			 colorBackground={colorBackground}*/}
				{/*	/>*/}
				{/*)}*/}
				{forceGraphData && (
					<ForceGraph3D
						graphData={forceGraphData}
						linkOpacity={1}
						backgroundColor={colorBackground}
						linkWidth={1}
					/>
				)}
			</GraphStoreContext.Provider>
		</ThemeStoreContext.Provider>
    );
});

export default App;
