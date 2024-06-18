import { createRouter, createWebHistory } from 'vue-router';
import Products from '../components/Products.vue';
import Cart from '../components/Cart.vue';


const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
