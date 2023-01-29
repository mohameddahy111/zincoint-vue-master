<template>
  <div>
    <swiper
      :modules="modules"
      :slidesPerView="6"
      :centeredSlides="fals"
      :spaceBetween="30"
      :navigation="true"
      :virtual="true"
      class="mySwiper"
      :breakpoints="{
      300: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 6,
      },
      1600:{
        slidesPerView:7,

      }
    }"

    >
      <swiper-slide
        v-for="(x, index) in iconArry"
        :key="index"
        :virtualIndex="index"
      >
      <router-link :to="`category/${x.id}`" >

        <img
        :src="`https://zincoint.com/public/upload/categories/categories_icons/${x.icon}`"
        alt=""
        />
        <p v-text="lang.lagn === 'en' ? x.name_en : x.name_ar">
        </p>
      </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/virtual";
import { useGeneralStore } from "src/stores/general";


// import Swiper core and required modules
import { Pagination, Navigation, Virtual } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["iconArry"],
  setup() {
    const lang = useGeneralStore()
    return {
      modules: [Pagination, Navigation, Virtual],
      lang
    };
  },
};
</script>
<style >
.swiper {
  width: 90%;
  /* height: 100%; */
  padding: 60px 60px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

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
  width: 90px;
  flex-direction: column;
  gap: 20px;
  background-color: transparent;
}

.swiper-slide img {
  display: block;
   width: 90px;
  /* height: 50%; */
}
.append-buttons {
  text-align: center;
  margin-top: 20px;
}

.append-buttons button {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #007aff;
  color: #007aff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 4px;
  margin: 0 10px;
  font-size: 13px;
}
</style>
