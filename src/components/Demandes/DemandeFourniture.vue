<template>
    <div>
        <v-dialog 
            :retain-focus="false" 
            v-model="dialog" 
            persistent 
            width="700">
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
                        <v-form v-model="valid" ref="form" >
                            <v-simple-table>
                                <template v-slot:default color="white">
                                    <thead>
                                        <tr>
                                            <th>
                                                <v-btn
                                                    @click="addNewObject()"
                                                    color="cyan"
                                                    fab
                                                    dark
                                                    small
                                                    >
                                                    <v-icon dark>
                                                        add
                                                    </v-icon>
                                                </v-btn> 
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Objet</th>
                                            <th>Quantite damandée</th>
                                            <th>actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(objet,index) in objetsDF" :key="index">
                                            <td>
                                                <v-autocomplete
                                                    flat
                                                    solo
                                                    :items="objets"
                                                    v-if="type=='update' && dialog==true"
                                                    v-model="objet.code_object"
                                                    hide-selected
                                                    item-text="designation"
                                                    item-value="code_object"
                                                    :label="getDesign(objet.code_object)"
                                                    prepend-inner-icon="edit"
                                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                                ></v-autocomplete>
                                                <v-autocomplete
                                                    flat
                                                    solo
                                                    :items="objets"
                                                    v-else
                                                    v-model="objet.code_object"
                                                    hide-selected
                                                    item-text="designation"
                                                    item-value="code_object"
                                                    :label="'Objet '+(index + 1)"
                                                    prepend-inner-icon="edit"
                                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                                ></v-autocomplete>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    flat
                                                    solo
                                                    v-model="objet.qty_demande"
                                                    label="Quantite damande"
                                                    type="number"
                                                    min=0
                                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-btn
                                                    @click="deleteObject(index)"
                                                    color="secondary"
                                                    fab
                                                    dark
                                                    small
                                                    >
                                                    <v-icon dark>
                                                        delete
                                                    </v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>

                                </template>
                            </v-simple-table>                     
                            <v-row justify="center">
                                <v-btn v-if="type=='update'" class="ma-1 pink white--text" 
                                    :disabled="!valid"
                                    @click="update">
                                    <v-icon left>send</v-icon>
                                    <span  >Modifier la demande</span> 
                                </v-btn>
                                <v-btn v-else class="ma-1 pink white--text" 
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
import Axios from 'axios';
export default {
    name:"DemandeFourniture",
    props:[ 'value','name','icon','color' , 'type' , 'demande'] ,
    computed : {
        dialog : {
            get : function(){
                return this.value
            },
            set : function(value){   
                this.$emit('input',value)
            }
        },
        objetsDF : function() {
             if(this.type=="update" && this.dialog==true){
                return this.demande
            }else{
                return this.DemandeFourniture.objetsDemande
             }
        }
        
    },methods :{
        send(){
            this.$refs.form.validate();
            Axios.post('http://localhost:3030/DemandeFourniture',{userID : this.$store.state.user.email , objetsDemande : this.objetsDF} )
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
            Axios.post('http://localhost:3030/UpdateDemandeFourniture', 
                            {
                                demande_id : this.objetsDF[0].demande_F_ID,
                                objetsDemande : this.objetsDF
                            })
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
        
        ,deleteObject(index){
            if(this.totalObject>0){
               this.objetsDF.splice(index,1);
               this.totalObject--;
            }
        },
        addNewObject(){
            this.objetsDF.push({
                code_objet:null,    
                qty_demande:null
                });
            this.totalObject++;
        },
        close : function(){
            this.$refs.form.reset();
            this.dialog = false;
        },
        getDesign(code_object){
            if(code_object!=null){
                for (let i = 0 ; i<this.objets.length ; i++){ 
                    if(this.objets[i].code_object == code_object){
                            return this.objets[i].designation
                    } 
               }
            }else{
                return 'object '+(this.totalObject+1);
            }
        }
    },
    async created(){
        for(let i=0 ; i<this.totalObject ; i++){
            this.DemandeFourniture.objetsDemande.push({
                code_objet:null,    
                qty_demande:null
                });
        }
        this.objets = (await Axios.get("http://localhost:3030/fournitures")).data
    },
    data(){
        return{
            totalObject : 1 ,
            valid : false,
            msg :'',
            Done: false,
            Errr: false,
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