<template>
    {{ peerId }}
    <form @submit="sentMessage()" v-on:submit.prevent>
        <input type='textarea' v-model="inputText" />
    </form>

    <button @click="sentMessage()">发送</button>

    选择存档导入<input id="db-file" type="file" @change="load" />
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useMessagesStore } from "../../stores/messagesStore"
import { useScenesStore } from "../../stores/sceneStore"
import { EasyClient, excuteResponse, sendToServer } from "../../client/easyClient"
import { PeerMan } from "@/tools/peerMan";
import { EasyServer } from "@/server/easyServer";
import { EasyClientReciver } from "@/client/easyClientReciver";
import { EasyServerReciver } from "@/server/easyServerReciver";


const messageStroe = useMessagesStore();
const inputText = ref("")
//这里创建client实例，作为客户端，如果是房主，额外创建server实例
//为client实例指定对应的serverID，并创建连接，
//即使是房主，也由自己的client实例连接serverID，
const peerId = ref("")
const clientReciver = new EasyClientReciver();
const serverReciver = new EasyServerReciver();
serverReciver.onInit(() => {
    peerId.value = serverReciver.serverIns.id as string;
    console.log("onInit")
    clientReciver.onInit(() => {
        console.log("clientReciver onInit")
        clientReciver.connect(peerId.value)
    })
})
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
    messageStroe.push(inputText.value)
    const messageBox = document.getElementById("message-box")
    if (messageBox)
        messageBox.scrollTop = messageBox?.scrollHeight;
    //理论上会有收发过程，将需要的操作发给服务端的system，
    //进行处理后发回信息给客户端的system层
    //接着客户端的system层操作SceneStore（显示层的状态）
    //这里暂时先直接操纵客户端接收层
    if (/^conn/.test(command)) {
        const textContent = command.split(" ");

        clientReciver.connect(textContent[1])
    }
    if (/^send/.test(command)) {
        const textContent = command.split(" ");

        clientReciver.sendToServer(textContent[1])
    }
    clientReciver.sendToServer(command)
    inputText.value = ""

}


</script>