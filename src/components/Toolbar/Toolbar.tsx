import React from 'react';
import styles from './Toolbar.module.css';

export const Toolbar: React.FC = () => {

	return (
		<div className={styles.root}>

			<span className={styles.pair}>
				<label htmlFor="edge-color">Цвет ребер</label>
				<input type="color" id="edge-color" onChange={(e) => console.log(e)}/>
			</span>

			<span className={styles.pair}>
				<label htmlFor="vertex-color">Цвет вершин</label>
				<input type="color" id="vertex-color" onChange={(e) => console.log(e)}/>
			</span>
		</div>
	);
};
