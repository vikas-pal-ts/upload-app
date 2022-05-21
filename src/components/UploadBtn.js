import React from "react";

const UploadBtn = ({ onChange }) => {
  return (
    <div className="upload-btn-wrapper">
      <button className="btn">Upload a file</button>
      <input type="file" name="myfile" onChange={onChange} />
    </div>
  );
};

export default UploadBtn;
