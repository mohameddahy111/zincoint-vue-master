<template>
  <q-dialog :class="lagn.lagn === 'ar' ? 'aribc' : ''">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <p class="text-h6 text-capitalize">
          {{ lagn.lagn === "ar" ? dialogData.name_ar : dialogData.name_en }}
        </p>
      </q-card-section>
      <div class="row q-pa-sm">
        <div class="col-12 col-sm-4 q-table--bordered">
          <img
            :src="`https://zincoint.com/public/upload/products/gallery/${dialogData.image.name}`"
            alt=""
            class="full-width"
          />
        </div>
        <div class="text-capitalize">
          <q-list>
            <q-item>
              <p class="text-h5">
                {{ lagn.lagn === "ar" ? "السعر" : "price" }} :
                <span class="text-h6 text-red-5"> {{ dialogData.price }} </span
                >{{ "" }}
                <span class="">
                  {{ lagn.lagn === "ar" ? "ريال" : "RS" }}
                </span>
              </p>
            </q-item>
            <q-item>
              <p class="text-h5">
                {{ lagn.lagn === "ar" ? "رقم المنتج" : "item-No" }} :
                <span class="text-h6">
                  {{ dialogData.number }}
                </span>
              </p>
            </q-item>
            <q-item>
              <p class="text-h5">
                {{ lagn.lagn === "ar" ? "الحالة " : "Status " }} :
                <span
                  class="text-h6 text-green-10"
                  v-show="dialogData.quantities > 0"
                >
                  {{ lagn.lagn === "ar" ? "متوفرة" : "available" }}
                  <q-icon name="check_circle_outline" />
                </span>
                <span
                  class="text-h6 text-red-4"
                  v-show="dialogData.quantities === 0"
                >
                  {{ lagn.lagn === "ar" ? " غير متوفرة" : "not available" }}
                </span>
              </p>
            </q-item>
            <q-item class="quantity" v-show="dialogData.quantities > 0">
              <q-btn
                @click="quantity('remove')"
                icon="remove"
                rounded
                :disable="quantityValue === 1"
              ></q-btn>
              <q-input
                :input-style="{
                  width: '70px',
                  textAlign: 'center',
                }"
                v-model="quantityValue"
                type="text"
                class="text-center"
              />
              <q-btn
                @click="quantity('add')"
                icon="add"
                rounded
                :disable="quantityValue === dialogData.quantities"
              ></q-btn>
            </q-item>
            <q-item>
              <p>{{ lagn.lagn === "ar" ? "العلامة التجارية " : "Brand" }}</p>
            </q-item>
            <q-item>
              <p>{{ lagn.lagn === "ar" ? "النوع " : "Type " }} :</p>
              <p>{{ dialogData.type }}{{ id }}</p>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="flex item-center justify-end">
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            label="Add to Cart"
            v-close-popup
            @click="addToCart(dialogData, quantityValue)"
          />
        </q-card-actions>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {
  defineProps,
  ref,
  computed,
} from "vue";
import { useGeneralStore } from "src/stores/general";
import { useProductsStore } from "src/stores/products";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

const products = useProductsStore();
const $q = useQuasar();
const quantityValue = ref(1);
const lagn = useGeneralStore();
const $router = useRoute();
const id =ref('')

const quantity = (oop) => {
  oop === "add" ? quantityValue.value++ : quantityValue.value--;
};
defineProps(()=>["dialogData"]);
computed(()=>id.value = this.dialogData.id )

// Add to cart//
const addToCart = (item, quantity) => {
  const existItem = products.cartItems.find((x) => x.id === item.id);
  if (existItem) {
    existItem.quantity = quantity ? quantity : existItem.quantity + 1;
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
</script>

<style lang="scss" scoped>
.quantity {
  height: 60px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  margin: 0px 20px;
  gap: 10px;
}
</style>
