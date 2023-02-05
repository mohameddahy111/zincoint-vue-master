<template>
  <iframe
    src="/videos/71063417_free.mp4"
    class="ferame fullscreen"
    allowfullscreen
    allow="autoplay ; accelerometer fullscreen"
    marginheight="0"
    marginwidth="0"
  
  >
  </iframe>

  <!-- <iframe
      width="640"
      height="360"
      src="https://www.youtube.com/embed/NGefoEPc3pg"
      title="Build LinkedIn with React JS - 2 - (Firebase V9 + Styled Components + Redux)"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
</script>

<style lang="scss" scoped>
.ferame {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #cacedb;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}
</style>
