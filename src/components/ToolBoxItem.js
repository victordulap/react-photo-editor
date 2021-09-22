import React, { useState } from 'react';
import { BiDialpadAlt } from 'react-icons/bi';

const ToolBoxItem = ({ name, icon, disable, handleClick, noclick }) => {
  const [showClickCursor, setShowClickCursor] = useState(false);

  return (
    <button
      disabled={disable}
      className="toolbox-item"
      onClick={handleClick}
      onMouseOver={() => setShowClickCursor(true)}
      onMouseLeave={() => setShowClickCursor(false)}
      style={showClickCursor && !noclick ? { cursor: 'pointer' } : {}}
    >
      <div className="toolbox-item-icon">{icon}</div>
      <div className="toolbox-item-name">{name}</div>
    </button>
  );
};

export default ToolBoxItem;
