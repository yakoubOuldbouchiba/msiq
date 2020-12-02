<template>
    <div>
        <v-dialog :retain-focus="false"  v-model="dialog" persistent width="900">
            <v-card tile >
                <v-toolbar flat dark color='indigo'  >
                    <v-toolbar-title > 
                        <v-icon large left class="white--text">flight</v-icon> 
                        <span v-if="type == 'update'">Modification de votre demande PEC N° {{DPEC.demande_P_ID}}</span>
                        <span v-else>Demande Prise en charge</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid" ref="form">

                        <v-row justify="center" v-if="type === 'Traiter'"> 
                                <v-col cols="12" sm="5"> 
                                    <v-text-field 
                                    :value="DPEC.nomUtilisateur+' '+DPEC.prenomUtilisateur"
                                    disabled
                                    label="Nom et prenom"
                                    prepend-icon="mdi-account" 
                                    ></v-text-field>
                                </v-col>  
                                <v-col cols="12" sm="5"> 
                                    <v-text-field  
                                    :value="DPEC.departement"
                                    disabled
                                    label="Departement"
                                    prepend-icon="mdi-office-building"
                                    ></v-text-field>
                                </v-col>  
                        </v-row>
                        <!----------- Collegues -------->
                        <v-row justify="center">
                            <v-col cols="10">
                                <v-autocomplete
                                    v-model="DPEC.Collegues"
                                    :items="Users"
                                    item-text="email"
                                    :disabled="!Editable"
                                    counter=5
                                    multiple
                                    prepend-icon="mdi-account-group"
                                    :rules="AutoCRules"
                                ><template slot="selection" scope="data">
                                    {{ data.item.nomUtilisateur }} {{data.item.prenomUtilisateur}} ({{data.item.fonction}}) -
                                </template></v-autocomplete>
                            </v-col>
                        </v-row>
                        <!----------- Destination -------->
                        <v-row justify="center">
                            <v-col cols="10"> 
                                <v-text-field 
                                v-model="DPEC.destination" 
                                :disabled="!Editable"
                                label="Destination*" 
                                prepend-icon="location_on" 
                                :rules="[v => !!v || 'Cet champs est obligatoire']"></v-text-field>
                            </v-col>      
                        </v-row>
                        <!----------- Objet de mission -------->
                        <v-row justify="center">
                            <v-col cols="10"> 
                                    <v-text-field 
                                    v-model="DPEC.objet_mission" 
                                    :disabled="!Editable"
                                    label="Objet*" 
                                    prepend-icon="mdi-target" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"></v-text-field>
                            </v-col> 
                        </v-row>
                        <!----------- Date de debut et de fin de mission -------->
                        <v-row justify="center">
                            <v-col cols="8" sm="4"> 
                                <Date 
                                :Editable="Editable"
                                v-model="DPEC.startDate"
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                                label="Date de départ" 
                                @date ="(date) => DPEC.startDate = date"
                                />
                            </v-col> 
                            <v-col cols="5" sm="2" class="pt-8 pl-10 headline">
                                <span > Au</span>
                            </v-col>
                            <v-col cols="8" sm="4"> 
                                <Date 
                                v-model="DPEC.EndDate" 
                                :Editable="Editable"
                                label="Date de retour" 
                                @date ="(date) => DPEC.EndDate = date"
                                />
                            </v-col> 
                        </v-row>
                        <!----------- Moyend de transport -------->
                        <v-row justify="center">
                            <v-col cols="10">   
                                <v-text-field 
                                    v-model="DPEC.moyen_transport" 
                                    :disabled="!Editable"
                                    label="Moyen de transport*" 
                                    prepend-icon="mdi-taxi" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <!----------- Aerp port and heur de vol -------->
                        <v-row justify="center">
                            <v-col cols="10" sm="6">
                                <v-text-field
                                prepend-icon="mdi-airport"
                                :disabled="!Editable"
                                v-model="DPEC.aeroport"
                                label='Aéroport'
                                ></v-text-field>
                            </v-col>
                            <v-col cols="10" sm="4">
                                <Heure
                                v-model="DPEC.heureDeVol"
                                :Editable="Editable"
                                label="Heure de Vol"
                                @heure="(value) => DPEC.heureDeVol = value"/>
                            </v-col>
                        </v-row>
                        <!----------- Motif de rejet -------->
                        <v-row justify="center" v-if="type =='Traiter' && $store.state.user.typeUtilisateur != 'Responsable PEC'"> 
                            <v-col cols="12" sm="10"> 
                                <v-textarea
                                v-model="DPEC.motif"
                                label="Motif" 
                                prepend-icon="mdi-flag-outline" 
                                :rules="[v => !!v || 'Ce champs est obligatoire']"></v-textarea>
                            </v-col>   
                        </v-row>
                        <!----------- Buttons -------->
                        <v-row justify="center"> 
                            <v-btn v-if="type=='Traiter' &&($store.state.user.typeUtilisateur != 'Responsable PEC')" 
                            class="ma-1 red white--text"
                            @click="Reject"
                            :disabled="!DPEC.motif">Rejeter la demande </v-btn>

                            <v-btn v-if="type=='Traiter' &&($store.state.user.typeUtilisateur != 'Responsable PEC')" 
                                class="ma-1 green white--text"
                                :disabled="!!DPEC.motif && DPEC.motif !=''"
                                @click="Accept">Accepter la demande </v-btn>

                            <v-btn v-if="Editable && type!='new'" class="ma-1 pink white--text" 
                                :disabled="!valid"
                                @click="update">
                                <v-icon left>send</v-icon>
                                <span  >Modifier la demande</span> 
                            </v-btn>
                            <v-btn v-if="type=='new'" class="ma-1 pink white--text" 
                                :disabled="!valid"
                                @click="submit">
                                <v-icon left>send</v-icon>
                                <span>Envoyer la demande</span> 
                            </v-btn>
                        </v-row> 
                    </v-form>
                </v-card-text>
            </v-card>  
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
import Date from "./../Date";
import Heure from "./../Heure";
import Axios from "axios";
export default {
    name: 'DemandePriseEnCharge',
    props : ['demande' , 'value', 'type', 'Editable'],
    computed:{
        dialog : {
            get : function(){
                return this.value
            },set : function(value){
                this.$emit('input' , value)
            }
      },
        DPEC : function() {
          if((this.type=="update" || this.type=="Traiter") && this.dialog==true){
           return this.demande
          }else{
            return this.DemandePriseEnCharge
          }
        }
    },
    async created(){
        await this.$store.dispatch('getTeam')
        this.Users = this.$store.state.users
    },
    data(){
        return {
            msg: '',
            Done: false,
            Errr: false,
            valid: false,
            DemandePriseEnCharge: {
                departement: this.$store.state.user.departement,
                structure: this.$store.state.user.structure,
                UserID: this.$store.state.user.email,
                demande_P_ID:  '',
                struct : this.$store.state.user.structure,
                Collegues: [],
                destination: '',
                objet_mission: '',
                startDate: '',
                EndDate: '',
                moyen_transport: '',
                heureDeVol: '',
                aeroport: '',
                motif: '',
            }, 
            Users: [],
            AutoCRules: [
                v => v.length <  6 || 'Trop de membre choisé'
            ]
        }
    },
    components: {Date, Heure},
    methods: {
        close(){
            this.$refs.form.reset(),
            this.dialog = false    
        },
        submit(){
            this.$refs.form.validate();
            Axios.post('/api/DemandePriseEnCharge', {D: this.DPEC ,UT :this.$store.state.user.typeUtilisateur})
            .then(
            res =>{
                this.msg = res.data.title,
                this.$refs.form.reset(),
                this.Done = true,
                this.dialog = false
            },
            err => {
                this.Errr = true,
                this.msg = err.response.data.title
            }
            )
        },
        update(){
            this.$refs.form.validate();
            Axios.post('/api/UpdateDemandePriseEnCharge', this.DPEC)
            .then(
            res =>{
                this.msg = res.data.title,
                this.$refs.form.reset(),
                this.Done = true,
                this.dialog = false 
            },
            err => {
                this.Errr = true,
                this.msg = err.response.data.title
            }
            )
        },
        Reject(){
            this.$refs.form.validate();
            Axios.put('/api/UpdateDemandState/'+this.DPEC.demande_P_ID, 
                {State :'Rejetee', 
                    Demande: this.DPEC, 
                    typeD: 'Demande de prise en charge', 
                    UT: this.$store.state.user.typeUtilisateur,
                    struct : this.$store.state.structure})
            this.dialog = false
            },
        Accept(){
            if (this.$store.state.user.typeUtilisateur == 'Chef departement') 
                Axios.put('/api/UpdateDemandState/'+this.DPEC.demande_P_ID, 
                    {State :'Directeur', 
                    Demande: this.DPEC, 
                    typeD: 'Demande de prise en charge', 
                    UT: this.$store.state.user.typeUtilisateur})
            else if(this.$store.state.user.typeUtilisateur == 'Directeur') 
                Axios.put('/api/UpdateDemandState/'+this.DPEC.demande_P_ID,   
                    {State :'Acceptee',
                    Demande: this.DPEC, 
                    typeD: 'Demande de prise en charge', 
                    UT: this.$store.state.user.typeUtilisateur,
                    struct : this.$store.state.structure})    
            
            this.dialog = false
        }
    },
    
}
</script>

