<template>
    <v-stage :config="configKonva">
        <v-layer draggable="true" ref="layer">
            <v-group >
                <v-image :config="background"></v-image>
                <v-circle v-for="actor in state.actorStates"  :config="configCircle" 
                :x="actor.postion.x"
                :y="actor.postion.y"
                ></v-circle>
            </v-group>
            
        </v-layer>
    </v-stage>
</template>

<script setup lang="ts">
import { useScenesStore } from '@/stores/sceneStore';
import { useDirector} from "@/stores/perform/director"
import { computed, onMounted, ref, watch } from 'vue';
import { Layer } from 'konva/lib/Layer';

interface Position {
    x: number;
    y: number;
}
interface ActorState {
    name: string;
    postion: Position;
}
const sceneStroe = useScenesStore();
const director=useDirector();
const state = computed(() => {

    return sceneStroe.getState()
})
const layer=ref()
onMounted(()=>{
    const width=window.innerWidth;
    const height=window.innerHeight;
    configKonva.value.height=height
    configKonva.value.width=width
})
const configKonva = ref({
   
    width: 1327,
    height: 1000,
})
const camereState=computed(()=>{return director.getCamereState()})
const configCamere = computed(()=>{
    return  {x:0,y:0};
})
watch(camereState.value,async ()=>{
    layer.value.getNode().x(0-camereState.value.x)
    layer.value.getNode().y(0-camereState.value.y)
})
var imageObj1 = new Image();
      imageObj1.onload = function() {
      };
imageObj1.src = '/LancerRpgINTFTKYMap01_V08Grid.png';
const background={
    image:imageObj1,
    scaleX: 0.3,
    scaleY: 0.3
}
const configCircle = {
    radius: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
}
const drawActor =  (actor:ActorState) =>{
    const actorCircle={} as {x:number,y:number}
    Object.assign(actorCircle,configCircle)
    actorCircle.x=actor.postion.x;
    actorCircle.y=actor.postion.y;
    return actorCircle;
}


</script>