// import React, { useState, useEffect } from 'react';
// import './App.css';
// import ImageGallery from 'components/ImageGallery/ImageGallery';
// import Button from 'components/Button/Button';
// import Modal from 'components/Modal/Modal';
// import Searchbar from 'components/Searchbar/Searchbar';
// import Loader from 'components/Loader/Loader';

// function App() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [searched, setSearched] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false); // Nowy stan do obsługi ładowania kolejnych obrazków

//   const getImages = async (inputValue, page) => {
//     const url = 'https://pixabay.com/api/';
//     const API_KEY = '36983819-2a28e5f2d6d84dd81a7d40a9f';
//     const perPage = 12;

//     try {
//       const response = await fetch(
//         `${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
//       );
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       throw error;
//     }
//   };

//   const handleSearchImages = async (searchTerm) => {
//     try {
//       const response = await getImages(searchTerm, 1);
//       setImages(response.hits);
//       setCurrentPage(1);
//       setSearched(true);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     }
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   const handleLoadMore = async () => {
//     const nextPage = currentPage + 1;
//     setLoadingMore(true); // Rozpoczęcie ładowania
//     try {
//       const response = await getImages('', nextPage);
//       setImages((prevImages) => [...prevImages, ...response.hits]);
//       setCurrentPage(nextPage);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     } finally {
//       setLoadingMore(false); // Zakończenie ładowania
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getImages('nature', 1);
//         setImages(response.hits);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchData();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleKeyDown = (event) => {
//     if (event.key === 'Escape') {
//       handleCloseModal();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, );

//   return (
//     <div className="App">
//       <h1>Image Gallery</h1>
//       <Searchbar onSearch={handleSearchImages} />

//       {!searched ? (
//         <p></p>
//       ) : loading ? (
//         <Loader />
//       ) : images.length > 0 ? (
//         <>
//           <ImageGallery images={images} onImageClick={handleImageClick} />
//           {loadingMore ? (
//             <Loader />
//           ) : (
//             <Button onClick={handleLoadMore}>Load More</Button>
//           )}
//         </>
//       ) : (
//         <p>No images to display.</p>
//       )}

//       {selectedImage && (
//         <Modal selectedImage={selectedImage} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

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

  const handleSearchImages = async (searchTerm) => {
    try {
      const response = await getImages(searchTerm, 1);
      setImages(response.hits);
      setCurrentPage(1);
      setSearched(true);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setLoadingMore(true);
    try {
      const response = await getImages('', nextPage);
      setImages((prevImages) => [...prevImages, ...response.hits]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoadingMore(false);
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

  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <Searchbar onSearch={handleSearchImages} />

      {!searched ? (
        <p></p>
      ) : loading ? (
        <Loader />
      ) : images.length > 0 ? (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {loadingMore ? (
            <Loader />
          ) : (
            <Button onClick={handleLoadMore}>Load More</Button>
          )}
        </>
      ) : (
        <p>No images to display.</p>
      )}

      {selectedImage && (
        <Modal selectedImage={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
