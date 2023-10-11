import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GetListsResponse } from '@lib/shared_types';
import axios from 'axios';

import useData from '@/hooks/useData';

import HeaderBar from './components/HeaderBar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PlaylistPage from './pages/PlaylistPage';

// import { env } from './utils/env';

function App() {
  return (
    <>
      <Router>
        <HeaderBar></HeaderBar>
        <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/:id" element={<PlaylistPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
