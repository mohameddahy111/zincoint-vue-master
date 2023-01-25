<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      split
      unelevated
      no-caps
      :label="lang.lagn === 'en' ? 'English' : 'العربية'"
      @click="onMainClick"
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
const onMainClick = () => {};
const onItemClick = (val) => {
  lang.lagn = val;
};
const listLanguage = [
  { language: "العربية", val: "ar" },
  { language: "English", val: "en" },
];
</script>
