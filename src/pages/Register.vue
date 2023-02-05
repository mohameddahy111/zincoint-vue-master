<template>
  <q-page-container :class="lagn.lagn === 'ar' ? 'q-pa-md aribc' : 'q-pa-md'">
    <q-form @submit="onSubmit" class="q-gutter-md form shadow-5 q-pa-md">
      <h3
        class="text-capitalize text-center text-weight-bold"
        v-text="lagn.lagn === 'ar' ? 'إشترك الأن' : 'Register '"
      ></h3>
      <q-list>
        <q-item class="q-gutter-sm item">
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
            :label="
              lagn.lagn === 'en' ? 'Your E-mail' : 'ادخل البريد الالكتروني'
            "
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
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            outlined
            v-model="mobile"
            type="tel"
            :label="lagn.lagn === 'en' ? 'Your Mobile' : 'رقم الجوال'"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                `${
                  lagn.lagn === 'ar'
                    ? 'رقم الجوال مطلوب '
                    : 'Mobile is Requierd'
                }`,
              (val) =>
                (val && val.length === 9) ||
                `${
                  lagn.lagn === 'ar'
                    ? 'يجب ان يبدأ الجوال بالرقم خمسة وان يتكون من تسعة ارقام '
                    : 'The mobile must start with the number five and consist of nine digits'
                }`,
            ]"
          />
        </q-item>
        <q-item class="q-gutter-sm item">
          <q-input
            rounded
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            outlined
            v-model="firstName"
            type="text"
            :label="lagn.lagn === 'en' ? 'Your First Name' : 'الاسم الاول'"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                `${
                  lagn.lagn === 'ar'
                    ? 'الاسم الاول مطلوب '
                    : 'first name is Requierd'
                }`,
            ]"
          />
          <q-input
            rounded
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            outlined
            v-model="lastName"
            type="text"
            :label="
              lagn.lagn === 'en' ? 'Your Last Name ' : 'ادخل  الاسم الاخير'
            "
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                `${
                  lagn.lagn === 'ar'
                    ? 'الاسم الاخير  مطلوب '
                    : 'Last Name is Requierd'
                }`,
            ]"
          />
        </q-item>
        <q-item class="q-gutter-sm item">
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
                  lagn.lagn === 'ar'
                    ? 'كلمة المرور مطلوب '
                    : 'Password is Requierd'
                }`,
              (val) =>
                val.length > 8 ||
                `${
                  lagn.lagn === 'ar'
                    ? 'كلمة المرور يجب ان تكون اكثر من 8 احرف '
                    : 'Password more than 8'
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
          <q-input
            rounded
            outlined
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            :type="iscPwd ? 'password' : 'text'"
            v-model="confirmPassword"
            :label="
              lagn.lagn === 'en' ? 'Confirm Password' : 'تاكيد كلمة المرور'
            "
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                `${
                  lagn.lagn === 'ar'
                    ? ' تاكيد كلمة المرور مطلوب '
                    : '}onfirm Password is Requierd'
                }`,
              (val) =>
                val.length > 8 ||
                `${
                  lagn.lagn === 'ar'
                    ? 'كلمة المرور يجب ان تكون اكثر من 8 احرف '
                    : 'Password more than 8'
                }`,
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="iscPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="iscPwd = !iscPwd"
              />
            </template>
          </q-input>
        </q-item>
      </q-list>

      <div class="flex justify-between items-center text-capitalize">
        <q-toggle
          v-model="accept"
          :label="
            lagn.lagn === 'en'
              ? 'I agree to the terms and conditions and company policy'
              : 'اوافق علي الشروط والاحكام وسياسة الشركة    '
          "
        />
      </div>
      <div>
        <q-btn
          class="full-width text-h6 q-mb-md"
          rounded
          :label="lagn.lagn === 'en' ? 'Register Now' : 'اشترك الان'"
          type="submit"
          color="primary"
          :disable="accept ? false : true"
        />
      </div>
      <router-link
        class="q-mt-md text-secondary"
        to="/login" 
        v-text="
          lagn.lagn === 'ar'
            ? ' هل لديك حساب فى زينــكو؟'
            : 'I have an account in Zinco?'
        "
      >
      </router-link>
    </q-form>
  </q-page-container>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, watch } from "vue";
import { useGeneralStore } from "src/stores/general";
import { useAuth } from "src/stores/auth";

export default {
  setup() {
    const $q = useQuasar();
    const lagn = useGeneralStore();
    const user = useAuth();
    const email = ref(null);
    const mobile = ref(null);
    const firstName = ref(null);
    const lastName = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const accept = ref(false);
    // const pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    return {
      email,
      mobile,
      firstName,
      lastName,
      password,
      confirmPassword,
      accept,
      lagn,
      isPwd: ref(true),
      iscPwd: ref(true),
      user,

      onSubmit() {
        if (password.value !== confirmPassword.value) {
          $q.notify({
            message: "password not match",
            color: "red",
            position: "top",
            icon : 'close'
          });
        } else {
          user.register({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            mobile: mobile.value,
            confirmPassword: confirmPassword.value,
          });
        }
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.form {
  width: 600px;
  margin: 20px auto;
  border-radius: 20px;
  a {
    color: inherit;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    .item {
      flex-direction: column;
    }
  }
}
</style>
