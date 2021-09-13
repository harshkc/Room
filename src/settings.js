import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "f9c44285324744bd9b624eb5b99993ee";
const token =
  "006f9c44285324744bd9b624eb5b99993eeIACGsPPbDO46EsNHVBuKsoWUN/fVwn6lP5TfTfOWHFsTGuLcsooAAAAAEADZzsCBe1Q/YQEAAQB6VD9h";

export const config = { mode: "rtc", codec: "v8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks =
  createMicrophoneAndCameraTracks(config);
export const channelName = "main";
