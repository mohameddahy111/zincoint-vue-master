<template>
  <div class="HeroTitle">
    <h3 class="text-capitalize text-weight-bold text-white">
      <slot></slot>
    </h3>
    <div class="flex justify-center items-center q-gutter-lg">
      <q-icon size="30px" name="play_circle_filled" color="primary" unelevated round />
      <RouterLink to="/shop" class="text-h6"> Shopping Now </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "HeroTitle",
  components: { RouterLink },
};
</script>

<style>
a {
  text-decoration: none;
  color: #fff;
}
.HeroTitle {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media screen and (max-width: 600px) {
  .HeroTitle {
    width: 70%;
    font-size: 20px;
    margin: auto;
  }
}
@media screen and (min-width:601px) and (max-width :1000px) {
  .HeroTitle {
    width: 70%;
    font-size: 20px;
    margin: auto;
  }
}
</style>

function newFunction() { return "title"; }
