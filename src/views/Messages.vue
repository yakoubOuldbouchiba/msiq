<template>
  <div class="Messages">
    <v-container>
      <h1 class="grey--text lighten-2 my-5">Messages</h1>
      <v-row> 
       <v-col :sm="8">
         <v-card tile>
           <v-list>
             <v-subheader class="display-1">
               <v-icon left >mail</v-icon>
               <span>Messages</span>
            </v-subheader>
             <v-list-item-group>
               <v-list-item v-for="message in $store.state.messages" :key="message.name">
                 <v-list-item-avatar>
                   <img  :src="message.avatar" alt="">
                 </v-list-item-avatar>
                 <v-list-item-content>
                   <v-list-item-title>{{message.userName}}</v-list-item-title>
                   <v-list-item-subtitle>{{message.content}}</v-list-item-subtitle>
                 </v-list-item-content>
               </v-list-item>
             </v-list-item-group>
           </v-list>
         </v-card>
       </v-col>
       <v-col :sm="4">
         <v-card tile>
           <v-list >
             <v-subheader class="display-1">
               <v-icon left>person</v-icon>
               <span>Relations</span>
            </v-subheader>
             <v-list-item-group>
               <v-list-item 
                  v-for="(person, index) in $store.state.users" 
                  :key="person.name" @click="open(index)">
                 <v-list-item-avatar >
                   <img :src="person.avatar" alt="">
                 </v-list-item-avatar>
                 <v-list-item-content >
                   <v-list-item-title>{{person.userName}}</v-list-item-title>
                 </v-list-item-content>
               </v-list-item>
               <NewMessage />
             </v-list-item-group>
           </v-list>
         </v-card>
       </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import NewMessage from '../components/NewMessage'
export default {
  name:'messages',
  components:{NewMessage},
  data(){
    return{
      
    }
  },
  async created(){
    this.$store.dispatch('getMessages');
    this.$store.dispatch('getTeam');
  },
  methods:{
    open:function(index){
      this.$store.commit('updateDialogNewMessage',index);
    }
  }
}
</script>

<style>

</style>