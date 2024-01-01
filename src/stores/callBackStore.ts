import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCallBackStore = defineStore("callBack", () => {
  const length = ref(0);
  const funcArr = [] as ((...value: any[]) => any)[];
  const addCallBackHook = (func: (...value: any[]) => any) => {
    length.value++;
    funcArr.push(func)
    return length.value-1;
  };
  const callBack=(id:number,...arg:any[])=>{
    console.log(id,...arg);
    funcArr[id](...arg)
  }
  return {length,addCallBackHook,callBack};
});
