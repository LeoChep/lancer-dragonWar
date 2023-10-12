import { defineStore } from "pinia"
import { ref } from "vue";

class CamereState{
    x=0;
    y=0;
}
export const useDirector = defineStore('director', () => {
    const talkDirector ={}
    const camereState=ref(new CamereState())
    const getCamereState=()=>{
        return camereState.value
    }
    return { camereState,getCamereState }
  })
  