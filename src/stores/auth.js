import axios from "axios";
import { defineStore } from "pinia";
import { ref, reactive, watchEffect, watch } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { useGeneralStore } from "src/stores/general";
import { useRouter } from "vue-router";

export const useAuth = defineStore("auth", () => {
  axios.defaults.baseURL = "https://zincoint.com/api/";
  const user = ref(localStorage.useInf ? JSON.parse(localStorage.useInf) : {});
  const userToken = ref(
    localStorage.userToken ? JSON.parse(localStorage.userToken) : null
  );

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
        userToken.value = data.token;
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

    const { data } = await axios.post("auth/register", {
      email: values.email,
      password_login: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.mobile,
      confirmPassword: values.confirmPassword,
    });
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
  const logout = async () => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Some important process is in progress. Hang on...",
      messageColor: "black",
    });
    try {
      const data = await axios.get("auth/logout");
      if (data.status === 200) {
        console.log(data);
        localStorage.removeItem("userToken", JSON.stringify(data.token));
        localStorage.removeItem("useInf", JSON.stringify(data.user));
        user.value = {};
        userToken.value = null;

        $q.loading.hide();
        $q.notify({
          color: "warning",
          textColor: "white",
          icon: "warning",
          message: `${
            lagn.lagn === "ar" ? " تم تسجيل الخروج" : " You are Log out"
          }`,
          position: "top",
        });
      }
    } catch (error) {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "close",
        message: `${
          lagn.lagn === "ar"
            ? "حدث خطاء  ما اعد المحاولة  "
            : " An error occurred, try again"
        }`,
        position: "top",
      });
    }
  };
  const changeMyProfileInforamtion = async (values) => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Some important process is in progress. Hang on...",
      messageColor: "black",
    });
    try {
      await axios
        .post("auth/save_my_profile", {
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.mobile,
        })
        .then((res) => console.log(res));
      $q.loading.hide();
    } catch (error) {}
  };
  const passwordUpdate = async (values) => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Some important process is in progress. Hang on...",
      messageColor: "black",
    });
    try {
      await axios
        .post("auth/save_my_password", {
          currentPassword: values.currentPassword,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        .then((res) => console.log(res));
      $q.loading.hide();
    } catch (error) {}
  };

  const emailUpdate = async (values) => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Some important process is in progress. Hang on...",
      messageColor: "black",
    });
    try {
      await axios
        .post("auth/save_my_email", {
          email: values.email,
          currentPasswordEmail: values.currentPasswordEmail,
        })
        .then((res) => console.log(res));
      $q.loading.hide();
    } catch (error) {}
  };

  const forgetPassword = async (values) => {
    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: "yellow",
      spinnerSize: 140,
      backgroundColor: "purple",
      message: "Some important process is in progress. Hang on...",
      messageColor: "black",
    });
    try {
      await axios
        .post("auth/forgot_password", {
          email: values.email,
        })
        .then((res) => console.log(res));

      $q.loading.hide();
    } catch (error) {
      $q.loading.hide();
      console.log(error)

    }
  };
  return {
    user,
    login,
    register,
    logout,
    userToken,
    changeMyProfileInforamtion,
    passwordUpdate,
    emailUpdate,
    forgetPassword,
  };
});
