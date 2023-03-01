import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import { LANG_EN, LANG_RU } from '../../data/constants';
import './Header.scss';
import CreateBoardBar from '../CreateBoardBar/CreateBoardBar';
import dict from '../../data/dict';

function Header() {
  const { lang, switchLang, isAuth, logoutUser } = useContext(AppContext);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);

  const changeLang = () => {
    if (lang === LANG_RU) {
      switchLang(LANG_EN);
      localStorage.setItem('pmapp34-lang', LANG_EN);
    } else if (lang === LANG_EN) {
      switchLang(LANG_RU);
      localStorage.setItem('pmapp34-lang', LANG_RU);
    }
  };

  const handleScroll = () => {
    if (window.pageYOffset <= 12) {
      setFixed(false);
    } else if (window.pageYOffset > 12) {
      setFixed(true);
    }
  };

  const toggleNavbar = () => {
    setNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={!isFixed ? 'header' : 'header header-fixed'} id="header">
      <nav className="narrow-container header-menu-container">
        <Link to="/welcome" className="nav-inner nav-app-logo" onClick={closeNavbar}>
          RS Project Management App
        </Link>
        <div
          className={`nav-overlay ${isNavOpen ? 'show-nav-overlay' : ''} `}
          onClick={closeNavbar}
        >
          <ul className={`nav-wrapper ${isNavOpen ? 'nav-show' : ''}`}>
            {isAuth && (
              <li className="nav-item">
                <button
                  type="button"
                  className="header-button nav-inner"
                  onClick={() => setIsCreateBoardOpen(true)}
                >
                  <span>
                    <i className="fa-solid fa-plus" />
                    {dict[lang].header.newBoard}
                  </span>
                </button>
                {isCreateBoardOpen && (
                  <CreateBoardBar setIsCreateBoardOpen={setIsCreateBoardOpen} />
                )}
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink to="/search" className="nav-inner">
                  <span>
                    <i className="fa-solid fa-magnifying-glass" />
                    {dict[lang].header.search}
                  </span>
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink to="/profile" className="nav-inner">
                  <span>
                    <i className="fa-solid fa-user" />
                    {dict[lang].header.editProfile}
                  </span>
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink to="/" className="nav-inner">
                  <span>
                    <i className="fa-solid fa-clipboard-check" />
                    {dict[lang].header.mainPage}
                  </span>
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <button
                  type="button"
                  className="header-button nav-inner"
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  <span>
                    <i className="fa-solid fa-right-from-bracket" />
                    {dict[lang].buttons.signOut}
                  </span>
                </button>
              </li>
            )}

            {!isAuth && (
              <li className="nav-item">
                <NavLink to="/login" className="main-nav-btn main-nav-btn-dark main-btn-narrow">
                  <i className="fa-solid fa-user-lock" />
                  {dict[lang].buttons.signIn}
                </NavLink>
              </li>
            )}

            {!isAuth && (
              <li className="nav-item">
                <NavLink to="/registration" className="main-nav-btn">
                  <i className="fa-solid fa-user-check" /> {dict[lang].buttons.signUp}
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <button
                type="button"
                className={
                  lang === LANG_EN
                    ? 'header-button lang-button'
                    : 'header-button lang-button lang-button-red'
                }
                onClick={changeLang}
              >
                {lang}
              </button>
            </li>
          </ul>
        </div>
        <button className="header-burger" type="button" onClick={toggleNavbar}>
          <i className="fa-solid fa-bars" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
