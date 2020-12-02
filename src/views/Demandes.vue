<template>
  <div class="Dashboard">  
    <v-container class="px-8">
      <div class="my-6">
        <v-row>
          <span xs1 class="subheading blue--text">Liste des  demandes à traiter</span>
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
        </v-row>
      </div>
      <v-card  class="my-6 pa-2" >
         <v-simple-table>
           <thead v-if="AccDemandes.length != 0">
             <tr >
               <th></th>
               <th>Type de demande</th>
               <th>Nom et Prénom</th>
               <th class="text-center">Type de compte</th>
               <th class="text-center"></th>
             </tr>
           </thead>
           <tbody v-if="AccDemandes.length != 0">
             <tr class="pa-2 yellow lighten-4" v-for="Demande in AccDemandes" :key="Demande.email" @click='TDemandeAcc(Demande)'>
               <td ><b>-</b></td>
               <td >Demande De Compte</td>
               <td >{{Demande.nomUtilisateur}} {{Demande.prenomUtilisateur}}</td>
               <td class="text-center">{{Demande.typeUtilisateur}}</td>
               <td class="text-center">-</td>
             </tr>
           </tbody>
           <thead>
             <tr >
               <th>ID</th>
               <th>Type de demande</th>
               <th>Date de création</th>
               <th class="text-center">Etat</th>
               <th class="text-center">Motif</th>
             </tr>
           </thead>
           <tbody>
             <tr :class="`pa-2 ${Demande.seen? 'grey lighten-3' : 'grey lighten-3'}`" v-for="Demande in Demandes" :key="Demande.demande_ID" @click='updateItem(Demande)'>
               <td :class="`demande ${Demande.etat}`" ><b>{{Demande.demande_ID}}</b></td>
               <td >{{Demande.type_demande}}</td>
               <td >{{Demande.demande_Date.substr(0,10)+" "+Demande.demande_Date.substr(11,5)}}</td>
               <td class="text-center">
                 <v-chip
                  v-if="Demande.etat == 'Acceptee'"
                  class="success"
                 >
                  {{Demande.etat}}
                 </v-chip>
                 <v-chip v-else-if="Demande.etat == 'Rejetee'" 
                 class="error">
                  {{Demande.etat}}
                 </v-chip>
                 <v-chip v-else class="warning">
                   {{Demande.etat}}
                 </v-chip>
                 
                </td>
               <td class="text-center">
                 <span v-if="!Demande.motif">-</span>
                 <span v-else>{{Demande.motif.substr(0,20)}}</span>
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
    <DemandeClient 
      v-model="openDialogClient"
      :demande="demande"
      type= "Traiter" 
      @resetDemand="resetDemand"
      :Editable="false"
    />
    <DemandeFourniture 
      v-model="openDialogFourniture"
      :demande="demande"
      type= "Traiter"
      name='demande de fourniture'
      icon='edit'
      color='red'
      @resetDemand="resetDemand"
       />
    <DemandeVehicule 
      v-model="openDialogVehicule1"
      :demande="demande"
      :chauffeurs="chauffeurs"
      :vehicules ="vehicules"
      type= "Traiter"
      forDemandeRelex="false"
      name ='demande de véhicule'
      icon ='commute'
      color ='deep-purple'
      @resetDemand="resetDemand"
      :Editable="false"
       />
    <DemandeTirage :demande="demande" 
      v-model="openDialogTirage"
      type='Traiter'
      :Editable="false" />
    <DemandePriseEnCharge :demande="demande" v-model="openDialogPEC" type='Traiter' :Editable="false"/>
    <DemandeRelex 
      v-model="openDialogRelex"
      :demande="demande"
      @resetDemand="resetDemand"
      type= "Traiter"
      name='demande activité relex' 
      icon='hotel' 
      color='blue'
      :Editable="false"
     />
     <AccDemande 
     v-model="openDialogAccDemand"
     :demande="demandeCompte"
      />
  </div>
</template>

<script>
import DemandeClient from '../components/Demandes/DemandeClient'
import DemandeFourniture from '../components/Demandes/DemandeFourniture'
import DemandePriseEnCharge from '../components/Demandes/DemandePriseEnCharge'
import DemandeRelex from '../components/Demandes/DemandeRelex'
import DemandeTirage from '../components/Demandes/DemandeTirage'
import DemandeVehicule from '../components/Demandes/DemandeVehicule'
import AccDemande from "../components/AccDemande";
import axios from 'axios'
export default {
name: 'ListeDAT',
components:{DemandeVehicule , DemandeTirage , DemandeRelex , DemandePriseEnCharge, DemandeClient, DemandeFourniture, AccDemande},
async created(){
  let ALLDemandes = (await axios.get("/api/demandesATraiter/"+this.$store.state.user.typeUtilisateur+'/'+this.$store.state.user.departement+'/'+this.$store.state.user.structure)).data.demandes
  this.Demandes = ALLDemandes[0].reverse()
  this.AccDemandes = ALLDemandes[1].reverse()
},
mounted(){
  /*** demande on delete */
       this.$store.state.sokect.on('DeleteNofit'+this.$store.state.user.email, async (id) => {
         let index = this.Demandes.findIndex(x =>  x.demande_ID == id)
         this.Demandes.splice(index , 1);
  })
   this.$store.state.sokect.on('NewAccDemande'+this.$store.state.user.structure , (newDemand)=> {
      this.AccDemandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandeAcc'+this.$store.state.user.structure , (Demand)=> {
      console.log('HERE');
      let index = this.AccDemandes.findIndex(x =>  x.email === Demand.email)
      this.AccDemandes.splice(index , 1)
    })
    
  if (this.$store.state.user.typeUtilisateur == 'Chef departement') {
    this.$store.state.sokect.on('NewDemandCD'+this.$store.state.user.structure+this.$store.state.user.departement, (newDemand) => {
      this.Demandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandCD'+this.$store.state.user.structure+this.$store.state.user.departement, (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  }else if (this.$store.state.user.typeUtilisateur == 'Directeur') {
    this.$store.state.sokect.on('NewDemandD'+this.$store.state.user.structure, (newDemand) => {
      this.Demandes.unshift(newDemand)
    })  
    this.$store.state.sokect.on('RemoveDemandD'+this.$store.state.user.structure, (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  }else if (this.$store.state.user.typeUtilisateur == 'Responsable DAM') {
    this.$store.state.sokect.on('NewDemandRD', (newDemand) => {
      this.Demandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandRD', (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  }else if (this.$store.state.user.typeUtilisateur == 'Chef de parc') {
    this.$store.state.sokect.on('NewDemandCP', (newDemand) => {
      this.Demandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandCP', (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  }else if (this.$store.state.user.typeUtilisateur == 'Agent de Tirage') {
    this.$store.state.sokect.on('NewDemandAT', (newDemand) => {
      this.Demandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandAT', (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  }else if (this.$store.state.user.typeUtilisateur == 'Responsable PEC') {
    this.$store.state.sokect.on('NewDemandRPEC', (newDemand) => {
      this.Demandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandRPEC', (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  } else if (this.$store.state.user.typeUtilisateur == 'Responsable AR') {
    this.$store.state.sokect.on('NewDemandRR', (newDemand) => {
      this.Demandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandRR', (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  } else {
    this.$store.state.sokect.on('NewDemandAM', (newDemand) => {
        this.Demandes.unshift(newDemand)
    })
    this.$store.state.sokect.on('RemoveDemandAM', (Demand) => {
      let index = this.Demandes.findIndex(x =>  x.demande_ID === Demand.demande_ID)
      this.Demandes.splice(index , 1)
    })
  }   
},
data(){
   return{
        Demandes :[],
        AccDemandes:[],
        vehicules : null,
        chauffeurs : null,
        valid:false,
        msg :'',
        Done: false,
        Errr: false,
        openDialogVehicule1 : false,
        openDialogClient : false,
        openDialogFourniture : false,
        openDialogRelex : false,
        openDialogTirage : false,
        openDialogPEC : false,
        openDialogAccDemand: false,
        demande:null,
        demandeCompte: null
   }
 },
 methods:{
   resetDemand(){
     this.demande=null
   },
   sortBy(p){
     this.Demandes.sort((a,b)=>a[p]>b[p] ? -1 : 1)
   },
   async deleteItem(demande){
     let type = ''
     if(demande.type_demande== 'Demande véhicule'){
          type='/DemandeVehicule/' 
     } else if(demande.type_demande== 'Demande client'){
          type='/DemandeClient/' 
     } else if(demande.type_demande== 'Demande fourniture'){
          type='/DemandeFourniture/' 
     }else if(demande.type_demande== 'Demande de prise en charge'){
          type='/DemandePriseEnCharge/' 
     }else if(demande.type_demande== 'Demande de tirage'){
          type='/DemandeTirage/' 
     }else if(demande.type_demande== 'Demande activité relex'){
          type='/DemandeRelex/' 
     }else{
       type='/demande/'
     }
     await axios.delete('api'+type+demande.demande_ID)
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
   },
   async updateItem(Demande){
     await this.getDemande(Demande);
     this.demande.uID = await this.$store.state.user.email// i add it for notification
     if(Demande.type_demande=='Demande client'){
       this.openDialogClient = true;
     }else if(Demande.type_demande=='Demande fourniture'){
       this.openDialogFourniture = true;
     }else if(Demande.type_demande=='Demande véhicule'){  
       let Vehc =  await axios.get("/api/dispovehicules/"+this.demande.date_depart)
       this.vehicules = Vehc.data;
       let Chauf =  await axios.get("/api/dispochauffeurs/"+this.demande.date_depart)
       this.chauffeurs = Chauf.data;
       let dp = this.demande.date_depart;
       let dr = this.demande.date_retour
       this.demande.date_depart = dp.substr(0,10)
       this.demande.date_retour = dr.substr(0,10)
       this.demande.heure_depart = dp.substr(11,5)
       this.demande.heure_retour = dr.substr(11,5)
       this.openDialogVehicule1 = true
     }else if(Demande.type_demande== 'Demande activité relex'){
       let dp = this.demande.date_depart;
       let dr = this.demande.date_retour
       this.demande.date_depart = dp.substr(0,10)
       this.demande.date_retour = dr.substr(0,10)
       this.demande.heure_depart = dp.substr(11,5)
       this.demande.heure_retour = dr.substr(11,5)
       this.moyens_transport = false
       this.openDialogRelex = true
     }else if(Demande.type_demande== 'Demande de tirage'){
       this.openDialogTirage = true
     }else if(Demande.type_demande== 'Demande de prise en charge'){
       this.demande.startDate = this.demande.startDate.substr(0,10)
       this.demande.EndDate = this.demande.EndDate.substr(0,10)
       this.demande.heureDeVol = this.demande.heureDeVol.substr(11,5)
       this.openDialogPEC = true
     }
   },
   async getDemande(demande){
      let type = ''
     if(demande.type_demande== 'Demande véhicule'){
          type='/DemandeVehicule/' 
     } else if(demande.type_demande== 'Demande client'){
          type='/DemandeClient/' 
     } else if(demande.type_demande== 'Demande fourniture'){
          type='/DemandeFourniture/' 
     }else if(demande.type_demande== 'Demande de prise en charge'){
          type='/DemandePriseEnCharge/' 
     }else if(demande.type_demande== 'Demande de tirage'){
          type='/DemandeTirage/' 
     }else if(demande.type_demande== 'Demande activité relex'){
          type='/DemandeRelex/' 
     }else{
       type='/demande/'
     }
     await axios.get('api'+type+demande.demande_ID)
          .then(
                res =>{
                  this.demande = res.data.demande;        
                },
                err => {
                    this.Errr = true,
                    this.msg = err.response.data.title
                }
          )
   },
   TDemandeAcc(Demande){
     this.demandeCompte = Demande
     this.openDialogAccDemand = true
   },
 }
}
</script>
<style>
  .demande{
    border-left:4px solid orange;
  }
  .demande.Acceptee3{
    border-left:4px solid springgreen;
  }
  .demande.Rejectee{
    border-left:4px solid tomato;
  }
  
</style>
