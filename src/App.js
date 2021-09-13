import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

function App() {
  const [isVideoCall, setIsVideoCall] = useState(false);
  return (
    <div className="App">
      {isVideoCall ? (
        <VideoCall />
      ) : (
        <Button color="primary" onClick={() => setIsVideoCall(true)}></Button>
      )}
    </div>
  );
}

export default App;
