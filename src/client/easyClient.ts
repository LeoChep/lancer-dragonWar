import { EasyServer } from "./../server/easyServer";
import { useScenesStore } from "../stores/sceneStore";
import { Updater } from "../component/controller/updater";
import { useDirector } from "@/stores/perform/director";
export function excuteResponse(res: string) {
  const command = res;
  if (/^create/.test(command)) {
    const updater = new Updater();
    const textContent = command.split(" ");
    if (textContent) {
      const actor = {} as any;
      if (textContent[1]) {
        actor.name = textContent[1];
        actor.postion = {};
      }
      if (textContent[2]) {
        actor.postion.x = parseInt(textContent[2]);
      }
      if (textContent[3]) {
        actor.postion.y = parseInt(textContent[3]);
      }
      updater.actors = [actor];
      const sceneStroe = useScenesStore();
      sceneStroe.update(updater);
    }
  }
  if (/^export/.test(command)) {
    const textContent = command.split(" ");
    if (textContent[1]) {
      const sceneStroe = useScenesStore();
      const sceneState = sceneStroe.getState();
      const ele = document.createElement("a");
      let blob = new Blob([JSON.stringify(sceneState)]);
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(blob);
      var filename = textContent[1] + ".json";
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
  if (/^setCamere/.test(command)) {
    console.log(command);
    const director = useDirector();
    console.log(command);
    const camereState = director.getCamereState();

    const textContent = command.split(" ");
    if (textContent[1]) {
      camereState.x = 0;
      camereState.x = parseInt(textContent[1]);
    }
    if (textContent[2]) {
      camereState.y = 0;
      camereState.y = parseInt(textContent[2]);
    }
  }
}
//这里暂时没有服务端，直接发送给自己的接收端
//暂时弃用，现在直接使用reciver发送
export function sendToServer(msg: string) {
  //这里本来应该调用client的发送接口，但是由于没有接入peerjs系统，所以直接调用server的方法
  // EasyClient.instans.send(msg)
  // EasyClient.instans.server?.recive(msg);
  //excuteResponse(msg)
}
export class EasyClient {
  server: EasyServer | undefined;
  id:string | undefined;
  connection: any;
  static instans: EasyClient;
  setServer(serverIns: EasyServer): void {
    this.server = serverIns;
  }
  constructor() {}
  static setIns(clientIns: EasyClient): void {
    EasyClient.instans = clientIns;
  }

  recive(msg: string): void {
    //应用有一层外置的reciver封装，用于接收信息，再传给这层
    //reciver直接被其他调用
    //创建房间、游戏时，会初始化对应的reciver（包括server的和clint的）
    //server再接到连接的时候，也会创建对应的clint对象
    excuteResponse(msg);
  }
  //todo 发送信息给server，操控指令实际上只进行send和recive
  //暂时弃用
  send(msg:string):void{

  }
}
