<template>
  <q-layout
    view="hHh LpR fFf"
    :class="lang.lagn === 'ar' ? 'aribc' : ''"
    rounded-borders
  >
    <q-header reveal :class=" $route.path ==='/' ? ' bg-transparent' :'bg-white text-black'" id="layoutHeader">
      <q-toolbar class="q-px-lg" id="toolbar">
        <div class="flex justify-between items-center full-width">
          <div class="">
            <q-toolbar-title>
              <zinco-logo />
            </q-toolbar-title>
          </div>
          <div
            class="flex items-center justify-end q-gutter-md header-Links xs-hide"
            id="headerLinks"
          >
            <MenuItems />
            <RouterLink to="/about">About us</RouterLink>
            <RouterLink to="/contact">contact us</RouterLink>
          </div>
          <div class="flex items-center justify-center">
            <div class="xs-hide sm-hide">
              <SearchBox />
            </div>
            <Language />

            <UserAvatarLayout />
            <q-btn
              dense
              round
              flat
              icon="shopping_cart"
              @click="$router.push('/cart')"
            >
              <q-badge color="red" floating transparent>
                {{ products.cartItems.length }}
              </q-badge>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
      <div class="flex justify-center items-center q-px-sm">
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          class="sm-hide lg-hide xl-hide md-hide"
        />
        <div class="lg-hide xl-hide md-hide">
          <SearchBox />
        </div>
      </div>
    </q-header>

    <router-view />
    <FootrtZinco />

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="mobile"
      bordered
      class=" "
    >
      <div
        class="flex justify-between text-black items-baseline q-gutter-md header-Links"
      >
        <q-list>
          <q-item>
            <MenuItems />
          </q-item>
          <q-item>
            <RouterLink to="/about">About us</RouterLink>
          </q-item>
          <q-item>
            <RouterLink to="/contact">contact us</RouterLink>
          </q-item>
        </q-list>
        <q-btn icon="close" round dense @click="closeDrower" />
      </div>
    </q-drawer>
    <q-scroll-observer axis="vertical" @scroll="scrollWindo(details)" />
  </q-layout>
</template>

<script>
import { ref } from "vue";
import ZincoLogo from "src/components/Layouts/ZincoLogo.vue";
import MenuItems from "src/components/Layouts/MenuItems.vue";
import SearchBox from "src/components/Layouts/SearchBox.vue";
import Language from "src/components/Layouts/Language.vue";
import UserAvatarLayout from "src/components/Layouts/UserAvatarLayout.vue";
import { useProductsStore } from "src/stores/products";
import FootrtZinco from "src/components/Layouts/FooterZinco.vue";
import { useRouter , useRoute } from "vue-router";
import { useGeneralStore } from "src/stores/general";

export default {
  components: {
    ZincoLogo,
    MenuItems,
    SearchBox,
    UserAvatarLayout,
    Language,
    FootrtZinco,
  },
  setup() {
    const details = {
      position: {
        top: 500,
        left: 0,
      },
      direction: "up" || "down",
      directionChanged: false,
    };
    const leftDrawerOpen = ref(false);
    const products = useProductsStore();
    const $router = useRouter();
    const $route = useRoute();
    const scrollWindo = () => {
      if (window.scrollY > 300) {
        document.getElementById("layoutHeader").classList =
          "bg-white text-black fixed-top";
        document.getElementById("headerLinks").classList =
          "header-Links-black flex items-center justify-end q-gutter-md xs-hide";
      }
      else {
        document.getElementById("layoutHeader").classList =
          "bg-transparent fixed-top text-white";
          document.getElementById("headerLinks").classList =
          "flex items-center justify-end q-gutter-md header-Links xs-hide";

      }
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      closeDrower() {
        leftDrawerOpen.value = false;
      },
      products,
      lang: useGeneralStore(),
      scrollWindo,
      details,
    };
  },
};
</script>

<style scoped>
.header-Links ,.header-Links-black{
  /* transform: translateX(25%); */
  width: 400px;
}
.header-Links a {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
}
.header-Links-black a {
  text-decoration: none;
  color: #000;
  font-size: 18px;

}
#layoutHeader {
  z-index: 12;
}
@media screen and (max-width: 600px) {
  .header-Links a {
    text-decoration: none;
    color: #fff;
  }
}
</style>
