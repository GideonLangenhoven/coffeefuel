import React from 'react';
import './LottieIcon.css'; // We'll create a shared CSS for these wrappers

const ProblemIcon1 = () => (
  <div className="lottie-icon-wrapper">
    <dotlottie-player
      src="https://lottie.host/70d9e09a-259e-4f5d-bd09-98e8bb7ad86e/ngRNK3nMQP.lottie"
      background="transparent"
      speed="1"
      loop
      autoplay
      aria-label="Problem Icon 1: Wasted Time"
    ></dotlottie-player>
  </div>
);
export default ProblemIcon1;