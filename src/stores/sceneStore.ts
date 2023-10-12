import { ref, computed } from "vue";
import { defineStore } from "pinia";
interface Message {
  content: string;
  id: number;
}
interface SceneState {
  actorStates: ActorState[];
  
}
interface Position {
  x: number;
  y: number;
}
interface ActorState {
  name: string;
  postion: Position;
}
class Updater {
  actors?: ActorState[];
  update(state: SceneState) {
    if (this.actors && this?.actors?.length > 0)
      for (let updateActor of this.actors) {
        let target;
        for (let temp of state.actorStates) {
          if (temp?.name === updateActor?.name) {
            target = temp;
          }
        }
        if (!target) {
          target = {} as ActorState;
          state.actorStates.push(target)
        }
        Object.assign(target, updateActor);
      }
  }
}
export const useScenesStore = defineStore("scenesStore", () => {
  const sceneStates = ref([
    { actorStates: [] as ActorState[] },
  ] as SceneState[]);
  const index=ref(0)
  //这里本来应该由系统层直接返回sceneState，此处暂时忽略
  function update(updater: Updater) {
    const oldIndex = sceneStates.value.length - 1;
    const oldState = sceneStates.value[oldIndex];
    let newState = {} as SceneState;
    Object.assign(newState, oldState);
    updater.update(newState);
    sceneStates.value.push(newState)
    index.value++;
  }
  function getState(){
    return sceneStates.value[index.value]
  }
  function  load(json:string) {
    let object=JSON.parse(json);
    sceneStates.value.push(object)
    index.value++;
  }
  return { sceneStates ,update,getState ,load};
});
