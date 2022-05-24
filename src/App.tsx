import React from 'react';
import Toolbar from './components/Toolbar';
import { observer } from 'mobx-react';
import ThemeStore, { ThemeStoreContext } from './modules/store/ThemeStore';
import GraphConnected from './components/GraphConnected';
import GraphStore, { GraphStoreContext } from './modules/store/GraphStore';

export enum Mode {
  library = 'library',
  demo = 'demo',
}

type Props = {
  mode: Mode;
};

const App: React.FC<Props> = ({ mode }: Props) => {
  return (
    <ThemeStoreContext.Provider value={ThemeStore}>
      <GraphStoreContext.Provider value={GraphStore}>
        {mode === Mode.demo && <Toolbar />}
        <GraphConnected />
      </GraphStoreContext.Provider>
    </ThemeStoreContext.Provider>
  );
};

export default observer(App);
