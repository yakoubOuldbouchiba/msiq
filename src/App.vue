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
  data: () => ({
    //
  }),
};
</script>
