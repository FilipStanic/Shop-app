<script>
import { ref, computed } from 'vue';
import Products from './components/Products.vue';
import products from '../src/assets/products.json';
import Cart from './components/Cart.vue';

export default {

  
  name: "App",
  components: { Products, Cart },
  computed: {
    totalQuantity() {
      return this.cart.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    }
  },

  setup() {
    const cart = ref([]);

    const addItemToCart = (product) => {
      let existingItem = cart.value.find(item => item.name === product.name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.value.push({ ...product, quantity: 1 });
      }
    };

    const increaseQuantity = (index) => {
      cart.value[index].quantity++;
    };

    const decreaseQuantity = (index) => {
      if (cart.value[index].quantity > 1) {
        cart.value[index].quantity--;
      } else {
        cart.value.splice(index, 1);
      }
    };
    

    return {
      products,
      cart,
      addItemToCart,
      increaseQuantity,
      decreaseQuantity,
    };
  }
};
</script>

<template>

  <div>

    <header>
      <div class="w-full h-[80px] bg-gray-300 shadow-xl flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="mx-8">Products</router-link>
        </div>
        
        <div class="flex-grow flex justify-center">
        </div>
        
        <div class="flex items-center relative">
          <router-link to="/cart" class="p-6">
            <img class="w-[30px] mr-8" src="/src/assets/Images/cart.svg" alt="Cart">
            <span v-for="(item, index) in cart" :key="item.name" class="absolute top-4 right-12 bg-red-600 text-white rounded-full px-1 py-0 text-xs">{{ totalQuantity }}</span>
          </router-link>
      </div>
    </div>
  </header>
  
  <router-view v-if="$route.path === '/'" :products="products" @add-to-cart="addItemToCart" />
  <router-view v-if="$route.path === '/cart'" :cart="cart" @increase-quantity="increaseQuantity" @decrease-quantity="decreaseQuantity" />
  

</div>
</template>

<style scoped>

.relative {
  position: relative;
}
</style>
