<template>
<div>
    <v-dialog tile v-model="$store.state.dialogVehicule" width="900" persistent >
        <v-form v-model="valid" ref="form">
            <v-card >
                <v-toolbar flat dark color='deep-purple' class="my-0" >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">devices</v-icon> 
                        Demande Vehicule
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="closeDemande()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-row justify="center">
                <v-col cols="12" sm="10">
                <v-card-text>
                    <v-autocomplete
                        v-model="DV.demandeurs"
                        :items="collegues"
                        prepend-icon="group_add"
                        multiple
                        :counter="maxSelected"
                        :menu-props="menuProps"
                        hide-selected
                        filled
                        chips
                        color="blue-grey lighten-2"
                        label="Demandeurs"
                        item-text="email"
                        item-value="email"
                        outlined
                    >
                        <template v-slot:selection="data">
                            <v-chip 
                                v-model="data.attrs"
                                :input-value="data.selected"
                                close
                                @click:close="removeChip(data.item)"
                            >
                                {{data.item.nomUtilisateur+" "+data.item.prenomUtilisateur}}
                            </v-chip>
                        </template>
                        <template v-slot:item="data">
                             <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                            <v-list-item-content @click="select(data.item)">
                                <v-list-item-title>{{data.item.email}}</v-list-item-title>
                                <v-list-item-subtitle>{{data.item.nomUtilisateur+" "+data.item.prenomUtilisateur}}</v-list-item-subtitle>
                            </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
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
                        <v-col >
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <Date 
                                        v-model="DV.DateSortie" 
                                        :rules="[v => !!v || 'Cet champs est obligatoire']"
                                        label="Date de départ" 
                                        icon="date_range"
                                        @date ="dateSortie"
                                        />
                                </v-col>
                                 <v-col cols="12" sm="6">
                                    <Heure 
                                        v-model="DV.HeureSortie" 
                                        :rules="[v => !!v || 'Cet champs est obligatoire']"
                                        label="heure de départ" 
                                        icon="alarm"
                                        @heure = "heureSortie"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col >
                            <v-text-field v-model="DV.LieuRemassageSortie" label="Lieu de remassage *" prepend-icon="flight_takeoff"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <Date 
                                        v-model="DV.DateRetour" 
                                        label="Date de retour" 
                                        icon="date_range"
                                        @date="dateRetour"
                                    />
                                </v-col>
                                 <v-col cols="12" sm="6">
                                    <Heure  
                                        v-model="DV.HeureRetour" 
                                        label="heure de retour" 
                                        @heure ="heureRetour"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="DV.LieuRemassageRetour" 
                            label="Lieu de remassage *"
                             prepend-icon="flight_land"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="DV.NatureMarchandise" label="Nature marchandise" prepend-icon='shop'></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="DV.Transportee" label="Transportée" prepend-icon="commute"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                </v-col>
                </v-row>
                <v-row justify="center">
                    <v-btn :disabled="!valid" large class="deep-purple white--text ma-1" @click="sendDemande()" >
                        <v-icon left>send</v-icon>
                        Envoyer demande
                    </v-btn>
                    <v-btn large class='ma-1 grey white--text' @click="closeDemande()" >
                        <v-icon left>close</v-icon>
                        Annuler demande
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
import Date from '../Date'
import Heure from '../Heure'
import axios from 'axios'
export default {
    name:"DemandeVehicule",
    props:['name','color','icon'] ,
    components:{Date , Heure},
    computed :{
        dialog : {
            get : function(){
                return this.dialogVehicule
            },
            set : function(a){
                this.dialogVehicule=a
            }
        }
    },
    methods:{
        select : function(){
            let totalItem = this.DV.demandeurs.length;
            console.log("total items "+totalItem);
            if(totalItem==this.maxSelected-1){
                console.log("check it");
                this.menuProps.disabled=true;
            }
        },
        //list of demandeurs actions
        remove : function(item){
            this.DV.demandeurs.splice(this.DV.demandeurs.indexOf(item),1)
            this.DV.demandeurs=[...this.DV.demandeurs];
           
        },
        removeChip : function (item) {
            this.menuProps.disabled=false;
            const index = this.DV.demandeurs.indexOf(item.email)
            if (index >= 0) this.DV.demandeurs.splice(index, 1)
        },
        //the popup actions
        sendDemande : function(){
            this.$refs.form.validate();
            if(this.DV.demandeurs.length==3){
                this.DV.utilisateur1=this.DV.demandeurs[0];
                this.DV.utilisateur2=this.DV.demandeurs[1];
                this.DV.utilisateur3=this.DV.demandeurs[2];
            }else if(this.DV.demandeurs.length==2){
                this.DV.utilisateur1=this.DV.demandeurs[0];
                this.DV.utilisateur2=this.DV.demandeurs[1];
            }else if(this.DV.demandeurs.length==1){
                this.DV.utilisateur1=this.DV.demandeurs[0];
            }
            axios.post('http://localhost:3030/DemandeVehicule', this.DV)
              .then(
                res =>{
                    this.msg = res.data.title,
                    this.$refs.form.reset(),
                    this.Done = true,
                    this.$store.commit('updateDialogVehicule')
                },
                err => {
                    this.Errr = true,
                    this.msg = err.response.data.title
                }
            ) 
            //this.$parent.$emit('recieveDemande', this.DV);
        },
        closeDemande :function(){
            //to implement
            //var value = {name : this.name , dialog : !this.dialog}
            this.$store.commit('updateDialogVehicule');
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
            msg :'',
            Done: false,
            Errr: false,
            valid:false,
            maxSelected: 3,
            collegues: [],
            menuProps: {
                disabled: false
            },
            DV : {
                demandeurs : [],
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
                Transportee : null,
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