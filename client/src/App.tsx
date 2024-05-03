import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useCurrentUserQuery, CurrentUser } from './generated';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Books from './components/pages/Books';
import NewBook from './components/pages/NewBook';

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

            <Route path={'/books'} element={<Books />} />
            <Route path={'/books/new'} element={<NewBook />} />
          </Routes>
        </CurrentUserContext.Provider>
      )}
    </BrowserRouter>
  );
}

export default App;
