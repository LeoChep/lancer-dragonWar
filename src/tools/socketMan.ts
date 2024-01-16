import { id } from "element-plus/es/locale/index.mjs";

class ResData {
  [x: string]: any;
  isRegister: boolean = false;
  id!: string;
}
export class SocketMan {
  static config = { url: "" };
  webSocket: WebSocket;
  isOpen = false;
  id: string | undefined;
  conns: Map<String, WebSocket>;
  //逻辑是与服务器上的ws建立连接，然后发送身份消息，
  //服务器上的ws接受到连接后，将请求移入未名花名册，然后获得身份消息后，找到未名花名册中对应的，注册到服务器的clienter中去
  constructor(id?: string) {
    this.conns = new Map();
    this.id = id;
    const webSocket = new WebSocket(SocketMan.config.url);
    this.webSocket = webSocket;
    if (webSocket != null) {
      webSocket.onopen = () => {
        //要发送一个注册自己id的
        const data = new ResData();
        data.isRegister = true;
        data.id = id as string;
        webSocket.send(JSON.stringify(data));
        this.conns.set("server", webSocket);
        this.isOpen = true;
        this.handleOpen(id as string);
      };
      //发送回来的信息需要简单解包
     this.openListen(webSocket)
    }
  }

  onOpenFns = [(id: string) => {}];
  onOpen(fn: (id: string) => void) {
    if (!this.isOpen) this.onOpenFns.push(fn);
    else fn(this.id as string);
  }
  handleOpen(id: string) {
    for (let fn of this.onOpenFns) {
      fn(id);
    }
  }

  connect(id: string) {}
  sentTo(url: string, msg: any) {
    const conn = this.conns.get(url);
    const reqData = new ResData();
    reqData.msg = msg;
    reqData.id = this.id as string;
    console.log("stringify", JSON.stringify(reqData));
    conn?.send(JSON.stringify(reqData));
  }
  broadcast(msg: any) {
    console.log("broadcast", msg, this.conns);
    this.conns.forEach((conn) => {
      const reqData = new ResData();
      reqData.msg = msg;
      reqData.id = this.id as string;
      console.log("stringify", JSON.stringify(reqData));
      conn?.send(JSON.stringify(reqData));
    });
  }
  openListen(conn: WebSocket){
    conn.onmessage = (ev: MessageEvent) => {
      const data = ev.data.toString();
      console.log("socketMAN", data);
      this.recive(data, conn);
    };
  }
  recive(msg: any, conn: WebSocket) {
    for (let fn of this.onReciveFns) {
      fn(msg, conn);
    }
  }
  onReciveFns = [(msg: string, conn: WebSocket) => {}];
  onRecive(fn: (msg: string, conn: WebSocket) => void) {
    this.onReciveFns.push(fn);
  }
  onConnectFns = [(conn: WebSocket) => {}];
  onConnect(fn: (conn: WebSocket) => void) {
    this.onConnectFns.push(fn);
  }
}
