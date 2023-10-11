<template>
    <div >
        <li v-for="item in messageList" :key="item.id">
            {{ item.content }}
        </li>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useMessagesStore } from "../../stores/messagesStore"
const messageStroe = useMessagesStore();
const messageList = computed(() => {
    return messageStroe.messages
})
</script>