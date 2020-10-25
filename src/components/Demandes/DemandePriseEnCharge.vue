<template>

    <div>
        <v-dialog :retain-focus="false"  v-model="dialog" persistent width="900">
            <v-card tile >
                <v-toolbar flat dark color='indigo'  >
                    <v-toolbar-title > 
                        <v-icon large left class="white--text">flight</v-icon> 
                        <span v-if="$store.state.ActionType == 'update'">Modification de votre demande PEC N° {{DPEC.demande_P_ID}}</span>
                        <span v-else>Demande Prise en charge</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <v-row justify="center">
                            <v-col cols="10">
                                <v-autocomplete
                                    v-model="DPEC.Collegues"
                                    :items="Users"
                                    item-text="email"
                                    counter=5
                                    multiple
                                    prepend-icon="mdi-account-group"
                                    :rules="AutoCRules"
                                ><template slot="selection" scope="data">
                                    {{ data.item.nomUtilisateur }} {{data.item.prenomUtilisateur}} ({{data.item.fonction}}) -
                                </template></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="10"> 
                                    <v-text-field 
                                    v-model="DPEC.destination" 
                                    label="Destination*" 
                                    prepend-icon="location_on" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"></v-text-field>
                            </v-col>      
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="10"> 
                                    <v-text-field 
                                    v-model="DPEC.objet_mission" 
                                    label="Objet*" 
                                    prepend-icon="location_on" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"></v-text-field>
                            </v-col> 
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="8" sm="4"> 
                                <Date 
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
                                label="Date de retour" 
                                @date ="(date) => DPEC.EndDate = date"
                                />
                            </v-col> 
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="10">   
                                <v-text-field 
                                    v-model="DPEC.moyen_transport" 
                                    label="Moyen de transport*" 
                                    prepend-icon="mdi-taxi" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="10" sm="6">
                                <v-text-field
                                prepend-icon="mdi-airport"
                                v-model="DPEC.aeroport"
                                label='Aéroport'
                                ></v-text-field>
                            </v-col>
                            <v-col cols="10" sm="4">
                                <Heure
                                v-model="DPEC.heureDeVol"
                                label="Heure de Vol"
                                @heure="(value) => DPEC.heureDeVol = value"/>
                            </v-col>
                        </v-row>
                        <v-row justify="center"> 
                            <v-col cols="9" sm="4">
                                <v-btn  
                                    v-if="$store.state.ActionType=='update'"
                                    @click="update" 
                                    :disabled="!valid" 
                                    class="indigo white--text "
                                ><v-icon left>send</v-icon>Modifier la demande</v-btn>
                                <v-btn  
                                    v-else
                                    @click="submit" 
                                    :disabled="!valid" 
                                    class="indigo white--text "
                                ><v-icon left>send</v-icon>Envoyer la demande</v-btn>
                            </v-col>    
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
    props : ['demande' , 'value'],
    computed:{
        dialog : {
            get : function(){
                return this.value
            },set : function(value){
                this.$emit('input' , value)
            }
      },
        DPEC : function() {
          if(this.$store.state.ActionType=="update" && this.dialog==true){
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
                demande_P_ID:  '',
                Collegues: [],
                destination: '',
                objet_mission: '',
                startDate: '',
                EndDate: '',
                moyen_transport: '',
                heureDeVol: '',
                aeroport: '',
            }, 
            Users: [],
            AutoCRules: [
                v => v.length !=  0 || 'Cet champs est obligatoire',
                v => v.length <  6 || 'Trop de membre choisé'
            ]
        }
    },
    components: {Date, Heure},
    methods: {
        close(){
            
            this.$refs.form.reset(),
            this.dialog = false;     
        },
        submit(){
            this.$refs.form.validate();
            Axios.post('http://localhost:3030/DemandePriseEnCharge', this.DPEC)
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
            Axios.post('http://localhost:3030/UpdateDemandePriseEnCharge', this.DPEC)
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
        }
    },
    
}
</script>

