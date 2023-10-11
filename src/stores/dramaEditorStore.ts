import { defineStore } from "pinia";
import { ref } from "vue";
interface Line {
  content: string;
  index: number;
  type:string;
}
interface dramaEditorState {
  title:string;
  lines: Line[];
}
export const useDramaEditorStore = defineStore("dramaEditorStore", () => {
  const dramaEditorStates = ref([{ lines: [{content:"",index:0,type:""}] ,title:"title"}] as dramaEditorState[]);
  function push(drama: dramaEditorState) {
    dramaEditorStates.value.push(drama);
  }
  function getState() {
    let length = dramaEditorStates.value.length;
    console.log(dramaEditorStates.value)
    return dramaEditorStates.value[length - 1];
  }
  const addLine = (index: number) => {
    let newState = {} as dramaEditorState;
    const oldState = getState();
    Object.assign(newState, oldState);
    dramaEditorStates.value.push(newState);
   
    const lines = newState.lines;
    let oldLine = {} as Line;
    let newLine = { content: "", index: index,type:"" };
    Object.assign(oldLine, lines[index]);
    lines.splice(index, 1, newLine, oldLine);
    let itor = 0;
    for (let line of lines) {
      line.index = itor;
      itor++;
    }
  };
  const deleteLine = (selected: Line) => {
    let newState = {} as dramaEditorState;
    const oldState = getState();
    Object.assign(newState, oldState);
    dramaEditorStates.value.push(newState);
    const lines=newState.lines;
    let index = 0;
    for (let temp of lines) {
      if (selected == temp) {
        lines.splice(index, 1);
        break;
      }
      index++;
    }
  };
  return { dramaEditorStates, push,addLine,deleteLine,getState };
});
