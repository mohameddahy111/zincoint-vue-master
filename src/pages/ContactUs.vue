<template>
  <q-page-container
    :class="lagn.lagn === 'ar' ? 'q-pa-md aribc row' : 'q-pa-md row'"
  >
    <div class="col-12 col-md-6">
      <h5>
        {{
          lagn.lagn === "ar"
            ? "يسعدنا تلقي استفساراتكم فى اي وقت"
            : "We are pleased to receive your inquiries at any time"
        }}
      </h5>
      <div class="">
        <q-form @submit="onSubmitInfoForm" class="form q-pa-md">
          <q-list>
            <q-item class="item">
              <q-input
                class="full-width"
                rounded
                :input-style="{
                  padding: '10px 20px',
                  fontSize: '18px',
                  marginTop: '10px',
                }"
                outlined
                v-model="name"
                type="text"
                :label="lagn.lagn === 'en' ? 'Name' : 'الاسم'"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    `${
                      lagn.lagn === 'ar'
                        ? ' الاسم مطلوب  '
                        : ' Name is Requierd'
                    }`,
                ]"
              />
            </q-item>
            <q-item class="item">
              <q-input
                class="full-width"
                rounded
                :input-style="{
                  padding: '20px 20px',
                  fontSize: '18px',
                  marginTop: '10px',
                }"
                :label="lagn.lagn === 'en' ? 'E-mail' : 'البريد الالكتروني'"
                outlined
                v-model="email"
                type="email"
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
            </q-item>
            <textarea
              name="message"
              id="text"
              cols="50"
              rows="5"
              class="text-message"
              v-model="text"
              :placeholder="lagn.lagn === 'ar' ? 'الرسالة ' : 'message'"
            ></textarea>

            <q-btn class="bg-primary full-width text-black" rounded unelevated>
              {{ lagn.lagn === "ar" ? " ارسال" : "Send" }}
            </q-btn>
          </q-list>
        </q-form>
      </div>
    </div>
    <div class="q-py-md ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13641.653957900782!2d30.005679130554192!3d31.26465584973979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1675721570174!5m2!1sar!2seg"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
  </q-page-container>
</template>

<script setup>
import { useGeneralStore } from "src/stores/general";
import { useAuth } from "src/stores/auth";
import { ref } from "vue";

const lagn = useGeneralStore();
const user = useAuth();
const email = ref(user.userToken ? user.user.email : "");
const name = ref(
  user.userToken ? user.user.first_name + user.user.last_name : ""
);
const text = ref("");
</script>

<style lang="scss">
h5 {
  margin: 0;
  padding: 0;
  margin-top: 10px;
}
.form {
  // margin: 10px;
  a {
    color: inherit;
  }
  .item {
    line-height: 0.8rem;
    // height: 50px;
  }
  .q-field__control {
    height: 45px;
    line-height: 0.8rem;
  }
  .q-item {
    padding: 0;
  }
  .text-message {
    background-color: inherit;
    padding: 10px 30px;
    border-radius: 20px;
    border: 0.5px solid inherit;
    width: 100%;

    ::placeholder {
      font-size: 18px;
    }
    :focus,
    :active,
    :hover {
      border: 0.5px solid inherit;
      outline: none;
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    .item {
      flex-direction: column;
    }
    .text-message {
      width: 100%;
    }
  }
}
</style>
