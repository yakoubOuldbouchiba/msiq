<template>
<div>
<v-dialog 
        :retain-focus="false" 
        v-model="$store.state.dialogTirage" 
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
                        <v-alert
                            v-if="$store.state.ActionType == 'update'"
                            class="ml-8 mb-6"
                            dense
                            outlined
                            type="error"
                            >
                        Si vous voulez changez le fichier, supprimez la demande et créez une autre
                        </v-alert>
                        <v-form v-model="valid" ref="form" enctype="multipart/form-data">
                            <v-row justify="space-around"> 
                                <v-radio-group class="Reset"
                                    v-model="DT.type_document"
                                    row
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                                    >
                                    <v-col cols="6" sm="3">
                                        <v-radio
                                        label="Photocopie"
                                        value="Photocopie"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                        <v-radio
                                        label="Reliure"
                                        value="Reliure"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="6" sm="4">
                                        <v-radio
                                        label="Tirage de plan"
                                        value="Tirage de plan"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="6" sm="2">
                                        <v-radio
                                        label="Autres"
                                        value="Autres"
                                        
                                    ></v-radio>
                                    </v-col>
                                </v-radio-group>
                            </v-row>
                            <v-row v-if="DT.type_document == 'Autres'" justify="center">
                                <v-col cols="12" sm="10"> 
                                    <v-text-field
                                    v-model="DT.autre" 
                                    label="Autre" 
                                    :disabled ="DT.type_document != 'Autres'"
                                    prepend-icon="mdi-file-document-outline" 
                                    :rules="[v => !!v || 'Cet champs est obligatoire']"></v-text-field>
                                </v-col>     
                            </v-row>
                            <v-row justify="center" > 
                                <v-col cols="12" sm="10">
                                    <v-file-input @change="OnFileSelected"
                                    :rules="[() => !!DT.nom_document || 'Cet champs est obligatoire']"
                                    :disabled="this.$store.state.ActionType == 'update'"
                                    :label="this.$store.state.ActionType == 'update' ? DT.nom_document : 'Sélectionnez votre fichier'"
                                    truncate-length="30"
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
                                            <v-text-field class="" v-model="DT.nombre_feuille" ></v-text-field>
                                        </v-flex>
                                        <v-btn text icon @click="DT.nombre_feuille++">
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
                                            <v-text-field v-model="DT.nombre_exemplaire" ></v-text-field>
                                        </v-flex>
                                        <v-btn text icon @click="DT.nombre_exemplaire++">
                                            <v-icon class="primary--text pt-10">add</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-col> 
                                <v-col cols="7" sm="4">
                                    Nombre Total des feuilles
                                    <div class="rounded-0  title text-center pt-3 pr-6 mb-6">
                                        {{this.DT.nombre_feuille*this.DT.nombre_exemplaire}}                                        
                                    </div>                                            
                                </v-col>     
                            </v-row> 
                            <v-row justify="center"> 
                                <v-btn 
                                    v-if="$store.state.ActionType=='update'" 
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
  props: ['demande'],
  computed :{
      DT: function() {
          if (this.$store.state.ActionType == 'update') {
              console.log('here');
              console.log(this.demande);
              return this.demande
          } else {
              return this.DemandeTirage
          }
      }
  }
  ,data(){
      return{
          Alter: false,
          Done: false,
          Errr: false,
          valid:false,
          msg: '',
          DemandeTirage :{
              demande_T_ID: 0,
              type_document: '',
              autre: '',
              nombre_feuille: 1,
              nombre_exemplaire: 1,
              nom_document: null,
          },
          loading: false,
      }
  },
  methods:{
    close:function(){
        this.DT.NombreFeuilles= 1,
        this.DT.NombreCopies= 1,
        this.$store.commit('updateDialogTirage')
    },
    async update(){
        this.$refs.form.validate();
        this.loading = true;
        await Axios.post('http://localhost:3030/UpdateDemandeTirage', this.DT)
        .then(
            res =>{
            this.loading = false;
            this.msg = res.data.title,
            this.Done = true,
            this.$store.commit('updateDialogTirage')
          },
          err => {
              this.loading = false;
              this.Errr = true,
              this.msg = err.response.data.title
          }
        ); 
    },
    async submit () {
        this.$refs.form.validate();
        let formData = new FormData();
        formData.append('FileData', this.DT.nom_document);
        formData.append('DocType', JSON.stringify(this.DT.type_document))
        formData.append('AutreDes', JSON.stringify(this.DT.autre))
        formData.append('NombreFeuilles', JSON.stringify(this.DT.nombre_feuille))
        formData.append('NombreCopies', JSON.stringify(this.DT.nombre_exemplaire))
        formData.append('NombreTot', JSON.stringify(this.DT.nombre_exemplaire*this.DT.nombre_feuille))
        this.loading = true;
        await Axios.post('http://localhost:3030/DemandeTirage',formData)
        .then(
            res =>{
            this.loading = false;
            this.msg = res.data.title,
            this.$refs.form.reset(),
            this.Done = true,
            this.DT.NombreFeuilles= 1,
            this.DT.NombreCopies= 1,
            this.$store.commit('updateDialogTirage')
          },
          err => {
              this.loading = false;
              this.Errr = true,
              this.msg = err.response.data.title
          }
        );      
    },
    Remove(){
        if (this.DT.nombre_feuille !== 1) 
             this.DT.nombre_feuille--;
    },
    Remove2(){
        if (this.DT.nombre_exemplaire !== 1) 
             this.DT.nombre_exemplaire--;
    },
    OnFileSelected(event) {
        this.DT.nom_document = event;
    },
  }
}
</script>

<style>

</style>