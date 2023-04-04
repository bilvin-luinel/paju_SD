import { useState, useEffect } from 'react';
import React from 'react';

function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNext, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const currentImage = images[currentIndex];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      ))}
      {/* <button onClick={goToPrev}>이전</button>
      <button onClick={goToNext}>다음</button> */}
    </div>
  );
}

export default ImageGallery;