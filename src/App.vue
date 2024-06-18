<script>
import { ref } from 'vue';
import Products from './components/Products.vue';
import products from '../src/assets/products.json';
import Cart from './components/Cart.vue';

export default {
  name: "App",
  components: { Products, Cart },
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
      decreaseQuantity
    };
  }
};
</script>

<template>

  <div>

    <header>
      <div class="w-full h-[80px] bg-gray-200 shadow-xl flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="mx-8">Products</router-link>
          <router-link to="/contact" class="mx-8">Contact</router-link>
          <router-link to="/about" class="mx-8">About</router-link>
        </div>
        
        <div class="flex-grow flex justify-center">
        </div>
        
        <div class="flex items-center">
          <router-link to="/cart" class="p-6">
            <img class="w-[30px] mr-8" src="/src/assets/Images/cart.svg" alt="Cart">
          </router-link>
      </div>
    </div>
  </header>
  
  <router-view :products="products" @add-to-cart="addItemToCart" />
  <router-view v-if="$route.path === '/cart'" :cart="cart" @increase-quantity="increaseQuantity" @decrease-quantity="decreaseQuantity" />
  
</div>
</template>

<style scoped>


</style>
