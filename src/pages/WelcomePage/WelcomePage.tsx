import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import './WelcomePage.scss';

function WelcomePage() {
  const { lang, isAuth } = useContext(AppContext);

  return (
    <div className="front-wrapper">
      <section className="front-sec-one">
        <div className="front-content-wrapper">
          <div className="sec-one-left">
            <h2 className="main-title-heading">{dict[lang].welcomePage.titleMain}</h2>
            <p className="front-content-paragraph">{dict[lang].welcomePage.paragraphMain}</p>
            <div className="buttons-head-top">
              {isAuth && (
                <NavLink to="/" className="main-nav-btn">
                  <i className="fa-solid fa-circle-arrow-left" />
                  {dict[lang].buttons.toMainButtonText}
                </NavLink>
              )}
              {!isAuth && (
                <>
                  <NavLink to="/login" className="main-nav-btn main-nav-btn-dark main-btn-narrow ">
                    <i className="fa-solid fa-user-lock" />
                    {dict[lang].buttons.signIn}
                  </NavLink>
                  <NavLink to="/registration" className="main-nav-btn">
                    <i className="fa-solid fa-user-check" /> {dict[lang].buttons.signUp}
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="sec-one-right"></div>
        </div>
      </section>
      <section className="front-sec-two">
        <div className="front-content-wrapper">
          <div className="advantages-descr">
            <div className="front-icon-large">
              <i className="fa-solid fa-people-group" />
            </div>
            <h2>{dict[lang].welcomePage.title1}</h2>
            <p>{dict[lang].welcomePage.paragraph1}</p>
          </div>
          <div className="advantages-video">
            <video autoPlay playsInline loop muted className="video-el">
              <source src="./assets/video/app1.mp4" type="video/mp4" className="jsx-video" />
            </video>
          </div>
        </div>
        <div className="front-content-wrapper">
          <div className="advantages-video">
            <video autoPlay playsInline loop muted className="video-el">
              <source src="./assets/video/app2.mp4" type="video/mp4" className="jsx-video" />
            </video>
          </div>
          <div className="advantages-descr reorder-desc">
            <div className="front-icon-large">
              <i className="fa-solid fa-list-check" />
            </div>
            <h2>{dict[lang].welcomePage.title2}</h2>
            <p>{dict[lang].welcomePage.paragraph2}</p>
          </div>
        </div>
        <div className="front-content-wrapper">
          <div className="advantages-descr">
            <div className="front-icon-large">
              <i className="fa-solid fa-clipboard-list" />
            </div>
            <h2>{dict[lang].welcomePage.title3}</h2>
            <p>{dict[lang].welcomePage.paragraph3}</p>
          </div>
          <div className="advantages-video">
            <video autoPlay playsInline loop muted className="video-el">
              <source src="./assets/video/app3.mp4" type="video/mp4" className="jsx-video" />
            </video>
          </div>
        </div>
      </section>

      <section className="front-sec-three">
        <div className="front-content-wrapper"></div>
      </section>
      <section className="front-sec-four">
        <div className="front-content-wrapper">
          <h2 className="front-sec-title">{dict[lang].welcomePage.teamTitle}</h2>
          <div className="team-wrapper">
            <div className="pers-card-wrapper">
              <h3 className="pers-card-name">
                {dict[lang].welcomePage.teamName1}
                <a
                  href="https://github.com/tlkv"
                  target="_blank"
                  rel="noreferrer"
                  className="pers-card-link"
                >
                  <i className="fa-brands fa-github" />
                </a>
              </h3>
              <div className="pers-card-photo pers-photo-1"></div>
              <div className="pers-card-details">
                <div className="pers-card-done">
                  <ul>
                    <li>{dict[lang].welcomePage.team1done1}</li>
                    <li>{dict[lang].welcomePage.team1done2}</li>
                    <li>{dict[lang].welcomePage.team1done3}</li>
                    <li>{dict[lang].welcomePage.team1done4}</li>
                    <li>{dict[lang].welcomePage.team1done5}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pers-card-wrapper">
              <h3 className="pers-card-name">
                {dict[lang].welcomePage.teamName2}
                <a
                  href="https://github.com/deftonjke"
                  target="_blank"
                  rel="noreferrer"
                  className="pers-card-link"
                >
                  <i className="fa-brands fa-github" />
                </a>
              </h3>
              <div className="pers-card-photo pers-photo-2"></div>
              <div className="pers-card-details">
                <div className="pers-card-done">
                  <ul>
                    <li>{dict[lang].welcomePage.team2done1}</li>
                    <li>{dict[lang].welcomePage.team2done2}</li>
                    <li>{dict[lang].welcomePage.team2done3}</li>
                    <li>{dict[lang].welcomePage.team2done4}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
