import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Messages from '../views/Messages.vue'
import Notifications from '../views/Notifications.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Vehicules from '../views/Vehicules.vue'
import Chauffeurs from '../views/Chauffeurs.vue'
import Repporting from '../views/Repporting.vue'
import Fourniture from '../views/Fourniture.vue'
import Produit from '../views/Produit.vue'
import Demandes from '../views/Demandes'
import User from '../views/User.vue'
import Test from '../views/Test.vue'
import store from '../store/store'
import "animate.css/animate.css"

Vue.use(VueRouter)

  const routes = [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }  
    ,{
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  },
  {
    path: '/messages',
    name: 'Messages',
    component:Messages ,
    beforeEnter: (to, from, next) => {
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component:Notifications ,
    beforeEnter: (to, from, next) => {
      
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile ,
    beforeEnter: (to, from, next) => {
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  },
  {
    path: '/test',
    name: 'Test',
    component:Test ,
    beforeEnter: (to, from, next) => {
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  },
  {
    path: '/Vehicules',
    name: 'Vehicules',
    component:Vehicules ,
    beforeEnter: (to, from, next) => {
      // ...
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  }, 
  {
    path: '/Chauffeurs',
    name: 'Chauffeurs',
    component:Chauffeurs ,
    beforeEnter: (to, from, next) => {
      
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  },
  {
    path: '/user',
    name: 'User',
    component:User,
    beforeEnter: (to, from, next) => {
      // ...
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    } 
  }, 
  {
    path: '/repporting',
    name: 'Repporting',
    component:Repporting,
    beforeEnter: (to, from, next) => {
      // ...
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    } 
  }, 
  {
    path: '/fourniture',
    name: 'Fourniture',
    component:Fourniture ,
    beforeEnter: (to, from, next) => {
      // ...
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  }, 
  {
    path: '/produit',
    name: 'Produit',
    component:Produit ,
    beforeEnter: (to, from, next) => {
      // ...
      if(store.state.token){
        next();
      }else{
        next({name:'Login'});
      }
    }
  }, 
  {
    path: '/demandes',
    name: 'Demandes',
    component:Demandes ,
    beforeEnter: (to, from, next) => {
      // ...
      if(store.state.authenticed){
        next();
      }else{
        next({name:'Login'});
      }
    }
  },
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      console.log(store.state.token);
      if(store.state.token){
        console.log(store.state.token);
        next({name:'Dashboard'});
      }else{
        next({name:'Login'});
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
