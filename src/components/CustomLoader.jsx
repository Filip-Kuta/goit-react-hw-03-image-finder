import React from 'react';
import { Oval } from 'react-loader-spinner';
import './Loader.css';

export default function CustomLoader() {
  return (
    <div className="loader-container">
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="blue"
        secondaryColor="white"
      />
    </div>
  );
}
