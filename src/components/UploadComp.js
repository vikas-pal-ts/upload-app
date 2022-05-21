import React, { useContext, useState } from "react";
import { FileListContext } from "../context/FileListContext";
import DragAndDrop from "./DragAndDrop";
import Table from "./Table";

const UploadComp = () => {
  const [files, setFiles] = useState([]);
  const { setFileList } = useContext(FileListContext);

  const handleDrop = (inputFiles, custodianName) => {
    let fileList = [...files];
    for (let i = 0; i < inputFiles.length; i++) {
      if (!inputFiles[i].name) return;
      fileList.push({
        file: URL.createObjectURL(inputFiles[i]),
        custodianName: custodianName,
        id: `${Date.now()}_${i}_${Math.floor(Math.random() * 100)}`,
      });
    }
    setFileList(fileList);
    setFiles(fileList);
  };

  return (
    <DragAndDrop handleDrop={handleDrop}>
      <Table data={files} />
    </DragAndDrop>
  );
};

export default UploadComp;
