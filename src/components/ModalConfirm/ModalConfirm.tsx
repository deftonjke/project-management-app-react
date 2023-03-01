import { MouseEvent, useContext } from 'react';
import { createPortal } from 'react-dom';
import { AppContext } from '../../App';
import dict from '../../data/dict';
import { ModalConfirmation } from '../../data/interfaces';
import './ModalConfirm.scss';

export default function ModalConfirm({ modalCallback, showModal, message }: ModalConfirmation) {
  const runCallback = () => {
    modalCallback();
    showModal(false);
  };

  const { lang } = useContext(AppContext);

  return createPortal(
    <div
      className="modal-overlay"
      onClick={() => showModal(false)}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <div
        className="modal-content"
        onKeyDown={() => {}}
        role="button"
        onClick={(e: MouseEvent) => e.stopPropagation()}
        tabIndex={0}
      >
        <div className="modal-header">
          {message}
          <button
            className="modal-cross"
            type="button"
            aria-label="toggle"
            onClick={() => showModal(false)}
          />
        </div>
        <div className="modal-buttons-container">
          <button className="ok-button modal-button" type="button" onClick={runCallback}>
            <i className="fa-solid fa-triangle-exclamation excl-red" />
            OK
          </button>
          <button
            className="cancel-button modal-button"
            type="button"
            onClick={() => showModal(false)}
          >
            {dict[lang].cancelText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}
