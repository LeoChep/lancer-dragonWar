import type { EasyClient } from "@/client/easyClient";

export function sendToClients(res:string){
    
}
export class EasyServer{
    connections:any[] | undefined;
    subscribers:EasyClient[] ;
    id:string | undefined;
    //回复函数，用于外部注入
    reply=(msg:string,id:string)=>{}
    constructor(){
        this.subscribers=[]
    }
    recive(msg:string,id:string):void{
        //应用有一层外置的reciver封装，用于接收信息，再传给这层
        //reciver直接被其他调用

        //正常应该监听peerjs，然后调用事件系统进行处理，最后广播更新
        //peerjs由reciver的peerMan负责，
        //peerMan只负责接受和发送peerjs消息，
        //reciver会创建其对应的peerMan，
        //peerMan保留他的connections
        //peerMan包含一个peer对象
        //
        //这里直接广播给每个订阅者
        this.broadcast(msg)
    }

    broadcast(msg:string):void{
        //本来应该调用peerjs系统，但是由于系统还没有接入，所以这里直接调用client
        for (let client of this.subscribers ){
            const id =client.id as string;
            this.reply(msg,id)
        }
    }
}