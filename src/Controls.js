import { useState } from "react";
import { useClient } from "./settings";
import { Grid, Button } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import { ExitToApp } from "@material-ui/icons";

const Controls = ({ tracks, setIncall, setStart }) => {
  const [trackState, setTrackState] = useState({ audio: true, video: true });
  const client = useClient();

  const toggle = async (input) => {
    if (input === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((prevState) => {
        return { ...prevState, audio: !prevState.audio };
      });
    } else {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((prevState) => {
        return { ...prevState, video: !prevState.video };
      });
    }
  };

  const leaveCall = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setIncall(false);
    setStart(false);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => toggle("audio")}
        >
          {trackState.audio ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => toggle("video")}
        >
          {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => leaveCall()}>
          {<ExitToApp />}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Controls;
