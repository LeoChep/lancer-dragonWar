<template>
    <v-stage :config="configKonva">
        <v-layer draggable="true" ref="layer">
            <v-group>
                <v-image :config="background"></v-image>
                <VToken v-for="actor in state.actorStates" :actor="actor"></VToken>
            </v-group>
        </v-layer>
    </v-stage>
</template>

<script setup >
import { useScenesStore } from '@/stores/sceneStore';
import { useDirector } from "@/stores/perform/director"
import VToken from "./tokenComponent/VToken.vue"
import { computed, onMounted, ref, watch } from 'vue';

const sceneStroe = useScenesStore();
const director = useDirector();
const state = computed(() => {
    return sceneStroe.getState()
})
const layer = ref()
onMounted(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    configKonva.value.height = height
    configKonva.value.width = width
})
const configKonva = ref({
    width: 1327,
    height: 1000,
})
const camereState = computed(() => { return director.getCamereState() })
const configCamere = computed(() => {
    return { x: 0, y: 0 };
})
watch(camereState.value, async () => {
    layer.value.getNode().x(0 - camereState.value.x)
    layer.value.getNode().y(0 - camereState.value.y)
})
var imageObj1 = new Image();
imageObj1.onload = function () {
};
const url = new URL("/winter_groud.jpg", import.meta.url);
imageObj1.src = url;
const background = {
    image: imageObj1,
    scaleX: 0.3,
    scaleY: 0.3
}
const configCircle = {
    radius: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
}



</script>