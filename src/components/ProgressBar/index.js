import React from "react";
import "./progressbar.css";

const ProgressBar = ({ progessPercent = 0, text }) => {
  return (
    <div id="myProgress">
      <div
        id="myBar"
        style={{ width: `${progessPercent >= 100 ? 100 : progessPercent}%` }}
      >
        <span className="progressText">
          {" "}
          {progessPercent >= 100 ? "Completed" : `${progessPercent}%`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
