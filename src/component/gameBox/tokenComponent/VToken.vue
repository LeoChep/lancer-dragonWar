<template>
    <v-group v-if="isLoaded" :config="configCircle" :x="actor.postion.x" :y="actor.postion.y" :width="config.size.sizeX"
        :height="config.size.sizeY" draggable="true" ref="vTokenRef" @dragend="handleDragEnd">
        <v-image :config="configCircle" :width="config.size.sizeX" :height="config.size.sizeY"
            :image="config.image"></v-image>
    </v-group>
    <DragController ref="controller"></DragController>
</template>
<script setup name="VToken" lang="ts">
import { ref } from 'vue';
import DragController from "@/component/controller/DragController.vue"
import type { ContainerConfig } from 'konva/lib/Container';
const props = defineProps(['actor'])
const url = "asset/monster/" + props.actor.type + ".json"
const config = ref({} as any)
const isLoaded = ref(false)
const vTokenRef = ref()
const controller = ref()
const handleDragEnd = (event: { target: { attrs: { x: any; y: any; }; }; }) => {
    console.log(event)
    const pos = { x: event.target.attrs.x, y: event.target.attrs.y }
    const { move } = controller.value
    console.log(move)
    move(props.actor, pos.x, pos.y)
}
const configCircle = ref({
    radius: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 10,
} as ContainerConfig )
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        config.value = data
        console.log(data)
        var imageObj1 = new Image();
        imageObj1.onload = function () {
            isLoaded.value = true;
        };
        const tokenUrl ="asset/monster/token/" + data.token
        config.value.image = imageObj1
        imageObj1.src = tokenUrl;
        configCircle.value.clipFunc = function (ctx) {
            ctx.ellipse(data.size.sizeX / 2, data.size.sizeY / 2, data.size.sizeX/2,data.size.sizeY/2, 0, 0,Math.PI * 2, false);
        }
    });



</script>