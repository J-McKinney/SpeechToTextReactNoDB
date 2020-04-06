import React from "react";
import Dictaphone from "./components/SpeechRecognition/Dictaphone";
import Recorder from "./components/Recorder/Recorder";

function App() {
  return (
    <div>
      <Recorder />
      <Dictaphone />
    </div>
  );
}

export default App;
