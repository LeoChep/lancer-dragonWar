<template>
    <div @onDrop="">

        <el-card class="box-card " shadow="hover" v-for="item in messageList" :key="item.id">
            <template #header>
                <div class="card-header">
                    <span>{{ item.speaker.name }}</span>

                </div>
            </template>
            <div class="text item">{{ item.content }}</div>
        </el-card>

    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useMessagesStore } from "../../stores/messagesStore"
const messageStore = useMessagesStore();
const messageList = computed(() => {

    return messageStore.messages
})
messageStore.$onAction(({ after }) => {
    after(() => {
        setTimeout(() => {
            const messageBox = document.getElementById("message-box")
            if (messageBox)
                messageBox.scrollTop = messageBox?.scrollHeight;
        },20)

    })

})
</script>
<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {

    background-color: aliceblue;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
}
</style>