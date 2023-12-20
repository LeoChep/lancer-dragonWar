import { PeerMan } from "@/tools/peerMan";
import { EasyServer } from "./easyServer";
import { EasyClient } from "@/client/easyClient";

export class EasyServerReciver {
  peerMan: PeerMan;
  serverIns: EasyServer;
  isInited = false;
  //用于外部注入的钩子
  onInitFns = [() => {}];
  onInit(fn: () => void) {
    this.onInitFns.push(fn);
    if (this.isInited) {
      fn();
    }
  }
  constructor(id?:string) {
    this.serverIns = new EasyServer();
    this.serverIns.reply = (msg: string, id: string) => {
      this.send(msg, id);
    };
    this.peerMan = new PeerMan(id);
    this.peerMan.onOpen((id) => {
      this.serverIns.id = id;
      this.isInited = true;
      for (let onInitFn of this.onInitFns) {
        onInitFn();
      }
    });
    this.peerMan.onRecive((msg, conn) => {
      const id = conn.connectionId;
      this.serverIns.recive(msg, id);
    });
    this.peerMan.onConnect((conn) => {
      const id = conn.connectionId;
      const client = new EasyClient();
      client.id = id;
      this.serverIns.subscribers.push(client);
    });
  }
  //用于回复请求的函数
  send(msg: string, id: string) {
    //这里本来应该调用send，但是先用广播
    this.peerMan.broadcast(msg);
  }
}
