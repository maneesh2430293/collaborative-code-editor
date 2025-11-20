import http from "http";
import app from "./app";
import { config } from "./config/env";
import { SocketManager } from "./websocket/socket.manager";

const server = http.createServer(app);
const socketManager = new SocketManager();

server.on("upgrade", (request, socket, head) => {
  socketManager.handleUpgrade(request, socket, head);
});

const currentKey = process.env.GEMINI_API_KEY || "";
console.log("--- DEBUG KEY ---");
console.log("Key exists:", !!currentKey);
console.log("First 4 chars:", currentKey.substring(0, 4));
console.log("Last 4 chars:", currentKey.substring(currentKey.length - 4));
console.log("Total length:", currentKey.length);
console.log("-----------------");

server.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`WebSockets enabled`);
});
