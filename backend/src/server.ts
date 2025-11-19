import http from "http";
import app from "./app";
import { config } from "./config/env";
import { SocketManager } from "./websocket/socket.manager";

const server = http.createServer(app);
const socketManager = new SocketManager();

server.on("upgrade", (request, socket, head) => {
  socketManager.handleUpgrade(request, socket, head);
});

server.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`WebSockets enabled`);
});
