<template>
  <div
  :class="`${
    lang.lagn === 'ar' ? 'aribc relative-position' : 'relative-position'
  }`"
  >
  
  <SwiperCaruser />
  <q-ajax-bar/>
    <ProductProps />
    <IconSwiper
      :iconArry="
        products.productListIconsForHome ? products.productListIconsForHome : []
      "
    />
    <div class="q-pa-md relative-position">
      <div class="flex justify-between items-center q-px-lg">
        <h6
          class="text-capitalize"
          v-text="lang.lagn === 'en' ? 'new collection ' : 'اصدار جديد'"
        ></h6>
        <q-btn
          icon-right="arrow_right_alt"
          @click="more()"
          v-text="lang.lagn === 'en' ? 'More' : 'المزيد'"
        ></q-btn>
      </div>
      <SwipreViewCard
        :swiperData="products.allProducts ? products.allProducts : []"
      />
    </div>
    <h4
      class="text-center text-weight-bolder q-py-md"
      v-text="lang.lagn === 'en' ? 'we chose for you' : 'اخترنا لك '"
    ></h4>
    <div
      class="q-pa-sm relative-position"
      v-for="(x, index) in products.CategoryWithProducts"
      :key="index"
    >
      <div class="flex justify-between items-center q-pa-lg">
        <div class="">
          <span
            class="text-capitalize text-h6 text-weight-bold"
            v-text="lang.lagn === 'en' ? x.name_en : x.name_ar"
          >
          </span>{{ "" }}
          <span
            class="text-capitalize text-weight-bold"
            v-text="lang.lagn === 'en' ?`( ${ x.name_en} Provided by Zinco )` :`( ${ x.name_ar} مقدمة من زينكو )`"
          >
          </span>
        </div>
        <q-btn
          @click="more(x.id)"
          v-text="lang.lagn === 'en' ? 'More' : 'المزيد'"
        >
        </q-btn>
      </div>
      <SwipreViewCard :swiperData="x.products ? x.products : []" />
    </div>
  </div>
</template>

<script setup>
import ProductProps from "src/components/Home/productProps.vue";
import SwiperCaruser from "src/components/Home/SwiperCaruser.vue";
import IconSwiper from "src/components/Home/components/IconSwiper.vue";
import { onMounted, beforeCreate, onBeforeMount } from "vue";
import MasterCard from "../components/MasterCard/MasterCard.vue";
import { useProductsStore } from "src/stores/products";
import { useGeneralStore } from "src/stores/general";
import { mapState, storeToRefs, mapActions } from "pinia";
import SwipreViewCard from "src/components/SwipreViewCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const products = useProductsStore();
const lang = useGeneralStore();

const more = (id) => {
  router.push(`/category/${id}`);
};
</script>
<style lang="scss" scoped>
h6,
h5,
h4 {
  margin: 0px;
  font-weight: 600;
}
@media screen and (max-width: 500px) {
  h6 {
    font-size: 14px;
  }
}
</style>
