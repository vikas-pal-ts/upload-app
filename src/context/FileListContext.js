import { createContext, useEffect, useState } from "react";

export const FileListContext = createContext();

export function FileListProvider({ children }) {
  const [fileListData, setFileListData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const setFileList = (listData) => {
    setFileListData(listData);
  };
  const removeItem = (ItemId) => {
    const fileListCopy = [...fileListData];
    const updatedData = fileListCopy.filter((item) => item?.id !== ItemId);
    setFileListData(updatedData);
  };

  const handleSearch = (data) => {
    setSearchData(data);
  };

  useEffect(() => {
    setSearchData(fileListData);
  }, [fileListData]);

  console.log(searchData, fileListData, "searchData");

  const value = {
    setFileList,
    getFileList: fileListData,
    removeItem,
    handleSearch,
    searchData,
  };
  return (
    <FileListContext.Provider value={value}>
      {children}
    </FileListContext.Provider>
  );
}
