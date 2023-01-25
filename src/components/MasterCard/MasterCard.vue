<template>
  <div class="container q-ml-sm">
    <div class="card_box shadow-5">
      <RouterLink :to="`/productdetails/${showdata.id}`">
        <img
          :src="`https://zincoint.com/public/upload/products/gallery/${showdata.image.name}`"
          alt=""
        />
      </RouterLink>
      <span v-show="showdata.is_recently === 1" info="new"></span>
      <div class="icons">
        <q-btn icon="visibility" round @click="showDialog">
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            comparison
          </q-tooltip>
        </q-btn>
        <q-btn
          @click="addFavoritList(showdata)"
          :icon="favorit ? 'favorite' : 'favorite_border'"
          round
        >
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            favorite
          </q-tooltip>
        </q-btn>
        <q-btn icon="shopping_cart" round @click="addToCart(showdata)">
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            Add to cart
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <DialogBox v-model="dialogBox" :dialogData="showdata" />
  </div>
</template>

<script setup>
import DialogBox from "../../components/DialogBox.vue";
import { useQuasar } from "quasar";
import { useProductsStore } from "src/stores/products";
import { useGeneralStore } from "src/stores/general";
import { defineProps, ref } from "vue";
const products = useProductsStore();
const $q = useQuasar();
const lang = useGeneralStore();
const dialogBox = ref(false);
const favorit = ref(false);
defineProps(["showdata"]);
const showDialog = () => {
  dialogBox.value = true;
};
const addFavoritList = (item) => {
  if (products.favoritList.find((x) => x.id === item.id)) {
    products.favoritList = products.favoritList.filter((x) => x.id !== item.id);
    localStorage.setItem("favoritList", JSON.stringify(products.favoritList));
    favorit.value = false;
    $q.notify({
      message: `${
        lang.lagn === "en"
          ? item.name_en + " Remove from Favorit List"
          : "تم  ازالة " + item.name_ar + " من المفضل "
      }`,
      position: "top",
      color: "red",
    });
  } else {
    products.favoritList.push({ ...item });
    localStorage.setItem("favoritList", JSON.stringify(products.favoritList));
    favorit.value = true;
    $q.notify({
      message: `${
        lang.lagn === "en"
          ? item.name_en + " Add to Favorit List"
          : "  تم اضافة " + item.name_ar + " الي المفضل  "
      }`,
      position: "top",
      color: "green",
    });
  }
};
// Add to cart//
const addToCart = (item) => {
  const existItem = products.cartItems.find((x) => x.id === item.id);
  if (existItem) {
    existItem.quantiy = existItem.quantiy + 1;
    localStorage.setItem("cartItems", JSON.stringify(products.cartItems));
    $q.notify({
      message: `${
        lang.lagn === "en"
          ? item.name_en + " Is Update "
          : "تم  تعديل  " + item.name_ar
      }`,
      position: "top",
      color: "warning",
    });
  } else {
    const newItem = { ...item };
    newItem.quantiy = 1;
    products.cartItems.push({ ...newItem });
    localStorage.setItem("cartItems", JSON.stringify(products.cartItems));
    $q.notify({
      message: `${
        lang.lagn === "en"
          ? item.name_en + "  Add to Cart"
          : "تم  اضافة  " + item.name_ar + " الي عربة التسوق "
      }`,
      position: "top",
      color: "green",
    });
  }
};
</script>

<style lang="css" scoped>
.icons {
  width: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 10%;
  right: 10px;
  opacity: 0;
  transition: all 0.4s;
  z-index: 2;
}
.icons button {
  color: #000;
  background: #ebebeb95;
}

.card_box {
  /* width: 250px; */
  height: 285px;
  border-radius: 20px;
  position: relative;
  /* box-shadow: 0 25px 50px rgba(0, 0, 0, 0.55); */
  /* cursor: pointer; */
  transition: all 0.3s;
}
.card_box a img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.card_box:hover {
  transform: scale(0.9);
}
.container:hover .icons {
  opacity: 1;
}
.card_box span {
  position: absolute;
  overflow: hidden;
  width: 150px;
  height: 150px;
  top: -10px;
  left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_box span::before {
  content: attr(info);
  position: absolute;
  width: 150%;
  height: 40px;
  background-image: linear-gradient(
    45deg,
    #ff6547 0%,
    #ffb144 51%,
    #ff7053 100%
  );
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
}

.card_box span::after {
  content: "";
  position: absolute;
  width: 10px;
  bottom: 0;
  left: 0;
  height: 10px;
  z-index: -1;
  box-shadow: 140px -140px #cc3f47;
  background-image: linear-gradient(
    45deg,
    #ff512f 0%,
    #f09819 51%,
    #ff512f 100%
  );
}
</style>
>
