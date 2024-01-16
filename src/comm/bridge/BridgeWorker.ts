import { Bridge } from "./Bridge";

type BridgeConn = any;
export interface BridgeWorker {
  config: any;
  brigde: Bridge;
  isOpen: boolean ;
  id: string ;
  conns: Map<String, BridgeConn>;
  //逻辑是与服务器上的ws建立连接，然后发送身份消息，
  //服务器上的ws接受到连接后，将请求移入未名花名册，然后获得身份消息后，找到未名花名册中对应的，注册到服务器的clienter中去
  init(id?: string) : BridgeWorker;
  sentTo(id: string, msg: any):void
  broadcast(msg: any):void ;
  openListen(conn: BridgeConn):void;
 
}
