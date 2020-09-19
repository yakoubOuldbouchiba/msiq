<template>
    <v-dialog tile v-model="dialog" fullscreen persistent>
            <v-card>
                <v-toolbar flat dark :color='color'  >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">{{icon}}</v-icon>
                         {{name}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="11">
                            <Date label='Date de création' icon="date_range" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3">
                            <v-text-field label="Prétation" prepend-icon="a"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field label="Intitulé" prepend-icon="a"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-text-field label="Nombre feuilles" prepend-icon="a"></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="2">
                                <v-text-field class="ml-2" label="Nombre exemplaires" prepend-icon="a"></v-text-field>
                         </v-col>
                         <v-col cols="12" sm="1">
                                <v-btn small><v-icon>add</v-icon></v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-form>
                        <v-btn :class="color" class="white--text">Envoyer demande</v-btn>
                    </v-form>
                </v-card-actions>
            </v-card>  
    </v-dialog>
</template>

<script>
import Date from '../components/Date'
export default {
    name:"Tirage",
    components:{Date},
    props:['dialogTirage' ,'name' , 'icon' ,'color'] ,
    computed : {
        dialog : {
            set : function(a) {
               this.dialogTirage=a 
            },
            get : function() {
                return this.dialogTirage
            }
        }
    },
    methods : {
        close : function(){
            var value = {name : this.name , dialog : !this.dialog};
            this.$emit('updateDialog',value)
        }
    }
}
</script>

<style>

</style>