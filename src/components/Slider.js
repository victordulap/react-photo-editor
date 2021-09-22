import React, { useEffect, useRef, useState } from 'react';
import './Slider.scss';

const getPositionX = (event) => {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
};

const Slider = ({ children, animateOnInit }) => {
  const sliderRef = useRef();
  const sliderContainerRef = useRef();

  const isDragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationId = useRef(null);

  const [contentFits, setContentFits] = useState(false);

  const doesContentFit = () => {
    if (
      sliderRef.current.scrollWidth > sliderContainerRef.current.clientWidth
    ) {
      setContentFits(false);
    } else {
      setContentFits(true);
    }
  };

  useEffect(() => {
    runAnimationOnInit();
    doesContentFit();

    window.addEventListener('resize', runAnimationOnInit);
    window.addEventListener('resize', doesContentFit);

    return () => {
      window.removeEventListener('resize', runAnimationOnInit);
      window.removeEventListener('resize', doesContentFit);
    };
  }, [children]);

  const runAnimationOnInit = () => {
    if (animateOnInit) {
      currentTranslate.current = -(
        sliderRef.current.scrollWidth - sliderContainerRef.current.clientWidth
      );
      prevTranslate.current = -(
        sliderRef.current.scrollWidth - sliderContainerRef.current.clientWidth
      );
      setSliderPosition();
      setTimeout(() => {
        currentTranslate.current = 0;
        prevTranslate.current = 0;
        setSliderPosition();
      }, 400);
    }
  };

  // useEffect(() => {
  //   runAnimationOnInit();
  // }, []);

  function touchStart(event) {
    isDragging.current = true;
    startPos.current = getPositionX(event);

    animationId.current = requestAnimationFrame(animation);
    sliderContainerRef.current.style.cursor = 'grabbing';
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
    sliderContainerRef.current.style.cursor = 'grab';
  }

  return (
    <div
      onTouchStart={(e) => (contentFits ? {} : touchStart(e))}
      onMouseDown={(e) => (contentFits ? {} : touchStart(e))}
      onTouchMove={(e) => (contentFits ? {} : touchMove(e))}
      onMouseMove={(e) => (contentFits ? {} : touchMove(e))}
      onTouchEnd={(e) => (contentFits ? {} : touchEnd(e))}
      onTouchCancel={(e) => (contentFits ? {} : touchEnd(e))}
      onMouseUp={(e) => (contentFits ? {} : touchEnd(e))}
      onMouseLeave={(e) => {
        if (isDragging.current) touchEnd(e);
      }}
      ref={sliderContainerRef}
      className="slider-container"
      style={contentFits ? {} : { cursor: 'grab' }}
    >
      <ul className={`slider`} ref={sliderRef}>
        {children}
      </ul>
    </div>
  );
};

export default Slider;
