import './CreateBoardBar.scss';
import React, { Dispatch, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { SET_BOARDS, titleRegex } from '../../data/constants';
import getBoards from '../../api/getBoards';
import createBoard from '../../api/createBoard';
import { NewBoard } from '../../data/interfaces';
import dict from '../../data/dict';

function CreateBoardBar({
  setIsCreateBoardOpen,
}: {
  setIsCreateBoardOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { logoutUser, dispatchBoards, setSpinner, lang } = useContext(AppContext);
  const [boardIsCreating, setBoardIsCreating] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<NewBoard>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const Container = document.getElementById('modal') as HTMLElement;

  const loadBoards = async () => {
    const data = await getBoards(logoutUser, setSpinner, lang);
    if (data) {
      dispatchBoards({ type: SET_BOARDS, payload: data });
    }
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCreateBoardOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const onSubmit: SubmitHandler<NewBoard> = async (data) => {
    setBoardIsCreating(true);
    const res = await createBoard(
      data.title,
      data.description ? data.description : ' ',
      logoutUser,
      setSpinner,
      lang
    );
    if (res) {
      await loadBoards();
      navigate(`/board/${res.id}`);
    }

    setBoardIsCreating(false);
    setIsCreateBoardOpen(false);
  };

  return ReactDOM.createPortal(
    <div
      className="modal-wrapper"
      role="button"
      onMouseDown={() => setIsCreateBoardOpen(false)}
      tabIndex={0}
    >
      <div className="create-board" role="presentation" onMouseDown={(e) => e.stopPropagation()}>
        <h3>{dict[lang].crBoardText}</h3>
        <button
          className="create-board__close-btn"
          type="button"
          aria-label="toggle"
          onClick={() => setIsCreateBoardOpen(false)}
        ></button>
        <form className="create-board__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="create-board__field">
            <label htmlFor="title">
              {errors.title ? (
                <span className="create-board__invalid">{errors.title.message}</span>
              ) : (
                <span>{dict[lang].crBoardTitle}</span>
              )}

              <input
                className="create-board__input"
                disabled={boardIsCreating}
                {...register('title', {
                  required: dict[lang].formInv,
                  pattern: {
                    value: titleRegex,
                    message: dict[lang].formInv,
                  },
                  onChange: () => clearErrors('title'),
                })}
              />
            </label>
          </div>
          <div className="create-board__field">
            <label htmlFor="description">
              {errors.description ? (
                <span className="create-board__invalid">{errors.description.message}</span>
              ) : (
                <span>{dict[lang].crBoardDescr}</span>
              )}

              <input
                className="create-board__input"
                disabled={boardIsCreating}
                {...register('description')}
              />
            </label>
          </div>
          <button
            className="create-board__create-btn"
            type="submit"
            disabled={!isDirty || !!Object.keys(errors).length}
          >
            {dict[lang].createText}
          </button>
        </form>
      </div>
    </div>,
    Container
  );
}

export default CreateBoardBar;
