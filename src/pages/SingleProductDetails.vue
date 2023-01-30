<template>
  <q-page-container :class="lagn.lagn === 'ar' ? 'aribc' : ''">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 q-pa-sm flex">
        <div
          class=""
          v-for="(x, index) in products.productDetails.images"
          :key="index"
        >
          <img
            :src="img ? img : products.imageUrl + x.name"
            :alt="products.productDetails.name_ar"
            @click="medium = true"
            class="full-width rounded-borders shadow-5 "
            v-show="x.default === 1"
          />
        </div>
        <q-dialog

          full-height
          v-model="medium"
          transition-show="flip-down"
          transition-hide="flip-up"
          class=" bg-transparent"
        >
          <!-- <q-bar style=""> -->
            <q-carousel swipeable animated v-model="slide" v-model:fullscreen="fullscreen" thumbnails infinite arrows class="bg-transparent full-width full-height q-pa-md " >
              <q-carousel-slide
                :name="index"
                @click="fullscreen=!fullscreen"
                :img-src="products.imageUrl + x.name"
                v-for="(x, index) in products.productDetails.images"
                :key="index"
              />
              <q-btn dense flat icon="close" class=" z-notify absolute-top-right  bg-white" v-close-popup>
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </q-carousel>
            <q-btn dense flat icon="close" class=" absolute-top-right  bg-white" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>

          <!-- </q-bar> -->
        </q-dialog>
        <!-- <div
          class=" "
          v-for="(x, index) in products.productDetails.images"
          :key="index"
        >
          <img
            :src="products.imageUrl + x.name"
            :alt="products.productDetails.name_ar"
            class="cursor-pointer rounded-borders shadow-5 q-ma-xs"
            @click="changeImg(products.imageUrl + x.name)"
          />
        </div> -->
      </div>
      <div class="col-12 col-sm-6 col-md-5 q-px-md">
        <div class="flex justify-between full-width">
          <IconBar
            :conta="propsDelviry[0]"
            :price="products.productDetails.price"
          />
          <div
            :class="
              products.productDetails.price >= 500
                ? 'flex items-center text-green'
                : ''
            "
          >
            <IconBar
              :conta="propsDelviry[1]"
              :price="products.productDetails.price"
            />

            <q-icon
              v-show="products.productDetails.price >= 500"
              name="check_circle"
            />
          </div>
        </div>
        <q-list>
          <q-item>
            <h5
              class="q-ma-xs"
              v-text="
                lagn.lagn === 'ar'
                  ? products.productDetails.name_ar
                  : products.productDetails.name_en
              "
            ></h5>
          </q-item>
          <q-item>
            <p>
              {{ lagn.lagn === "ar" ? "رقم الصنف" : "Item No" }} :
              {{ products.productDetails.number }}
            </p>
          </q-item>
          <q-item> </q-item>
        </q-list>

        <!-- <div
          class="container"
          v-html="
            lagn.lagn === 'ar'
              ? products.productDetails.details_ar
              : products.productDetails.details_ar
          "
        ></div> -->
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from "vue";
import { useProductsStore } from "src/stores/products";
import { useGeneralStore } from "src/stores/general";
import { useRoute } from "vue-router";
import IconBar from "src/components/Home/components/IconBar.vue";
const products = useProductsStore();
const lagn = useGeneralStore();
const route = useRoute();
const img = ref("");
const medium = ref(false);
const fullscreen= ref(false)
const slide = ref(1);
const propsDelviry = [
  {
    title: "Fast delivery",
    icon: "flash_on",
    title_ar: "تسليم سريع",
    pragrph: "in 4 day work",
    pragrph_ar: "  خلال 4 ايام عمل ",
  },
  {
    title: "Free Shipping",
    icon: "local_shipping",
    title_ar: "شحن مجاني",
    pragrph: "Free Shipping of more than 500 RS",
    pragrph_ar: "للطلبات فوق 500 ريال",
    free: " in free shipping",
    free_ar: " في الشحن المجاني",
  },
];
const changeImg = (scr) => {
  img.value = scr;
};

onMounted(() => products.getProductDetails(route.params.id));
</script>

<style lang="scss" scoped>
.q-carousel__slide{
  cursor: zoom-in;
}
img{
  cursor: zoom-in;
}
</style>>
