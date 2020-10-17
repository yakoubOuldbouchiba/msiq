<template>
<div>
    <v-dialog tile :retain-focus="false" v-model="dialog" width="800" persistent >
        <v-form v-model="valid" ref="form">
            <v-card >
                <v-toolbar flat dark color='deep-purple' class="my-0" >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">commute</v-icon> 
                         Demande véhicule
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="closeDemande()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-row justify="center">
                <v-col cols="12" sm="10">
                <v-card-text>
                    <v-row justify="center">
                        <v-col>
                            <Autocomplete :utilisateur.sync="DV.utilisateur1" :items="collegues" label="2 emme Client"/>
                        </v-col>
                        <v-col>
                            <Autocomplete :utilisateur.sync="DV.utilisateur2" :items="collegues" label="3 emme Client"/>
                        </v-col>
                        <v-col>
                            <Autocomplete :utilisateur.sync="DV.utilisateur3" :items="collegues" label="4 emme Client"/>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col>
                            <v-text-field 
                            v-model="DV.Lieu" 
                            label="Lieu" 
                            prepend-icon="location_on"
                            :rules="[v => !!v || 'Cet champs est obligatoire']"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field 
                            v-model="DV.Organisme" 
                            label="Organisme" 
                            prepend-icon="domain"
                            :rules="[v => !!v || 'Cet champs est obligatoire']"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col>
                            <v-textarea
                                label="motif de deplacement"
                                v-model="DV.motif_deplacement"
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                                prepend-icon="list"
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" sm="4">
                            <Date 
                                v-model="DV.DateSortie" 
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                                label="Date de départ" 
                                @date ="dateSortie"
                                />
                        </v-col>
                            <v-col cols="12" sm="4">
                            <Heure 
                                v-model="DV.HeureSortie" 
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                                label="Heure de départ" 
                                @heure = "heureSortie"
                            />
                        </v-col>
                        <v-col cols="12" sm="4" >
                            <v-text-field v-model="DV.LieuRemassageSortie" label="Lieu de remassage *" prepend-icon="flight_takeoff"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" sm="4">
                            <Date 
                                v-model="DV.DateRetour" 
                                label="Date de retour" 
                                @date="dateRetour"
                            />
                        </v-col>
                            <v-col cols="12" sm="4">
                            <Heure  
                                v-model="DV.HeureRetour" 
                                label="heure de retour" 
                                @heure ="heureRetour"
                            />
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field v-model="DV.LieuRemassageRetour" 
                            label="Lieu de remassage *"
                            prepend-icon="flight_land"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12">
                            <v-text-field v-model="DV.NatureMarchandise" label="Nature marchandise transportée" prepend-icon='commute'></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                </v-col>
                </v-row>
                <v-row justify="center">
                    <v-btn v-if="type=='update'" :disabled="!valid" large class="deep-purple white--text ma-1" @click="update()" >
                        <v-icon left>send</v-icon>
                        Modifier demande
                    </v-btn>
                    <v-btn v-else :disabled="!valid" large class="deep-purple white--text ma-1" @click="sendDemande()" >
                        <v-icon left>send</v-icon>
                        Envoyer demande
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
    props:[ 'value','name','color','icon' ,'forDemandeRelex', 'type','demandeID' ] ,
    components:{Date , Heure ,Autocomplete},
    computed :{
        dialog : {
            get : function(){
                return this.value
            },
            set : function(value){
                this.$emit('input',value) 
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
                await axios.post('http://localhost:3030/DemandeVehicule', this.DV)
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
            console.log(this.demandeID);
            this.dialog=false;
        },
        closeDemande :function(){
            this.$emit("sendDemande",null);
            this.$refs.form.reset();
            this.dialog=false;
        },
        // the date & the hour actions which means getting its values 
        dateRetour : function(value){
            this.DV.DateRetour=value
        },
        dateSortie : function(value){
            this.DV.DateSortie=value
        },heureRetour : function(value){
            this.DV.HeureRetour=value
        },heureSortie : function(value){
            this.DV.HeureSortie=value
        }
    },async created(){
        this.collegues = (await  axios.get("http://localhost:3030/team")).data
    }
    ,
    data(){
        return{
            
            demande_v_id : null,
            msg :'',
            Done: false,
            Errr: false,
            valid:false,
            collegues: [],
            DV : {
                UserID: this.$store.state.user.email,
                Lieu : null,
                Organisme :null,
                motif_deplacement :null,
                DateSortie : null,
                HeureSortie :null,
                LieuRemassageSortie : null , // it using for the areoport
                DateRetour : null,
                HeureRetour : null,
                LieuRemassageRetour : null ,// // it using for the areoport
                NatureMarchandise : null,
                utilisateur1 : null,
                utilisateur2 : null,
                utilisateur3 : null
            }
        }
    }
}
</script>

<style>

</style>