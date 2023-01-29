<template>
  <div class="q-pa-md">
    <q-expansion-item
      class="shadow-1 overflow-hidden"
      style="border-radius: 30px"
      :label="lagn.lagn === 'ar' ? ShowData.name_ar : ShowData.name_en"
      @show="startCounting"
      @hide="stopCounting"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <q-card>
        <q-list>
          <q-item v-for="(x, index) in ShowData.sub_categories" :key="index">
            <div class="q-pa-xs">
              <q-checkbox
                v-model="val"
                :label="lagn.lagn === 'ar' ? x.name_ar : x.name_en"
              />
            </div>
          </q-item>
        </q-list>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import { ref } from "vue";
import { useGeneralStore } from "src/stores/general";

export default {
  props: {
    ShowData: [],
  },
  setup() {
    return {
      val: ref(true),
      lagn: useGeneralStore(),
    };
  },
};
</script>
