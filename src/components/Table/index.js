import React, { useContext, useEffect, useState } from "react";
import { FileListContext } from "../../context/FileListContext";
import FusejsSearch from "../FusejsSearch";
import ProgressBar from "../ProgressBar";
import "./table.css";

const Table = () => {
  const [demoProgress, setDemoProgress] = useState(0);
  const [progressIntervalId, setProgressIntervalId] = useState();
  const { removeItem, searchData } = useContext(FileListContext);

  const data = searchData;

  const handleClearInterval = (progress, intervalId) => {
    if (progress >= 100) {
      clearInterval(intervalId);
    }
  };

  console.log(data, "localData");

  useEffect(() => {
    if (data.length) {
      const theRandomNumber = Math.floor(Math.random() * 10) + 1;
      const interval = setInterval(() => {
        setDemoProgress((progress) => progress + theRandomNumber);
      }, 1000);
      setProgressIntervalId(interval);

      return () => clearInterval(interval);
    }
  }, [data]);
  useEffect(() => {
    if (data.length) {
      handleClearInterval(demoProgress, progressIntervalId);
    }
  }, [demoProgress, data]);

  return (
    <>
      {data.length ? (
        <>
          <FusejsSearch />
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Custodian</th>
                <th>Progress</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item?.id}>
                    <td data-column="Image">
                      <img className="tableImg" alt="test" src={item?.file} />
                    </td>
                    <td data-column="Custodian">{item?.custodianName}</td>
                    <td data-column="Progress">
                      <ProgressBar progessPercent={demoProgress} />
                    </td>
                    <td data-column="Delete">
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          removeItem(item?.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
};

export default Table;
