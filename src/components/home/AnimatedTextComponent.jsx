import React, { useEffect, useState, useRef } from 'react';

import '../../App.css'


const SlideTextComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current visible text index
    const texts = [
      "Upload Excel/CSV files and instantly create PostgreSQL tables.",
      "Control who can access your data with public, private, or protected tables.",
      "Work together with your team as changes are updated in real-time.",
      "Store and manage your files with secure file storage.",
      "Integrate your data with external APIs",
    ];
  
    // Function to handle the animation sequence
    useEffect(() => {
      const timer = setTimeout(() => {
        if (currentIndex < texts.length - 1) {
          setCurrentIndex(currentIndex + 1); // Show the next text
        } else {
          setCurrentIndex(0); // Restart from the first text
        }
      }, 2000); // Adjust the delay between texts (e.g., 2 seconds)
  
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [currentIndex, texts.length]);
  
    return (
      <div className="">
        {texts.map((text, index) => (
          <h1
            key={index}
            className={`text-3xl font-medium  my-5 ${
              index === currentIndex ? 'slide-in' : 'hidden'
            }`}
          >
            {text}
          </h1>
        ))}
      </div>
    );
  };

  export default SlideTextComponent;