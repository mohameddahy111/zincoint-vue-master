<template>
  <q-page-container :class="lagn.lagn === 'ar' ? 'aribc q-pr-md' : 'q-pl-md'">
    <h4 class="text-center text-weight-bold">
      {{ lagn.lagn === "ar" ? returnData.name_ar : returnData.name_en }}
    </h4>
    <div
      class=""
      v-html="
        lagn.lagn === 'ar' ? returnData.content_ar : returnData.content_en
      "
    ></div>
  </q-page-container>
</template>
``
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useGeneralStore } from "src/stores/general";
const lagn = useGeneralStore();
const returnData = ref({});
onMounted(async () => {
  try {
    await axios
      .get("https://zincoint.com/api/terms_condition")
      .then((res) => (returnData.value = res.data.data.terms_condition));
  } catch (error) {}
});
</script>

<style lang="scss" scoped></style>
