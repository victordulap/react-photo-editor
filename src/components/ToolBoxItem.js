import React from 'react';

const ToolBoxItem = ({ name, icon }) => {
  return (
    <btn className="toolbox-item">
      <div className="toolbox-item-icon">{icon}</div>
      <div className="toolbox-item-name">{name}</div>
    </btn>
  );
};

export default ToolBoxItem;
