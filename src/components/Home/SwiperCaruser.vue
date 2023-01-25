<template>
  <div class="relative-position">
    <div class="filter"></div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      ref="carousel"
      infinite
      height="100vh"
      autoplay="autoplay"
    >
      <q-carousel-slide
        v-for="(x, index) in swaperInfo"
        :key="index"
        :name="index"
        :img-src="x.img"
        class="flex justify-center items-center"
      >
        <div class="absolute z-fab">
          <HeroTitle v-show="x.title"> {{ x.title }} </HeroTitle>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control
          :position='lang.lagn ==="en" ? "bottom-right": "bottom-left" '
          :offset="[18, 30]"
          class="q-gutter-sm navigation z-fab"
        >
          <q-btn
            push
            text-color="white"
            :icon='lang.lagn ==="en" ? "arrow_left" :"arrow_right"'
            class="text-h5"
            @click="$refs.carousel.previous()"
          />
          <q-btn
            push
            text-color="white"
            :icon='lang.lagn ==="en" ? "arrow_right" :"arrow_left"'
            class="text-h5"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from "vue";
import HeroTitle from "./components/HeroTitle.vue";
import { useGeneralStore } from 'src/stores/general';


export default {
  data() {
    const swaperInfo = [
      { img: "/img/TONIC-1.png", title: " make your home by your self" },
      {
        img: "/img/TONIC-2.png",
        title: " Modern shapes that reflect your personality ",
      },
      { img: "/img/TONIC-3.png", title: " Choose every detail yourself" },
      { img: "/img/TONIC-4.png" },
    ];

    return {
      swaperInfo,
    };
  },
  setup() {
    const lang = useGeneralStore()
    return {
      slide: ref(1),
      autoplay: ref(true),
      lang,
    };
  },
  components: { HeroTitle },
};
</script>
<style scoped>
.filter {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.346);
  z-index: 1;
}
@media screen and (max-width: 600px) {
  .navigation {
    display: none;
  }
}
</style>
