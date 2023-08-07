import React from 'react';
import { BeatLoader } from 'react-spinners';

const CustomLoader = ({ loading }) => {
  return (
    <div className="loader-container">
      <BeatLoader color="#00BFFF" loading={loading} size={15} />
    </div>
  );
};

export default CustomLoader;
