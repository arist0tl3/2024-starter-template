import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useCurrentUserQuery, CurrentUser } from './generated';

import Home from './components/pages/Home';
import Login from './components/pages/Login';

export const CurrentUserContext = createContext<CurrentUser | null>(null);

function App() {
  const { data, error, loading } = useCurrentUserQuery();

  if (loading) return <div>{''}</div>;
  if (error) return <div>{`Error: ${error}`}</div>;

  const currentUser = data?.currentUser ?? null;

  return (
    <BrowserRouter>
      {!currentUser && (
        <Routes>
          <Route path={'/'} element={<Login />} />
        </Routes>
      )}

      {currentUser && (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path={'/'} element={<Home />} />
          </Routes>
        </CurrentUserContext.Provider>
      )}
    </BrowserRouter>
  );
}

export default App;
