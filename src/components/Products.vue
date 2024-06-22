<script>
import Swal from 'sweetalert2';

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentProduct: null
    };
  },
  methods: {
    addItemToCart(product) {
      this.$emit('add-to-cart', { ...product, quantity: product.quantity });
      Swal.fire({
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500
    });
    },
    changeMainImage(imageUrl, product) {
      product.currentImage = imageUrl;
    },
    increaseQuantity(product) {
      product.quantity++;
    },
    decreaseQuantity(product) {
      if (product.quantity > 0) {
        product.quantity--;
      }
    }
  }
};
</script>
<template>
  <div class="container mx-auto py-14">
    <div class="flex-col lg:flex-row lg:items-start lg:space-x-8">
      <div v-for="product in products" :key="product.name"
        class="flex flex-col lg:flex-row items-center mb-8 w-full lg:w-auto">


        <div class="flex flex-col items-center lg:w-1/2">
          <div class="w-2/5 mb-4">
            <img class="w-full h-auto object-cover rounded-lg"
              :src="product.currentImage ? product.currentImage : product.image"
              :alt="product.name" />
          </div>
          <div class="flex justify-center space-x-4">

            <img class="w-20 border-2 border-gray-400 h-auto object-cover rounded-lg cursor-pointer hover:opacity-60"
              :src="thumbnail.image"
              :alt="thumbnail.alt"
              v-for="(thumbnail, index) in product.thumbnails"
              :key="index"
              @click="changeMainImage(thumbnail.image, product)" />
          </div>
        </div>

        <div class="flex flex-col items-center lg:items-start lg:w-1/2 lg:pl-4 text-center lg:text-left">
          <h1 class="text-4xl font-semibold mb-4">{{ product.name }}</h1>
          <p class="text-xl text-gray-700 mb-6">${{ product.cost }}</p>
          <p class="text-base text-gray-600 mb-8">
            {{ product.description }}
          </p>
          <button class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-400"
            @click="addItemToCart(product)">Add to cart</button>
        </div>


        

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>
