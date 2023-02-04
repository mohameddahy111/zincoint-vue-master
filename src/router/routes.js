import Layoyt from "../layouts/MainLayout.vue";
import IndexPage from "../pages/IndexPage.vue";
import About from "../pages/About.vue";
import Shop from '../pages/Shop.vue'
import Register from 'src/pages/Register.vue'
import Cart from 'src/pages/Cart.vue'
import ReturnPolicy from 'src/pages/ReturnPolicy.vue'
import PrivacyPolicy from 'src/pages/PrivacyPolicy.vue'
import TermsCondition from 'src/pages/TermsCondition.vue'
import Shipping from 'src/pages/Shipping.vue'
import Profile from 'src/pages/Profile.vue';
import Category from 'src/pages/Category.vue'
const routes = [
  {
    path: "/",
    component: Layoyt,
    children: [
      { path: "/", component: IndexPage },
      { path: "/about", component: About },
      { path: "/shop", component: Shop },
      { path: "/cart", component: Cart },
      { path: "/return_Policy", component: ReturnPolicy },
      { path: "/privacy_Policy", component: PrivacyPolicy },
      { path: "/terms_Condition", component: TermsCondition },
      { path: "/contact", component: () => import("pages/ContactUs.vue") },
      { path: "/login", component: () => import("pages/UserLogin.vue") },
      { path: "/register", component:Register },
      { path: "/profile/:userid", component:Profile },
      { path: "/shipping", component:Shipping },
      { path: "/category/:category", component:Category },
      { path: "/productdetails/:id", component: () => import("pages/SingleProductDetails.vue") },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
