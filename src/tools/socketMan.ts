
export class SocketMan {
  config={url:""}
  man: SocketMan;

  id: string | undefined;
  conns: Map<String,WebSocket>;
  constructor(id?: string) {
    this.man=this;
    this.conns=new Map();
    this.id=id;

  }

  onOpen(fn: (id: string) => void) {
    
  }
  //逻辑是与服务器上的ws建立连接，然后发送身份消息，
  //服务器上的ws接受到连接后，将请求移入未名花名册，然后获得身份消息后，找到未名花名册中对应的，注册到服务器的clienter中去
  connect(id: string) {
   const conn=new WebSocket(this.config.url)
   if (conn!=null){
    conn.onopen=()=>{
        for (let fn of this.onConnectFns)
            fn(conn)
    }
    conn.onmessage=(ev:MessageEvent)=>{
        const msg=ev.data;
        this.recive(msg,conn)
    }
   }

  }
  sentTo(id:string,msg:any){
 
  }
  broadcast(msg: any) {
 
  }
  recive(msg: any, conn: WebSocket) {
    for (let fn of this.onReciveFns)
    {
        fn(msg,conn)
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
