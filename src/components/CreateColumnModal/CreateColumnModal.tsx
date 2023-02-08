import { createRef, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import createColumn from '../../api/createColumn';
import { FORM_INVALID_MESSAGE, titleRegex } from '../../data/constants';
import { AppContext } from '../../App';
import dict from '../../data/dict';

function CreateColumnModal({
  boardId,
  loadBoard,
  setIsColCreateOpen,
}: {
  boardId: string;
  loadBoard: () => Promise<void>;
  setIsColCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const Container = document.getElementById('modal') as HTMLElement;
  const { logoutUser, setSpinner, lang } = useContext(AppContext);
  const colName = createRef<HTMLInputElement>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isColNameValid = colName.current && titleRegex.test(colName.current.value);

    if (!isColNameValid) {
      setHasError(true);
    } else if (!hasError) {
      setIsDisabled(true);
      const colname = colName.current.value.replace(/\s+/g, ' ').trim();
      const res = await createColumn(boardId, colname, logoutUser, setSpinner, lang);
      if (res) {
        loadBoard();
      }

      setIsColCreateOpen(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (colName.current) {
      colName.current.focus();
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsColCreateOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return ReactDOM.createPortal(
    <div
      className="modal-wrapper"
      role="button"
      tabIndex={0}
      onMouseDown={() => setIsColCreateOpen(false)}
    >
      <div className="create-board" role="presentation" onMouseDown={(e) => e.stopPropagation()}>
        <h3>{dict[lang].addColText}</h3>
        <button
          className="create-board__close-btn"
          type="button"
          aria-label="toggle"
          onClick={() => setIsColCreateOpen(false)}
        ></button>
        <form onSubmit={handleSubmit} className="create-board__form">
          <div className="create-board__field">
            <label htmlFor="column-title">
              {hasError ? (
                <span className="create-board__invalid">{dict[lang].formInv}</span>
              ) : (
                <span>{dict[lang].modalColTitleText}</span>
              )}

              <input
                className="create-board__input"
                name="column-title"
                ref={colName}
                onChange={() => setHasError(false)}
              />
            </label>
          </div>
          <button
            className="create-board__create-btn"
            type="submit"
            disabled={isDisabled || hasError}
          >
            {dict[lang].addText}
          </button>
        </form>
      </div>
    </div>,
    Container
  );
}

export default CreateColumnModal;
