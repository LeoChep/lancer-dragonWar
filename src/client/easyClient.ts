import { useScenesStore } from "../stores/sceneStore"
import { Updater } from "../component/controller/updater"
import { useDirector } from "@/stores/perform/director";
export function excuteResponse(res: string) {
    const command=res;
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
export function sendToServer(msg:string){
  excuteResponse(msg)
}
class EasyClient{
  server:any;
  connection:any;
  
}