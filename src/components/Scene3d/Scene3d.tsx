import React, {useRef} from 'react';
import {initScene} from './3d';
import {GraphVisual} from '../../types/3d';

interface Props {
	graph: GraphVisual;
	colorVertex?: string;
	colorEdge?: string;
	colorBackground?: string;
}

export const Scene3d: React.FC<Props> = ({graph, colorBackground = 'lightgrey', colorEdge = 'yellow', colorVertex = 'black'}: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (ref.current) {
			ref.current!.innerHTML = `<a-scene background="color: #ddd"></a-scene>`;
		}
	}, []);

	React.useEffect(() => {
		initScene(graph);
	}, [graph]);

	// @ts-ignore
	return (
		<div ref={ref}/>
	);
};
