import React, { useContext, useState } from "react";
import { FileListContext } from "../../context/FileListContext";
import FuseSearch from "../../helper/searchHelper";

const FusejsSearch = () => {
  const { getFileList, handleSearch } = useContext(FileListContext);
  const fuseInit = new FuseSearch(getFileList);
  const [searchText, setSearchText] = useState("");
  const handleSubmit = () => {
    const data = fuseInit.doSearch(searchText);
    const filteredData = data.map((item) => {
      return item?.item;
    });
    handleSearch(filteredData);
    setSearchText("");
  };
  return (
    <div style={{ float: "right", marginTop: "30px", marginBottom: "20px" }}>
      <input
        type="text"
        value={searchText}
        placeholder="Search by Custodian Name"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FusejsSearch;
