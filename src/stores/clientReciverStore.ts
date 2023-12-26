import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { EasyServerReciver } from "@/server/easyServerReciver";
import { LStorage } from "@/tools/storageMan";
import { EasyClientReciver } from "@/client/easyClientReciver";

export const useClientReciverStore = defineStore("clientReciver", () => {
  const ins = ref();

  const init=()=> {
    
    const clientReciver = new EasyClientReciver();
    function checkHasConnectRoom() {
      //这个操作本该有专门的store负责，目前还没有
      const server = LStorage.get("connectRoom"); 
      const serverID = server?.name;
      if (serverID != undefined && serverID != null) {
        clientReciver.peerMan.onConnect(() => {
          console.log("requestScene");
          clientReciver.sendToServer("requestScene");
        });
        clientReciver.connect(serverID);
      }

    }
    clientReciver.onInit(() => {
      checkHasConnectRoom();
    });
    ins.value=clientReciver;
   
  }
  const getIns=()=>{
    if (!ins.value){
        init();
    }
    return ins.value;
  }
  return {getIns};
});
