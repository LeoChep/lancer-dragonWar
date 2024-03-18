<template>
  <div @drop="dropOn" ondragover="event.preventDefault()">
    <v-stage :config="configKonva" ref="stage">
      <v-layer draggable="true" ref="layer" @mouseMove="mouseMoveHandle">
        <v-group>
          <v-image :config="background"></v-image>
          <VToken v-for="actor in state.actorStates" :actor="actor"></VToken>
        </v-group>
      </v-layer>
      <v-layer>
        <v-text :config="configText" :x="200" :y="0" :text="getMousePositionText"></v-text>
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup lang="ts">
import { useScenesStore } from "@/stores/sceneStore";
import { useMouseControllerStore } from "@/stores/contoller/mouseControllerStore";

import { useDirector } from "@/stores/perform/director";
import VToken from "@/component/gameBox/tokenComponent/VToken.vue";
import { getAssetFiles } from "@/tools/indexGetter";
import { computed, onMounted, ref, watch } from "vue";
import { DebugConsole, DebugMan } from "@/tools/DebugMan";
import { useCallBackStore } from "@/stores/callBackStore";
const mouseConrollerStore = useMouseControllerStore();
const callBackStore=useCallBackStore()
const mouseMoveHandle = (event: { evt: { layerX: number; layerY: number } }) => {
  const layerX = layer.value.getNode().getX();
  const layerY = layer.value.getNode().getY();
  const pos = { x: event.evt.layerX - layerX, y: event.evt.layerY - layerY };

  mouseConrollerStore.setPosition(pos.x, pos.y);
};

const getMousePosition = computed(() => {
  return mouseConrollerStore.getPositionInMap();
});
const getMousePositionText = computed(() => {
  const pos = getMousePosition.value
  return "x:" + pos.x + ",y:" + pos.y
})
const dropOn = (event: DragEvent) => {
  const dropOnX = event.x;
  const dropOnY = event.y;
  const layerX = layer.value.getNode().getX();
  const layerY = layer.value.getNode().getY();
  try {
    DebugMan.debugFor="callback"
    DebugConsole("callback",event)
    if (event.dataTransfer?.getData("callBackId")){
      const id=event.dataTransfer?.getData("callBackId");
      console.log(id)
      callBackStore.callBack(parseInt(id),{x:dropOnX-layerX,y:dropOnY-layerY})
    }

  } catch (e) {

  }


};


const sceneStroe = useScenesStore();
const director = useDirector();
const state = computed(() => {
  return sceneStroe.getState();
});
const layer = ref();
const stage = ref();
onMounted(() => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  configKonva.value.height = height;
  configKonva.value.width = width;
});
const configKonva = ref({
  width: 1327,
  height: 1000,
});
const camereState = computed(() => {
  return director.getCamereState();
});
const configCamere = computed(() => {
  return { x: 0, y: 0 };
});
watch(camereState.value, async () => {
  layer.value.getNode().x(0 - camereState.value.x);
  layer.value.getNode().y(0 - camereState.value.y);
});
var imageObj1 = new Image();
imageObj1.onload = function () { };
let url = "";
url = "asset/winter_groud.jpg";
imageObj1.src = url;
const background = {
  image: imageObj1,
  scaleX: 0.3,
  scaleY: 0.3,
};
const configCircle = {
  radius: 10,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
};
const configText = {
  fontSize: 30,
  width: 200
};
</script>
