<template>
  <q-page-container :class="lang.lagn === 'ar' ? 'q-pa-md aribc' : 'q-pa-md'">
    <h6 class="text-center">
      {{
        lang.lagn === "ar"
          ? "تعديل البيانات الشخصية "
          : "Modification of personal data"
      }}
    </h6>
    <q-form @submit="onSubmitInfoForm" class="form q-pa-md">
      <q-list>
        <label class="q-px-lg text-capitalize text-h6">{{
          lang.lagn === "en" ? "First Name" : "الاسم الاول "
        }}</label>
        <q-item class="item">
          <q-input
            class="full-width"
            rounded
            :input-style="{
              padding: '10px 20px',
              fontSize: '18px',
            }"
            outlined
            v-model="firstName"
            type="text"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                `${
                  lang.lagn === 'ar'
                    ? 'الاسم الاول  '
                    : 'First Name is Requierd'
                }`,
            ]"
          />
        </q-item>
        <label class="q-px-lg text-capitalize text-h6">{{
          lang.lagn === "en" ? "Last Name" : "الاسم الاخير "
        }}</label>

        <q-item class="item">
          <q-input
            class="full-width"
            rounded
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            outlined
            v-model="lastName"
            type="text"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                `${
                  lang.lagn === 'ar'
                    ? 'الاسم الاخير  '
                    : 'Last Name is Requierd'
                }`,
            ]"
          />
        </q-item>
        <label class="q-px-lg text-capitalize text-h6">{{
          lang.lagn === "en" ? "Your Mobile" : "رقم الجوال"
        }}</label>
        <q-item class="item">
          <q-input
            rounded
            class="full-width"
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            outlined
            v-model="mobile"
            type="tel"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                `${
                  lang.lagn === 'ar'
                    ? 'رقم الجوال مطلوب '
                    : 'Mobile is Requierd'
                }`,
              (val) =>
                (val && val.length === 9) ||
                `${
                  lang.lagn === 'ar'
                    ? 'يجب ان يبدأ الجوال بالرقم خمسة وان يتكون من تسعة ارقام '
                    : 'The mobile must start with the number five and consist of nine digits'
                }`,
            ]"
          />
        </q-item>
        <q-item>
          <q-btn
            class="full-width bg-primary text-black"
            unelevated
            rounded
            type="submit"
          >
            {{ lang.lagn === "ar" ? "تعديل البيانات" : "Data modification" }}
          </q-btn>
        </q-item>
      </q-list>
    </q-form>
    <h6 class="text-center">
      {{ lang.lagn === "ar" ? "تحديت كلمة المرور " : "Password update" }}
    </h6>
    <q-form @submit="passwordUpdate" class="form q-pa-md">
      <q-list>
        <label class="q-px-lg text-capitalize text-h6">{{
          lang.lagn === "en" ? " Current Password" : " كلمة المرور الحالية "
        }}</label>
        <q-item>
          <q-input
            class="full-width"
            rounded
            outlined
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            :type="isPwd ? 'password' : 'text'"
            v-model="currentPassword"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                `${
                  lang.lagn === 'ar'
                    ? 'كلمة المرور مطلوب '
                    : 'Password is Requierd'
                }`,
              (val) =>
                val.length > 8 ||
                `${
                  lang.lagn === 'ar'
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
        </q-item>
        <label class="q-px-lg text-capitalize text-h6">{{
          lang.lagn === "en" ? " New Password" : " كلمة المرور الجديدة "
        }}</label>
        <q-item>
          <q-input
            class="full-width"
            rounded
            outlined
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            :type="isPwd ? 'password' : 'text'"
            v-model="password"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                `${
                  lang.lagn === 'ar'
                    ? 'كلمة المرور مطلوب '
                    : 'Password is Requierd'
                }`,
              (val) =>
                val.length > 8 ||
                `${
                  lang.lagn === 'ar'
                    ? 'كلمة المرور يجب ان تكون اكثر من 8 احرف '
                    : 'Password more than 8'
                }`,
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdN ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdN = !isPwdN"
              />
            </template>
          </q-input>
        </q-item>
        <label class="q-px-lg text-capitalize text-h6">{{
          lang.lagn === "en"
            ? " Confirm the new password"
            : " تأكيد كلمة المرور الجديدة "
        }}</label>
        <q-item>
          <q-input
            class="full-width"
            rounded
            outlined
            :input-style="{
              padding: '20px 20px',
              fontSize: '18px',
              marginTop: '10px',
            }"
            :type="isPwdNC ? 'password' : 'text'"
            v-model="confirmPassword"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                `${
                  lang.lagn === 'ar'
                    ? 'كلمة المرور مطلوب '
                    : 'Password is Requierd'
                }`,
              (val) =>
                val.length > 8 ||
                `${
                  lang.lagn === 'ar'
                    ? 'كلمة المرور يجب ان تكون اكثر من 8 احرف '
                    : 'Password more than 8'
                }`,
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwdNC ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdNC = !isPwdNC"
              />
            </template>
          </q-input>
        </q-item>
        <q-item>
          <q-btn
            class="full-width bg-primary text-black"
            unelevated
            rounded
            type="submit"
          >
            {{ lang.lagn === "ar" ? "تحديث كلمة المرور" : "Password update" }}
          </q-btn>
        </q-item>
      </q-list>
    </q-form>
  </q-page-container>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useGeneralStore } from "src/stores/general";
import { useAuth } from "src/stores/auth";
import { ref, watchEffect } from "vue";

const lang = useGeneralStore();
const user = useAuth();
const $route = useRoute();
const $router = useRouter();
const isPwd = ref(true);
const isPwdN = ref(true);
const isPwdNC = ref(true);

const firstName = ref(user.user.first_name);
const lastName = ref(user.user.last_name);
const mobile = ref(user.user.phone);
const currentPassword = ref("");
const password = ref("");
const confirmPassword = ref("");

watchEffect(() => {
  !user.userToken ? $router.push("/") : "";
});
const onSubmitInfoForm = () => {
  user.changeMyProfileInforamtion({
    firstName: firstName.value,
    lastName: lastName.value,
    mobile: mobile.value,
  });
};
const passwordUpdate = () => {
  user.passwordUpdate({
    currentPassword: currentPassword.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 400px;
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
