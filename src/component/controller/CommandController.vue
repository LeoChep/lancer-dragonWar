<template>
    <div id="commander">
        <div>
            {{ peerId }} <button @click="createRoomClick()">创建房间</button>
        </div>
        <div>
            <button @click="toeknBoxButonClick">token盒子</button>
            <button @click="openSaverClick">存档导入
            </button>
            <button @click="openGMboxClick">GM指令
            </button>
            <button @click="openChatChannelClick">聊天</button>
        </div>

        <div v-if="tokenBoxOpen == true">
            <TokenAssetBoxVue></TokenAssetBoxVue>
        </div>

        <div v-if="saverBoxOpen == true">
            选择存档导入<input id="db-file" type="file" @change="load" />
        </div>

        <div v-if="gmBoxOpen == true">
            <form @submit="sentMessage()" v-on:submit.prevent>
                <input type='textarea' v-model="inputText" />
            </form>
            <button @click="sentMessage()" draggable="true">发送</button>
        </div>


        <div v-if="chatChannelOpen == true">
            昵称<input type='textarea' v-model="userName" @change="changeUserName" />
            <form @submit="sentSpeak()" v-on:submit.prevent>
                <input type='textarea' v-model="speakText" />
            </form>
            <button @click="sentSpeak()">发送</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useMessagesStore } from "../../stores/messagesStore"
import { useScenesStore } from "../../stores/sceneStore"
import { EasyClientReciver } from "@/client/easyClientReciver";
import { EasyServerReciver } from "@/server/easyServerReciver";
import { LStorage } from "@/tools/storageMan";
import { useClientReciverStore } from "@/stores/clientReciverStore";
import { useServerReciverStore } from "@/stores/serverReciverStore";
import { parseDiceFormula } from "@/tools/DiceFormulaTrans";
import TokenAssetBoxVue from "./TokenAssetBox.vue";
const tokenBoxOpen = ref(false)
const toeknBoxButonClick = () => {
    if (!tokenBoxOpen.value)
        tokenBoxOpen.value = true;
    else
        tokenBoxOpen.value = false

}
const saverBoxOpen = ref(false)
const openSaverClick = () => {
    if (!saverBoxOpen.value)
        saverBoxOpen.value = true;
    else
        saverBoxOpen.value = false

}
const gmBoxOpen = ref(false)
const openGMboxClick = () => {
    if (!gmBoxOpen.value)
        gmBoxOpen.value = true;
    else
        gmBoxOpen.value = false

}
const chatChannelOpen = ref(false)
const openChatChannelClick = () => {
    if (!chatChannelOpen.value)
    chatChannelOpen.value = true;
    else
    chatChannelOpen.value = false

}
chatChannelOpen
const messageStroe = useMessagesStore();
const inputText = ref("")
const speakText = ref("")
//这里创建client实例，作为客户端，如果是房主，额外创建server实例
//为client实例指定对应的serverID，并创建连接，
//即使是房主，也由自己的client实例连接serverID，
const clientReciverStore = useClientReciverStore();
const serverReciverStore = useServerReciverStore();
const clientReciver = clientReciverStore.getIns();
const serverReciver = serverReciverStore.getIns();
const peerId = computed(() => serverReciverStore.id);
function createRoomClick() {
    serverReciverStore.createRoomServer("server" + Date.now())
}

function read(file: any) {
    // 3、获取文件
    // 4、创建读取器
    let reader = new FileReader();
    // 5、开始读取
    reader.readAsText(file);
    // 6、监听文件的读取状态
    reader.onload = () => {
        const sceneStroe = useScenesStore();
        sceneStroe.load(reader.result as string)
        console.log(reader.result)
    };
}
const load = (e: any) => {
    //文件夹里面所有文件        
    var files = e.target.files;
    read(files[0])
};

function sentMessage() {
    const command = inputText.value

    // messageStroe.push(inputText.value)

    //理论上会有收发过程，将需要的操作发给服务端的system，
    //进行处理后发回信息给客户端的system层
    //接着客户端的system层操作SceneStore（显示层的状态）
    //这里暂时先直接操纵客户端接收层
    if (/^conn/.test(command)) {
        const textContent = command.split(" ");
        clientReciver.clear()
        clientReciver.connect(textContent[1])
    }
    if (/^send/.test(command)) {
        const textContent = command.split(" ");

        clientReciver.sendToServer(textContent[1])
    }
    clientReciver.sendToServer(command)
    inputText.value = ""

}
const userName = ref("")
const changeUserName = () => {
    clientReciver.sendToServer("register " + userName.value)
}
function sentSpeak() {
    const speak = speakText.value
    if (/^.r/.test(speak)) {
        clientReciver.sendToServer(speak)
        speakText.value = ""
        // const textContent = speak.split(" ");
        // const diceInput = textContent[1];
        // const diceF = parseDiceFormula(diceInput)

        // diceString.value = diceF.toString();
        // diceValue.value = diceF.getValue() + "";
        // console.log(diceF.diceResultArr)
        return;
    }
    console.log("command speak")
    let command = "speak "
    const speaker = { name: userName.value }
    const message = { speaker: speaker, messageString: speak }
    command += JSON.stringify(message);
    //理论上会有收发过程，将需要的操作发给服务端的system，
    //进行处理后发回信息给客户端的system层
    //接着客户端的system层操作SceneStore（显示层的状态）
    //这里暂时先直接操纵客户端接收层

    clientReciver.sendToServer(command)
    speakText.value = ""

}

</script>
<style>
#commander {
    color: wheat;
    display: grid;
}
</style>