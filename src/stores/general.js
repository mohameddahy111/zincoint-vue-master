import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralStore = defineStore("general", () => {
  const lagn = ref("ar");

  return {
    lagn,
  };
});
