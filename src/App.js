import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

function App() {
  const [isVideoCall, setIsVideoCall] = useState(false);
  return (
    <div className="App" style={{ height: "100%" }}>
      {isVideoCall ? (
        <VideoCall setIncall={setIsVideoCall} />
      ) : (
        <div className="welcome">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsVideoCall(true)}
          >
            Join call
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
