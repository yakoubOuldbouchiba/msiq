<template>
<div>
    <v-dialog v-model="$store.state.dialog"  width="700">
        <template v-slot:activator="{on , attrs}">
            <v-btn 
                v-bind="attrs"
                v-on="on"
                xs1 text>
                <span class="blue--text">nouveau demande</span>
                <v-icon small class="blue--text" right> note_add </v-icon>
            </v-btn>
        </template>
        <v-card >
            <v-card-title class="blue--text">
                <v-icon large left class="blue--text"> note_add</v-icon>
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
    <DemandeClient/>

    <Fourniture 
            :name='demandes[1].name'
            :color='demandes[1].color'
            :icon='demandes[1].icon' 
             />

    <Tirage 
            :name='demandes[3].name'
            :color='demandes[3].color'
            :icon='demandes[3].icon' 
            />

    <DemandeVehicule />

    <Relex 
            :name='demandes[5].name'
            :color='demandes[5].color'
            :icon='demandes[5].icon' 
            />

    <PEC 
            :name='demandes[4].name'
            :color='demandes[4].color'
            :icon='demandes[4].icon' 
            />
</div>
</template>

<script>
import DemandeClient from './Demandes/DemandeClient'
import Fourniture from './Fourniture'
import Tirage from './tirage'
import DemandeVehicule from './Demandes/DemandeVehicule'
import Relex from './Relex'
import PEC from './PriseEnCharge'
export default {
    name:'Pupupdemandes',
    components:{DemandeClient , Fourniture , Tirage , DemandeVehicule , Relex , PEC},
    data(){
        return{
            demandes :[
                {name:'demande client',icon:'devices',color:'pink'},
                {name:'demande de fourniture',icon:'edit',color:'red'},
                {name:'demande de véhicule',icon:'commute',color:'deep-purple'},
                {name:'demande de tirage',icon:'print',color:'purple'},
                {name:'demande de prise en charge',icon:'flight',color:'indigo'},
                {name:'demande activité relex',icon:'hotel',color:'blue'}
            ]
                
        }
    },methods:{
        lancerDialog : function(demande){
            if(demande==='demande client'){
                this.$store.commit('updateDialog')
                this.$store.commit('updateDialogClient')
            }else if (demande==='demande de fourniture'){
                this.$store.commit('updateDialog')
                this.$store.commit('updateDialogFourniture')
            }else if (demande==='demande de véhicule'){
                this.$store.commit('updateDialog')
                this.$store.commit('updateDialogVehicule')
            }else if (demande==='demande de tirage'){
                this.$store.commit('updateDialog')
                this.$store.commit('updateDialogTirage')
            }else if (demande==='demande activité relex'){
                this.$store.commit('updateDialog')
                this.$store.commit('updateDialogRelex')
            }else if (demande==='demande de prise en charge'){
                this.$store.commit('updateDialog')
                this.$store.commit('updateDialogPEC')
            }
        }
    }
}
</script>

<style>

</style>
