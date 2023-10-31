<template>
    <div id="background">
        <img style="height:100%;" v-bind:src="background">
        <div ref="talk_window" id="talk-window">
            <pre>{{ talkContent }}</pre>

        </div>
    </div>

    <div id="container">
        选择剧本导入<input id="db-file" type="file" @change="load" />
        <!-- <button @click="runDrama" ref="runButton">试运行</button> -->
        <button @click="exportFile">export</button>
        <div>
            <div v-for="blockIns in blocks" :key="blockIns.id">
                <button v-if="!hiddenFlag[blockIns.id]" @click="hiddenFlag[blockIns.id] = true">&gt;</button>
                <button v-if="hiddenFlag[blockIns.id]" @click="hiddenFlag[blockIns.id] = false">v</button>
                <input v-model="blockIns.title" @change="changeBlockTitle(blockIns)">
                <div v-if="hiddenFlag[blockIns.id]">
                    <div v-for="line in getLines(blockIns)" :key="line.index">
                        <button @click="addLine(line.index, blockIns)">+</button>
                        类型<input v-model="line.type" />
                        <div v-if="line.type === 'speak'">
                            <textarea v-model="line.content" />
                        </div>
                        <div v-if="line.type === 'setBackGround'">
                            <input type="file" @change="setBackGround($event, line)">
                        </div>
                        <button @click="deleteLine(line.index, blockIns)">-</button>
                    </div>
                    <div>
                        <button @click="addLine(getLines(blockIns).length, blockIns)">+</button>
                    </div>
                </div>
            </div>
            <button @click="addBlock">create new block</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDramaEditorStore } from '@/stores/dramaEditorStore';
import { useTalkStateStore } from '@/stores/talkStateStore';
import { computed, ref } from 'vue';
interface Block {
    title: string;
    id: number;
    lines: Line[];
}
interface BlockIns extends Block {
    title: string;
    id: number;
    lines: Line[];
    index: number
    blockStates: Block[]
}
interface Line {
    content: string;
    index: number;
    type: string;
}
const hiddenFlag = ref([] as boolean[])
const dramaEditorStore = useDramaEditorStore()
const blocks = computed(() => {
    return dramaEditorStore.blocks;
})
const changeBlockTitle=(blockIns:BlockIns)=>{
    dramaEditorStore.changeBlockTitle(blockIns.title,blockIns.id)

}
// const state = (blockIns : BlockIns )=>{
//    return dramaEditorStore.getState(blockIns.id)
// }
const addBlock=()=>{
    dramaEditorStore.addBlock()
}
const getLines = (blockIns: BlockIns) => {
    return blockIns.blockStates[blockIns.index].lines
}
const addLine = (index: number, blockIns: BlockIns) => {
    dramaEditorStore.addLine(index, blockIns.id)
}
const deleteLine = (selected: number, blockIns: BlockIns) => {
    dramaEditorStore.deleteLine(selected, blockIns.id)
}
const background = ref()
const setBackGround = (event: Event, line: Line) => {
    const target = event?.target! as HTMLInputElement;
    let file = target.files![0]
    var reader = new FileReader();
    // 用户选择的文件列表
    // console.log(this.files[0]);
    // 读取文件
    reader.readAsDataURL(file);
    // 监听onload事件
    reader.onload = function () {
        console.log(reader.result);
        // 将读取的结果显示在页面中
        background.value = reader.result;
        line.content = reader.result as string;
        console.log(line)
    }
}
const load = (e: any) => {
    //文件夹里面所有文件        
    var files = e.target.files;
    function read(file: any) {
        // 3、获取文件
        // 4、创建读取器
        let reader = new FileReader();
        // 5、开始读取
        reader.readAsText(file);
        // 6、监听文件的读取状态
        reader.onload = () => {
            //sceneStroe.load(reader.result as string)
            console.log(reader.result)

            dramaEditorStore.load(reader.result as string)
        };
    }
    read(files[0])
};




const exportFile = () => {
    const lastIndex = dramaEditorStore.dramaIns.dramaStates.length - 1;
    const lastState = dramaEditorStore.dramaIns.dramaStates[lastIndex]
    const state = lastState
    if (lastState.title) {
        const ele = document.createElement("a");
        let blob = new Blob([JSON.stringify(state)]);
        var a = document.createElement("a");
        var url = window.URL.createObjectURL(blob);
        var filename = state.title + ".json";
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

const talkState = useTalkStateStore();
const talkContent = computed(() => {
    return talkState.talkState.input;
})
const count = ref(0)
const skip = (event: KeyboardEvent) => {
    if (event.code == 'Enter') {
        talkState.enterEnd();
        count.value++;
        console.log('count2', count.value)
    }

}
const runButton = ref(null as unknown as HTMLElement)
const talk_window = ref(null as unknown as HTMLElement)
window.addEventListener('keydown', skip);
const runningDrama = ref(0)
// const runDrama = () => {
//     runButton.value.blur()
//     const dramaState = dramaEditorStore.getState()
//     const lines = dramaState.lines;
//     console.log("lines", lines)
//     let line = lines[0]
//     let index = 0;
//     runningDrama.value++;
//     const taskId = runningDrama.value;
//     const runNext = () => {
//         console.log("taskId", taskId)
//         if (taskId === runningDrama.value) {
//             line = lines[index];
//             let promise = null as unknown as Promise<boolean>;
//             if (line?.type === "speak") {
//                 promise = new Promise((resolve) => {
//                     talkState.speak(line.content).then(
//                         () => {
//                             resolve(true);
//                         }
//                     )
//                 })
//             }
//             if (line?.type === "setBackGround") {
//                 promise = new Promise((resolve) => {
//                     background.value = line.content;
//                     resolve(true);
//                 }
//                 )
//             }
//             if (!promise) {
//                 promise = new Promise((resolve) => {
//                     resolve(true)
//                 })
//             }
//             promise.then(() => {
//                 if (index < lines.length) {
//                     index++;
//                     runNext()
//                 }

//             });
//         }
//     }
//     runNext()
//     //实际运行的时候，由system层来主导
//     //system层接受/存储drama，
//     //玩家进行操作，将操作指令以command形式发送给system
//     //system先进行指令的可行性分析，不可行（比如权限不对，非法操作）指令废弃
//     //然后system进行运算，每次分为两部分
//     //一部分是里运算，只运行数据相关内容，并从自己持有的“可靠”state更新，获得新的state（或updater）
//     //另一部分是表运算，运行渲染/视图层内容，然后获得actions（视图变化需要做的事），
//     //在运算时，可能会触发drama钩子，触发则增加对应的state更新和actions
//     //然后将state（updater）和actions发送给显示层（或者说客户端），
//     //然后显示层执行actions后
//     //这里的runNext实际上就是执行actions
//     //使用state（updater）更新
//     //----举个例子
//     //玩家发布指令 n1 moveTo 30 200
//     //意思是n1 移动到 x=30，y=200
//     //system接受后，生成移动路径的actions，即每一步怎么走，并在system做无渲染执行
//     //执行的时候检查drama钩子，
//     //在移动路上触发新剧情的drama钩子，发牢骚进行对话，则在该位置插入新的action
//     //得到最新的“可靠”state
//     //将actions与新 state打包发回，
//     //玩家在渲染端观赏actions，并在结束后将自己的state更新与system一致
//     //------
//     //system层可以在自己本地，也可以在服务器
//     //dramas在场景运做前就要加载到system中，
//     //在场景运作的开始，触发start的drama钩子

// }
</script>
<style scoped>
#background {
    position: absolute;
    height: 500px;
    z-index: 1;
}

#container {
    position: absolute;
    top: 500px;
    z-index: 1;
}

#talk-window {
    position: absolute;
    top: 400px;
    height: 100px;
    width: 100%;
    z-index: 2;
    background-color: rgb(0, 0, 255, 0.2);
    font-size: 18px;
    color: seashell;
    /* font-family: 'ipix_12pxregular'; */

    border-style: ridge;
    border-width: 5px;
    border-radius: 5px
}

pre {
    font-family: ipix_12pxregular;
    font-weight: 500;
}
</style>