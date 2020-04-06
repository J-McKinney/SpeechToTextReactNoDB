// import React, { Component } from "react";
// import { ReactMic } from "react-mic";
// import "./Recorder.css";

// class Recorder extends Component {
//   state = {
//     record: false
//   };

//   startRecording = () => {
//     this.setState({
//       record: true
//     });
//   };

//   stopRecording = () => {
//     this.setState({
//       record: false
//     });
//   };

//   onData(recordedBlob) {
//     console.log("chunk of real-time data is: ", recordedBlob);
//   }

//   onStop(recordedBlob) {
//     console.log("recordedBlob is: ", recordedBlob);
//   }

//   render() {
//     return (
//       <div>
//         <ReactMic
//           record={this.state.record}
//           visualSetting="frequencyBars" // defaults -> "sinewave".  Other option is "frequencyBars"
//           className="sound-wave"
//           onStop={this.onStop}
//           onData={this.onData}
//           strokeColor="#000000" // sinewave or frequency bar color
//           backgroundColor="#FF4081" // background color
//           mimeType="audio/mp3" // defaults -> "audio/mp3"
//           echoCancellation={false} // defaults -> false
//           autoGainControl={false} // defaults -> false
//           noiseSuppression={false} // defaults -> false
//           channelCount={2} // defaults -> 2 (stereo).  Specify 1 for monospeaker.
//           />
//         <button onClick={this.startRecording} type="button">
//           Start
//         </button>
//         <button onClick={this.stopRecording} type="button">
//           Stop
//         </button>
//       </div>
//     );
//   }
// }

// export default Recorder;

import React, { Component } from "react";
import { ReactMic } from "react-mic";
import "./Recorder.css";

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadLinkURL: null,
      isRecording: false,
      // these 2 go into the prototype
      recordingStarted: false,
      recordingStopped: false
      // these 2 go into the prototype
    };
  }

  stopRecording = () => {
    this.setState({ isRecording: false });
  };

  onSave = blobObject => {
    this.setState({
      downloadLinkURL: blobObject.blobURL
    });
  };

  onStart = () => {
    // console.log("You can tap into the onStart callback");
  };

  onStop = blobObject => {
    this.setState({ blobURL: blobObject.blobURL });
  };

  onData(recordedBlob) {
    // console.log('ONDATA CALL IS BEING CALLED! ', recordedBlob);
  }

  onBlock() {
    alert("ya blocked me!");
  }

  startRecording = () => {
    this.setState({
      isRecording: true,
      recordingInSession: true,
      // these 2 go into the prototype
      recordingStarted: true,
      recordingStopped: false,
      // these 2 go into the prototype
      isPaused: false
    });
  };

  stopRecording = () => {
    this.setState({
      isRecording: false,
      recordingInSession: false,
      recordingStarted: false,
      recordingStopped: true
    });
  };

  render() {
    const {
      blobURL,
      // downloadLinkURL,
      isRecording,
      recordingInSession,
      // recordingStarted,
      // recordingStopped
    } = this.state;

    // const recordBtn = recordingInSession
    //   ? "fa disabled fa-record-vinyl fa-fw"
    //   : "fa fa-record-vinyl fa-fw";
    // const stopBtn = !recordingStarted
    //   ? "fa disabled fa-stop-circle"
    //   : "fa fa-stop-circle";
    // const downloadLink = recordingStopped
    //   ? "fa fa-download"
    //   : "fa disabled fa-download";

    return (
      <div>
        <div id="project-wrapper">
          <div id="project-container">
            <div id="overlay" />
            <div id="content">
              <h2>React-Mic</h2>
              <h3>Record Audio As A WebM Audio File</h3>
              <ReactMic
                className="oscilloscope"
                record={isRecording}
                backgroundColor="#333333"
                visualSetting="sinewave"
                audioBitsPerSecond={128000}
                onStop={this.onStop}
                onStart={this.onStart}
                onSave={this.onSave}
                onData={this.onData}
                onBlock={this.onBlock}
                onPause={this.onPause}
                strokeColor="#0096ef"
              />
              <div id="oscilloscope-scrim">
                {!recordingInSession && <div id="scrim" />}
              </div>

              {/*<div id="controls">
                <div className="column active">
                  <i
                    onClick={this.startRecording}
                    className={recordBtn}
                    aria-hidden="true"
                  />
                </div>
                <div className="column">
                  <i
                    onClick={this.stopRecording}
                    className={stopBtn}
                    aria-hidden="true"
                  />
                </div>
                <div className="column download">
                  <a
                    className={downloadLink}
                    href={downloadLinkURL}
                    download={`recording.webm`}
                  />
                </div>
              </div>*/}

            </div>
            <div id="audio-playback-controls">
              <audio
                ref="audioSource"
                controls="controls"
                src={blobURL}
                controlsList="nodownload"
              />
            </div>
            <button onClick={this.startRecording} type="button">
              Start
            </button>
            <button onClick={this.stopRecording} type="button">
              Stop
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Recorder;
