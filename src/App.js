import { useEffect, useRef, useState } from 'react';
import './App.scss';
import Slider from './components/Slider';
import ToolBoxItem from './components/ToolBoxItem';
import {
  RiContrastDrop2Line,
  RiDropFill,
  RiContrastLine,
  RiArrowLeftSLine,
} from 'react-icons/ri';
import { AiOutlineFire } from 'react-icons/ai';
import { IoColorFilterOutline } from 'react-icons/io5';
import { MdBlurOn } from 'react-icons/md';
import { BiMoon, BiSun } from 'react-icons/bi';
import RangeSlider from './components/RangeSlider';

const DEFAULT_TOOLBOX = [
  {
    id: 1,
    name: 'brightness',
    icon: <BiSun />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
  },
  {
    id: 2,
    name: 'contrast',
    icon: <RiContrastLine />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
  },
  {
    id: 3,
    name: 'saturation',
    icon: <RiContrastDrop2Line />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
  },
  {
    id: 4,
    name: 'grayscale',
    icon: <RiDropFill />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
  },
  {
    id: 5,
    name: 'sepia',
    icon: <AiOutlineFire />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
  },
  {
    id: 6,
    name: 'hue rotate',
    icon: <IoColorFilterOutline />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
  },
  {
    id: 7,
    name: 'blur',
    icon: <MdBlurOn />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [toolboxOptions, setToolboxOptions] = useState(DEFAULT_TOOLBOX);
  const [selectedToolBoxOption, setSelectedToolBoxOption] = useState(null);
  const [firstInit, setFirstInit] = useState(false);
  const [isSliderInUse, setIsSliderInUse] = useState(false);
  const lastPosition = useRef(0);

  useEffect(() => {
    setFirstInit(false);
  });

  useEffect(() => {
    setFirstInit(true);
  }, []);

  const handleRangeSliderChange = ({ target }) => {
    setToolboxOptions((prevOptions) => {
      setSelectedToolBoxOption((oldOption) => {
        return { ...oldOption, value: target.value };
      });

      return prevOptions.map((option) => {
        if (option.id !== selectedToolBoxOption.id) return option;
        return { ...option, value: target.value };
      });
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="container">
          <h1>LIGHTROOM</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn-switch-dark-mode"
          >
            {darkMode ? (
              <BiSun className="icon" />
            ) : (
              <BiMoon className="icon" />
            )}
          </button>
        </div>
      </header>
      <main className="editing-image">
        <div className="container">
          <div className="image-container">
            <div className="image"></div>
          </div>
        </div>
      </main>
      <footer className="toolbox">
        {selectedToolBoxOption === null ? (
          <Slider
            className="toolbox-items"
            animateOnInit={firstInit}
            whenSliderInUse={() => setIsSliderInUse(true)}
            whenSliderNotInUse={() => setIsSliderInUse(false)}
          >
            {toolboxOptions.map((option) => {
              return (
                <ToolBoxItem
                  icon={option.icon}
                  name={option.name}
                  key={option.id}
                  handleClick={() =>
                    isSliderInUse ? {} : setSelectedToolBoxOption(option)
                  }
                  lastPosition={lastPosition.current}
                />
              );
            })}
          </Slider>
        ) : (
          <div className="toolbox-slider">
            <button
              className="toolbox-slider-back"
              onClick={() => setSelectedToolBoxOption(null)}
            >
              <RiArrowLeftSLine />
            </button>
            <ToolBoxItem
              name={selectedToolBoxOption.name}
              icon={selectedToolBoxOption.icon}
              noclick
            />
            <RangeSlider
              min={selectedToolBoxOption.min}
              max={selectedToolBoxOption.max}
              value={selectedToolBoxOption.value}
              handleChange={handleRangeSliderChange}
            />
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
