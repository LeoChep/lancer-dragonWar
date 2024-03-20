<script setup lang="ts">
import { DemoDirector } from "@/demoScript/DemoDirector"
import { onMounted, ref } from 'vue';
import type { ButtonItem } from "@/demoScript/DisplayControllerType";
const director = new DemoDirector();
const displayState = ref({ content: "", promise: new Promise(() => { }), resolve: (value?: any) => { } })
const display = (content: string) => {
  displayState.value.content = content;
  let resolveLock = (value?: any) => { };
  displayState.value.promise = new Promise((resolve) => {
    resolveLock = resolve;
  })
  displayState.value.resolve = resolveLock;
  return displayState.value.promise;
}
const buttons = ref([])
const selectState = ref({})
const question = (content?: string, button?: ButtonItem[]) => {
  buttons.value = button;
  selectState.value.content = content;
  let resolveLock = (value?: any) => { return value };
  selectState.value.promise = new Promise((resolve) => {
    resolveLock = resolve;
  })
  selectState.value.resolve = resolveLock;
  return selectState.value.promise;
}
const selectHandle = (id: string) => {
  selectState.value.resolve(id);
}
const skip = () => {
  displayState.value.resolve();
}
const displayController = { skip: skip, display: display, question: question };
director.displayController = displayController;
const talk_window = ref(null as unknown as HTMLElement)
window.addEventListener('keydown', skip);
onMounted(() => {
  director.start()

})
</script>

<template>
  <div class="wrapper">
    <div id="game-box">
      <textarea class="content-box" disabled>
        {{ displayState.content }}
      </textarea>
    </div>
    <div id="message-box">

    </div>
    <div id="controller-box">
      <button class="select-button" v-for="button of buttons" @click="selectHandle(button.id)">{{ button.chars
        }}</button>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(5, 20vw);
  /*  声明行间距和列间距  */
  grid-gap: 0px;
  /*  声明行的高度  */
  grid-template-rows: repeat(5, 20vh);
  background-image: url("ui/background.webp");
}

#game-box {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 5;
  text-align: center;
  z-index: 1;
}

#message-box {
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 6;

  text-align: left;
  overflow: scroll;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;


  text-align: left;
  border-color: wheat;
  border-width: 2px;
  ;
  border-style: solid;

  background-image:
    url("ui/parchment.jpg");
  background-position-y: 45px;
  border-radius: 0px;
  box-shadow: 0 0 0px #000;
  color: black;
}

#controller-box {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 5;
  grid-row-end: 6;
  background-image: url("ui/header-background-vertical.webp");
  text-align: left;
  z-index: 2;
}

.select-item {
  height: 20px;
  width: 20px;
}

.content-box {
  width: 100%;
  height: 209px;
  border: none;
  text-align: center;
  resize: none;
}
</style>