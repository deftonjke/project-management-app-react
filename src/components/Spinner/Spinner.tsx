import { createPortal } from 'react-dom';
import './Spinner.scss';

export default function Spinner() {
  return createPortal(
    <div className="modal-spinner">
      <div id="spinner-bott-circle ">
        <svg
          id="loading-spinner"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            id="loading-circle-large"
            cx="40"
            cy="40"
            r="36"
            stroke="#005CB9"
            strokeWidth="8"
          />
        </svg>
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}
