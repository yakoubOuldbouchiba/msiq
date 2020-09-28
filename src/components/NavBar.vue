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
          <v-btn v-if="$store.state.token" icon>
               <v-icon class="indigo--text">
                    notification_important
               </v-icon>
         </v-btn>
         <v-btn v-if="$store.state.token" icon>
               <v-icon class="indigo--text">
                    mail
               </v-icon>
         </v-btn>
         <v-btn 
          v-if="$store.state.token" 
          icon
          @click="$store.commit('logout')"
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
              <v-list-item  v-for="link in links" :key="link.text" >
                              
                         <v-list-item-icon v-if="link.isShow"  route :to="link.route">
                              <v-icon class="indigo--text">{{link.icon}}</v-icon>
                         </v-list-item-icon>
                         <v-list-item-content v-if="link.isShow" class="indigo--text">{{link.text}}</v-list-item-content>
                     
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
              links:[
                   {icon:'dashboard',text:'Dashboard',route:'/dashboard',iscount:true,isShow:true},
                   {icon:'account_circle',text:'Profile',route:'/profile',iscount:true,isShow:true},
                   {icon:'notification_important',text:'notifications',route:'/notifications',iscount:true,isShow:true},
                   {icon:'mail',text:'messages',route:'/messages',iscount:true,isShow:true},
                   {icon:'commute',text:'List des véhicules',route:'/vehicules',iscount:true,isShow:(this.$store.state.user.role=='Chef de parc')},
                   {icon:'airline_seat_recline_normal',text:'List des chauffeurs',route:'/chauffeurs',iscount:true,isShow:(this.$store.state.user.role=='Chef de parc')},
                   {icon:'exit_to_app',text:'logout',route:'/hellopage',iscount:true, isShow:true},
   
              ]
         }
    }
}
</script>