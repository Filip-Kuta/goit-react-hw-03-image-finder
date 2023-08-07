import React, { useState, useEffect } from 'react';
import './App.css';
import ImageSearch from './ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImages = async (inputValue, page) => {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '36983819-2a28e5f2d6d84dd81a7d40a9f';
    const perPage = 12;

    try {
      const response = await fetch(
        `${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleSearchImages = async (searchTerm) => {
    try {
      const response = await getImages(searchTerm, 1);
      setImages(response.hits);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    try {
      const response = await getImages('', nextPage);
      setImages((prevImages) => [...prevImages, ...response.hits]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getImages('nature', 1);
        setImages(response.hits);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    fetchData();
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <ImageSearch onSearch={handleSearchImages} />
      <div className="image-gallery">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            className="gallery-image"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <span className="modal-close" onClick={handleCloseModal}>
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
      )}

      <button onClick={handleLoadMore} className="load-more-button">
        Load More
      </button>
    </div>
  );
}

export default App;
