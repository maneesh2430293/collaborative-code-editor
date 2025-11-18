import { WebSocketServer } from "ws";
import { IncomingMessage } from "http";
const setupWSConnection = require("y-websocket/bin/utils").setupWSConnection;
export class SocketManager {
  private wss: WebSocketServer;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.setupConnectionHandler();
  }

  private setupConnectionHandler() {
    this.wss.on("connection", (ws: any, req: IncomingMessage) => {
      //This library function handles all the heavy lifting for Yjs sync
      setupWSConnection(ws, req);
      console.log("New Client Connected to Room");
    });
  }

  public handleUpgrade(request: any, socket: any, head: any) {
    this.wss.handleUpgrade(request, socket, head, (ws) => {
      this.wss.emit("connection", ws, request);
    });
  }
}
