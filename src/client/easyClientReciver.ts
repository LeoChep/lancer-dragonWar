import { PeerMan } from "@/tools/peerMan";
import { EasyClient } from "./easyClient";
import { EasyServer } from "@/server/easyServer";

export class EasyClientReciver{
    peerMan:PeerMan;
    clientIns:EasyClient;
    isInited = false;
    //用于外部注入的钩子
    onInitFns = [() => {}];
    onInit(fn: () => void) {
      this.onInitFns.push(fn);
      if (this.isInited) {
        fn();
      }
    }
    constructor(){
        this.clientIns=new EasyClient();
        this.peerMan=new PeerMan();
        this.peerMan.onOpen((id)=>{
            this.clientIns.id=id;
            this.isInited = true;
            for (let onInitFn of this.onInitFns) {
                onInitFn();
              }
        })
        this.peerMan.onRecive((msg)=>{
            this.clientIns.recive(msg)
        })
    }
    sendToServer(msg:any){
        //实际上应该用send方法，但是这里先用广播
        this.peerMan.broadcast(msg);
    }
    connect(id:string){
        console.log("start connect")
        this.peerMan.connect(id)

        const server=new EasyServer();
        server.id=id;
        this.clientIns.setServer(server)
    }


}