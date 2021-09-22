import React from 'react';

const ToolBoxItem = ({ name, icon }) => {
  return (
    <button className="toolbox-item">
      <div className="toolbox-item-icon">{icon}</div>
      <div className="toolbox-item-name">{name}</div>
    </button>
  );
};

export default ToolBoxItem;
