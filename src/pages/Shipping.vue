<template>
  <q-page-container>
    <div class="q-px-lg row">
      <div class="col-12 col-md-6">
        <h4>
          {{ lang.lagn === "ar" ? " معلومات الشحن" : " Shipping information" }}
        </h4>
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
      <h6 class="text-center">
        {{ lang.lagn === "ar" ? "البيانات الشخصية" : "Personal data" }}
      </h6>
      <div class=""></div>
    </section>

    <section>
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
    </section>
  </q-page-container>
</template>

<script setup>
import { useGeneralStore } from "src/stores/general";

import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "src/stores/auth";
import { useProductsStore } from "src/stores/products";

const $router = useRouter();
const products = useProductsStore();
const total = ref(
  products.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
);
const discount = ref(
  products.cartItems.reduce((a, c) => a + c.quantity * c.price * c.offer, 0)
);
const lang = useGeneralStore();
const user = useAuth();
const step = ref(2);

watchEffect(() => {
  !user.userToken ? $router.push("/") : "";
});
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
</style>
