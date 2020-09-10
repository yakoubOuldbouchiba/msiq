<template>
<div>
    <v-dialog v-model="dialog"  width="700">
        <template v-slot:activator="{on , attrs}">
            <v-btn 
                v-bind="attrs"
                v-on="on"
                xs1 text 
            >
                <span class="blue--text">nouveau demande</span>
                <v-icon small class="blue--text" right>
                      note_add
                </v-icon>
            </v-btn>
        </template>
        <v-card >
            <v-card-title class="blue--text">
                <v-icon large left class="blue--text">
                      note_add
                </v-icon>
                <span>Nouveau demande</span>
            </v-card-title>
            <v-container>
                <v-row class="mx-2">
                    <v-flex xs12 sm6  v-for="demande in demandes" :key="demande.name">
                          <v-card 
                         @click="lancerDialog(demande.name)"
                        :class="`mx-2 my-2 pa-2 ${demande.color} lighten-2`"
                        >
                        <v-card-text>
                            <v-icon large left class="white--text">{{demande.icon}}</v-icon>
                            <span class="white--text">{{demande.name}}</span>
                        </v-card-text>
                    </v-card>
                            </v-flex>
                        </v-row>
                    </v-container>
                </v-card>
    </v-dialog> 
    <Client :dialogClient='dialogClient' 
            :name='demandes[0].name'
            :color='demandes[0].color'
            :icon='demandes[0].icon'
             @updateDialog="updateDialog" />

    <Fourniture :dialogFourniture='dialogFourniture'
            :name='demandes[1].name'
            :color='demandes[1].color'
            :icon='demandes[1].icon' 
            @updateDialog="updateDialog"  />

    <Tirage :dialogTirage='dialogTirage'
            :name='demandes[3].name'
            :color='demandes[3].color'
            :icon='demandes[3].icon' @updateDialog="updateDialog"/>

    <Vehicule :dialogVehicule='dialogVehicule'
            :name='demandes[2].name'
            :color='demandes[2].color'
            :icon='demandes[2].icon' @updateDialog="updateDialog"/>

    <Relex :dialogRelex='dialogRelex' 
            :name='demandes[5].name'
            :color='demandes[5].color'
            :icon='demandes[5].icon' @updateDialog="updateDialog"/>

    <PEC :dialogPEC='dialogPEC' 
            :name='demandes[4].name'
            :color='demandes[4].color'
            :icon='demandes[4].icon' @updateDialog="updateDialog"/>
</div>
</template>

<script>
import Client from './Client'
import Fourniture from './Fourniture'
import Tirage from './tirage'
import Vehicule from './Vehicule'
import Relex from './Relex'
import PEC from './PriseEnCharge'
export default {
    name:'Pupupdemandes',
    components:{Client , Fourniture , Tirage , Vehicule , Relex , PEC},
    data(){
        return{
            dialog:false ,
            dialogClient:false,
            dialogFourniture : false,
            dialogTirage :false,
            dialogVehicule :false,
            dialogRelex:false,
            dialogPEC:false,
            demandes :[
                {name:'demande de client',icon:'devices',color:'pink'},
                {name:'demande de fourniture',icon:'edit',color:'red'},
                {name:'demande de véhicule',icon:'commute',color:'deep-purple'},
                {name:'demande tirage',icon:'print',color:'purple'},
                {name:'demande de prise en chare',icon:'flight',color:'indigo'},
                {name:'demande de relex',icon:'hotel',color:'blue'}
            ]
                
        }
    },methods:{
        lancerDialog : function(demande){
            if(demande==='demande de client'){
                this.dialog=!this.dialog;
                this.dialogClient=!this.dialogClient;
            }else if (demande==='demande de fourniture'){
                this.dialog=!this.dialog;
                this.dialogFourniture=!this.dialogFourniture;
            }else if (demande==='demande de véhicule'){
                this.dialog=!this.dialog;
                this.dialogVehicule=!this.dialogVehicule;
            }else if (demande==='demande tirage'){
                this.dialog=!this.dialog;
                this.dialogTirage=!this.dialogTirage;
            }else if (demande==='demande de relex'){
                this.dialog=!this.dialog;
                this.dialogRelex=!this.dialogRelex;
            }else if (demande==='demande de prise en chare'){
                this.dialog=!this.dialog;
                this.dialogPEC=!this.dialogPEC;
            }
        },
        updateDialog : function(value){
            if(value.name==this.demandes[0].name){
                this.dialogClient=value.dialog;
            }else if(value.name==this.demandes[1].name){
                this.dialogFourniture=value.dialog;
            }else if(value.name==this.demandes[2].name){
                this.dialogVehicule=value.dialog;
            }else if(value.name==this.demandes[3].name){
                this.dialogTirage=value.dialog;
            }else if(value.name==this.demandes[4].name){
                this.dialogPEC=value.dialog;
            }else if(value.name==this.demandes[5].name){
                this.dialogRelex=value.dialog;
            }
        }
    },computed :{

    }
}
</script>

<style>

</style>