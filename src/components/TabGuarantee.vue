<template>
  <div class="q-pa-md">
    <div style="max-width: 600px">
      <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
        <q-tab :class=" tab ==='productDetails'? 'text-black tabFoucs bg-primary' : 'text-black tabFoucs'" name="productDetails" :label="lang.lagn==='ar'? 'تفاصيل المنتج': 'Product details'" />
        <q-tab :class=" tab ==='warranty'? 'text-black tabFoucs bg-primary' : 'text-black tabFoucs'" name="warranty" :label="lang.lagn==='ar'? ' الشهادات': ' warranty'" />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="text-center"
        >
          <q-tab-panel name="productDetails">
            <div class="text-h6">
              <img src="https://zincoint.com/zinco-ui/img/specs.png" alt="Product details">
              <p>{{ lang.lagn === 'ar'? 'التفاصيل والوصف' :'Details and description' }} </p>

            </div>
                    <div
          v-html="
            lang.lagn === 'ar'
              ? showData.details_ar
              : showData.details_ar
          "
        ></div>

          </q-tab-panel>

          <q-tab-panel name="warranty">
            <div class="text-h6">
              <img src="https://zincoint.com/zinco-ui/img/cert.png" alt="warranty">
              <p>{{ lang.lagn === 'ar'? ' الشهادات' :' Warranty' }} </p>


            </div>
            <div
          v-html="
            lang.lagn === 'ar'
              ? showData.warranty_ar
              : showData.warranty_en
          "
        ></div>

          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGeneralStore } from 'src/stores/general';

defineProps(["showData"]);
const lang = useGeneralStore()

const tab = ref("productDetails");
</script>
<style lang="scss" scoped>
.tabFoucs{
  border-radius: 40px;
  border: 1px gray solid;
  margin-left: 20px;
}

</style>
