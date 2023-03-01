import { useContext, useState } from 'react';
import deleteTask from '../../api/deleteTask';
import validateUser from '../../api/_validateUser';
import { AppContext } from '../../App';
import dict from '../../data/dict';

import { SearchTaskCard } from '../../data/interfaces';
import { toastWarnDark } from '../../utils/toast';
import CardModal from '../CardModal/CardModal';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import './SearchTaskInfo.scss';

export default function SearchTaskInfo({
  id,
  order,
  userId,
  boardId,
  columnId,
  title,
  description,
  loadTasks,
}: SearchTaskCard) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isModalOpen, showModal] = useState(false);
  const { logoutUser, setSpinner, lang } = useContext(AppContext);
  const handleShowCard = () => {
    setIsCardOpen(true);
  };

  const onDelete = async () => {
    const userData = await validateUser(logoutUser, setSpinner, lang);
    if (userData) {
      if (userData.id === userId) {
        await deleteTask(boardId, columnId, id, logoutUser, setSpinner, lang);
        await loadTasks();
      } else {
        toastWarnDark(dict[lang].toastRemoveWarn);
      }
    }
  };

  return (
    <>
      <div className="search-task-info" onClick={handleShowCard}>
        <div className="search-task-field search-task-name">{title}</div>
        <div className="search-task-field  search-task-descr">{description}</div>
      </div>
      {isCardOpen && (
        <CardModal
          task={{ id, title, order, description, userId, boardId, columnId }}
          boardId={boardId}
          columnId={columnId}
          setIsCardOpen={setIsCardOpen}
          loadBoard={loadTasks}
          showModal={showModal}
        />
      )}
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={<p>{dict[lang].confirmTaskRemove}</p>}
          modalCallback={onDelete}
        />
      )}
    </>
  );
}
