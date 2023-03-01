import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constants';
import getBoards from '../../api/getBoards';
import Board from '../Board/Board';
import dict from '../../data/dict';

function BoardList() {
  const { logoutUser, isAuth, boards, dispatchBoards, setSpinner, lang } = useContext(AppContext);
  const navigate = useNavigate();

  const loadBoards = async () => {
    const data = await getBoards(logoutUser, setSpinner, lang);
    if (data) {
      dispatchBoards({ type: SET_BOARDS, payload: data });
    }
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    } else {
      loadBoards();
    }
  }, [isAuth]);

  const boardsArray =
    boards.length &&
    boards.map((board) => (
      <Board key={board.id} id={board.id} title={board.title} description={board.description} />
    ));

  return (
    <div className="board-list">
      {boardsArray || <h3 className="no-data">{dict[lang].noBoards}</h3>}
    </div>
  );
}

export default BoardList;
