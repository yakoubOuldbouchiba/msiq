<template>
     <nav
      app
    >
    <v-toolbar color="#efefef">
         <v-app-bar-nav-icon v-if="$store.state.token" class="indigo--text" @click="menu=!menu"></v-app-bar-nav-icon>
         <!--title-->
         <v-toolbar-title class="text-uppercase">
               <span class="font-weight-bold amber--text text--darken-1">MSIQ</span>
               <span class="font-weight-light indigo--text text--darken-4">NAFTAL</span>
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <!--icons-->
          <Notifications v-if="$store.state.token"/>
         <v-btn 
          v-if="$store.state.token" 
          icon
          @click="logout"
          >
               <v-icon class="indigo--text text--darken-4">
               exit_to_app
               </v-icon>
         </v-btn>
         <h4 class="indigo--text" v-if="!$store.state.token">une relation de confiance</h4>
    </v-toolbar>
    <!--navigation-->
    <v-navigation-drawer app temporary v-model="menu" color="#efefef">
          <v-icon class="amber--text text--darken-1 ml-auto d-flex" @click="menu = !menu">keyboard_arrow_left</v-icon>
         <v-row class="text-center mt-5">
              <v-flex xs12 >
                   <v-responsive>
                        <v-avatar size="150" class="blue">
                             <img :src="$store.state.user.avatar" alt="" />
                        </v-avatar>
                   </v-responsive>
              </v-flex>
              <v-flex xs12>
                   <div class="amber--text text--darken-1">{{$store.state.user.userName}}</div>
                   <div class="indigo--text text--darken-4 capation">{{$store.state.user.fonction}}</div>
              </v-flex>
         </v-row>
         
         <v-list>
              <v-list-item route to='/dashboard'  >   
                         <v-list-item-icon>
                              <v-icon class="amber--text text--darken-1">dashboard</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">Dashboard</v-list-item-content>
              </v-list-item>
              <v-list-item route to='/profile'>   
                         <v-list-item-icon >
                              <v-icon class="amber--text text--darken-1">account_circle</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">Profile</v-list-item-content>
              </v-list-item>
              <v-list-item route to='/notifications'>   
                         <v-list-item-icon>
                              <v-icon class="amber--text text--darken-1">notification_important</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">Notifications</v-list-item-content>
              </v-list-item>
              <v-list-item route :to="'/messages'">   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">mail</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">messages</v-list-item-content>
              </v-list-item>
              <v-list-item 
                              v-if="$store.state.user.typeUtilisateur!=='Client'"
       
                                route :to="'/demandes'"
          >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">layers</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">Liste demandes a traiter</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.typeUtilisateur=='Directeur'"  route :to="'/user'" >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">group</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">List des employee</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.typeUtilisateur=='Directeur'"  route :to="'/repporting'" >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">insert_chart</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">Repporting</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.typeUtilisateur=='Chef de parc'"  route :to="'/chauffeurs'" >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">airline_seat_recline_normal</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">List des chauffeurs</v-list-item-content>
              </v-list-item> 
              <v-list-item v-if="$store.state.user.typeUtilisateur=='Chef de parc'"  route :to="'/vehicules'" >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">commute</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">List des véhicules</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.typeUtilisateur=='Agent de magasin'"  route :to="'/fourniture'" >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">edit</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">List des fournitures</v-list-item-content>
              </v-list-item>
               <v-list-item v-if="$store.state.user.typeUtilisateur=='Agent de magasin'"  route :to="'/produit'" >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">devices</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">Listes des produits</v-list-item-content>
              </v-list-item>
                        <v-list-item @click="logout" >   
                         <v-list-item-icon  >
                              <v-icon class="amber--text text--darken-1">exit_to_app</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text text--darken-4">Logout</v-list-item-content>
              </v-list-item>
         </v-list>     
    </v-navigation-drawer>    
  </nav>
</template>
<script>
import Axios from 'axios'
import Notifications from '../components/Notification/Notification'
export default {
    name:'NavBar',
    components :{Notifications},
    data(){
         return{
              menu:false,   
         }
    },
    created(){
         Axios.defaults.headers.common['Authorization']=localStorage.getItem("token");
         this.$store.dispatch('getuser');
    },
    mounted(){
         Axios.defaults.headers.common['Authorization']=localStorage.getItem("token");
         this.$store.dispatch('getuser');
    },
    methods:{
         logout(){
            this.$store.commit('logout');
            this.$router.push('/',()=>{})
         }
    }
}
</script>