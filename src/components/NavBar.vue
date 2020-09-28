<template>
     <nav
      app
    >
    <v-toolbar class="amber">
         <v-app-bar-nav-icon v-if="$store.state.token" class="indigo--text" @click="menu=!menu"></v-app-bar-nav-icon>
         <!--title-->
         <v-toolbar-title class="text-uppercase">
              <span class="indigo--text">Misq</span>
              <span class="indigo--text font-weight-light">Naftal</span>
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <!--icons-->
          <v-btn v-if="$store.state.token" 
               icon
               route
               to="/notifications"
               >
               <v-icon class="indigo--text">
                    notification_important
               </v-icon>
         </v-btn>
         <v-btn v-if="$store.state.token" icon route to="/messages">
               <v-icon class="indigo--text">
                    mail
               </v-icon>
         </v-btn>
         <v-btn 
          v-if="$store.state.token" 
          icon
          @click="logout"
          >
               <v-icon class="indigo--text">
               exit_to_app
               </v-icon>
         </v-btn>
         <h4 class="white--text" v-if="!$store.state.token">une relation de confiance</h4>
    </v-toolbar>
    <!--navigation-->
    <v-navigation-drawer app temporary v-model="menu" class="amber">
         <v-row class="text-center mt-5">
              <v-flex xs12 >
                   <v-responsive>
                        <v-avatar size="150" class="blue">
                             <img :src="$store.state.user.avatar" alt="" />
                        </v-avatar>
                   </v-responsive>
              </v-flex>
              <v-flex xs12>
                   <div class="capation  gery--text  mt-1">{{$store.state.user.userName}}</div>
                   <div>{{$store.state.user.role}}</div>
              </v-flex>
         </v-row>
         
         <v-list>
              <v-list-item route to='/dashboard'  >   
                         <v-list-item-icon>
                              <v-icon class="indigo--text">dashboard</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">Dashboard</v-list-item-content>
              </v-list-item>
              <v-list-item route to='/profile'>   
                         <v-list-item-icon >
                              <v-icon class="indigo--text">account_circle</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">Profile</v-list-item-content>
              </v-list-item>
              <v-list-item route to='/notifications'>   
                         <v-list-item-icon>
                              <v-icon class="indigo--text">notification_important</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">Notifications</v-list-item-content>
              </v-list-item>
              <v-list-item route :to="'/messages'">   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">mail</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">messages</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.role!='Client'"  route :to="'/demandes'" >   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">layers</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">Liste demandes a traiter</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.role=='Directeur'"  route :to="'/repporting'" >   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">insert_chart</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">Repporting</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.role=='Chef de parc'"  route :to="'/chauffeurs'" >   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">airline_seat_recline_normal</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">List des chauffeurs</v-list-item-content>
              </v-list-item> 
              <v-list-item v-if="$store.state.user.role=='Chef de parc'"  route :to="'/vehicules'" >   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">commute</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">List des véhicules</v-list-item-content>
              </v-list-item>
              <v-list-item v-if="$store.state.user.role=='Agent de magasin'"  route :to="'/fourniture'" >   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">edit</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">List des fournitures</v-list-item-content>
              </v-list-item>
               <v-list-item v-if="$store.state.user.role=='Agent de magasin'"  route :to="'/produit'" >   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">devices</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">Listes des produits</v-list-item-content>
              </v-list-item>
                        <v-list-item @click="logout" >   
                         <v-list-item-icon  >
                              <v-icon class="indigo--text">exit_to_app</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content  class="indigo--text">Logout</v-list-item-content>
              </v-list-item>
         </v-list>     
    </v-navigation-drawer>    
  </nav>
</template>
<script>
export default {
    name:'NavBar',
    data(){
         return{
              menu:false,
         }
    },
    methods:{
         logout(){
            this.$store.commit('logout');
            this.$router.push('/',()=>{})
         }
    }
}
</script>