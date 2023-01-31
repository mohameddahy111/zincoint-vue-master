<template>
  <div>
    <h1>hjvhjvhj</h1>
  </div>
</template>

<script setup>
import { useAuth } from "src/stores/auth";
import { onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";

const user = useAuth();
const $router = useRouter();

watchEffect(()=>{
  !user.userToken? $router.push('/'):''
})
</script>

<style lang="scss" scoped></style>
