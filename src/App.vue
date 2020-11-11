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

import NavBar from '@/components/NavBar.vue'
export default {
  name: 'App',
  components: {NavBar},
  data(){
    return{

    }
  },
  mounted(){
    this.$store.state.sokect.on("DeleteCompte"+this.$store.state.user.email, () => {
        this.$store.commit('logout');
        this.$router.push('/',()=>{})
    })
  }
};
</script>
