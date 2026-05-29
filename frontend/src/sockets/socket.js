import { io } from "socket.io-client";

// 🔌 Connect to backend server
export const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", {
  autoConnect: false, // we connect manually after login
});