<template>
  <q-page-container>
    <div class="q-px-lg row">
      <div class="col-12 col-md-6">
        <h4>{{ lang.lagn === "ar" ? "عربة التسوق " : "Cart Items" }}</h4>
      </div>
      <div class="q-pa-md col-12 col-md-6">
        <q-stepper
          v-model="step"
          ref="stepper"
          alternative-labels
          color="primary"
          animated
          flat
          class="bg-transparent"
          style="direction: ltr"
        >
          <q-step
            :name="1"
            icon="shopping_cart"
            :title="lang.lagn === 'ar' ? 'عربية التسوق' : 'Check Cart'"
            :done="step > 1"
          >
          </q-step>
          <q-step
            :name="2"
            :title="lang.lagn === 'ar' ? ' معلومات الشحن ' : ' Shipping info'"
            icon="local_shipping"
            :done="step > 2"
          >
          </q-step>
          <q-step
            :name="3"
            :title="
              lang.lagn === 'ar' ? '  التاكيد والدفع ' : 'Confirm and Payment '
            "
            icon="payment"
            :done="step > 3"
          >
          </q-step>
        </q-stepper>
      </div>
    </div>
    <section>
      <div class="text-center" v-show="products.cartItems.length === 0">
        <h1>
          {{
            lang.lagn === "ar"
              ? "سلة التسوق فارغة من فضلك ضع فيها بعض المنتجات"
              : "Your cart is empty, please put some products in it"
          }}
        </h1>
      </div>
      <div class="q-pa-md" v-show="products.cartItems.length > 0">
        <q-markup-table class="hide-scrollbar">
          <thead>
            <tr>
              <th class="text-center"></th>
              <th class="text-center">
                <h6>
                  {{ lang.lagn === "ar" ? "رقم الصنف	" : "Item No" }}
                </h6>
              </th>
              <th class="text-center">
                <h6>
                  {{ lang.lagn === "ar" ? "سعر الوحدة		" : " Unit Price" }}
                </h6>
              </th>
              <th class="text-center">
                <h6>
                  {{ lang.lagn === "ar" ? "الكمية	" : "Quantity" }}
                </h6>
              </th>
              <th class="text-center">
                <h6>
                  {{ lang.lagn === "ar" ? "الاجمالي	" : " Total" }}
                </h6>
              </th>
              <th class="text-center">
                <h6>
                  {{ lang.lagn === "ar" ? "	حذف المنتج" : "Delete " }}
                </h6>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x, index) in products.cartItems" :key="index">
              <td class="text-center">
                <div class="td-img" v-if="x.image">
                  <router-link :to="`/productdetails/${x.id}`">
                    <img
                      :src="products.imageUrl + x.image.name"
                      alt=""
                      class="full-width"
                    />
                  </router-link>
                </div>

                <router-link :to="`/productdetails/${x.id}`">
                <div class="td-img" v-for="(x, index) in x.images" :key="index">
                    <img
                      :src="products.imageUrl + x.name"
                      v-show="x.default === 1"
                      alt="x.name"
                      class="full-width"
                    />
                  </div>
                </router-link>
              </td>
              <td class="text-center">
                <p>
                  {{ x.number }}
                </p>
              </td>
              <td class="text-center">
                <p>
                  {{
                    lang.lagn === "ar" ? x.price + " ريال " : x.price + " RS"
                  }}
                </p>
              </td>
              <td class="text-center">
                <div class="quantity-list-item">
                  <div class="quantity">
                    <q-btn
                      style="height: 20px"
                      @click="quantity(x.id, 'remove')"
                      icon="remove"
                      rounded
                      :disable="x.quantity === 1"
                      outline
                      class="text-red-10"
                    ></q-btn>
                    <q-input
                      :input-style="{
                        width: '70px',
                        textAlign: 'center',
                        height: '60px',
                      }"
                      v-model="x.quantity"
                      type="text"
                      class="text-center"
                      style="height: 65px"
                    />
                    <q-btn
                      style="height: 20px"
                      @click="quantity(x.id, 'add')"
                      icon="add"
                      rounded
                      :disable="x.quantity === x.quantities"
                      outline
                      class="text-green-10"
                    ></q-btn>
                  </div>
                </div>
              </td>
              <td class="text-center">
                <p>
                  {{ parseFloat(x.price * x.quantity).toFixed(2) }}
                </p>
              </td>
              <td class="text-center">
                <q-btn
                  icon="delete"
                  round
                  text-color="red"
                  unelevated
                  @click="deleteItem(x)"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="flex justify-around q-my-lg" v-show="products.cartItems.length >0">
        <h6>
          {{ lang.lagn === "ar" ? "الاجمالي" : "total" }}:{{
            parseFloat(total).toFixed(2)
          }}
          {{ lang.lagn === "ar" ? " ريال" : " Rs" }}
        </h6>
        <div class="">
          <q-btn
            unelevated
            class="bg-primary text-black"
            rounded
            @click="()=>{$router.push('/shipping')}"
          >
            {{ lang.lagn === "ar" ? "اتمام الشراء " : "Check Cart" }}
          </q-btn>
        </div>
      </div>
      <!-- Start total Table -->
      <div class="q-pa-md" v-show="products.cartItems.length > 0">
        <q-markup-table class="hide-scrollbar" flat>
          <thead>
            <tr class="text-capitalize">
              <div class="table-head full-width">
                <th class="text-center full-width">
                  <h6>
                    {{
                      lang.lagn === "ar"
                        ? "الاجمالي قبل الخصم"
                        : "total before discount"
                    }}
                  </h6>
                </th>
                <th class="text-center full-width">
                  <h6>
                    {{
                      lang.lagn === "ar" ? "إجمالي الخصم" : " Total discount"
                    }}
                  </h6>
                </th>
                <th class="text-center full-width">
                  <h6>
                    {{
                      lang.lagn === "ar"
                        ? "الاجمالي بعد الخصم	"
                        : "Total after discount"
                    }}
                  </h6>
                </th>
                <th class="text-center full-width">
                  <h6>
                    {{
                      lang.lagn === "ar"
                        ? "ضريبة القيمة المضافة 15%	"
                        : " VAT 15%"
                    }}
                  </h6>
                </th>
                <th
                  class="text-center bg-primary border-radius-inherit full-width"
                >
                  <h6>
                    {{ lang.lagn === "ar" ? "	الاجمالي المستحق" : "Total " }}
                  </h6>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr>
              <div class="table-body q-px-lg">
                <td class="text-center">
                  <p>
                    {{
                      lang.lagn === "ar"
                        ? parseFloat(total).toFixed(2) + " ريال "
                        : parseFloat(total).toFixed(2) + " RS "
                    }}
                  </p>
                </td>
                <td
                  :class="
                    lang.lagn === 'ar'
                      ? 'text-center border-right text-red'
                      : 'text-center border-left text-red'
                  "
                >
                  <p>
                    -
                    {{
                      lang.lagn === "ar"
                        ? parseFloat(discount).toFixed(2) + " ريال "
                        : parseFloat(discount).toFixed(2) + " RS "
                    }}
                  </p>
                </td>
                <td
                  :class="
                    lang.lagn === 'ar'
                      ? 'text-center border-right'
                      : 'text-center border-left'
                  "
                >
                  <p>
                    {{
                      lang.lagn === "ar"
                        ? parseFloat(total - discount).toFixed(2) + " ريال "
                        : parseFloat(total - discount).toFixed(2) + " RS "
                    }}
                  </p>
                </td>
                <td
                  :class="
                    lang.lagn === 'ar'
                      ? 'text-center border-right'
                      : 'text-center border-left'
                  "
                >
                  <p>
                    {{
                      lang.lagn === "ar"
                        ? parseFloat((total - discount) * 0.15).toFixed(2) +
                          " ريال "
                        : parseFloat((total - discount) * 0.15).toFixed(2) +
                          " RS "
                    }}
                  </p>
                </td>
                <td
                  :class="
                    lang.lagn === 'ar'
                      ? 'text-center border-right'
                      : 'text-center border-left'
                  "
                >
                  <p>
                    {{
                      lang.lagn === "ar"
                        ? parseFloat(total + (total - discount) * 0.15).toFixed(
                            2
                          ) + " ريال "
                        : parseFloat(total + (total - discount) * 0.15).toFixed(
                            2
                          ) + " RS "
                    }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <!-- End  total Table-->
    </section>
  </q-page-container>
</template>

<script setup>
import { useAuth } from "src/stores/auth";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "src/stores/products";
import { useGeneralStore } from "src/stores/general";
import { useQuasar } from "quasar";

const user = useAuth();
const $router = useRouter();
const products = useProductsStore();
const lang = useGeneralStore();
const $q = useQuasar();
const step = ref(1);
const total = ref(
  products.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
);
const discount = ref(
  products.cartItems.reduce((a, c) => a + c.quantity * c.price * c.offer, 0)
);

watchEffect(() => {
  total.value = products.cartItems.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );

  discount.value = products.cartItems.reduce(
    (a, c) => a + c.quantity * c.price * c.offer,
    0
  );
});

watchEffect(() => {
  !user.userToken ? $router.push("/") : "";
});
const quantity = (id, opp) => {
  const item = products.cartItems.find((x) => x.id === id);
  if (opp === "add") {
    item.quantity = item.quantity + 1;
    localStorage.setItem("cartItems", JSON.stringify(products.cartItems));
    if (item.quantity > item.quantities) {
      $q.notify({
        message:
          lang.lagn === "ar"
            ? "هذة الكمية غير متوفرة الرجاء الاتصال بالفرع لتوفير طلبك "
            : "This quantity is not available. Please contact the branch to place your order",
        position: "top",
        color: "red-5",
      });
      cart.value = products.cartItems;
    } else {
      $q.notify({
        message: `${lang.lagn === "en" ? " Is Update " : "تم  تعديل  "}`,
        position: "top",
        color: "warning",
      });
    }
  } else {
    item.quantity = item.quantity - 1;
    localStorage.setItem("cartItems", JSON.stringify(products.cartItems));
    $q.notify({
      message: `${lang.lagn === "en" ? " Is Update " : "تم  تعديل  "}`,
      position: "top",
      color: "warning",
    });
  }
};
const deleteItem = (item) => {
  products.cartItems = products.cartItems.filter((x) => x.id !== item.id);
  localStorage.setItem("cartItems", JSON.stringify(products.cartItems));
};
</script>

<style lang="scss" scoped>
h6 {
  margin: 0;
  font-weight: 700;
}
p {
  font-size: 18px;
  margin-top: 10px;
  font-weight: 500;
}

.td-img {
  width: 60px;
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
}
.table-head {
  border: 1px solid #f0c000 !important;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // background-color: red;
}

.table-body {
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .border-right {
    border-right: 1.5px solid rgb(176, 175, 175);
    margin: 10px 20px;
    padding-right: 20px;
  }
  .border-left {
    border-left: 1.5px solid rgb(176, 175, 175);
    margin: 10px 20px;
    padding-left: 20px;
    width: 100%;
  }
}
.quantity-list-item {
  display: flex;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
}
.quantity {
  height: 50px;
  // border: 1px solid gray;
  display: flex;
  min-width: 250px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  margin: 0px 20px;
  gap: 10px;
}
</style>
