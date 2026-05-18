import { io } from "socket.io-client";

console.log("SOCKET URL NEW BUILD:", import.meta.env.VITE_SOCKET_URL);

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
});

export default socket;