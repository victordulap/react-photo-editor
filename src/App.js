import { useState } from 'react';
import './App.scss';
import Slider from './components/Slider';
import ToolBoxItem from './components/ToolBoxItem';

const DEFAULT_TOOLBOX = [
  {
    id: 1,
    name: 'brightness',
  },
  {
    id: 2,
    name: 'contrast',
  },
  {
    id: 3,
    name: 'saturation',
  },
  {
    id: 4,
    name: 'grayscale',
  },
  {
    id: 5,
    name: 'sepia',
  },
  {
    id: 6,
    name: 'hue rotate',
  },
  {
    id: 7,
    name: 'blur',
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
          <button onClick={() => setDarkMode(!darkMode)}>
            toggle dark mode
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
        {/* <div className="toolbox-items"> */}
        <Slider className="toolbox-items" slidesData={toolboxOptions}>
          {toolboxOptions.map((option) => {
            return <ToolBoxItem name={option.name} key={option.id} />;
          })}
        </Slider>
        {/* {toolboxOptions.map((option) => {
            return <ToolBoxItem name={option.name} key={option.id} />;
          })} */}
        {/* </div> */}
      </footer>
    </div>
  );
}

export default App;
