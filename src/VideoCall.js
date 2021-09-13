import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core/Grid";

import {
  useMicrophoneAndCameraTracks,
  useClient,
  channelName,
  config,
} from "./settings";

import Controls from "./Controls";
import Video from "./Video";

const VideoCall = (props) => {
  const { setIncall } = props;
  const [user, setUser] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUser((prevUsers) => {
            return [...prevUsers, user];
          });
        } else {
          user.audioTrack.play();
        }
      });
      client.on("user-unpublished", async (user, mediaType) => {
        if (mediaType === "video") {
          setUser((prevUsers) => {
            return prevUsers.filter((u) => u.id !== user.id);
          });
        } else {
          user.audioTrack.stop();
        }
      });

      client.on("user-left", async (user) => {
        setUser((prevUsers) => {
          return prevUsers.filter((u) => u.id !== user.id);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (e) {
        console.log(e);
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [client, ready, tracks]);

  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid item style={{ height: "5%" }}>
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setIncall={setIncall} />
        )}
      </Grid>
      <Grid item style={{ height: "95%" }}>
        {start && tracks && <Video tracks={tracks} users={user} />}
      </Grid>
    </Grid>
  );
};

export default VideoCall;