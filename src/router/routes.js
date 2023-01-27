import Layoyt from "../layouts/MainLayout.vue";
import IndexPage from "../pages/IndexPage.vue";
import About from "../pages/About.vue";
import Shop from '../pages/Shop.vue'
import Register from 'src/pages/Register.vue'
const routes = [
  {
    path: "/",
    component: Layoyt,
    children: [
      { path: "/", component: IndexPage },
      { path: "/about", component: About },
      { path: "/shop", component: Shop },
      { path: "/contact", component: () => import("pages/ContactUs.vue") },
      { path: "/login", component: () => import("pages/UserLogin.vue") },
      { path: "/register", component:Register },
      { path: "/productdetails/:id", component: () => import("pages/SingleProductDetails.vue") },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
