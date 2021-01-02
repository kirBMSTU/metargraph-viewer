import { makeAutoObservable } from 'mobx';
import React, {useContext} from 'react';

class ThemeStore {
	public colorVertex: string = localStorage.getItem('colorVertex') || '#444';
	public colorEdge: string = localStorage.getItem('colorEdge') || 'yellow';
	public colorBackground: string = localStorage.getItem('colorBackground') || '#ddd';

	constructor() {
		makeAutoObservable(this);
	}

	setColorVertex = (colorVertex: string) => {
		this.colorVertex = colorVertex;
		localStorage.setItem('colorVertex', colorVertex);
	};

	setColorEdge = (colorEdge: string) => {
		this.colorEdge = colorEdge;
		localStorage.setItem('colorEdge', colorEdge);
	};

	setColorBackground = (colorBackground: string) => {
		this.colorBackground = colorBackground;
		localStorage.setItem('colorBackground', colorBackground);
	};
}

const ThemeStoreInstance = new ThemeStore();
export const ThemeStoreContext = React.createContext(ThemeStoreInstance);
export const useThemeStore = () => useContext(ThemeStoreContext);

export default ThemeStoreInstance;
