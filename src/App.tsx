import React, {useEffect} from 'react';
// @ts-ignore
import Toolbar from './components/Toolbar';
import {Scene3d} from './components/Scene3d/Scene3d';
import {observer} from 'mobx-react';
import ThemeStore, {useThemeStore, ThemeStoreContext} from './modules/store/ThemeStore';
import GraphStore, {useGraphStore, GraphStoreContext} from './modules/store/GraphStore';

const App: React.FC = observer(() => {
	const { graphView, setGraphData } = useGraphStore();
	const { colorVertex, colorEdge, colorBackground } = useThemeStore();
	useEffect(() => {
		fetch('example.graphml')
			.then(data => data.text())
			.then(xml => setGraphData(xml));
	}, []);

    // @ts-ignore
    return (
    	<ThemeStoreContext.Provider value={ThemeStore}>
			<GraphStoreContext.Provider value={GraphStore}>
				<Toolbar />
				{graphView && (
					<Scene3d graph={graphView}
							 colorVertex={colorVertex}
							 colorEdge={colorEdge}
							 colorBackground={colorBackground}
					/>
				)}
			</GraphStoreContext.Provider>
		</ThemeStoreContext.Provider>
    );
});

export default App;
