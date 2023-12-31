import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { SongProvider } from './hooks/useData';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SongProvider>
    <App />
  </SongProvider>,
);
