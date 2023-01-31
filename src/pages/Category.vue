<template>
  <q-page-container :class="lang.lagn === 'ar' ? 'aribc row' : 'row'">
    <div class="col-3">
      <FilterList :ShowData="retunData"  />
      <div class="q-pa-md">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          :label="lang.lagn === 'ar' ? 'الاسعار':'the prices'"
          @show="startCounting"
          @hide="stopCounting"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
        <q-form @submit="onSubmit" class="q-gutter-md q-pa-md">
      <div class="q-mt-xl">
        <q-range
          name="price_range"
          :v-model="{rangPrice}"
          label-always
          :max="rangPrice.max"
          :min="rangPrice.min"
        />
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>

      <div>
      </div>

        </q-expansion-item>
      </div>
    </div>
    <div class="col-9 q-pa-sm">
      <div class="full-width">
        <img
          :src="`https://zincoint.com/public/upload/categories/${
            lang.lagn === 'ar' ? retunData.banner_ar : retunData.banner_en
          }`"
          alt=""
          class="full-width"
        />
      </div>
      <div class="row text-center">
        <q-ajax-bar color="primary" size="5px"/>

        <div
          v-for="(x, index) in products.data"
          :key="index"
          class="col-6 q-my-sm q-pa-md "
        >
          <MasterCard :showdata="x" />
          <p class="text-h6">
            {{ lang.lagn === "ar" ? x.name_ar : x.name_en }}
          </p>
          <p class="text-h5">
            <span class="text-h6 text-red-5"> {{ x.price }} </span>{{ "" }}
            <span class="">
              {{ lang.lagn === "ar" ? "ريال" : "RS" }}
            </span>
          </p>
          <p v-show="x.price > 500">
            <q-icon name="local_shipping" class="text-h5" />{{ "" }}
            {{ lang.lagn === "ar" ? "شحن مجاني " : "Free Shipping" }}
          </p>
        </div>
      </div>
      <div
        :class="
          lang.lagn === 'en'
            ? 'q-pa-lg flex flex-center'
            : 'q-pa-lg flex flex-center aribc'
        "
      >
        <q-pagination
          v-model="products.current_page"
          :max="products.last_page"
          input
          :icon-first="lang.lagn === 'en' ? 'skip_previous' : 'skip_next'"
          :icon-next="
            lang.lagn === 'en' ? 'arrow_forward_ios' : 'arrow_back_ios'
          "
          :icon-last="lang.lagn === 'en' ? 'skip_next' : 'skip_previous'"
          :icon-prev="
            lang.lagn === 'en' ? 'arrow_back_ios' : 'arrow_forward_ios'
          "
          @update:model-value="paginationSet(products.current_page)"
        />
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { useGeneralStore } from "src/stores/general";
import { useRoute } from "vue-router";
import { ref, onBeforeMount, watchEffect, reactive, computed  } from "vue";
import axios from "axios";
import { useQuasar, QSpinnerFacebook } from "quasar";
import MasterCard from "src/components/MasterCard/MasterCard.vue";
import FilterList from "src/components/FilterList.vue";

const lang = useGeneralStore();
const $route = useRoute();
const $q = useQuasar();
const retunData = ref("");
const products = ref("");
const rangPrice= ref({max :''  , min :''} )
const page = ref(``);




const onSubmit=()=>{

}
onBeforeMount(async () => {
  $q.loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: "yellow",
    spinnerSize: 140,
    backgroundColor: "purple",
    message: "Some important process is in progress. Hang on...",
    messageColor: "black",
  });
  try {
    await axios
      .get(
        `https://zincoint.com/api/products_by_category/${$route.params.category}?min=&max=&brand_id=&sort=`
      )
      .then((res) => {
        retunData.value = res.data.data.category;
        products.value = res.data.data.products;
        // price.value =res.data.data.price_rang
        rangPrice.value.max =  res.data.data.price_rang.max_price
        rangPrice.value.min = res.data.data.price_rang.min_price;
        console.log(res.data.data);
      });

    $q.loading.hide();
  } catch (error) {
    console.log(error);
    $q.loading.hide();
  }
});
const paginationSet = async (value) => {
  $q.loading.show({
    spinner: QSpinnerFacebook,
    spinnerColor: "yellow",
    spinnerSize: 140,
    backgroundColor: "purple",
    message: "Some important process is in progress. Hang on...",
    messageColor: "black",
  });

  try {
    await axios
      .get(
        `https://zincoint.com/api/products_by_category/${$route.params.category}?page=${value}`
      )
      .then((res) => {
        products.value = res.data.data.products;
      });
    $q.loading.hide();
  } catch (error) {}
};
</script>

<style lang="scss" scoped>
</style>
