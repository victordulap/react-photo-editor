import React, { useState } from 'react';
import './RangeSlider.scss';

const RangeSlider = ({ min, max, value, handleChange }) => {
  const step = min + max < 100 && (min + max) / 100;

  return (
    <div className="range-slider">
      <p className="range-slider-number range-slider-min">{min}</p>
      <div className="range-slider-input">
        <input
          type="range"
          name="range-slider"
          id="range-slider"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          step={step}
        />
        <div className="range-slider-number range-slider-value">
          {Math.round(value)}
        </div>
      </div>
      <p className="range-slider-number range-slider-max">{max}</p>
    </div>
  );
};

export default RangeSlider;
