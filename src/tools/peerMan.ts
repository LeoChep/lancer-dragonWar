import { Peer } from "peerjs";
import type { DataConnection } from "peerjs";
export class PeerMan {
  peer: Peer;
  id: string | undefined;
  conns: Map<String,DataConnection>;
  constructor(id?: string) {
    if (id) {
      this.peer = new Peer(id,{
        host: 'localhost',
        port: 9000,
        path: '/myapp'
      });
    } else {
      this.peer = new Peer({
        host: 'localhost',
        port: 9000,
        path: '/myapp'
      });
    }

    this.conns = new Map();
  }

  onOpen(fn: (id: string) => void) {
    this.peer.on("open", (id) => {
      // console.log("My peer ID is: " + id);
      this.id = id;
      fn(id);
    });
    this.peer.on("connection", (conn) => {
      for (let temp of this.conns) {
        if (temp[1].peer == conn.peer){
          temp[1].close();
          this.conns.delete(temp[1].peer)
        } 
      }
      conn.on("data", (data) => {
        this.recive(data, conn);
      });
      conn.on("close", () => {
        console.log("disconnect",conn);
      });
      this.conns.set(conn.peer,conn);
      for (let onConnectFn of this.onConnectFns) {
        onConnectFn(conn);
      }
    });
  }
  connect(id: string) {
    for (let temp of this.conns) {
      if (temp[1].peer == id){
        temp[1].close();
        this.conns.delete(temp[1].peer)
      } 
    }
    var conn = this.peer.connect(id);
    conn.on("open", () => {
 
      this.conns.set(id,conn);
      // Receive messages
      conn.on("data", (data) => {
        this.recive(data, conn);
      });
      conn.on("close", () => {
        console.log("disconnect",conn);
    
      });
      console.log("connect open");
      // Send messages
      this.broadcast("Hello!");
      for (let onConnectFn of this.onConnectFns) {
        onConnectFn(conn);
      }
    });
  }
  sentTo(id:string,msg:any){
    let index = 0;
    for (let conn of this.conns) {
      index++;
      console.log("eval",id,conn[1].peer)
      if (id == conn[1].peer)
      conn[1].send(msg);
    }
    console.log("Send", msg + this.id, this.conns);
  }
  broadcast(msg: any) {
    let index = 0;
    for (let conn of this.conns) {
      index++;
      conn[1].send(msg);
    }
    console.log("Send", msg + this.id, this.conns);
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
