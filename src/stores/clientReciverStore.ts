import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import { EasyServerReciver } from "@/server/easyServerReciver";
import { LStorage } from "@/tools/storageMan";
import { EasyClientReciver } from "@/client/easyClientReciver";

export const useClientReciverStore = defineStore("clientReciver", () => {
  const ins = ref() as Ref<EasyClientReciver>
  const index = ref(0);
  const loding = ref(false);
  const init = () => {
    const clientReciver = new EasyClientReciver();
    function checkHasConnectRoom() {
      const server = LStorage.get("serverRoom");
      if (server)
        return;
      //这个操作本该有专门的store负责，目前还没有
      const connectServer = LStorage.get("connectRoom");
      
      const connectServerID = connectServer?.name;
      if (connectServerID != undefined && connectServerID != null) {
        clientReciver.peerMan.onConnect(() => {
          console.log("requestScene");
          clientReciver.sendToServer("requestScene");
        });
        clientReciver.connect(connectServerID);
      
      }
    }
    index.value++;
    console.log(index.value);
    clientReciver.onInit(() => {
      checkHasConnectRoom();
    });
    ins.value = clientReciver;
  };
  const getIns = () => {
    if (!ins.value&&!loding.value) {
      loding.value = true;
      init();
    }
    return ins.value;
  };
  return { getIns };
});
