import { useEffect, useRef, useState } from 'react';
import './App.scss';
import Slider from './components/Slider';
import ToolBoxItem from './components/ToolBoxItem';
import {
  RiContrastDrop2Line,
  RiDropFill,
  RiContrastLine,
  RiArrowLeftSLine,
  RiFileUploadLine,
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
    function: 'brightness',
    showNegativeNumber: true,
  },
  {
    id: 2,
    name: 'contrast',
    icon: <RiContrastLine />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
    function: 'contrast',
    showNegativeNumber: true,
  },
  {
    id: 3,
    name: 'saturation',
    icon: <RiContrastDrop2Line />,
    min: 0,
    max: 200,
    value: 100,
    unit: '%',
    function: 'saturate',
    showNegativeNumber: true,
  },
  {
    id: 4,
    name: 'grayscale',
    icon: <RiDropFill />,
    min: 0,
    max: 100,
    value: 0,
    unit: '%',
    function: 'grayscale',
  },
  {
    id: 5,
    name: 'sepia',
    icon: <AiOutlineFire />,
    min: 0,
    max: 100,
    value: 0,
    unit: '%',
    function: 'sepia',
  },
  {
    id: 6,
    name: 'hue rotate',
    icon: <IoColorFilterOutline />,
    min: 0,
    max: 360,
    value: 0,
    unit: 'deg',
    function: 'hue-rotate',
  },
  {
    id: 7,
    name: 'blur',
    icon: <MdBlurOn />,
    min: 0,
    max: 15,
    value: 0,
    unit: 'px',
    function: 'blur',
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [toolboxOptions, setToolboxOptions] = useState(DEFAULT_TOOLBOX);
  const [selectedToolBoxOption, setSelectedToolBoxOption] = useState(null);
  const [firstInit, setFirstInit] = useState(false);
  const [isSliderInUse, setIsSliderInUse] = useState(false);
  const [filter, setFilter] = useState('none');
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
  );
  const [isImageClicked, setIsImageClicked] = useState(false);
  const imageInputRef = useRef('image-input');

  useEffect(() => {
    setFirstInit(false);
  });

  useEffect(() => {
    setFirstInit(true);

    // Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => setDarkMode(e.matches ? true : false));

    // Setup dark/light mode for the first time
    setDarkMode(
      window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
    );

    // Remove listener
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {});
    };
  }, []);

  useEffect(() => {
    const allFilters = toolboxOptions
      .map((option) => `${option.function}(${option.value}${option.unit})`)
      .join(' ');
    setFilter(allFilters);
  }, [toolboxOptions]);

  const resetFilters = () => {
    setToolboxOptions(DEFAULT_TOOLBOX);
    setSelectedToolBoxOption(null);
  };

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

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0)
      setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageClicked = () => {
    setIsImageClicked(true);
  };

  const handleImageNotClicked = () => {
    setIsImageClicked(false);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="container">
          <h1>VD LIGHT</h1>

          <div
            className="group-btns"
            style={{ height: '100%', display: 'flex', gap: '1rem' }}
          >
            <input
              type="file"
              name="image-upload"
              id="image-upload"
              style={{ display: 'none' }}
              ref={imageInputRef}
              accept="image/*"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => imageInputRef.current.click()}
              className="btn-header"
            >
              <RiFileUploadLine className="icon" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn-header"
            >
              {darkMode ? (
                <BiSun className="icon" />
              ) : (
                <BiMoon className="icon" />
              )}
            </button>
          </div>
        </div>
      </header>
      <main
        className="editing-image"
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
      >
        <div className="container">
          <div className="image-container">
            <div
              className={`image ${isImageClicked ? 'image-clicked' : ''}`}
              style={{
                filter: filter,
                backgroundImage: `url(${image})`,
              }}
              onMouseDown={handleImageClicked}
              onTouchStart={handleImageClicked}
              onMouseUp={handleImageNotClicked}
              onTouchEnd={handleImageNotClicked}
            ></div>
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
              showNegativeNumber={selectedToolBoxOption.showNegativeNumber}
            />
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
