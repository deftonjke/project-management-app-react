import React, { createRef, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import updateColumn from '../../../api/updateColumn';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';
import dict from '../../../data/dict';

function ColHeader({
  columnId,
  title,
  order,
  boardId,
  loadBoard,
  onDelete,
}: {
  columnId: string;
  title: string;
  order: number;
  boardId: string;
  loadBoard: () => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [isModalOpen, showModal] = useState(false);
  const [isTitleInputShow, setIsTitleInputShow] = useState(false);
  const [colTitle, setColTitle] = useState(title);
  const [isDisabled, setIsDisabled] = useState(false);
  const { logoutUser, setSpinner, lang } = useContext(AppContext);
  const inputTitle = createRef<HTMLInputElement>();

  const cancelTitleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setColTitle(title);
    setIsTitleInputShow(false);
  };

  const submitTitleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = colTitle.replace(/\s+/g, ' ').trim();

    if (!finalTitle) {
      setColTitle(title);
      setIsTitleInputShow(false);
      return;
    }

    if (finalTitle === title) {
      setIsTitleInputShow(false);
      return;
    }

    setIsDisabled(true);
    const res = await updateColumn(
      boardId,
      columnId,
      order,
      logoutUser,
      setSpinner,
      lang,
      finalTitle
    );

    if (res) {
      await loadBoard();
      setColTitle(finalTitle);
    } else {
      setColTitle(title);
    }

    setIsDisabled(false);
    setIsTitleInputShow(false);
  };

  useEffect(() => {
    if (inputTitle.current) inputTitle.current.focus();
  }, [isTitleInputShow]);

  return (
    <div className="list__header">
      {isTitleInputShow ? (
        <>
          <form onSubmit={submitTitleChange}>
            <input
              className="list__title-input"
              value={colTitle}
              ref={inputTitle}
              onChange={(e) => setColTitle(e.target.value)}
              disabled={isDisabled}
            />
          </form>
          <button
            className="list__btn accept"
            type="submit"
            onClick={submitTitleChange}
            disabled={isDisabled}
          >
            <i className="fa-solid fa-check"> </i>
          </button>
          <button className="list__btn" type="button" onClick={(e) => cancelTitleChange(e)}>
            <i className="fa-solid fa-xmark"> </i>
          </button>
        </>
      ) : (
        <>
          <h3 className="list__title" onClick={() => setIsTitleInputShow(true)}>
            {title}
          </h3>
          <button className="list__btn delete" type="button" onClick={() => showModal(true)}>
            <i className="fa-regular fa-trash-can"> </i>
          </button>
        </>
      )}
      {isModalOpen && (
        <ModalConfirm
          showModal={showModal}
          message={<p>{dict[lang].colDeleteWarn}</p>}
          modalCallback={onDelete}
        />
      )}
    </div>
  );
}

export default ColHeader;
