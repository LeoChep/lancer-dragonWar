
import { SocketMan } from './../../tools/socketMan';
import { EasyServer } from "../easyServer";
import type { EasyClient } from '../../client/easyClient';
export class EasyServerReciver {
    peerMan: SocketMan;
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
    //注入reply函数，在接受信息时候调用recieve
    constructor(id?: string) {
      this.serverIns = new EasyServer();
      this.serverIns.reply = (msg: string, id: string) => {
        this.send(msg, id);
      };
      this.peerMan = new SocketMan(id);
      this.peerMan.onOpen((id) => {
        this.serverIns.id = id;
        this.isInited = true;
        for (let onInitFn of this.onInitFns) {
          onInitFn();
        }
      });
      this.peerMan.onRecive((msg, conn) => {
        const id = conn.url;
        this.serverIns.recive(msg, id);
      });
      this.peerMan.onConnect((conn) => {
        const id = conn.url;
        let existFlag = false;
        for (let subscriber of this.serverIns.subscribers) {
          if (subscriber.id == id) existFlag = true;
        }
        if (!existFlag) {
          const client = {} as EasyClient;
          client.id = id;
          this.serverIns.subscribers.push(client);
        }
      });
    }
    //用于回复请求的函数
    send(msg: string, id: string) {
      //这里本来应该调用send，但是先用广播
      this.peerMan.sentTo(id, msg);
    }
  }
  