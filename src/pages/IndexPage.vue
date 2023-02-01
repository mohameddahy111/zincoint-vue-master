<template>
  <section
    :class="`${
      lang.lagn === 'ar' ? 'aribc relative-position' : 'relative-position'
    }`"
  >
    <SwiperCaruser />
    <q-ajax-bar />
    <ProductProps />
    <IconSwiper
      :iconArry="
        products.productListIconsForHome ? products.productListIconsForHome : []
      "
    />
    <section class="row q-pa-lg q-gutter-lg justify-center">
      <div class="col-12 col-md-5">
        <img src="img/qq1.webp" alt="" class="full-width" />
      </div>
      <div class="col-12 col-md-5">
        <img src="img/qq2.webp" alt="" class="full-width" />
      </div>
    </section>
    <section class="q-pa-md relative-position">
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
    </section>
    <h4
      class="text-center text-weight-bolder q-py-md"
      v-text="lang.lagn === 'en' ? 'we chose for you' : 'اخترنا لك '"
    ></h4>
    <section
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
          </span
          >{{ "" }}
          <span
            class="text-capitalize text-weight-bold"
            v-text="
              lang.lagn === 'en'
                ? `( ${x.name_en} Provided by Zinco )`
                : `( ${x.name_ar} مقدمة من زينكو )`
            "
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
    </section>
    <section class="q-my-lg">
      <h4 class="text-capitalize text-center q-py-lg">
        {{
          lang.lagn === "ar"
            ? "لماذا يجب عليك اختيارنا ؟"
            : "Why should you choose us?"
        }}
      </h4>
      <div class="row">
        <div
          class="col-12 col-md-3 text-center q-px-lg shouldYouChoose"
          v-for="(x, index) in shouldYouChoose"
          :key="index"
        >
          <div class="img">
            <img :src="x.img" :alt="x.title_en" />
          </div>
          <div class="">
            <h5
              class=""
              v-text="lang.lagn === 'ar' ? x.title_ar : x.title_en"
            ></h5>
            <p v-text="lang.lagn === 'ar' ? x.desc_ar : x.desc_en"></p>
          </div>
        </div>
      </div>
    </section>
    <q-btn
      round
      size="md"
      class="fixed-bottom-left q-ma-lg bg-black text-white z-max"
    >
    <a href="https://api.whatsapp.com/send/?phone=966504899766&text&type=phone_number&app_absent=0">

      <q-tooltip anchor="center right" self="top left">{{ lang.lagn === 'ar'? 'هل تحتاج للمساعدة' :'need help' }} </q-tooltip>
      <q-icon size="md">
        <i class="fa-brands fa-whatsapp"></i>
      </q-icon>
    </a>
    </q-btn>
  </section>
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
const shouldYouChoose = [
  {
    img: "https://zincoint.com/zinco-ui/img/Icons-16.png",
    title_ar: "جودة",
    title_en: "Quality",
    desc_ar: `مصممة لتدوم ,كل منتج من منتجاتنا به مصنوع من اجود المواد`,
    desc_en:
      "Designed to last, each of our products is made from the finest materials",
  },
  {
    img: "https://zincoint.com/zinco-ui/img/Icons-15.png",
    title_ar: "إستبدال وإسترجاع",
    title_en: "Replacement and refund",
    desc_ar: `اذا وصلك منتج به عيب مصنعي او تلف سيتم استبداله او استرجاعه بكل سهولة`,
    desc_en:
      "If you receive a product with a manufacturing defect or damage, it will be replaced or returned with ease",
  },
  {
    img: "https://zincoint.com/zinco-ui/img/Icons-14.png",
    title_ar: "مدفوعات آمنة",
    title_en: "Secure payments",
    desc_ar: `تتم معالجة جميع المدفوعات علي الفور عبر برتوكول دفع آمن`,
    desc_en:
      "All payments are processed instantly via a secure payment protocol",
  },
  {
    img: "https://zincoint.com/zinco-ui/img/Icons-13.png",
    title_ar: "شحن مجاني",
    title_en: "Free shipping",
    desc_ar: `جميع المشتريات التي تزيد عن ٥٠٠ ريال مؤهلة للحصول علي الشحن المجاني`,
    desc_en: "All purchases over 500 SAR are eligible for free shipping",
  },
];

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
.shouldYouChoose {
  padding-bottom: 20px;
  margin: 50px 0px;

  img {
    width: 30%;
    position: relative;
  }
  h5 {
    margin: 20px;
    font-size: 20px;
  }
  p {
    font-size: 16px;
  }
  :hover.img::before {
    background-color: #c0d7fb;
  }
}
.img::before {
  content: "";
  width: 60px;
  height: 60px;
  background-color: rgba(204, 203, 203, 0.286);
  position: absolute;
  border-radius: 50%;
  transform: translate(30%);
  transition: all 0.5s;
}
@media screen and (max-width: 500px) {
  h6 {
    font-size: 14px;
  }
}
</style>
