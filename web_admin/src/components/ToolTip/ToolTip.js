import React from "react";
import "./ToolTip.scss";
const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-text">{text}</div>
    </div>
  );
};

export default React.memo(Tooltip);
