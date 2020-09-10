<template>
  <div class="Dashboard">  
    <v-container>
      <div class="my-6">
        <v-row>
          <span xs1 class="subheading blue--text">Dashboard</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="sortBy('title')"
              >trie par titre <v-icon small right >folder</v-icon></v-btn>
              
            </template>
            <span>trie par le titre de la demande</span>
          </v-tooltip>
         <Pupupdemandes/>
        </v-row>
      </div>
      <v-card  class="my-6" v-for="Demande in Demandes" :key="Demande.id" >
        
          <v-row >
            <!--Titre-->
            <v-flex xs12 md6 :class="`pa-3 demande ${Demande.status}`">
              <div class="capation grey--text">Titre de demande</div>
              <div>{{Demande.title}}</div>
            </v-flex >
            <!--Date de demande-->
            <v-flex xs4 md2 :class="`pa-3 demande`">
              <div class="capation grey--text">Date de etablir </div>
              <div>{{Demande.dateDebut}}</div>
            </v-flex >
            <!--status-->
            <v-flex xs4 md2 :class="`pa-3 demande`">
              <v-chip small :class="`capation white--text ${Demande.status}`">{{Demande.status}}</v-chip>
            </v-flex >
            <!--Date de réception-->
            <v-flex xs4 md2 :class="`pa-3 demande`">
              <div class="capation grey--text">Date de reception</div>
              <div>{{Demande.dateReception}}</div>
            </v-flex> 
          </v-row>  
          <v-divider></v-divider>  
      </v-card>  
    </v-container>
  </div>
</template>

<script>
import Pupupdemandes from '../components/Pupupdemandes'
export default {
name: 'dashboard',
components:{Pupupdemandes},
data(){
   return{
     Demandes :[
       {id:'1',title:'Demade de vehicule',dateDebut:'27-08-2020',status:'accepted' , dateReception:'29-08-2080'},
       {id:'2',title:'Demande de pc',dateDebut:'24-08-2020',status:'rejected' , dateReception:'-'},
       {id:'3',title:'Demande de sytlo',dateDebut:'24-08-2020',status:'isUnderStudy' , dateReception:'-'},
       {id:'4',title:'Demande de tiriage',dateDebut:'23-08-2020',status:'accepted' , dateReception:'23-08-2020'},
       {id:'5',title:'Demande de papier',dateDebut:'10-08-2020',status:'accepted' , dateReception:'10-08-2020'}
     ]
   }
 },
 methods:{
   sortBy(p){
     this.Demandes.sort((a,b)=>a[p]>b[p] ? -1 : 1)
   }
 }
}
</script>
<style>
  .demande.accepted{
    border-left:4px solid springgreen;
  }
  .demande.rejected{
    border-left:4px solid tomato;
  }
  .demande.isUnderStudy{
    border-left:4px solid orange;
  }
  .theme--light.v-chip:not(.v-chip--active).accepted{
    background:  springgreen;
  }
  .theme--light.v-chip:not(.v-chip--active).rejected{
    background:  tomato;
  }
  .theme--light.v-chip:not(.v-chip--active).isUnderStudy{
    background:  orange;
  }

</style>
