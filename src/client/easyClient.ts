import { useScenesStore } from "./../stores/sceneStore";
import { EasyServer } from "./../server/easyServer";
import { Updater } from "../component/controller/updater";
import { useDirector } from "@/stores/perform/director";
import { useMessagesStore } from "@/stores/messagesStore";
//不应该在这里，应该拆分更多层分别交给对应的逻辑链路计算，并有对应的逻辑链路调用对应的store
export function excuteResponse(res: string) {
  const command = res;
  try {
    const replyObject = JSON.parse(res);
    if (replyObject.type == "replyScene") {
      useScenesStore().load(replyObject.data);
    }
    if (replyObject.type == "rollResult") {
      const speaker={} as any
      speaker.name=replyObject.data.roller
      useMessagesStore().push(
        replyObject.data.roller +
          "rolled" +
          replyObject.data.text +
          "=" +
          replyObject.data.value,
          speaker
      );
    }
  } catch {}

  if (/^create/.test(command)) {
    const updater = new Updater();
    const textContent = command.split(" ");
    if (textContent) {
      const actor = {} as any;
      if (textContent[1]) {
        actor.type = textContent[1];
      }
      if (textContent[2]) {
        actor.name = textContent[2];
        actor.postion = {};
      }
      if (textContent[3]) {
        actor.postion.x = parseInt(textContent[3]);
      }
      if (textContent[4]) {
        actor.postion.y = parseInt(textContent[4]);
      }
      updater.actors = [actor];
      const sceneStroe = useScenesStore();
      sceneStroe.update(updater);
    }
  }
  if (/^move/.test(command)) {
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
  console.log("testspeak", command);
  if (/^speak/.test(command)) {
    console.log(command);
    const messageStroe = useMessagesStore();
    const textContent = command.split(" ");
    if (textContent[1]) {
      const message = JSON.parse(textContent[1]);
      messageStroe.push(message.messageString, message.speaker);
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

export class EasyClient {
  server: EasyServer | undefined;
  id: string | undefined;
  name: string | undefined;
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
  send(msg: string): void {}
}
