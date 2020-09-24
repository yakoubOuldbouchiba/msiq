import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Messages from '../views/Messages.vue'
import Notifications from '../views/Notifications.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Test from '../views/Test.vue'
import "animate.css/animate.css"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/messages',
    name: 'Messages',
    component:Messages 
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component:Notifications 
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile 
  },
  {
    path: '/test',
    name: 'Test',
    component:Test 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
