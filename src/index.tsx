import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App, { Mode } from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App mode={Mode.demo} />
  </React.StrictMode>,
);
