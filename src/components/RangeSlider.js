import React, { useRef, useState } from 'react';
import './RangeSlider.scss';

const RangeSlider = ({ min, max, value, handleChange, showNegativeNumber }) => {
  const difference = useRef(0);
  const step = min + max < 100 ? (min + max) / 100 : 1;

  if (showNegativeNumber) {
    difference.current = min + max / 2;
  }

  return (
    <div className="range-slider">
      <p className="range-slider-number range-slider-min">
        {min - difference.current}
      </p>
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
          {Math.round(value - difference.current)}
        </div>
      </div>
      <p className="range-slider-number range-slider-max">
        {max - difference.current}
      </p>
    </div>
  );
};

export default RangeSlider;
