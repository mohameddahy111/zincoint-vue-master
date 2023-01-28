<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount, onMounted } from "vue";
import { useProductsStore } from "./stores/products";

const products = useProductsStore();

onBeforeMount(
  () => products.getProductsWithOffer(),
  products.getAllProducts(),
  products.getProductListIconsForHome(),
  products.getCategoryWithProducts()
);
</script>
