<template>
  <div class="all">

    <h6 class="q-my-sm q-pt-md q-pa-sm " >
      {{lagn.lagn === 'ar'? conta.title_ar  :conta.title}}
    </h6>
    <div class="icon-container">
      <div class="icon-container-svg ">
        <q-icon :name="conta.icon" />
      </div>
      <p
        v-text="lagn.lagn === 'en' ? conta.pragrph : conta.pragrph_ar"
      ></p>
    </div>
  </div>
</template>

<script>
import { useGeneralStore } from "src/stores/general";
export default {
  name: "IconBar",
  props: {
    conta: {
      typy: Object,
      default: null,
    },
    price: {
      typy: Number,
      default: null,
    },
  },
  setup() {
    const lagn = useGeneralStore();
    return {
      lagn,
    };
  },
};
</script>
<style lang="scss" scoped>
.all {
  @media screen and (min-width: 300px) and (max-width: 1200px) {
  }
  h6 {
    font-size: 17px;
    line-height: 1px;
    text-transform: capitalize;
    font-weight: 700;
  }
  .icon-container {
    display: flex;
    padding-bottom: 20px;
    gap: 10px;
    justify-content: start;
    align-items:flex-start;
    text-align:justify;
    .icon-container-svg {
      background: #bdd7fa;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      i {
        color: #347efe;
        font-size: 20px;
      }
    }
    p {
      width: 70%;
    }
  }
}
</style>
