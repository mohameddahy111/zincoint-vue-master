<template>
  <swiper
    :slidesPerView="4"
    :spaceBetween="30"
    :breakpoints="{
      300: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1600: {
        slidesPerView: 6,
      },
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(x, index) in swiperData" :key="index">
      <master-card :showdata="x" />
      <h6
        class="text-center relative-position"
        v-text="lang.lagn === 'en' ? x.name_en : x.name_ar"
      ></h6>
    </swiper-slide>
  </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/pagination";

import { Pagination } from "swiper";
import { useGeneralStore } from "src/stores/general";

import { ref, defineProps } from "vue";
import MasterCard from "./MasterCard/MasterCard.vue";
const lang = useGeneralStore();

defineProps(["swiperData"]);
</script>
<style scoped>
.swiper {
  margin-top: 20px;
  width: 100%;
}
@media screen and (max-width: 500px) {
  .swiper {
    width: 100%;
  }
  h6 {
    font-size: 14px;
  }
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: inherit;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  flex-direction: column;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
