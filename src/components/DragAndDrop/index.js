import React, { Component } from "react";
import UploadBtn from "../UploadBtn";
import "./dragAndDrop.css";
class DragAndDrop extends Component {
  state = {
    drag: false,
    custodianPopup: false,
    custodianName: "",
    filesList: [],
  };
  dropRef = React.createRef();
  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };

  handleGetDragFiles = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const filesList = e.dataTransfer.files;
    this.setState({ drag: false, custodianPopup: true });
    if (filesList && filesList.length > 0) {
      this.setState({ filesList: filesList });
      this.handleDrop(filesList);
      this.dragCounter = 0;
      e.dataTransfer.clearData();
    }
  };

  handleDrop = (files) => {
    if (files.length) {
      this.setState({ filesList: files });
    } else {
      alert("No image selected");
    }
  };
  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleGetDragFiles);
  }
  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }
  render() {
    console.log(this.state, "this.state.dragging");
    return (
      <div className="container">
        {!this.state.custodianPopup ? (
          <div className="dragContainer" ref={this.dropRef}>
            <div className="dragOuterContainer">
              <div className="dragInnerContainer">
                <UploadBtn
                  onChange={(e) => {
                    this.handleDrop(e.target.files);
                    this.setState({ custodianPopup: true });
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Custodian Name"
              onChange={(e) => {
                this.setState({ custodianName: e.target.value });
              }}
            />
            <button
              onClick={() => {
                if (this.state.custodianName) {
                  this.props.handleDrop(
                    this.state.filesList,
                    this.state.custodianName
                  );
                  this.setState({ custodianPopup: false });
                } else {
                  alert("Please enter Custodian Name");
                }
              }}
            >
              Submit
            </button>
          </div>
        )}

        <div className="selectedFilesContainer">{this.props.children}</div>
      </div>
    );
  }
}
export default DragAndDrop;
