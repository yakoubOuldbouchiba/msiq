<template>
  <div class="Dashboard">  
    <v-container>
      <div class="my-6">
        <v-row>
          <span xs1 class="subheading blue--text">Mes demandes</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="sortBy('type_demande')"
              >trie par titre <v-icon small right >folder</v-icon></v-btn>    
            </template>
            <span>trie par le titre de la demande</span>
          </v-tooltip>
         <Pupupdemandes/>
        </v-row>
      </div>
      <v-card  class="my-6 pa-2" >    
         <v-simple-table>
           <thead>
             <tr >
               <th>ID</th>
               <th>Type de demande</th>
               <th>Date de création</th>
               <th class="text-center">Etat</th>
               <th class="text-center">Motif</th>
               <th class="text-center">Action</th>
             </tr>
           </thead>
           <tbody>
             <tr class="pa-2" v-for="Demande in Demandes" :key="Demande.demande_ID">
               <td :class="`demande ${Demande.etat}`" ><b>{{Demande.demande_ID}}</b></td>
               <td >{{Demande.type_demande}}</td>
               <td >{{Demande.demande_Date}}</td>
               <td class="text-center">
                 <v-chip
                  v-if="Demande.etat == 'Acceptée3'"
                  class="success"
                 >
                  {{Demande.etat}}
                 </v-chip>
                 <v-chip v-else-if="Demande.etat == 'Rejectée'" 
                 class="error">
                  {{Demande.etat}}
                 </v-chip>
                 <v-chip v-else class="warning">
                   {{Demande.etat}}
                 </v-chip>
                 
                </td>
               <td class="text-center">
                 <span v-if="!Demande.motif">-</span>
                 {{Demande.motif}}
              </td>
               <td class="text-center">
                 <v-btn
                  class="mx-2"
                  outlined
                  color="indigo"
                  fab
                  dark
                  x-small
                  @click='deleteItem(Demande)'
                >
                  <v-icon dark>
                    delete
                  </v-icon>
                </v-btn>
                 <v-btn
                  class="mx-2"
                  outlined
                  color="teal"
                  fab
                  dark
                  x-small
                >
                  <v-icon dark>
                    edit
                  </v-icon>
                </v-btn>
               </td>
             </tr>
           </tbody>
         </v-simple-table>
      </v-card>  
    </v-container>
    <v-snackbar
      v-model="Done"
      :timeout="5000"
      color="green"
      outlined
      class="mb-5"
    >
    {{msg}}
     <template v-slot:action="{ attrs }">
        <v-btn
          color="green"
          text
          v-bind="attrs"
          @click="Done = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="Errr" max-width="290">
      <v-card>
          <v-card-title class="headline red lighten-2">
          Error
        </v-card-title>
        <v-card-text  class="mt-10 title">{{msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="Errr = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Pupupdemandes from '../components/Pupupdemandes'
import axios from 'axios'
export default {
name: 'dashboard',
components:{Pupupdemandes},
async created(){
  this.Demandes = (await axios.get("http://localhost:3030/demandes/")).data.demandes
},
data(){
   return{
     Demandes :[],
     valid:false,
            msg :'',
            Done: false,
            Errr: false,
   }
 },
 methods:{
   sortBy(p){
     this.Demandes.sort((a,b)=>a[p]>b[p] ? -1 : 1)
   },
   async deleteItem(demande){
     let type = ''
     if(demande.type_demande=="demande véhicule"){
          type='/DemandeVehicule/' 
     } else if(demande.type_demande=="demande client"){
          type='/DemandeClient/' 
     } else if(demande.type_demande=="demande fourniture"){
          type='/DemandeFourniture/' 
     }else if(demande.type_demande=="demande prise en charge"){
          type='/DemandePriseEnCharge/' 
     }else if(demande.type_demande=="demande tirage"){
          type='/DemandeTirage/' 
     }else if(demande.type_demande=="demande relex"){
          type='/DemandeRelex/' 
     }else{
       type='/demande/'
     }
     await axios.delete('http://localhost:3030'+type+demande.demande_ID)
          .then(
                res =>{
                    this.msg = res.data.title,
                    this.Done = true      
                },
                err => {
                    this.Errr = true,
                    this.msg = err.response.data.title
                }
          )
    if(this.Done){
      let index = this.Demandes.indexOf(demande)
      this.Demandes.splice(index , 1);
    }
   }
 }
}
</script>
<style>
  .demande{
    border-left:4px solid orange;
  }
  .demande.Rcceptée3{
    border-left:4px solid springgreen;
  }
  .demande.Rejectée{
    border-left:4px solid tomato;
  }
  
</style>
