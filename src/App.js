import { useState } from 'react';
import './App.scss';
import Slider from './components/Slider';
import ToolBoxItem from './components/ToolBoxItem';
import {
  RiContrastDrop2Line,
  RiDropFill,
  RiContrastLine,
} from 'react-icons/ri';
import { AiOutlineFire } from 'react-icons/ai';
import { IoColorFilterOutline } from 'react-icons/io5';
import { MdBlurOn } from 'react-icons/md';
import { BiMoon, BiSun } from 'react-icons/bi';

const DEFAULT_TOOLBOX = [
  {
    id: 1,
    name: 'brightness',
    icon: <BiSun />,
  },
  {
    id: 2,
    name: 'contrast',
    icon: <RiContrastLine />,
  },
  {
    id: 3,
    name: 'saturation',
    icon: <RiContrastDrop2Line />,
  },
  {
    id: 4,
    name: 'grayscale',
    icon: <RiDropFill />,
  },
  {
    id: 5,
    name: 'sepia',
    icon: <AiOutlineFire />,
  },
  {
    id: 6,
    name: 'hue rotate',
    icon: <IoColorFilterOutline />,
  },
  {
    id: 7,
    name: 'blur',
    icon: <MdBlurOn />,
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [toolboxOptions, setToolboxOptions] = useState(DEFAULT_TOOLBOX);

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
        <Slider className="toolbox-items" animateOnInit={true}>
          {toolboxOptions.map((option) => {
            return (
              <ToolBoxItem
                icon={option.icon}
                name={option.name}
                key={option.id}
              />
            );
          })}
        </Slider>
      </footer>
    </div>
  );
}

export default App;
