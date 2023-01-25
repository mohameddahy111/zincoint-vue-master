<template>
  <div
    :class="
      lang.lagn === 'en'
        ? 'productes-props row shadow-5'
        : 'productes-props row shadow-5 aribcleft'
    "
  >
    <div class="col-3" v-for="(icon, index) in icons" :key="index">
      <IconBar :conta="icon" />
    </div>
  </div>
</template>

<script>
import IconBar from "./components/IconBar.vue";
import { useGeneralStore } from "src/stores/general";

export default {
  name: "ProductProps",
  components: { IconBar },
  setup() {
    const lang = useGeneralStore();
    return {
      lang,
    };
  },

  data() {
    const icons = [
      {
        title: "Possibility of replacement",
        title_ar: "امكانية الاستبدال",
        icon: "admin_panel_settings",
        pragrph: "Exchange and return policy",
        pragrph_ar: "سياسة الاستبدال و الاسترجتع",
      },
      {
        title: "Gifts and coupons",
        title_ar: "هدايا وكبونات",
        icon: "redeem",
        pragrph: " Many gifts and coupon",
        pragrph_ar: " العديد من الهدايا والكوبونات",
      },
      {
        title: "free shipping",
        title_ar: "الشحن مجانا",
        icon: "local_shipping",
        pragrph: "On purchases of more than 500 RS",
        pragrph_ar: " علي المشتريات التي تزيد عن 500 ريال",
      },
      {
        title: "Possibility of installment ",
        title_ar: "امكانية التقسيط",
        icon: "payments",
        pragrph: " Installment over 3 or 6 months",
        pragrph_ar: " التقسيط علي 3 او 6 اشهر",
      },
    ];
    return {
      icons,
    };
  },
};
</script>

<style lang="scss" scoped>
.productes-props {
  width: 80%;
  padding-left: 20px;
  background-color: #f8f8f8;
  position: relative;
  transform: translateY(-30%);
  z-index: 99;
  border-radius: 0px 20px 20px 0px;
}
.aribcleft {
  border-radius: 20px 0px 0px 20px;
  padding-right: 20px;
  padding-left: 0;
}
</style>
