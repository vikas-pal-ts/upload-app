import "./App.css";
import UploadBtn from "./components/UploadComp";
import { FileListProvider } from "./context/FileListContext";

function App() {
  return (
    <FileListProvider>
      <UploadBtn />
    </FileListProvider>
  );
}

export default App;
