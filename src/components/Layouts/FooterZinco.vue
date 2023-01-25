<template>
  <div class="q-footer--bordered row q-pa-lg">
    <div class="col-12 col-md-6">
      <ZincoLogo />
      <p
        v-text="
          lang.lagn === 'en' ? 'downloade zinco App' : 'حمل التطبيق الان '
        "
        class="text-center q-pa-sm text-h6 text-capitalize"
      ></p>
      <div class="flex justify-center  items-center app-store">
        <a href="https://play.google.com/store/apps/details?id=com.zincoint.zinco">
          <img
            src="https://i.pinimg.com/564x/21/03/98/2103982ca2dcefc3d4f4dda616eeee53.jpg"
            alt="google-playStore"
          />
        </a>
        <a href="https://apps.apple.com/sa/app/zinco"  >
          <img
            src="https://i.pinimg.com/564x/93/29/00/93290032b3ef8d8711b8bb97e80b1561.jpg"
            alt="Apple-store"
          />
        </a>
        <RouterLink to="/">
          <img
            src="https://gizchina.it/wp-content/uploads/2020/03/huawei-appgalley-marzo-00.jpg"
            alt="appgallary"
          />
        </RouterLink>
      </div>
      <div class=" flex justify-center items-center payment">
        <img src="https://i.pinimg.com/564x/07/73/4c/07734cf160091516ce46a0e71b9f1cab.jpg" alt="visa">
        <img src="https://i.pinimg.com/564x/37/ec/77/37ec777fa00a64ebb61e47ede3205567.jpg" alt="master-Card">
        <img src="/img/mada.png" alt="">
        <img src="/img/Tamara Logo-AR.png" alt="">
        <img src="/img/tabby_installment_mini.webp" alt="">
        <img src="https://i.pinimg.com/564x/e7/79/55/e779557a84e186b3d8adeabaa17eecf2.jpg" alt="appel pay">
        <img src="https://i.pinimg.com/564x/8d/bc/9f/8dbc9f60a74237ad678676b07a3cf1e0.jpg" alt="stcpay">
      </div>
    </div>
  </div>
</template>

<script setup>
import ZincoLogo from "./ZincoLogo.vue";
import { useGeneralStore } from "src/stores/general";
const lang = useGeneralStore();
</script>

<style lang="scss" scoped>
.app-store {
  gap: 10px;
  img {
    width: 120px;
    height: 40px;
  }
  @media screen and (max-width: 600px) {
    img{
      width: 75px;
    }
  }
  }
  .payment{
    gap: 10px;
    margin-top: 10px;
    img{
      width: 50px;
      height: 30px;
    }
  }
</style>
