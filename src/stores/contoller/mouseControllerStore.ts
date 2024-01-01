import { defineStore } from "pinia"
import { ref } from "vue"

export const useMouseControllerStore = defineStore('mouseController', () => {
    const mousePosition=ref({x:0,y:0})
    const getPositionInMap=()=>{

        return mousePosition.value;
    }
    const setPosition=(x:number,y:number)=>{
        mousePosition.value.x=x;
        mousePosition.value.y=y;
    }
    return { getPositionInMap,setPosition }
  })
  