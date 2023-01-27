import axios from "axios";
import { defineStore } from "pinia";
import { ref, reactive, watchEffect, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { useRouter } from "vue-router";

export const useAuth = defineStore("auth", () => {
  axios.defaults.baseURL = "https://zincoint.com/api/";
  const user = ref(localStorage.useInf ? JSON.parse(localStorage.useInf) : {});

  const $q = useQuasar();
  const lagn = useGeneralStore();
  const $router = useRouter();

  const login = async (value) => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Some important process is in progress. Hang on...",
      messageColor: "black",
    });
    try {
      const { data } = await axios.post("auth/login", {
        email: value.email,
        password_login: value.password,
      });

      if (data.token) {
        localStorage.setItem("userToken", JSON.stringify(data.token));
        localStorage.setItem("useInf", JSON.stringify(data.user));

        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: `${lagn.lagn === "ar" ? "تم التسجيل " : " you are log in"}`,
          position: "top",
        });
        user.value = data.user;
        $q.loading.hide();
        $router.push("/");
      }
    } catch (err) {
      $q.loading.hide();
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: `${
          lagn.lagn === "ar"
            ? "حدث خطأ من فضلك ادخل البريد الالكتروني وكلمة المرور بطريقة صحيحة"
            : " E-mail or Password not vaild"
        }`,
        position: "top",
      });
    }
  };

  const register = async (values) => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Some important process is in progress. Hang on...",
      messageColor: "black",
    });

    const {data}= await axios
      .post("auth/register", {
        email: values.email,
        password_login: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.mobile,
        confirmPassword: values.confirmPassword,
      })
        if (data.token) {
          $q.loading.hide();
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: `${
              lagn.lagn === "ar" ? "تم الاشتراك " : " Your are Register"
            }`,
            position: "top",
          });
          $router.push("/login");
        } else {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: `${
              lagn.lagn === "ar"
                ? "حدث خطأ من فضلك ادخل البيانات  بطريقة صحيحة"
                : "  An error occurred, please enter the correct information."
            }`,
            position: "top",
          });
        }
  };

  return {
    user,
    login,
    register,
  };
});
