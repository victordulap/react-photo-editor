import React from 'react';
import { BiDialpadAlt } from 'react-icons/bi';

const ToolBoxItem = ({ name, icon, disable, handleClick }) => {
  handleClick = () => {
    console.log(name);
  };

  return (
    <button disabled={disable} className="toolbox-item" onClick={handleClick}>
      <div className="toolbox-item-icon">{icon}</div>
      <div className="toolbox-item-name">{name}</div>
    </button>
  );
};

export default ToolBoxItem;
