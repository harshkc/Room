import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "f9c44285324744bd9b624eb5b99993ee";
const token =
  "006f9c44285324744bd9b624eb5b99993eeIAAIQ9IJD0uqxpd4uMGxN4upUrNDe7Zb+b05sjFQpSiWq2TNKL8AAAAAEACI9+Re2ZZBYQEAAQDZlkFh";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks =
  createMicrophoneAndCameraTracks(config);
export const channelName = "main";
