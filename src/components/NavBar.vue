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
                             <img src="/yakoub.jpg" alt="" />
                        </v-avatar>
                   </v-responsive>
              </v-flex>
              <v-flex xs12>
                   <div class="capation  gery--text  mt-1">Yakoub Ould Bouchiba</div>
                   <div>Directeur</div>
              </v-flex>
         </v-row>
         <v-list>
              <v-list-item  v-for="link in links" :key="link.text" route :to="link.route">
                    <v-list-item-icon>
                         <v-icon class="indigo--text">{{link.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="indigo--text">{{link.text}}</v-list-item-content>  
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
                   {icon:'dashboard',text:'Dashboard',route:'/dashboard',iscount:true},
                   {icon:'account_circle',text:'Profile',route:'/profile',iscount:true},
                   {icon:'notification_important',text:'notifications',route:'/notifications',iscount:true},
                   {icon:'mail',text:'messages',route:'/messages',iscount:true},
                   {icon:'exit_to_app',text:'logout',route:'/hellopage',iscount:true},
              ]
         }
    }
}
</script>