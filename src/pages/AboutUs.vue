<template>
  <div class="">
    {{ storeCounter.$state.fullName }}
  </div>
</template>

<script>
import { useCounterStore } from "../stores/products";
export default {
  setup() {
    const storeCounter = useCounterStore();
    return {
      storeCounter,
    };
  },
};
</script>

<style></style>
