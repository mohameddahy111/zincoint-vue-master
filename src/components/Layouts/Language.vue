<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      unelevated
      :label="lang.lagn === 'en' ? 'English' : 'العربية'"
    >
      <q-list v-for="(x, index) in listLanguage" :key="index">
        <q-item clickable v-close-popup @click="onItemClick(x.val)">
          <q-item-section>
            <q-item-label>{{ x.language }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { useGeneralStore } from "stores/general.js";

const lang = useGeneralStore();
const onItemClick = (val) => {
  lang.lagn = val;
};
const listLanguage = [
  { language: "العربية", val: "ar" },
  { language: "English", val: "en" },
];
</script>
