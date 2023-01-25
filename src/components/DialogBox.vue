<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <p class="text-h6 text-capitalize">{{ dialogData.name_en }}</p>
      </q-card-section>
      <div class="row q-pa-sm ">
        <div class="col-12 col-sm-4 ">
          <img
          :src="`https://zincoint.com/public/upload/products/gallery/${dialogData.image.name}`"
          alt=""
          class=" full-width"
          >
        </div>
        <div class="">
        </div>
      </div>
      <div class=" flex item-center justify-end  ">
        <q-card-actions align="right" class="bg-white text-teal ">
          <q-btn flat label="Add to Cart" v-close-popup />
        </q-card-actions>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps } from "vue";
defineProps(["dialogData"]);
</script>

<style lang="scss" scoped>
</style>
