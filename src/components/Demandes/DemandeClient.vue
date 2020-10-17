<template>
<div>
<v-dialog 
        :retain-focus="false" 
        v-model="dialog" 
        width="700"
        persistent>
        <v-card tile>
            <v-toolbar flat dark color='pink'  >
                <v-toolbar-title> <v-icon large left class="white--text">devices</v-icon> Demande Client</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
            </v-toolbar>
            <v-card flat>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-row justify="space-around"> 
                                <v-radio-group
                                    v-model="DC.nature"
                                    row
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                    >
                                    <v-radio
                                        label="Produit"
                                        value="Produit"
                                    ></v-radio>
                                    <v-radio
                                        label="Prestation de service"
                                        value="Prestation de service"
                                    ></v-radio>
                                </v-radio-group>
                            </v-row>
                            <v-row justify="center"> 
                                <v-col cols="12" sm="8"> 
                                    <v-text-field 
                                    v-model="DC.objet" 
                                    label="Objet" 
                                    prepend-icon="title" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"></v-text-field>
                                </v-col>  
                                <v-col cols="12" sm="8"> 
                                    <v-textarea 
                                    v-model="DC.description" 
                                    label="Description" 
                                    prepend-icon="notes"
                                    :rules="[v => !!v || 'Cet champs est obligatoire']">Description</v-textarea>
                                </v-col>  
                            </v-row>  
                            <v-row justify="center"> 
                                    <v-btn v-if="type=='update'" class="ma-1 pink white--text" 
                                        :disabled="!valid"
                                        @click="update">
                                        <v-icon left>send</v-icon>
                                       <span  >Modifier la demande</span> 
                                    </v-btn>
                                    <v-btn v-else class="ma-1 pink white--text" 
                                        :disabled="!valid"
                                        @click="submit">
                                        <v-icon left>send</v-icon>
                                       <span  >Envoyer la demande</span> 
                                    </v-btn>
                            </v-row> 
                        </v-form>
                    </v-card-text>
             </v-card> 
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
  props : ['value' ,'type' , 'demandeID' , 'demande'],
  computed :{
        dialog : {
            get : function(){
                return this.value
            },
            set : function(value){
                this.$emit('input',value) 
            }
        },DC : function() {
          if(this.type=="update"){
            return this.demande
          }else{
            return this.DemandeClient
          }
        }
    }
  ,data(){
      return{
          msg: '',
          Done: false,
          Errr: false,
          valid:false,
          DemandeClient :{
              demande_c_id : '',
              nature:'',
              objet:'',
              description:'',
          }
      }
  },
  methods:{
    close:function(){
        this.$refs.form.reset(),
        this.dialog=false
    },
    submit () {
        this.$refs.form.validate();
        Axios.post('http://localhost:3030/DemandeClient', this.DC )
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
      console.log(this.demandeID);
      this.dialog = false
    }
  }
}
</script>

<style>

</style>