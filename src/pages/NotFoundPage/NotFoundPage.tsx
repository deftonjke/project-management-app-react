import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './NotFoundPage.scss';

function NotFoundPage() {
  const { lang } = useContext(AppContext);

  return (
    <div className="narrow-container">
      <div className="not-found-vector" />
      <div className="not-found-button-wrapper">
        <NavLink to="/" className="main-nav-btn">
          <i className="fa-solid fa-circle-arrow-left" />
          {dict[lang].buttons.toMainButtonText}
        </NavLink>
      </div>
    </div>
  );
}

export default NotFoundPage;
