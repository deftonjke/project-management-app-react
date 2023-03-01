import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sass/App.scss';
import './sass/index.scss';
import './sass/normalize.scss';
import { ROUTES_LIST } from './utils/router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AppContextData, Languages } from './data/interfaces';
import { LANG_EN } from './data/constants';
import { boardsReducer } from './utils/reducers';
import Spinner from './components/Spinner/Spinner';

export const AppContext = createContext({} as AppContextData);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isSpinning, setSpinner] = useState(false);
  const [lang, switchLang] = useState(LANG_EN);
  const [boards, dispatchBoards] = useReducer(boardsReducer, []);

  useEffect(() => {
    if (localStorage.getItem('pmapp34-token')) {
      setIsAuth(true);
    }
  }, [isAuth]);

  useEffect(() => {
    if (localStorage.getItem('pmapp34-lang')) {
      switchLang(localStorage.getItem('pmapp34-lang') as Languages);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('pmapp34-token');
    setIsAuth(false);
  };

  const store = useMemo(
    () => ({
      lang,
      switchLang,
      isAuth,
      setIsAuth,
      boards,
      dispatchBoards,
      logoutUser,
      isSpinning,
      setSpinner,
    }),
    [lang, isAuth, boards, isSpinning]
  );

  return (
    <AppContext.Provider value={store}>
      <ToastContainer limit={3} newestOnTop />
      <BrowserRouter>
        <Header />
        <main className={`main-container ${isSpinning ? 'main-darken' : ''}`}>
          <Routes>
            {ROUTES_LIST.map(({ path, element }, ind) => (
              <Route path={path} element={element} key={`route_${ind + 1}`} />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      {isSpinning && <Spinner />}
    </AppContext.Provider>
  );
}

export default App;
