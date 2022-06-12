import React from "react";

const PreLoader = () => {
  return (
    <div className="pre-loader">
      <div className="pre-loader-box">
        <div className="loader-logo">
          <img
            src="login/vendors/images/icon-light.png"
            alt
            width="300"
            height="300"
          />
        </div>
        <div className="loader-progress" id="progress_div">
          <div className="bar" id="bar1" />
        </div>
        <div className="percent" id="percent1">
          0%
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default PreLoader;
