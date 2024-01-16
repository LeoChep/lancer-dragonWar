import { BridgeWorker } from "./BridgeWorker";

export class Bridge{
    isOpen: boolean ;
    id: string ;
    worker:BridgeWorker
    init(id?: string) {
       return this.worker.init(id);
    };
    sentTo(id: string, msg: any){
        this.worker.sentTo(id,msg)
    }
    broadcast(msg: any){
        this.worker.broadcast(msg)
    } ;
}