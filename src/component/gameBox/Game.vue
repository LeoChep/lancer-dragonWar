<template>
    <v-stage :config="configKonva">
        <v-layer>
            <v-circle v-for="actor in state.actorStates" :config="drawActor(actor)"></v-circle>
        </v-layer>
    </v-stage>
</template>

<script setup lang="ts">
import { useScenesStore } from '@/stores/sceneStore';
import { computed } from 'vue';
interface Position {
    x: number;
    y: number;
}
interface ActorState {
    name: string;
    postion: Position;
}
const sceneStroe = useScenesStore();
const state = computed(() => {

    return sceneStroe.getState()
})

const configKonva = {
    width: 200,
    height: 200
}
const configCircle = {
    x: 100,
    y: 100,
    radius: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
}
const drawActor = (actor:ActorState) =>{
    const actorCircle={} as {x:number,y:number}
    Object.assign(actorCircle,configCircle)
    actorCircle.x=actor.postion.x;
    actorCircle.y=actor.postion.y;
    return actorCircle;
}


</script>