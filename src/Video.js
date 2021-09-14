import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { AgoraVideoPlayer } from "agora-rtc-react";

const Video = ({ tracks, user }) => {
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / user.length + 1), 4));
  }, [tracks, user]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={gridSpacing}>
        <AgoraVideoPlayer
          style={{ height: "100", width: "100" }}
          videoTrack={tracks[1]}
        />
      </Grid>
      {user.length > 0 &&
        user.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer
                  key={user.uid}
                  style={{
                    height: "100",
                    width: "100",
                  }}
                  videoTrack={user.videoTrack}
                />
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
};

export default Video;
