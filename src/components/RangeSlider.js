import React, { useRef, useState } from 'react';
import './RangeSlider.scss';

const RangeSlider = ({
  min,
  max,
  value,
  handleChange,
  makeBeautifulNumbers,
}) => {
  const beautifulDifference = useRef(0);
  const step = min + max < 100 ? (min + max) / 100 : 1;

  if (makeBeautifulNumbers) {
    beautifulDifference.current = min + max / 2;
  }

  return (
    <div className="range-slider">
      <p className="range-slider-number range-slider-min">
        {min - beautifulDifference.current}
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
          {Math.round(value - beautifulDifference.current)}
        </div>
      </div>
      <p className="range-slider-number range-slider-max">
        {max - beautifulDifference.current}
      </p>
    </div>
  );
};

export default RangeSlider;
