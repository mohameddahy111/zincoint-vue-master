<template>
  <q-page-container :class="lagn.lagn === 'ar' ? 'q-pa-md aribc' : 'q-pa-md'">

    <q-form @submit="onSubmit" class="q-gutter-md form shadow-5 q-pa-md">
      <h3 class=" text-capitalize text-center text-weight-bold" v-text="lagn.lagn ==='ar'? 'تسجيل الدخول' :'log in '"></h3>
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

      <q-input
        rounded
        outlined
        :input-style="{
          padding: '20px 20px',
          fontSize: '18px',
          marginTop: '10px',
        }"
        :type="isPwd ? 'password' : 'text'"
        v-model="password"
        :label="lagn.lagn === 'en' ? 'Enter password' : 'ادخل كلمة المرور'"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            `${
              lagn.lagn === 'ar' ? 'كلمة المرور مطلوب ' : 'Password is Requierd'
            }`,
          (val) =>
            val.length > 6 ||
            `${
              lagn.lagn === 'ar'
                ? 'كلمة المرور يجب ان تكون اكثر من 6 احرف '
                : 'Password more than 6'
            }`,
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
<div class=" flex justify-between items-center">

  <q-toggle
  v-model="accept"
  :label="
          lagn.lagn === 'en'
          ? 'stay registered'
          : 'ابقني مسجل  '
          "
      />
      <router-link class=" text-secondary" to="/" v-text="lagn.lagn === 'ar'? ' هل فقدت كلمة المرور ؟' :'Forget password ?'">
      </router-link>

    </div>
      <div>
        <q-btn
          class=" full-width text-h6 q-mb-md"
          rounded
          :label="lagn.lagn === 'en' ? 'Log in' : 'تسجيل الدخول'"
          type="submit"
          color="primary"
        />
      </div>
      <router-link class=" q-mt-md text-secondary" to="/register" v-text="lagn.lagn === 'ar'? ' ليس لديك حساب في زينكو ؟' :'Dont have an account in Zinco?'">
      </router-link>

    </q-form>
  </q-page-container>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useGeneralStore } from "src/stores/general";
import { useAuth } from "src/stores/auth";

export default {
  setup() {
    const $q = useQuasar();
    const lagn = useGeneralStore();
    const user = useAuth();
    const email = ref(null);
    const password = ref(null);
    const accept = ref(false);

    return {
      email,
      password,
      accept,
      lagn,
      isPwd: ref(true),
      user,

      onSubmit() {
        user.login({ email: email.value, password: password.value });
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.form {
  width: 400px;
  margin:20px auto;
  border-radius: 20px;
  a{
    color: inherit;
  }
}
</style>
