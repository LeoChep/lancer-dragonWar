<template>
    <div></div>
</template>
<script setup lang="ts" name="DragController" >
import { useClientReciverStore } from '@/stores/clientReciverStore'

const clientReciverStore = useClientReciverStore();
const clientReciver = clientReciverStore.getIns();
const move = (actor: { name: string; }, x: string, y: string) => {
    clientReciver.sendToServer("move " + actor.name + " " + x + " " + y)
}
defineExpose({
    move
})

</script>