<template>
    <div>
        <div class="tokenBox">

            <div v-for="token of tokenInfoArr" class="token" @dragstart="dragToken($event, token)">
                <div style="text-align: center;">
                    <img :src="token.tokenUrl" width="50px" height="50px" />
                </div>
                <div
                    style="text-align: center; width:80px;    text-transform: uppercase;height:50px;word-break: break-all;">
                    <p>{{ token.name }}</p>

                </div>


            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCallBackStore } from '@/stores/callBackStore';
import { useClientReciverStore } from '@/stores/clientReciverStore';
import { DebugConsole, DebugMan } from '@/tools/DebugMan';
import { getAssetFiles } from '@/tools/indexGetter';
import { computed, ref } from 'vue';

const clientReciverStore = useClientReciverStore();

const clientReciver = clientReciverStore.getIns();
//get all tokenInfo
const fileUrls = ref("")
const tokenInfoArr = ref([] as any[])
const lock = {}
let filesPathReadUnLock = (value?: unknown) => { }
const filesPathReadLock = new Promise((resolve) => {
    filesPathReadUnLock = resolve;
})
getAssetFiles("monster").then((res: any) => {
    fileUrls.value = res;
    filesPathReadUnLock();
});
filesPathReadLock.then(() => {
    for (let file of fileUrls.value) {
        const url = "asset/monster/" + file + ".json"
        fetch(url).then((response) => response.json())
            .then((data) => {
                const tokenUrl = "asset/monster/token/" + data.token
                data.tokenUrl = tokenUrl
                tokenInfoArr.value.push(data)
            });
    }
})
const callBackStore = useCallBackStore()
const dragToken = (event: DragEvent, token: any) => {

    const callbackId = callBackStore.addCallBackHook(
        (pos) => {

            const x = parseInt(pos.x) - parseInt(token.size.sizeX) / 2
            const y = parseInt(pos.y) - parseInt(token.size.sizeY) / 2
            DebugMan.debugFor = "callback";
            DebugConsole("callback", "create ", token, "at", pos);
            clientReciver.sendToServer("create " + token.name + " " + token.name + Date.now() + " " + x + " " + y)
        }
    )
    event.dataTransfer?.setData("callBackId", callbackId.toString())
}

</script>
<style>
.tokenBox {
    display: flex;
}

.token {
    width: 80px;
    ;
}
</style>