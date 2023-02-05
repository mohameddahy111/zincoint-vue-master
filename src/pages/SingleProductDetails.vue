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
            class="full-width rounded-borders shadow-5"
            v-show="x.default === 1"
          />
        </div>
        <q-dialog
          full-height
          v-model="medium"
          transition-show="flip-down"
          transition-hide="flip-up"
          class="bg-transparent"
        >
          <!-- <q-bar style=""> -->
          <q-carousel
            swipeable
            animated
            v-model="slide"
            v-model:fullscreen="fullscreen"
            thumbnails
            infinite
            arrows
            class="bg-transparent full-width full-height q-pa-md"
          >
            <q-carousel-slide
              :name="index"
              @click="fullscreen = !fullscreen"
              :img-src="products.imageUrl + x.name"
              v-for="(x, index) in products.productDetails.images"
              :key="index"
            />
            <q-btn
              dense
              flat
              icon="close"
              class="z-notify absolute-top-right bg-white"
              v-close-popup
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-carousel>
          <q-btn
            dense
            flat
            icon="close"
            class="absolute-top-right bg-white"
            v-close-popup
          >
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
          <q-item>
            <p class="text-h6">
              {{ lagn.lagn === "ar" ? "السعر" : "price" }} :
              <span class="text-h6 text-red-5">
                {{ products.productDetails.price }} </span
              >{{ "" }}
              <span class="">
                {{ lagn.lagn === "ar" ? "ريال" : "RS" }}
              </span>
            </p>
          </q-item>
          <q-item>
            <p class="text-h6">
              {{ lagn.lagn === "ar" ? "الحالة " : "Status " }} :
              <span
                class="text-h6 text-green-10"
                v-show="products.productDetails.quantities > 0"
              >
                {{ lagn.lagn === "ar" ? "متوفرة" : "available" }}
                <q-icon name="check_circle_outline" />
              </span>
              <span
                class="text-h6 text-red-4"
                v-show="products.productDetails.quantities === 0"
              >
                {{ lagn.lagn === "ar" ? " غير متوفرة" : "not available" }}
              </span>
            </p>
          </q-item>
          <q-item
            class=" quantity-list-item"
            v-show="products.productDetails.quantities > 0"
          >
            <div class="quantity">
              <q-btn
                style="height: 20px"
                @click="quantity('remove')"
                icon="remove"
                rounded
                :disable="quantityValue === 1"
                outline
              class="text-red-10"
              ></q-btn>
              <q-input
                :input-style="{
                  width: '70px',
                  textAlign: 'center',
                  height: '60px',

                }"
                v-model="quantityValue"
                type="text"
                class="text-center"
                style="height: 65px"
              />
              <q-btn
                style="height: 20px"
                @click="quantity('add')"
                icon="add"
                rounded

                :disable="quantityValue === products.productDetails.quantities"
                outline
                class="text-green-10 "

              ></q-btn>
            </div>
            <q-btn
              rounded
              unelevated
              class="bg-primary text-black full-width"
              style="height: 40px"
              @click="addToCart(products.productDetails, quantityValue)"
            >
              {{ lagn.lagn === "ar" ? "اضف للسلة " : "Add To Cart" }}
            </q-btn>
          </q-item>
        </q-list>
        <TabGuarantee :showData="products.productDetails" />
      </div>
    </div>
    <div class="col-12" v-show="products.productDetails.related?.length >0">
      <div class="q-pa-lg">
        <p class="text-h4 q-my-lg text-weight-bold">
          {{ lagn.lagn === "ar" ? "المنتجات المتعلقة" : "Related products" }}
        </p>

        <DetilsSwiper :swiperData="products.productDetails.related"  />
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { onMounted, onUpdated, ref, watchEffect } from "vue";
import { useProductsStore } from "src/stores/products";

import { useGeneralStore } from "src/stores/general";
import { useRoute } from "vue-router";
import TabGuarantee from "src/components/TabGuarantee.vue";
import IconBar from "src/components/Home/components/IconBar.vue";
import { useQuasar } from "quasar";
import DetilsSwiper from "src/components/DetilsSwiper.vue";

const quantityValue = ref(1);
const products = useProductsStore();
const lagn = useGeneralStore();
const route = useRoute();
const img = ref("");
const medium = ref(false);
const fullscreen = ref(false);
const slide = ref(1);
const $q = useQuasar();

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
const quantity = (oop) => {
  oop === "add" ? quantityValue.value++ : quantityValue.value--;
};
defineProps(["dialogData"]);
const addToCart = (item, quantity) => {
  const existItem = products.cartItems.find((x) => x.id === item.id);
  if (existItem) {
    existItem.quantity = quantity ? quantity : existItem.quantiy + 1;
    localStorage.setItem("cartItems", JSON.stringify(products.cartItems));
    $q.notify({
      message: `${
        lagn.lagn === "en"
          ? item.name_en + " Is Update "
          : "تم  تعديل  " + item.name_ar
      }`,
      position: "top",
      color: "warning",
    });
  } else {
    const newItem = { ...item };
    newItem.quantity = quantity ? quantity : 1;
    products.cartItems.push({ ...newItem });
    localStorage.setItem("cartItems", JSON.stringify(products.cartItems));
    $q.notify({
      message: `${
        lagn.lagn === "en"
          ? item.name_en + "  Add to Cart"
          : "تم  اضافة  " + item.name_ar + " الي عربة التسوق "
      }`,
      position: "top",
      color: "green",
    });
  }
};
    onMounted(() => products.getProductDetails(route.params.id));
    onUpdated(()=> products.getProductDetails(route.params.id))
</script>

<style lang="scss" scoped>
.q-carousel__slide {
  cursor: zoom-in;
}
img {
  cursor: zoom-in;
}
.quantity-list-item{
  display: flex; align-items: center;
  @media screen and (max-width: 600px) {
flex-direction: column;
gap: 20px;
  }
}
.quantity {
  height: 50px;
  border: 1px solid gray;
  display: flex;
  min-width: 250px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  margin: 0px 20px;
  gap: 10px;
}
</style>
>
