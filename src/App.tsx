import React, {useEffect, useState} from 'react';
// @ts-ignore
import Toolbar from './components/Toolbar';
import {Scene3d} from './components/Scene3d/Scene3d';
import GraphStore from './modules/store';
import {GraphVisual} from './types/3d';

function App() {
	const [graphView, setGraphView] = useState<GraphVisual | null>(null);

	useEffect(() => {
		fetch('example.graphml')
			.then(data => data.text())
			.then(xml => {
				GraphStore.setData(xml);
				setGraphView(GraphStore.graphView);
			});
	}, []);

    // @ts-ignore
    return (
    	<>
			<Toolbar />
			{graphView && (
				<Scene3d graph={graphView}
						 colorVertex={'yellow'}
						 colorVertex={'yellow'}
						 colorVertex={'yellow'}
				/>
			)}
		</>
    );
}

export default App;
