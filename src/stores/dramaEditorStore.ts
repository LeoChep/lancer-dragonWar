import { defineStore } from "pinia";
import { ref } from "vue";
interface Line {
  content: string;
  index: number;
  type: string;
}

interface Block {
  title: string;
  id: number;
  lines: Line[];
}
class BlockIns implements Block {
  title: string;
  id: number;
  lines: Line[];
  index: number; //状态序号
  blockStates: Block[];
  constructor(id: number) {
    this.title = "";
    this.id = id;
    this.index = 0;
    this.blockStates = [];
    this.lines = [] as Line[];
    const block = { title: this.title, id: this.id, lines: [] as Line[] };
    this.blockStates.push(block);
  }
}
interface DramaState {
  title: string;
  blocks: Block[];
}
interface DramaIns {
  title: string;
  dramaStates: DramaState[];
}
const createEmptyDramaIns = () => {
  const dramaIns = {} as DramaIns;
  dramaIns.title = "title";
  dramaIns.dramaStates = [] as DramaState[];
  const dramaState = {} as DramaState;
  dramaIns.dramaStates.push(dramaState);
  dramaState.title = "title";
  dramaState.blocks = [] as Block[];
  return dramaIns;
};
const createNewBlocks = (dramaIns: DramaIns) => {
  const blocks = [new BlockIns(0)] as BlockIns[];
  const pojoBlock = [] as Block[];
  for (let blockIns of blocks) {
    let block = blockIns.blockStates[blockIns.index];
    pojoBlock.push(block);
  }
  // Object.assign( dramaIns.dramaStates[0].blocks,pojoBlock)
  dramaIns.dramaStates[0].blocks = JSON.parse(JSON.stringify(pojoBlock));
  return blocks;
};
const updateDramaState = (blocks: BlockIns[], dramaIns: DramaIns) => {
  const pojoBlock = [] as Block[];
  for (let blockIns of blocks) {
    let block = blockIns.blockStates[blockIns.index];//获取当前状态
    pojoBlock.push(block);
  } //准备新的block pojo

  let newState = {} as DramaState;
  let oldState = dramaIns.dramaStates[dramaIns.dramaStates.length - 1];
  //Object.assign(newState,oldState);
  newState = JSON.parse(JSON.stringify(oldState));
  newState.blocks = pojoBlock; //在新状态中使用新的blocks数据
  dramaIns.dramaStates.push(newState); //生成新的drama状态
};
export const useDramaEditorStore = defineStore("dramaEditorStore", () => {
  const dramaIns = ref(createEmptyDramaIns());
  const blocks = ref(createNewBlocks(dramaIns.value));
  const getBlock = (blockId: number) => {
    let findIns = null;
    for (let blockIns of blocks.value) {
      if (blockIns.id == blockId) findIns = blockIns;
    }
    return findIns;
  };
  const addBlock=()=>{
    const blockIns=new BlockIns(blocks.value.length);
    blocks.value.push(blockIns);
    updateDramaState(blocks.value,dramaIns.value)
  }
  const addLine = (index: number, blockId: number) => {
    const blockIns = getBlock(blockId) as BlockIns;
    let newState = {} as Block;
    const oldState = blockIns.blockStates[blockIns.blockStates.length - 1];
    //Object.assign(newState, oldState);
    newState = JSON.parse(JSON.stringify(oldState));
    blockIns.blockStates.push(newState);
    const lines = newState.lines;
    let newLine = { content: "", index: index, type: "" };
    if (index < lines.length) {
      //插入
      let oldLine = {} as Line;
      Object.assign(oldLine, lines[index]);
      lines.splice(index, 1, newLine, oldLine);
    } else {
      //新增
      lines.splice(index, 1, newLine);
    }
    let itor = 0;
    for (let line of lines) {
      //重新生存序号
      line.index = itor;
      itor++;
    }
    blockIns.index++;
     updateDramaState(blocks.value,dramaIns.value)//同步更新状态
  };
  const deleteLine = (selected: number, blockId: number) => {
    const blockIns = getBlock(blockId) as BlockIns;
    let newState = {} as Block;
    //todo 获取当前页数
    const oldState = blockIns.blockStates[blockIns.blockStates.length - 1];
    
    //Object.assign(newState, oldState);
    newState = JSON.parse(JSON.stringify(oldState));
    //todo 创建新的分支
    blockIns.blockStates.push(newState);
    const lines = newState.lines;
    let index = 0;
    for (let temp of lines) {
      if (selected == temp.index) {
        lines.splice(index, 1);
        break;
      }
      index++;
    }
    let itor = 0;
    for (let line of lines) {
      //重新生存序号
      line.index = itor;
      itor++;
    }
    console.log(dramaIns);
    blockIns.index++;
    updateDramaState(blocks.value,dramaIns.value)//同步更新状态
  };
  const load=(dramaInfo:string)=>{
     let dramaState= JSON.parse(dramaInfo) as DramaState;
     dramaIns.value.dramaStates.push(dramaState)
     blocks.value=[] as BlockIns[]
     let loadingBlocks=dramaState.blocks;
     let index=0;
     for (let block of loadingBlocks){
      const blockIns=new BlockIns(index)
      blockIns.blockStates[0]=block
      //blockIns.index++;
      blocks.value.push(blockIns)
      index++;
     }
     updateDramaState(blocks.value,dramaIns.value)
  }
  const changeBlockTitle=(title:string,blockId:number)=>{
    const blockIns = getBlock(blockId) as BlockIns;
    let newState = {} as Block;
    const oldState = blockIns.blockStates[blockIns.blockStates.length - 1];
    //Object.assign(newState, oldState);
    newState = JSON.parse(JSON.stringify(oldState));
    blockIns.blockStates.push(newState);
    newState.title=title;
    blockIns.title=title;
    blockIns.index++
    updateDramaState(blocks.value,dramaIns.value)
  }
  return { blocks, addLine, dramaIns, deleteLine ,addBlock,load,changeBlockTitle};
});
