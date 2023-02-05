<template>
  <q-page-container :class="lagn.lagn === 'ar' ? 'q-pa-md aribc' : 'q-pa-md'">
    <q-form class="form shadow-5 q-pa-lg" @submit="forgetPassword">
      <label>
        <h6 class="text-center">
          {{
            lagn.lagn === "ar"
              ? "يرجي كتابة بريدك الالكتروني "
              : "Enter Your E-mail"
          }}
        </h6>
      </label>
      <q-input
        rounded
        :input-style="{
          padding: '20px 20px',
          fontSize: '18px',
          marginTop: '10px',
        }"
        outlined
        v-model="email"
        type="email"
        :label="lagn.lagn === 'en' ? 'Your E-mail' : 'ادخل البريد الالكتروني'"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            `${
              lagn.lagn === 'ar'
                ? 'البريد الالكتروني مطلوب '
                : 'E-mail is Requierd'
            }`,
        ]"
      />
      <q-btn
        class="text-black bg-primary full-width q-my-lg"
        unelevated
        rounded
        type="submit"
      >
        {{ lagn.lagn === "ar" ? "ارسال " : "Send" }}
      </q-btn>
      <RouterLink to="/login" class="text-secondary">
        {{ lagn.lagn === "ar" ? "تسجيل الدخول" : "Log in" }}
      </RouterLink>
    </q-form>
  </q-page-container>
</template>

<script setup>
import { useGeneralStore } from "src/stores/general";
import { useAuth } from "src/stores/auth";
import { ref } from "vue";

const lagn = useGeneralStore();
const user = useAuth();
const email = ref(null);

const forgetPassword = () => {
  user.forgetPassword({
    email: email.value,
  });
};
</script>

<style lang="scss" scoped>
.form {
  width: 400px;
  margin: 20px auto;
  border-radius: 20px;
  a {
    color: inherit;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    h3 {
      font-size: 18px;
    }

    .item {
      flex-direction: column;
    }
  }
}
</style>
