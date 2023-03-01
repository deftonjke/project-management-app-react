import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import deleteBoard from '../../api/deleteBoard';
import getBoards from '../../api/getBoards';
import { AppContext } from '../../App';
import { SET_BOARDS } from '../../data/constants';
import dict from '../../data/dict';
import { BoardsResponse } from '../../data/interfaces';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import './Board.scss';

function Board({ id, title, description }: BoardsResponse) {
  const { logoutUser, dispatchBoards, setSpinner, lang } = useContext(AppContext);
  const [isModalOpen, showModal] = useState(false);

  const handleDeleteBoard = async () => {
    await deleteBoard(id, logoutUser, setSpinner, lang);
    const updatedBoards = await getBoards(logoutUser, setSpinner, lang);
    if (updatedBoards) {
      dispatchBoards({ type: SET_BOARDS, payload: updatedBoards });
    }
  };

  return (
    <div className="board-item">
      <Link className="board-item__link" to={`/board/${id}`} />
      <div className="board-item__info">
        <div className="board-item__title">{title}</div>
        <div className="board-item__title board-item__title-desc">{description}</div>
        <button type="button" className="board-item__btn" onClick={() => showModal(true)}>
          <i className="fa-regular fa-trash-can"> </i>
        </button>
      </div>
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={<p>{dict[lang].boardDelConfirm}</p>}
          modalCallback={handleDeleteBoard}
        />
      )}
    </div>
  );
}

export default Board;
