<template>
  <div>
    <swiper
      :modules="modules"
      :slidesPerView="6"
      :centeredSlides="fals"
      :spaceBetween="0"
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
          slidesPerView: 7,
        },
        1600: {
          slidesPerView: 7,
        },
      }"
    >
      <swiper-slide
        v-for="(x, index) in iconArry"
        :key="index"
        :virtualIndex="index"
      >
        <router-link :to="`category/${x.id}`">
          <div :class="lang.lagn ==='en'? 'imgen' :'img'">
            <img
              :src="`https://zincoint.com/public/upload/categories/categories_icons/${x.icon}`"
              alt=""
            />
          </div>
        </router-link>
        <p v-text="lang.lagn === 'en' ? x.name_en : x.name_ar"></p>
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
    const lang = useGeneralStore();
    return {
      modules: [Pagination, Navigation, Virtual],
      lang,
    };
  },
};
</script>
<style>
.swiper {
  width: 90%;
  padding: 30px 60px;
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
  width: 60px;
  flex-direction: column;
  gap: 20px;
  background-color: transparent;
}

.swiper-slide img {
  display: block;
  width: 60px;
  /* height: 50%; */
}
.swiper-slide :hover.img::before ,:hover.imgen::before{
  background-color: #c0d7fb;
}
p {
  font-size: 14px;
}
.img::before {
  content: "";
  width: 60px;
  height: 60px;
  background-color: rgba(204, 203, 203, 0.286);
  position: absolute;
  border-radius: 50%;
  transform: translate(40%);
  z-index: -1;
  transition: all 0.5s;
}
.imgen::before {
  content: "";
  width: 60px;
  height: 60px;
  background-color: rgba(204, 203, 203, 0.286);
  position: absolute;
  border-radius: 50%;
  transform: translate(-40%);
  z-index: -1;
  transition: all 0.5s;
}
</style>
