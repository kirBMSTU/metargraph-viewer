import React from 'react';
import Toolbar from './components/Toolbar';
import { observer } from 'mobx-react';
import ThemeStore, { ThemeStoreContext } from './modules/store/ThemeStore';
import GraphStore, { GraphStoreContext } from './modules/store/GraphStore';
import { useLocalStore } from './utils/useLocalStore';
import ForceGraph from './components/ForceGraph';

/** Режим работы приложения */
export enum Mode {
  /** Режим библиотеки */
  library = 'library',
  /** Демо-режим */
  demo = 'demo',
}

type Props = {
  /** Режим работы приложения: Библиотека или Демо-режим */
  mode: Mode;
  /** Данные о вершинах и ребрах метаграфа в виде строки */
  graphString: string;
};

const App: React.FC<Props> = ({ mode, graphString }: Props) => {
  const graphStore = useLocalStore(() => new GraphStore(graphString));

  return (
    <ThemeStoreContext.Provider value={ThemeStore}>
      <GraphStoreContext.Provider value={graphStore}>
        {mode === Mode.demo && <Toolbar />}
        <ForceGraph />
      </GraphStoreContext.Provider>
    </ThemeStoreContext.Provider>
  );
};

export default observer(App);
