
//不应该在这里，应该拆分更多层分别交给对应的逻辑链路计算，并有对应的逻辑链路调用对应的store

import type { EasyServer } from "@/server/easyServer";
import { EasyClient, excuteResponse } from "./easyClient";

export class IEasyClient {
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
