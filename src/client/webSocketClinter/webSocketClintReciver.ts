import { SocketMan } from './../../tools/socketMan';
// import { PeerMan } from "@/tools/peerMan";
import { EasyClient } from "../easyClient";
import { EasyServer } from "@/server/easyServer";
import { LStorage } from "@/tools/storageMan";
export class WebSocketClientReciver {
  private peerMan: SocketMan;
  clientIns: EasyClient;
  private isInited = false;
  //用于外部注入的钩子
  onInitFns = [() => {}];
  onInit(fn: () => void) {
    this.onInitFns.push(fn);
    if (this.isInited) {
      fn();
    }
  }
  
  constructor() {
    this.clientIns = new EasyClient();
    this.peerMan = new SocketMan("client"+Date.now());
    this.peerMan.onOpen((id) => {
      this.clientIns.id = id;
      this.isInited = true;
      for (let onInitFn of this.onInitFns) {
        onInitFn();
      }
    });
    this.peerMan.onRecive((msg) => {
      this.clientIns.recive(msg);
    });
  }
  sendToServer(msg: any) {
    //实际上应该用send方法，但是这里先用广播
    // console.log("sendto ",this.peerMan)
    console.log("sendToServer in clinet")
    this.peerMan.broadcast(msg);
  }
  connect(id: string) {
    console.log("start connect");
    this.peerMan.connect(id);
    //这个操作本该有专门的store负责，目前还没有
    LStorage.set("connectRoom", { name: id });
    LStorage.set("serverRoom", null);
    const server = new EasyServer();
    server.id = id;
    this.clientIns.setServer(server);
  }
  clear(){
    for (let conn of this.peerMan.conns)
      {
        conn[1].close()
      }
    this.peerMan.conns.clear()
  }
}
