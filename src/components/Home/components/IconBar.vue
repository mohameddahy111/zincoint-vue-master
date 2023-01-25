<template>
  <div class="all">
    <h6 v-show="lagn.lagn === 'en'">
      {{ conta.title }}
    </h6>
    <h5 class="q-ma-sm q-pt-sm text-center " v-show="lagn.lagn === 'ar'">{{ conta.title_ar }}</h5>

    <div class="icon-container text-center">
      <div class="icon-container-svg text-center">
        <q-icon :name="conta.icon" />
      </div>

      <p  class="text-center" v-text="lagn.lagn === 'en' ? conta.pragrph : conta.pragrph_ar"></p>
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
    display: none;
  }
  h6 {
    font-size: 14px;
    line-height: 1px;
    text-transform: capitalize;
  }
  h5{
    font-weight: 500;
  }
  .icon-container {
    display: flex;
    padding-bottom: 20px;
    gap: 10px;
    .icon-container-svg {
      background: #bdd7fa;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      i {
        color: #347efe;
        font-size: 24px;
      }
    }
    p {
      width: 50%;
    }
  }
}
</style>
