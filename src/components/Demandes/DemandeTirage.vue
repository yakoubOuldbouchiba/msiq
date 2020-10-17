<template>
<div>
<v-dialog 
        :retain-focus="false" 
        v-model="dialog" 
        width="700"
        persistent>
        <v-card tile>
            <v-toolbar flat dark color='purple'>
                <v-toolbar-title> <v-icon large left class="white--text">print</v-icon> Demande de tirage</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
            </v-toolbar>
            <v-card flat>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" enctype="multipart/form-data">
                            <v-row justify="space-around"> 
                                <v-radio-group class="Reset"
                                    v-model="DemandeTirage.typeDocument.type"
                                    row
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                    >
                                    <v-col cols="6" sm="3">
                                        <v-radio
                                        label="Photocopie"
                                        value="Photocopie"
                                        @click="Autres = false"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                        <v-radio
                                        label="Reliure"
                                        value="Reliure"
                                        @click="Autres = false"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="6" sm="4">
                                        <v-radio
                                        label="Tirage de plan"
                                        value="Tirage de plan"
                                        @click="Autres = false"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="6" sm="2">
                                        <v-radio
                                        label="Autres"
                                        @click="Autres = true "
                                    ></v-radio>
                                    </v-col>
                                </v-radio-group>
                            </v-row>
                            <v-row v-if="Autres" justify="center">
                                <v-col cols="12" sm="10"> 
                                    <v-text-field
                                    v-model="DemandeTirage.typeDocument.description" 
                                    label="Autre" 
                                    prepend-icon="mdi-file-document-outline" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"></v-text-field>
                                </v-col>     
                            </v-row>
                            <v-row justify="center" > 
                                <v-col cols="12" sm="10">
                                    <v-file-input id="Reset" @change="OnFileSelected"
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                    label="Sélectionnez votre fichier"
                                    truncate-length="15"
                                    ></v-file-input>
                                </v-col>
                            </v-row>  
                            <v-row align="center"  justify="center" class="pl-5"> 
                                <v-col cols="7" sm="3">
                                    Nombre des Feuilles
                                    <v-layout row class="pl-3">
                                            <v-btn text icon 
                                            @click="Remove">
                                            <v-icon class="primary--text pt-10">remove</v-icon>
                                            </v-btn>
                                        <v-flex xs4>
                                            <v-text-field class="" v-model="DemandeTirage.NombreFeuilles" ></v-text-field>
                                        </v-flex>
                                        <v-btn text icon @click="DemandeTirage.NombreFeuilles++">
                                            <v-icon class="primary--text pt-10">add</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-col>
                                <v-col cols="7" sm="3">
                                    Nombre des Copies
                                    <v-layout row class="pl-3">
                                            <v-btn text icon
                                            @click="Remove2">
                                            <v-icon class="primary--text pt-10">remove</v-icon>
                                            </v-btn>
                                        <v-flex xs4 >
                                            <v-text-field v-model="DemandeTirage.NombreCopies" ></v-text-field>
                                        </v-flex>
                                        <v-btn text icon @click="DemandeTirage.NombreCopies++">
                                            <v-icon class="primary--text pt-10">add</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-col> 
                                <v-col cols="7" sm="4">
                                    Nombre Total des feuilles
                                    <div class="rounded-0  title text-center pt-3 pr-6 mb-6">
                                        {{DemandeTirage.NombreTotal = this.DemandeTirage.NombreFeuilles*this.DemandeTirage.NombreCopies}}                                        
                                    </div>                                            
                                </v-col>     
                            </v-row> 
                            <v-row justify="center"> 
                                <v-btn 
                                    v-if="type=='update'" 
                                    class="ma-1 pink white--text" 
                                    :disabled="!valid"
                                    @click="update">
                                    <v-icon left>send</v-icon>
                                    <span  >Modifier la demande</span> 
                                </v-btn>
                                <v-btn 
                                    v-else 
                                    class="ma-1 pink white--text" 
                                    :disabled="!valid"
                                    @click="submit">
                                    <v-icon left>send</v-icon>
                                    <span  >Envoyer la demande</span> 
                                </v-btn>
                            </v-row> 
                            <template v-if="loading">
                                <v-text-field class="text-center"
                                    color="success"
                                    label="Envoie de Votre fichier ..."
                                    loading
                                    disabled
                                ></v-text-field>
                            </template>
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
  props:['value','type','demandeID'],
  computed :{
      dialog : {
          get : function(){
             return this.value
          },
          set : function(value){
              this.$emit('input' , value)
          }
      }
  }
  ,data(){
      return{
          Autres: false,
          Done: false,
          Errr: false,
          valid:false,
          msg: '',
          DemandeTirage :{
              typeDocument:{
                  type: '',
                  description: ''
              },
              NombreFeuilles: 1,
              NombreCopies: 1,
              NombreTotal: 1,
          },
          loading: false,
          FileSelected: null,
      }
  },
  methods:{
    close:function(){
        this.$refs.form.reset();
        this.Autres= false,
        this.DemandeTirage.NombreFeuilles= 1,
        this.DemandeTirage.NombreCopies= 1,
        this.dialog = false
    },
    update(){
        console.log(this.demandeID);
        this.dialog = false;
    },
    async submit () {
        this.$refs.form.validate();
        let formData = new FormData();
        formData.append('FileData', this.FileSelected);
        formData.append('DocType', JSON.stringify(this.DemandeTirage.typeDocument.type))
        formData.append('AutreDes', JSON.stringify(this.DemandeTirage.typeDocument.description))
        formData.append('NombreFeuilles', JSON.stringify(this.DemandeTirage.NombreFeuilles))
        formData.append('NombreCopies', JSON.stringify(this.DemandeTirage.NombreCopies))
        formData.append('NombreTotal', JSON.stringify(this.DemandeTirage.NombreTotal))
        this.loading = true;
        await Axios.post('http://localhost:3030/DemandeTirage',formData)
        .then(
            res =>{
            this.loading = false;
            this.msg = res.data.title,
            this.$refs.form.reset(),
            this.Done = true,
            this.DemandeTirage.NombreFeuilles= 1,
            this.DemandeTirage.NombreCopies= 1,
            this.dialog=false
          },
          err => {
              this.loading = false;
              this.Errr = true,
              this.msg = err.response.data.title
          }
        );
        
    },
    Remove(){
        if (this.DemandeTirage.NombreFeuilles !== 1) 
             this.DemandeTirage.NombreFeuilles--;
    },
    Remove2(){
        if (this.DemandeTirage.NombreCopies !== 1) 
             this.DemandeTirage.NombreCopies--;
    },
    OnFileSelected(event) {
        this.FileSelected = event;
    },
  }
}
</script>

<style>

</style>