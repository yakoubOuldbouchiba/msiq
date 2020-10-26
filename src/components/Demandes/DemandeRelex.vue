<template>
<div>
    <v-dialog :retain-focus="false"  tile v-model="dialog" width="700" persistent>
            <v-card >
                <v-toolbar flat dark :color='color'  >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">{{icon}}</v-icon> 
                        {{name}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <v-row justify="center" v-if="type == 'Triater'"> 
                                <v-col cols="12" sm="6"> 
                                    <v-text-field 
                                    :value="DR.nomUtilisateur+' '+DR.prenomUtilisateur"
                                    disabled
                                    label="Nom et prenom"
                                    prepend-icon="mdi-account" 
                                    ></v-text-field>
                                </v-col>  
                                <v-col cols="12" sm="6"> 
                                    <v-text-field  
                                    :value="DR.departement"
                                    disabled
                                    label="Departement"
                                    prepend-icon="mdi-office-building"
                                    ></v-text-field>
                                </v-col>  
                            </v-row>
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-text-field
                                    v-model="DR.destination"
                                    label="Destination"
                                    :disabled="type =='Triater'"
                                    prepend-icon="location_on"
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                                v-model="DR.objet_mission"
                                label="Objet mission"
                                :disabled="type =='Triater'"
                                prepend-icon="business_center"
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                            >
                            </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12" sm="6">
                                <Date 
                                    v-model="DR.date_depart"
                                    label="Date de départ"
                                    @date ="dateSortie"
                                />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <Heure 
                                    v-model="DR.heure_depart"
                                    label="Heure souhaitée de départ"
                                    @heure = "heureSortie"
                                />
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12" sm="6">
                                <Date 
                                    v-model="DR.date_retour"
                                    label="Date de retour"
                                    @date="dateRetour"
                                />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <Heure 
                                    v-model="DR.heure_retour"
                                    label="Heure souhaitée de retour"
                                    @heure ="heureRetour"
                                />
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12">
                                 <v-checkbox 
                                    v-model="DR.moyens_transport"
                                    :value="!DR.moyens_transport" 
                                    label="Moyens de transport"
                                    :disabled="disabled || type =='Triater'"
                                    @click=" openDemandeVehicule"
                                    >
                                </v-checkbox>
                                <b class="red--text" v-if="DeleteDV">Votre demande véhicule</b>
                                <div v-if="DR.demande_V_ID!=null">
                                    <b class="green--text" v-show="disabled">Le demande véhicule est bien crée</b>
                                    <v-btn
                                        class="mx-2"
                                        outlined
                                        color="indigo"
                                        fab
                                        dark
                                        x-small
                                        @click='deleteDV()'
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
                                        @click="updateDV()"
                                    >
                                        <v-icon dark>
                                            edit
                                        </v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <h3>Vous voulez prise en charge par la structure de destination ?</h3>
                                <v-radio-group
                                    :disabled="type =='Triater'"
                                    v-model="DR.prise_en_charge"
                                    row
                                    :rules="[v => v!=null || 'Cet champs est obligatoire']"
                                    >
                                    <v-radio
                                        label="non"
                                        :value="false"
                                    ></v-radio>
                                    <v-radio
                                        label="oui"
                                        :value="true"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-if="type =='Triater'"> 
                            <v-col cols="12" sm="12"> 
                                <v-textarea
                                v-model="DR.motif"
                                label="Motif" 
                                prepend-icon="mdi-flag-outline"></v-textarea>
                            </v-col>   
                        </v-row>
                        <v-row justify="center"> 
                            <v-btn v-if="type=='Triater'" 
                            class="ma-1 red white--text"
                            @click="Reject"
                            :disabled="!valid">Rejeter la demande </v-btn>
                            <v-btn v-if="type=='update'" class="ma-1 pink white--text" 
                                :disabled="!valid"
                                @click="update">
                                <v-icon left>send</v-icon>
                                <span  >Modifier la demande</span> 
                            </v-btn>
                            <v-btn v-else-if="type=='Triater'" 
                                class="ma-1 green white--text"
                                @click="Accept">Accepter la demande </v-btn>
                            <v-btn v-else class="ma-1 pink white--text" 
                                :disabled="!valid"
                                @click="submit">
                                <v-icon left>send</v-icon>
                                <span  >Envoyer la demande</span> 
                            </v-btn>
                        </v-row>> 
                    </v-form>
                </v-card-text>
            </v-card>  
    </v-dialog>
     <DemandeVehicule 
        forDemandeRelex=true
        :demande="DV_Computed"
        :type="type_demande_v"
        @sendDemande="getDemande" 
        v-model="open_dialog" 
    />
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
import axios from 'axios'
import Date from '../Date'
import Heure from '../Heure'
import DemandeVehicule from '../Demandes/DemandeVehicule'
export default {
    name:"Relex",
    components:{Date,Heure,DemandeVehicule},
    props:[ 'value','dialogRelex','name','icon','color' , 'type' , 'demande'] ,
    computed :{
        dialog : {
            get : function(){
                return this.value
            },set : function(value){
                this.$emit('input' , value)
            }
        },
        DR : function() {
          if((this.type=="update" || this.type=="Triater") && this.dialog==true){
            return this.demande
          }else{
            return this.DemandeRelex
          }
        },
        disabled : function() {
            if(this.DR.demande_V_ID !==null){
                return true;
            }else{
                return false;
            }
        },
        type_demande_v () {
            if(this.type_demande!=null){
                return "update"
            }else{
                return null
            }
        },
        DV_Computed(){
            return this.DV
        } 
    },
    methods : {
        openDemandeVehicule(){
            this.open_dialog=true
        },
        async updateDV(){
              this.type_demande = "update";
              await axios.get('http://localhost:3030/DemandeVehicule/'+this.DR.demande_V_ID)
                .then(
                        res =>{
                            let demande = res.data.demande; 
                            let dp = demande.date_depart;
                            let dr = demande.date_retour;
                            demande.date_depart = dp.substr(0,10)
                            demande.date_retour = dr.substr(0,10)
                            demande.heure_depart = dp.substr(11,8)
                            demande.heure_retour = dr.substr(11,8)
                            this.DV = demande
                            this.open_dialog=true;     
                        },
                        err => {
                            this.Errr = true,
                            this.msg = err.response.data.title
                        }
                )
            
        },
        async deleteDV(){
            await axios.delete('http://localhost:3030/DemandeVehicule/'+this.DR.demande_V_ID)
            .then(
                    res =>{
                        this.msg = res.data.title,
                        this.DR.demande_V_ID=null
                        this.DR.moyens_transport=false
                        this.DeleteDV = true
                    },
                    err => {
                        this.Errr = true,
                        this.msg = err.response.data.title
                    }
            )
    },
    async getDemande(e){
        this.DR.demande_V_ID = await e;
        if(this.DR.demande_V_ID ===null){
            this.DR.moyens_transport=!this.DR.moyens_transport
        }

    },
    update(){
        this.$refs.form.validate();
        axios.post('http://localhost:3030/UpdateDemandeRelex', this.DR)
        .then(
        res =>{
            this.msg = res.data.title,
            this.$refs.form.reset(),
            this.Done = true,
            this.dialog = false,
            this.DeleteDV = false
            this.$emit('resetDemand')
        },
        err => {
            this.Errr = true,
            this.msg = err.response.data.title
        })
    },
    async submit(){
        await axios.post('http://localhost:3030/DemandeRelex', this.DR )
        .then(
                res =>{
                    this.msg = res.data.title,
                    this.$refs.form.reset(),
                    this.Done = true,
                    this.dialog = false
                    this.DeleteDV = false
                    this.DemandeRelex.demande_v_id=null
    
                },
                err => {
                    this.Errr = true,
                    this.msg = err.response.data.title
                }
            )
    },
    async close (){
        this.$emit('resetDemand')
        this.$refs.form.reset(),
        this.dialog=false
    },
    // the date & the hour actions which means getting its values 
    dateRetour : function(value){
        this.DR.date_retour=value
    },
    dateSortie : function(value){
        this.DR.date_depart=value
    },heureRetour : function(value){
        this.DR.heure_retour=value
    },heureSortie : function(value){
        this.DR.heure_depart=value
    },Reject(){
      this.$refs.form.validate();
      axios.put('http://localhost:3030/UpdateDemandState/'+this.DR.demande_R_ID, 
        {State :'Rejetee',
            Demande: this.DR, typeD: 'Demande relex', 
            UT: this.$store.state.user.typeUtilisateur})
      this.dialog = false
    },
    Accept(){
      if (this.$store.state.user.typeUtilisateur == 'Chef departement') 
        axios.put('http://localhost:3030/UpdateDemandState/'+this.DR.demande_R_ID, 
            {State :'Directeur',
                Demande: this.DR, typeD: 'Demande relex', 
                UT: this.$store.state.user.typeUtilisateur})
      else if(this.$store.state.user.typeUtilisateur == 'Directeur') 
        axios.put('http://localhost:3030/UpdateDemandState/'+this.DR.demande_R_ID, 
            {State :'Acceptee',
            Demande: this.DR, typeD: 'Demande relex',
            UT: this.$store.state.user.typeUtilisateur})    
        this.dialog = false
    },

},
data(){
    return{
        valid:false,
        msg :'',
        DeleteDV:false,
        Done: false,
        Errr: false,
        type_demande : null,
        DV:null,
        open_dialog : false,
        DemandeRelex:{
            userID : this.$store.state.user.email,
            destination : null,
            objet_mission : null,
            date_depart : null,
            heure_depart : null,
            date_retour : null,
            heure_retour : null,
            moyens_transport : false ,
            prise_en_charge : null,
            demande_V_ID : null,
            motif: '',
        },    
    }
}
}
</script>

<style>

</style>