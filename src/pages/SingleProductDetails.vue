<template>
    <q-page-container>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 q-pa-sm  flex">
          <div
            class=""
            v-for="(x, index) in products.productDetails.images"
            :key="index"
          >
            <img
              :src="img ? img: products.imageUrl + x.name"
              :alt="products.productDetails.name_ar"
              class="full-width rounded-borders shadow-5"
              v-show="x.default === 1"

            />
          </div>
          <div
            class=" "
            v-for="(x, index) in products.productDetails.images"
            :key="index"
          >
            <img
              :src=" products.imageUrl + x.name"
              :alt="products.productDetails.name_ar"
              class=" cursor-pointer  rounded-borders shadow-5 q-ma-xs"
              @click="changeImg(products.imageUrl + x.name)"


            />
</div>

        </div>
        <div class="col-12 col-sm-6 col-md-4  q-px-md">
          <h4 :class="`${ar ? ' text-blue-10 ' : 'text-red-10'}`">
            {{ `${products.productDetails.name_ar}` }}
          </h4>

          <div
            class="container"
            v-html="products.productDetails.details_en"
          ></div>
          <!-- {{  }} -->
          <!-- " products.productDetails.details_e" -->
        </div>
      </div>
    </q-page-container>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from "vue";
import { useProductsStore } from "src/stores/products";
import { useRoute } from "vue-router";
const products = useProductsStore();
const route = useRoute();
const img = ref("");
const changeImg = (scr)=>{
  img.value = scr


}

onMounted(() => products.getProductDetails(route.params.id));
</script>

<style>
/* cursor: pointer; */
</style>
