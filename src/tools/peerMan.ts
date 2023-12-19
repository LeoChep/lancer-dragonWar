import { Peer } from "peerjs";
import type { DataConnection } from "peerjs";
export class PeerMan {
  peer: Peer;
  id: string | undefined;
  conns: DataConnection[];
  constructor() {
    this.peer = new Peer();
    this.conns = [];
  }
  onOpen(fn: (id: string) => void) {
    this.peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      this.id = id;
      fn(id);
    });
    this.peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        this.recive(data, conn);
      });
      this.conns.push(conn);
      for (let onConnectFn of this.onConnectFns) {
        onConnectFn(conn);
      }
    });
  }
  connect(id: string) {
    var conn = this.peer.connect(id);
    conn.on("open", () => {
      this.conns.push(conn);
      // Receive messages
      conn.on("data", (data) => {
        this.recive(data, conn);
      });
      console.log("connect open")
      // Send messages
      this.broadcast("Hello!");
    });
  }
  broadcast(msg: any) {
    let index=0;
    for (let conn of this.conns) {
      index++;
      conn.send(msg);
    }
    console.log("Send",msg+this.id,this.conns);
  }
  recive(msg: any, conn: DataConnection) {
    console.log("Received", msg);
    for (let onReciveFn of this.onReciveFns) {
      onReciveFn(msg, conn);
    }
  }
  onReciveFns = [(msg: string, conn: DataConnection) => {}];
  onRecive(fn: (msg: string, conn: DataConnection) => void) {
    this.onReciveFns.push(fn);
  }
  onConnectFns = [(conn: DataConnection) => {}];
  onConnect(fn: (conn: DataConnection) => void) {
    this.onConnectFns.push(fn);
  }
}
