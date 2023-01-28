<template>
  <div class="">
    <q-btn flat label="Products" class="shadow-0">
      <q-menu uclass=" shadow-0">
        <q-list dese style="min-width: 100px">
          <q-item
            clickable
            v-for="(x, index) in products.CategoryWithProducts"
            :key="index"
          >
            <q-item-section>{{ x.name_en }} </q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right" />
            </q-item-section>

            <q-menu anchor="top end" self="top start">
              <q-list>
                <q-item
                  v-for="(y, index) in x.products"
                  :key="index"
                  dense
                  clickable
                >
                  <q-item-section> {{ y.name_en }}</q-item-section>
                  <!-- <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-menu auto-close anchor="top end" self="top start">
                    <q-list>
                      <q-item v-for="n in 3" :key="n" dense clickable>
                        <q-item-section>3rd level Label</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu> -->
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section>Quit</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "../../stores/products";
const products = useProductsStore();
</script>

<style>
.Products {
  box-shadow: none !important;
}
</style>
