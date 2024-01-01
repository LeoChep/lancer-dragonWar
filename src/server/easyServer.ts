import { parseDiceFormula } from "@/tools/DiceFormulaTrans";
import { useScenesStore } from "./../stores/sceneStore";
import type { EasyClient } from "@/client/easyClient";

export function sendToClients(res: string) {}
export class EasyServer {
  connections: any[] | undefined;
  subscribers: EasyClient[];
  id: string | undefined;
  //回复函数，用于外部注入
  reply = (msg: string, id: string) => {};
  constructor() {
    this.subscribers = [];
  }
  recive(msg: string, id: string): void {
    //应用有一层外置的reciver封装，用于接收信息，再传给这层
    //reciver直接被其他调用

    //正常应该监听peerjs，然后调用事件系统进行处理，最后广播更新
    //peerjs由reciver的peerMan负责，
    //peerMan只负责接受和发送peerjs消息，
    //reciver会创建其对应的peerMan，
    //peerMan保留他的connections
    //peerMan包含一个peer对象
    //这里没有事件系统，直接进行判断，后续需要修改
    console.log("recive", msg);
    if (msg == "requestScene") {
      console.log("some one requestScene");
      const sceneStore = useScenesStore();
      const state = sceneStore.getState();
      const data = JSON.stringify(state);
      this.reply(JSON.stringify({ type: "replyScene", data: data }), id);
      return;
    }
    if (/^register/.test(msg)) {
      const textContent = msg.split(" ");
      if (textContent[1]) {
        const name = textContent[1];
        for (let client of this.subscribers) {
          if (client.id == id) client.name = name;
        }
      }
      return;
    }
    if (/^\.r/.test(msg)) {
      console.log('server roll')
      const textContent = msg.split(" ");
      const diceInput = textContent[1];
      const diceF = parseDiceFormula(diceInput);
      const resultValue = diceF.getValue();
      let name = "";
      for (let client of this.subscribers) {
        if (client.id == id) name = client.name as string;
      }
      const result = {
        text: diceF.toString(),
        diceResultArr: diceF.diceResultArr,
        value: resultValue,
        roller:name
      };
      //   console.log(diceF.diceResultArr);
      const data = result;
      this.broadcast(JSON.stringify({ type: "rollResult", data: data }));
      return;
    }
    //
    //这里直接广播给每个订阅者
    this.broadcast(msg);
  }

  broadcast(msg: string): void {
    for (let client of this.subscribers) {
      const id = client.id as string;
      this.reply(msg, id);
    }
  }
}
