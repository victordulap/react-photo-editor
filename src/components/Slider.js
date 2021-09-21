import React, { useEffect, useRef } from 'react';
import './Slider.scss';

const getPositionX = (event) => {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
};

const Slider = ({ slidesData, children }) => {
  const sliderRef = useRef();
  const sliderContainerRef = useRef();

  const isDragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationId = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', touchEnd);

    return () => {
      window.removeEventListener('resize', touchEnd);
    };
  }, []);

  useEffect(() => {
    currentTranslate.current = 0;
    prevTranslate.current = 0;
    setSliderPosition();
  }, [slidesData]);

  function touchStart(event) {
    isDragging.current = true;
    startPos.current = getPositionX(event);

    animationId.current = requestAnimationFrame(animation);
    sliderRef.current.style.cursor = 'grabbing';
  }

  const animation = () => {
    setSliderPosition();
    if (isDragging.current) requestAnimationFrame(animation);
  };

  const setSliderPosition = () => {
    sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
  };

  function touchMove(event) {
    if (isDragging.current) {
      const currentPosition = getPositionX(event);
      currentTranslate.current =
        prevTranslate.current + currentPosition - startPos.current;
    }
  }

  function touchEnd() {
    isDragging.current = false;
    cancelAnimationFrame(animationId.current);
    prevTranslate.current = currentTranslate.current;

    if (currentTranslate.current > 0) {
      currentTranslate.current = 0;
      prevTranslate.current = 0;
      setSliderPosition();
    }

    if (
      -currentTranslate.current >
      sliderRef.current.scrollWidth - sliderContainerRef.current.clientWidth
    ) {
      currentTranslate.current = -(
        sliderRef.current.scrollWidth - sliderContainerRef.current.clientWidth
      );
      prevTranslate.current = -(
        sliderRef.current.scrollWidth - sliderContainerRef.current.clientWidth
      );
      setSliderPosition();
    }
    sliderRef.current.style.cursor = 'grab';
  }

  return (
    <div
      className="slider-container"
      onTouchStart={touchStart}
      onMouseDown={touchStart}
      onTouchMove={touchMove}
      onMouseMove={touchMove}
      onTouchEnd={touchEnd}
      onTouchCancel={touchEnd}
      onMouseUp={touchEnd}
      onMouseLeave={() => {
        if (isDragging.current) touchEnd();
      }}
      ref={sliderContainerRef}
    >
      <ul className={`slider`} ref={sliderRef}>
        {children}
      </ul>
    </div>
  );
};

export default Slider;
