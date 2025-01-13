import { io } from "socket.io-client";

export const socket = io(process.env.BACKEND_HOST, {
  withCredentials: true,
  transports: ["websocket"],
});
