import React from 'react';

function ImageGalleryItem({ image, onClick }) {
  return (
    <div className="gallery-item" onClick={onClick}>
      <img src={image.webformatURL} alt={image.tags} className="gallery-image" />
    </div>
  );
}

export default ImageGalleryItem;
