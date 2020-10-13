<template>
<div>
    <v-dialog tile v-model="$store.state.dialogRelex" width="700" persistent>
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
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-text-field
                                    v-model="DemandeRelex.destination"
                                    label="Destination"
                                    prepend-icon="location_on"
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                                v-model="DemandeRelex.objet_mission"
                                label="Objet mission"
                                prepend-icon="business_center"
                                :rules="[v => !!v || 'Cet champs est obligatoire']"
                            >
                            </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12" sm="6">
                                <Date 
                                    v-model="DemandeRelex.date_depart"
                                    label="Date de départ"
                                    @date ="dateSortie"
                                />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <Heure 
                                    v-model="DemandeRelex.heure_depart"
                                    label="Heure souhaitée de départ"
                                    @heure = "heureSortie"
                                />
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12" sm="6">
                                <Date 
                                    v-model="DemandeRelex.date_retour"
                                    label="Date de retour"
                                    @date="dateRetour"
                                />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <Heure 
                                    v-model="DemandeRelex.heure_retour"
                                    label="Heure souhaitée de retour"
                                    @heure ="heureRetour"
                                />
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12">
                                 <v-checkbox 
                                    v-model="DemandeRelex.moyens_transport" 
                                    :value="!DemandeRelex.moyens_transport" 
                                    label="Moyens de transport"
                                    >
                                    <DemandeVehicule />
                                </v-checkbox>
                            </v-col>
                            <v-col cols="12">
                                <h3>Vous voulez prise en charge par la structure de destination ?</h3>
                                <v-radio-group
                                    v-model="DemandeRelex.is_prise_encharge"
                                    row
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                    >
                                    <v-radio
                                        label="oui"
                                        value="true"
                                    ></v-radio>
                                    <v-radio
                                        label="non"
                                        value="false"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="center"> 
                            <v-btn class="ma-1  white--text" 
                                :color="color"
                                :disabled="!valid"
                                @click="submit">
                                <v-icon left>send</v-icon>
                                <span  >Envoyer la demande</span> 
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>  
    </v-dialog>
</div>
</template>

<script>
import Date from '../Date'
import Heure from '../Heure'
import DemandeVehicule from '../Demandes/DemandeVehicule'
export default {
    name:"Relex",
    components:{Date,Heure,DemandeVehicule},
    props:['dialogRelex','name','icon','color'] ,
    methods : {
        submit(){
            if(this.DemandeRelex.moyens_transport){
                this.$store.commit('updateDialogVehicule');
            }
        },
        close : function(){
            this.$refs.form.reset();
            this.$store.commit('updateDialogRelex');
        },
        // the date & the hour actions which means getting its values 
        dateRetour : function(value){
            this.DemandeRelex.date_retour=value
        },
        dateSortie : function(value){
            this.DemandeRelex.date_depart=value
        },heureRetour : function(value){
            this.DemandeRelex.heure_retour=value
        },heureSortie : function(value){
            this.DemandeRelex.heure_depart=value
        }

    },
    data(){
        return{
            valid:false,
            DemandeRelex:{
                destination : null,
                objet_mission : null,
                date_depart : null,
                heure_depart : null,
                date_retour : null,
                heure_retour : null,
                moyens_transport : false ,
                is_prise_encharge : null
            }
        }
    }
}
</script>

<style>

</style>