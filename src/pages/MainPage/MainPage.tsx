import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import BoardList from '../../components/BoardList/BoardList';
import dict from '../../data/dict';
import './MainPage.scss';

function MainPage() {
  const { isAuth, lang } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    }
  }, [isAuth]);

  return (
    <div className="narrow-container">
      <h1 className="board__title">{dict[lang].yourWorkspace}</h1>
      <BoardList />
    </div>
  );
}

export default MainPage;
