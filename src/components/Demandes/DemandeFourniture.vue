<template>
    <v-dialog v-model="$store.state.dialogFourniture" 
        persistent 
        width="900">
            <v-card tile >
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
                         <div  v-for="(objet,index) in DemandeFourniture.objetsDemande" :key="index">
                         <v-row justify="center">
                             <v-col cols="6">
                                 <v-autocomplete
                                    :items="objets"
                                    v-model="objet.code_objet"
                                    solo
                                    hide-selected
                                    item-text="designation"
                                    item-value="code_objet"
                                    :label="'Objet '+index"
                                    prepend-inner-icon="edit"
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                 ></v-autocomplete>
                             </v-col>
                             <v-col cols="2">
                                 <v-text-field
                                    v-model="objet.qty"
                                    solo
                                    label="Quantite damande"
                                    type="number"
                                    min=0
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                 ></v-text-field>
                             </v-col>
                             <v-col cols="1">
                              <v-btn
                                min="0"
                                @click="deleteObject(index)"
                                class="mx-2"
                                color="cyan"
                                fab
                                dark
                                x-small
                                >
                                <v-icon dark>
                                    delete
                                </v-icon>
                              </v-btn>
                             </v-col>
                         </v-row>
                         </div>
                        <v-row justify="center">
                            <v-btn class="ma-1 green white--text" @click="addNewObject()">
                                <v-icon left>add</v-icon>
                                <span>Ajouter un objet</span>  
                            </v-btn> 
                            <v-btn class="ma-1 grey white--text" @click="close()">
                                <v-icon left>close</v-icon>
                                <span>Annuler la demande</span>  
                            </v-btn>
                            <v-btn class="ma-1 pink white--text" 
                                :disabled="!valid"
                                @click="send">
                                <v-icon left>send</v-icon>
                                <span  >Envoyer la demande</span> 
                            </v-btn>
                        </v-row> 
                    </v-form>
                </v-card-text>               
            </v-card>  
    </v-dialog>
</template>

<script>
import Axios from 'axios';
export default {
    name:"DemandeFourniture",
    props:['name','icon','color'] ,
    methods :{
        send(){
            this.$refs.form.validate();
            Axios.post('http://localhost:3030/DemandeFourniture', this.DemandeFourniture )
        }
        ,deleteObject(index){
            if(this.totalObject>0){
               this.DemandeFourniture.objetsDemande.splice(index,1);
               this.totalObject--;
            }
        },
        addNewObject(){
            this.DemandeFourniture.objetsDemande.push({
                code_objet:null,    
                qty:null
                });
            this.totalObject++;
        },
        close : function(){
            //var value = {name : this.name , dialog:!this.dialog}
            this.$store.commit('updateDialogFourniture');
        }
    },
    async created(){
        for(let i=0 ; i<this.totalObject ; i++){
            this.DemandeFourniture.objetsDemande.push({
                code_objet:null,    
                qty:null
                });
        }
        this.objets = (await Axios.get("http://localhost:3030/fournitures")).data
    },
    data(){
        return{
            totalObject : 1 ,
            valid : false,
            objetsDemande : [],
            objets :[],
            DemandeFourniture :{
                userID : this.$store.state.user.email,
                objetsDemande : []
            }
        }
    }
}
</script>

<style>

</style>