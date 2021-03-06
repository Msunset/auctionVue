import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Index from '../components/index.vue'
import Product from '../components/product/product.vue'
import Chat from '../components/chat/chat.vue'
import Register from '../components/register/register.vue'
import AddProduct from '../components/product/addProduct.vue'
import Dynamic from '../components/dynamic/dynamic.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    },
    {
      name: 'product',
      path: '/product',
      component: Product
    },
    {
      name: 'chat',
      path: '/chat',
      component: Chat
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'addProduct',
      path: '/addProduct',
      component: AddProduct
    },
    {
      name: 'dynamic',
      path: '/dynamic',
      component: Dynamic
    }
  ]
})
