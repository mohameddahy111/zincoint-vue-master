import { ref  ,onMounted} from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", () => {
  const allProducts = ref([]);
  const lang = ref("ar");
  const productDetails = ref([]);
  const CategoryWithProducts = ref([]);
  const productsWithOffer = ref([]);
  const productListIconsForHome = ref([]);
  const favoritList = ref(
    localStorage.favoritList ? JSON.parse(localStorage.favoritList) : []
  );
  const cartItems = ref(
    localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []
  );
  const imageUrl = ref("https://zincoint.com/public/upload/products/gallery/");
  const iconsUrl = ref(
    "https://zincoint.com/public/upload/categories/categories_icons/"
  );
  axios.defaults.baseURL = "https://zincoint.com/api/";



  // computed(()=>newlist= products.allProducts.filter(x=>x.is_recently === 1))



  async function getAllProducts() {
    return await axios
      .get("recently_products?min=&max=&category_id=&brand_id=&sort=")
      .then((res) => {
        allProducts.value = res.data.data.data;
      })
  }
  async function getCategoryWithProducts() {
    const { data } = await axios.get("category_with_products");
    CategoryWithProducts.value =await data.data;
  }
  async function getProductsWithOffer() {
    const { data } = await axios.get("offers_products");
    productsWithOffer.value =await data.data;
  }
  async function getProductListIconsForHome() {
    const { data } = await axios.get("get_categories?from_home=true");
    productListIconsForHome.value =await data.data.categories;
  }
  async function getProductDetails(id) {
    const { data } = await axios.get(`/product/${id}`);
    productDetails.value =await data.data;
  }

  return {
    CategoryWithProducts,
    getCategoryWithProducts,
    getProductsWithOffer,
    productsWithOffer,
    productListIconsForHome,
    getProductListIconsForHome,
    allProducts,
    getAllProducts,
    productDetails,
    getProductDetails,
    imageUrl,
    lang,
    iconsUrl,
    favoritList,
    cartItems,
    // newlist
  };
});
