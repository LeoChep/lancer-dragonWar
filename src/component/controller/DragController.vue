<template>
    <div></div>
</template>
<script setup name="DragController" >
import { useClientReciverStore } from '@/stores/clientReciverStore'

const clientReciverStore = useClientReciverStore();
const clientReciver = clientReciverStore.getIns();
const move = (actor, x, y) => {
    clientReciver.sendToServer("move " + actor.name + " " + x + " " + y)
}
defineExpose({

    move

})

</script>