import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { EasyServerReciver } from "@/server/easyServerReciver";
import { LStorage } from "@/tools/storageMan";
import { useClientReciverStore } from "./clientReciverStore";
export const useServerReciverStore = defineStore("serverReciver", () => {
  const ins = ref();
  const id = ref("");
  const peerId = ref("");
  const loding = ref(false);
  const checkHasRoom = () => {
    //这个操作本该有专门的store负责，目前还没有
    const server = LStorage.get("serverRoom"); // }
    const serverID = server?.name;
    if (serverID != undefined && serverID != null)
      return createRoomServer(serverID);
  };
  const createRoomServer = (name: string) => {
    console.log("createRoomServer")
    const serverReciver = new EasyServerReciver(name);
    ins.value = serverReciver;
  
    const clientReciverStore = useClientReciverStore();
    const clientReciver = clientReciverStore.getIns();
    serverReciver.onInit(() => {
      id.value = serverReciver.serverIns.id as string;
      // peerId.value = serverReciver.serverIns.id as string;
      console.log("onInit");
      console.log(clientReciverStore);
      
      clientReciver.onInit(() => {
        console.log("clientReciver onInit increateRoomServer");
        clientReciver.connect(serverReciver.serverIns.id as string);
        //这个操作本该有专门的store负责，目前还没有
        LStorage.set("serverRoom", { name: name });
      });
    });
  };
  const init = () => {
    checkHasRoom();
  };
  const getIns = () => {
    if (!ins.value||loding.value==false) {
      loding.value=true
      init();
    }
    return ins;
  };
  const getId = () => {
    return id.value;
  };
  return { getIns, checkHasRoom, createRoomServer,id };
});
