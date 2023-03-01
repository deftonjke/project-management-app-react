import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import deleteTask from '../../../api/deleteTask';
import validateUser from '../../../api/_validateUser';
import { AppContext } from '../../../App';
import dict from '../../../data/dict';
import { TaskResponse } from '../../../data/interfaces';
import { toastWarnDark } from '../../../utils/toast';
import CardModal from '../../CardModal/CardModal';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';

function Task({
  task,
  ind,
  boardId,
  columnId,
  userId,
  loadBoard,
}: {
  task: TaskResponse;
  ind: number;
  boardId: string;
  columnId: string;
  userId: string;
  loadBoard: () => Promise<void>;
}) {
  const { logoutUser, setSpinner, lang } = useContext(AppContext);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isModalOpen, showModal] = useState(false);

  const onDelete = async () => {
    const userData = await validateUser(logoutUser, setSpinner, lang);
    if (userData) {
      if (userData.id === userId) {
        await deleteTask(boardId, columnId, task.id, logoutUser, setSpinner, lang);
        await loadBoard();
      } else {
        toastWarnDark(dict[lang].toastRemoveWarn);
      }
    }
  };

  const handleDeletePreviewTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    showModal(true);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={ind + 1}>
        {(provTask, snapTask) => (
          <div
            className={`list__task ${snapTask.isDragging ? 'task-dragging' : ''}`}
            {...provTask.draggableProps}
            {...provTask.dragHandleProps}
            ref={provTask.innerRef}
            onClick={() => setIsCardOpen(true)}
          >
            {task.title}
            <button
              className="list__btn delete light-gr"
              type="button"
              onClick={handleDeletePreviewTask}
            >
              <i className="fa-regular fa-trash-can"> </i>
            </button>
          </div>
        )}
      </Draggable>
      {isCardOpen && (
        <CardModal
          task={task}
          boardId={boardId}
          columnId={columnId}
          setIsCardOpen={setIsCardOpen}
          loadBoard={loadBoard}
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

export default Task;
