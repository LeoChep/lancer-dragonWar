<template>
    <v-group v-if="isLoaded" :config="configCircle" :x="actor.postion.x" :y="actor.postion.y" :width="config.size.sizeX"
        :height="config.size.sizeY">
        <v-image :config="configCircle" :width="config.size.sizeX" :height="config.size.sizeY"
            :image="config.image"></v-image>
    </v-group>
</template>
<script setup name="VToken" >
import { ref } from 'vue';

const props = defineProps(['actor'])
const url = new URL("../../../assets/monster/"+props.actor.type+".json", import.meta.url);
const config = ref({})
const isLoaded = ref(false)
const configCircle = ref({
    radius: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 10,
})
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        config.value = data
        console.log(data)
        var imageObj1 = new Image();
        imageObj1.onload = function () {
            isLoaded.value = true;
        };
        const tokenUrl = new URL("../../../assets/monster/token/" + data.token, import.meta.url);
        config.value.image = imageObj1
        imageObj1.src = tokenUrl;
        configCircle.value.clipFunc = function (ctx)  {
            ctx.arc(data.size.sizeX / 2, data.size.sizeY / 2, 50, 0, Math.PI * 2, false);
        }
    
       
    });



</script>