<template>
  <div class="container mx-auto py-14">
    <h2 class="text-3xl font-semibold mb-4">Shopping Cart</h2>
    <div v-if="cart.length === 0" class="text-gray-600">Your cart is empty.</div>
    <div v-else>
      <div v-for="(item, index) in cart" :key="index" class="flex items-center border-b py-4 items-center">
        <img class="w-16 h-16 object-cover rounded-lg mr-4" :src="item.image" :alt="item.name" />
        <div class="flex-1">
          <h3 class="font-semibold">{{ item.name }}</h3>
          <!-- <p class="text-gray-700">{{ item.cost }}</p> -->
        </div>
        <div class="flex items-center">
          <button class="text-gray-500 px-3 py-1 border rounded-md" @click="decreaseQuantity(index)">-</button>
          <span class="px-3">{{ item.quantity }}</span>
          <button class="text-gray-500 px-3 py-1 border rounded-md" @click="increaseQuantity(index)">+</button>
        </div>
      </div>
    </div>
      <h1 class="text-3xl font-semibold mt-10 text-right">Total Price : ${{ formattedTotal }}</h1>
  </div>
</template>

<script>

import { ref, computed } from 'vue';

export default {
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  methods: {
    increaseQuantity(index) {
      this.$emit('increase-quantity', index);
    },
    decreaseQuantity(index) {
      this.$emit('decrease-quantity', index);
    }
  },

  computed: {
    getTotalCartPrice() {
      return this.cart.reduce((total, item) => {
        return total + (item.cost * item.quantity);
      }, 0);
    },

    formattedTotal() {
      return this.getTotalCartPrice.toFixed(2);
    }
  }
};


</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
