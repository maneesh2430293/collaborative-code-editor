import { Injectable } from '@angular/core';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollaborationService {
  private ydoc: Y.Doc;
  private provider: WebsocketProvider | null = null;

  constructor() {
    this.ydoc = new Y.Doc();
  }

  connect(roomName: string): WebsocketProvider {
    if (this.provider) {
      this.provider.destroy();
    }

    //Opens a WebSocket connection to your backend
    this.provider = new WebsocketProvider(
      environment.wsUrl,
      roomName,
      this.ydoc
    );

    this.provider.on('status', (event: any) => {
      console.log('WebSocket status:', event.status); // 'connected' or 'disconnected'
    });

    return this.provider;
  }

  getSharedText(propName: string = 'codemirror'): Y.Text {
    return this.ydoc.getText(propName);
  }

  getAwareness() {
    return this.provider?.awareness;
  }

  disconnect() {
    if (this.provider) {
      this.provider.destroy();
      this.provider = null;
    }
    this.ydoc.destroy();
  }

  setUserIdentity(name: string, color: string) {
    if (!this.provider) return;

    this.provider.awareness.setLocalStateField('user', {
      name: name,
      color: color,
      colorLight: color,
    });
  }
}
