<template>
  <v-app>
    
    <v-main>
      <v-content>
        <NavBar/>
        <router-view></router-view>
      </v-content>
    </v-main>
  </v-app>
</template>

<script>
import io from 'socket.io-client'
import {http} from './services/httpServices'
import NavBar from '@/components/NavBar.vue'
import Axios from 'axios';
export default {
  name: 'App',
  components: {NavBar},
  data(){
    return{

    }
  },
  created(){
    process.env.NODE_ENV === 'production ' 
    ? this.$store.state.sokect = io('')
    : this.$store.state.sokect = io(http())
  },
   async mounted(){
     if(this.$store.state.token){
      let user = (await Axios.get('/api/users/'+this.$store.state.user.email)).data
      if(!user.shown){
        this.$store.commit('logout');
        this.$router.push('/',()=>{})
      }
    }
    this.$store.state.sokect.on("DeleteCompte"+this.$store.state.user.email, () => {
        this.$store.commit('logout');
        this.$router.push('/',()=>{})
    })
  }
};
</script>
