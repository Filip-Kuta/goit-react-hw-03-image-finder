import React, { useEffect } from 'react';
import './Modal.css';

function Modal({ selectedImage, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &#x2715;
        </span>
        <img
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          className="modal-image"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

export default Modal;
