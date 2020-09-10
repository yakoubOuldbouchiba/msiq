<template>
     <nav
      app
    >
    <v-toolbar class="yellow">
         <v-app-bar-nav-icon class="blue--text" @click="menu=!menu"></v-app-bar-nav-icon>
         <!--title-->
         <v-toolbar-title class="text-uppercase">
              <span class="blue--text">Misq</span>
              <span class="blue--text font-weight-light">Naftal</span>
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <!--icons-->
          <v-btn icon>
               <v-icon class="blue--text">
                    notification_important
               </v-icon>
         </v-btn>
         <v-btn icon>
               <v-icon class="blue--text">
                    mail
               </v-icon>
         </v-btn>
         <v-btn icon>
               <v-icon class="blue--text">
               exit_to_app
               </v-icon>
         </v-btn>
    </v-toolbar>
    <!--navigation-->
    <v-navigation-drawer app temporary v-model="menu" class="yellow">
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
              <v-list-item classs="blue" v-for="link in links" :key="link.text" route :to="link.route">
                    <v-list-item-icon>
                         <v-icon class="blue--text">{{link.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="blue--text">{{link.text}}</v-list-item-content>  
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
                   {icon:'dashboard',text:'Dashboard',route:'/',iscount:true},
                   {icon:'account_circle',text:'Profile',route:'/profile',iscount:true},
                   {icon:'notification_important',text:'notifications',route:'/notifications',iscount:true},
                   {icon:'mail',text:'messages',route:'/messages',iscount:true},
                   {icon:'exit_to_app',text:'logout',route:'/hellopage',iscount:true},
                   {icon:'exit_to_app',text:'test',route:'/test',iscount:true},
              ]

              
         }
    }
}
</script>