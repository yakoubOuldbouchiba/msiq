<template>
  <div class="Messages">
    <v-container>
      <h1 class="grey--text lighten-2 my-5">Messages</h1>
      <v-row> 
       <v-col :sm="8">
         <v-card tile>
           <v-list>
             <v-subheader>
               <v-icon left small>mail</v-icon>
               <span>Messages</span>
            </v-subheader>
             <v-list-item-group>
               <v-list-item v-for="message in messages" :key="message.name">
                 <v-list-item-avatar>
                   <img :src="message.avatar" alt="">
                 </v-list-item-avatar>
                 <v-list-item-content>
                   <v-list-item-title>{{message.sender}}</v-list-item-title>
                   <v-list-item-subtitle>{{message.content}}</v-list-item-subtitle>
                 </v-list-item-content>
               </v-list-item>
             </v-list-item-group>
           </v-list>
         </v-card>
       </v-col>
       <v-col :sm="4">
         <v-card tile>
           <v-list>
             <v-subheader>
               <v-icon left small>person</v-icon>
               <span>Relations</span>
            </v-subheader>
             <v-list-item-group>
               <v-list-item v-for="person in team" :key="person.name">
                 <v-list-item-avatar>
                   <img :src="person.avatar" alt="">
                 </v-list-item-avatar>
                 <v-list-item-content>
                   <v-list-item-title>{{person.name}}</v-list-item-title>
                 </v-list-item-content>
               </v-list-item>
             </v-list-item-group>
           </v-list>
         </v-card>
       </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name:'messages',
  data(){
    return{
      team :[
        {name:'Yakoub Ould bouchiba',role:'fontend',avatar:'/avatar1.jpg'},
        {name:'Yacine Lalmi',role:'backend',avatar:'/avatar2.jpg'},
        {name:'Riad Bouaicha',role:'softdevelp',avatar:'/avatar3.png'},
        {name:'alex bun',role:'graohic disgner',avatar:'/avatar4.png'}
      ],
      messages :[
        {sender:'Yacine Lalmi' , avatar:'/avatar2.jpg', content :'bli blo bli blo bli'}
      ]
    }
  }
}
</script>

<style>

</style>