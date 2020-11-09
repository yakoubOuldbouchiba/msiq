<template>
<div>
    <v-dialog tile :retain-focus="false" v-model="dialog" width="800" persistent >
        <v-form v-model="valid" ref="form">
            <v-card >
                <v-toolbar flat dark color='deep-purple' class="my-0" >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">commute</v-icon> 
                         <span v-if="type=='update' && dialog==true"> modifier Demande véhicule némuro {{demande.demande_V_ID}} </span>
                         <span v-else>Demande véhicule</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="closeDemande()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-row justify="center">
                <v-col cols="12" sm="10">
                <v-card-text>

                    <v-row justify="center" v-if="type == 'Traiter'"> 
                        <v-col cols="12" sm="6"> 
                            <v-text-field 
                            :value="DV.nomUtilisateur+' '+DV.prenomUtilisateur"
                            disabled
                            label="Nom et prenom"
                            prepend-icon="mdi-account" 
                            ></v-text-field>
                        </v-col>  
                        <v-col cols="12" sm="6"> 
                            <v-text-field  
                            :value="DV.departement"
                            disabled
                            label="Departement"
                            prepend-icon="mdi-office-building"
                            ></v-text-field>
                        </v-col>  
                    </v-row>
                    <!------------ Collegues----------------->
                    <v-row justify="center">
                        <v-col>
                            <Autocomplete :utilisateur.sync="DV.utilisateur1_ID" :items="collegues" label="2 emme Client"/>
                        </v-col>
                        <v-col>
                            <Autocomplete :utilisateur.sync="DV.utilisateur2_ID" :items="collegues" label="3 emme Client"/>
                        </v-col>
                        <v-col>
                            <Autocomplete :utilisateur.sync="DV.utilisateur3_ID" :items="collegues" label="4 emme Client"/>
                        </v-col>
                    </v-row>
                    <!------------ Lieu & organisme----------------->
                    <v-row justify="center">
                        <v-col>
                            <v-text-field 
                            v-model="DV.lieu" 
                            label="Lieu" 
                            :disabled="!Editable"
                            prepend-icon="location_on"
                            :rules="[v => !!v || 'Cet champs est obligatoire']"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field 
                            v-model="DV.organisme" 
                            label="Organisme" 
                            :disabled="!Editable"
                            prepend-icon="domain"
                            :rules="[v => !!v || 'Cet champs est obligatoire']"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <!------------ Motif ----------------->
                    <v-row justify="center">
                        <v-col>
                            <v-textarea
                                label="motif de deplacement"
                                v-model="DV.motif_deplacement"
                                :disabled="!Editable"
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                                prepend-icon="list"
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <!------------ Date & Heur et lieu de depart----------------->
                    <v-row justify="center">
                        <v-col cols="12" sm="4">
                            <Date 
                                v-model="DV.date_depart" 
                                :Editable="Editable"
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                                label="Date de départ" 
                                @date ="dateSortie"
                                />
                        </v-col>
                            <v-col cols="12" sm="4" >
                            <Heure 
                                v-model="DV.heure_depart" 
                                :Editable="Editable"
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                                label="Heure de départ" 
                                @heure = "heureSortie"
                            />
                        </v-col>
                        <v-col cols="12" sm="4" >
                            <v-text-field v-model="DV.lieu_ramassage_d" 
                            label="Lieu de remassage *" 
                            prepend-icon="flight_takeoff"
                            :disabled="!Editable"></v-text-field>
                        </v-col>
                    </v-row>
                    <!------------ Date & Heur et lieu de retour----------------->
                    <v-row justify="center">
                        <v-col cols="12" sm="4">
                            <Date 
                                v-model="DV.date_retour" 
                                :Editable="Editable"
                                label="Date de retour" 
                                @date="dateRetour"
                            />
                        </v-col>
                            <v-col cols="12" sm="4">
                            <Heure  
                                :Editable="Editable"
                                v-model="DV.heure_retour" 
                                label="heure de retour" 
                                @heure ="heureRetour"
                            />
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field 
                            v-model="DV.lieu_ramassage_r"
                            label="Lieu de remassage *"
                            prepend-icon="flight_land"
                            :disabled="!Editable"></v-text-field>
                        </v-col>
                    </v-row>
                    <!------------ Naturede marchendise transportée----------------->
                    <v-row justify="center">
                        <v-col cols="12">
                            <v-text-field v-model="DV.nature_marchandise" 
                            label="Nature marchandise transportée" 
                            prepend-icon='commute'
                            :disabled="!Editable"></v-text-field>
                        </v-col>
                    </v-row>

                </v-card-text>
                </v-col>
                </v-row>
                <!------------ Affectation de vehicule & de chauffeur----------------->
                <v-row justify="center" v-if="($store.state.user.typeUtilisateur == 'Chef de parc' || DV.etat == 'Acceptee')">
                    <v-col cols="12" sm="5">
                        <v-select
                            v-model="Vehicule"
                            prepend-icon="person_add"
                            :items="vehicules"
                            :disabled="DV.etat == 'Acceptee'"
                            :item-text="item =>item.matricule+' '+item.nom"
                            label="Véhicule"
                            @change="GetMat"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="5">
                        <v-select
                            v-model="Chaffeur"
                            prepend-icon="person_add"
                            :items="chauffeurs"
                            :disabled="DV.etat == 'Acceptee'"
                            :item-text="item => item.chauffeur_id+' '+item.nom+' '+item.prenom"
                            label="Chaffeur"
                            @change="GetChauf"
                        ></v-select>
                    </v-col>
                </v-row> 
                <!------------ Observations ----------------->
                <v-row justify="center" v-if="($store.state.user.typeUtilisateur == 'Chef de parc' || DV.etat == 'Acceptee')"> 
                    <v-col cols="12" sm="10"> 
                        <v-textarea
                        v-model="DV.observation"
                        label="Observations" 
                        :disabled="DV.etat == 'Acceptee'"
                        prepend-icon="mdi-flag-outline"></v-textarea>
                    </v-col>   
                </v-row>
                <!------------ Motife de rejet----------------->
                <v-row justify="center" v-if="type =='Traiter' || DV.etat == 'Acceptee' || DV.etat == 'Rejetee'"> 
                    <v-col cols="12" sm="10"> 
                        <v-textarea
                        v-model="DV.motif"
                        label="Motif" 
                        prepend-icon="mdi-flag-outline"></v-textarea>
                    </v-col>   
                </v-row>
                <!------------ Buttons----------------->
                <v-row justify="center"> 
                    <v-btn v-if="type=='Traiter'" 
                        class="ma-1 red white--text"
                        @click="Reject"
                        :disabled="!valid">Rejeter la demande </v-btn>
                    
                    <v-btn v-if="type=='Traiter'" 
                        class="ma-1 green white--text"
                        @click="Accept">Accepter la demande </v-btn>

                    <v-btn v-if="Editable && type !='new'" class="ma-1 pink white--text" 
                        :disabled="!valid"
                        @click="update">
                        <v-icon left>send</v-icon>
                        <span  >Modifier la demande</span> 
                    </v-btn>
                    
                    <v-btn v-if="type=='new'" class="ma-1 pink white--text" 
                        :disabled="!valid"
                        @click="sendDemande">
                        <v-icon left>send</v-icon>
                        <span  >Envoyer la demande</span> 
                    </v-btn>
                </v-row>      
            </v-card> 
        </v-form>        
    </v-dialog>
     <v-snackbar
      v-model="Done"
      :timeout="5000"
      color="green"
      outlined
      class="mb-5"
    >
      {{ msg}}

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
import Autocomplete from '../custom/Autocomplete'
import Date from '../Date'
import Heure from '../Heure'
import axios from 'axios'
export default {
    name:"DemandeVehicule",
    props:[ 'value','name','color','icon' ,'forDemandeRelex', 'type','demande', 'Editable'] ,
    components:{Date , Heure ,Autocomplete},
    computed :{
        dialog : {
            get : function(){
                return this.value
            },
            set : function(value){
                this.$emit('input',value) 
            }
        },
        DV : function() {
            
          if((this.type=="update" || this.type=="Traiter") && this.dialog==true){    
            return this.demande
          }else{
            return this.DemandeVehicule
          }
        }
    },
    methods:{
        select : function(list){
            let totalItem = list.length;
            if(totalItem == this.maxSelected){
                this.$store.state.menuProps.disabled=true;
            }else if(totalItem > this.maxSelected) {
                this.DV.demandeurs.pop();
                this.menuProps.disabled=true;
            }else{
                this.$store.state.menuProps.disabled=false;
            }
        },
        //the popup actions
        async sendDemande (){
            this.$refs.form.validate();
            if(this.forDemandeRelex){
                await axios.post('http://localhost:3030/DemandeVehicule', {D: this.DV ,UT :this.$store.state.user.typeUtilisateur})
                    .then(
                        res =>{
                            this.valid=false,
                            this.msg = res.data.title,
                            this.Done = true,
                            this.$emit("sendDemande",res.data.demande_v_id);
                            this.$refs.form.reset(),
                            this.dialog=false;
                        },
                        err => {
                            this.Errr = true,
                            this.msg = err.response.data.title
                        }
                )
            }
            else
            {
                await axios.post('http://localhost:3030/DemandeVehicule', this.DV)
                .then(
                    res =>{
                        this.valid=false,
                        this.msg = res.data.title,
                        this.$refs.form.reset(),
                        this.Done = true,
                        this.dialog=false;
                    },
                    err => {
                        this.Errr = true,
                        this.msg = err.response.data.title
                    }
                )
            } 
        },
        update(){
            this.$refs.form.validate();
            axios.post('http://localhost:3030/UpdateDemandeVehicule', this.DV )
            .then(
                res =>{
                    this.msg = res.data.title,
                    this.$refs.form.reset(),
                    this.Done = true,
                    this.dialog = false
                    this.$emit('resetDemand')
                },
                err => {
                    this.Errr = true,
                    this.msg = err.response.data.title
                }
            )
        },
        closeDemande :function(){
            this.$emit("sendDemande",null);
            this.$refs.form.reset();
            this.dialog=false;
        },
        // the date & the hour actions which means getting its values 
        dateRetour : function(value){
            this.DV.date_retour=value
        },
        dateSortie : function(value){
            this.DV.date_depart=value
        },heureRetour : function(value){
            this.DV.heure_retour=value
        },heureSortie : function(value){
            this.DV.heure_depart=value
        },
        Reject(){
            this.$refs.form.validate();
            axios.put('http://localhost:3030/UpdateDemandState/'+this.DV.demande_V_ID, 
                {State :'Rejetee',
                    Demande: this.DV,
                    typeD: 'Demande véhicule', 
                    UT: this.$store.state.user.typeUtilisateur,
                    struct : this.$store.state.structure})
            this.dialog = false
            },
        Accept(){
            if (this.$store.state.user.typeUtilisateur == 'Chef departement') 
                axios.put('http://localhost:3030/UpdateDemandState/'+this.DV.demande_V_ID, 
                    {State :'Directeur', 
                    Demande: this.DV, 
                    typeD: 'Demande véhicule', 
                    UT: this.$store.state.user.typeUtilisateur})
            else if(this.$store.state.user.typeUtilisateur == 'Directeur') 
                axios.put('http://localhost:3030/UpdateDemandState/'+this.DV.demande_V_ID, 
                    {State :'Acceptee',  
                        Demande: this.DV, 
                        typeD: 'Demande véhicule',
                        UT: this.$store.state.user.typeUtilisateur})    
            else if(this.$store.state.user.typeUtilisateur == 'Chef de parc') 
                axios.put('http://localhost:3030/UpdateDemandState/'+this.DV.demande_V_ID, 
                    {State :'Acceptee',
                        Demande: this.DV, 
                        typeD: 'Demande véhicule', 
                        UT: this.$store.state.user.typeUtilisateur,
                        struct : this.$store.state.structure})
                        .then(this.update())    

            this.dialog = false
        },
        GetMat(){
            this.DV.matricule = this.Vehicule.split(' ')[0]
        },
        GetChauf(){
            this.DV.chauffeur_ID = this.Chaffeur.split(' ')[0]
        }
    },async created(){
        await this.$store.dispatch('getTeam')
        this.collegues = this.$store.state.users

        let Vehc =  await axios.get("http://localhost:3030/vehicules")
        this.vehicules = Vehc.data;

        let Chauf =  await axios.get("http://localhost:3030/chauffeurs")
        this.chauffeurs = Chauf.data;
    },
    beforeUpdate(){
        if (this.DV.matricule != '') {
            let index = this.vehicules.findIndex(x => x.matricule == this.DV.matricule)
            this.Vehicule = this.vehicules[index].matricule+' '+this.vehicules[index].nom;
        }    
        if (this.DV.chauffeur_ID != '') {
            let index = this.chauffeurs.findIndex(x => x.chauffeur_id == this.DV.chauffeur_ID)
            this.Chaffeur = this.chauffeurs[index].chauffeur_id+' '+this.chauffeurs[index].nom+' '+this.chauffeurs[index].prenom;
        }   
    },
    data(){
        return{
            
            demande_v_id : null,
            msg :'',
            Done: false,
            Errr: false,
            valid:false,
            collegues: [],
            vehicules: null,
            chauffeurs: null,
            Vehicule:'',
            Chaffeur:'',
            DemandeVehicule : {
                departement: this.$store.state.user.departement,
                structure: this.$store.state.user.structure,
                UserID: this.$store.state.user.email,
                lieu : null,
                organisme :null,
                motif_deplacement :null,
                date_depart : null,
                heure_depart :null,
                lieu_ramassage_d : null , // it using for the areoport
                date_retour : null,
                heure_retour : null,
                lieu_ramassage_r: null ,// // it using for the areoport
                nature_marchandise : null,
                utilisateur1_ID : null,
                utilisateur2_ID : null,
                utilisateur3_ID : null,
                motif: '',
                matricule: '',
                chauffeur_ID: '',
                observation: null,
            },           
        }
    }
}
</script>

<style>

</style>