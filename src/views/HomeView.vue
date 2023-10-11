<script setup lang="ts">
  import CommandControoler from "../component/controller/CommandController.vue"
  import MessageBox from "../component/messageBox/MessageBox.vue"
  import Game from "../component/gameBox/Game.vue"
</script>

<template>
  <div class="wrapper">
    <div id="game-box">
      <Game></Game>
    </div>
    <div id="message-box">
      <MessageBox></MessageBox>
    </div>
    <div id="controller-box">
      <CommandControoler></CommandControoler>
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
}

#game-box {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 5;
  background-color:red;
  text-align: center;
}
#message-box {
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 5;
  background-color:blue;
  text-align: left;
  overflow: scroll;
}
#controller-box {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 5;
  grid-row-end: 6;
  background-color:yellow;
  text-align: left;
}
</style>