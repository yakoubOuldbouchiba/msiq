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
                        <v-alert
                            v-if="type== 'update'"
                            class="ml-8 mb-6"
                            dense
                            outlined
                            type="warning"
                            >
                        Si vous voulez changez le fichier, supprimez la demande et créez une autre
                        </v-alert>
                        <v-form v-model="valid" ref="form" enctype="multipart/form-data">
                            <v-row justify="center" v-if="type == 'Triater'"> 
                                    <v-col cols="12" sm="5"> 
                                        <v-text-field 
                                        :value="DT.nomUtilisateur+' '+DT.prenomUtilisateur"
                                        disabled
                                        label="Nom et prenom"
                                        prepend-icon="mdi-account" 
                                        ></v-text-field>
                                    </v-col>  
                                    <v-col cols="12" sm="5"> 
                                        <v-text-field  
                                        :value="DT.departement"
                                        disabled
                                        label="Departement"
                                        prepend-icon="mdi-office-building"
                                        ></v-text-field>
                                    </v-col>  
                                </v-row>
                            <v-row justify="space-around"> 
                                <v-radio-group class="Reset"
                                    v-model="DT.type_document"
                                    row
                                    :disabled="type =='Triater'"
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
                                    :disabled="type =='update' || type =='Triater'"
                                    :label="type =='update' || type =='Triater' ? DT.nom_document : 'Sélectionnez votre fichier'"
                                    truncate-length="30"
                                    ></v-file-input>
                                </v-col>
                            </v-row>  
                            <v-row align="center"  justify="center" class="pl-5"> 
                                <v-col cols="7" sm="3">
                                    Nombre des Feuilles
                                    <v-layout row class="pl-3">
                                            <v-btn :disabled="type =='Triater'" text icon 
                                            @click="Remove">
                                            <v-icon class="primary--text pt-10">remove</v-icon>
                                            </v-btn>
                                        <v-flex xs4>
                                            <v-text-field :disabled="type =='Triater'" v-model="DT.nombre_feuille" ></v-text-field>
                                        </v-flex>
                                        <v-btn text :disabled="type =='Triater'" icon @click="DT.nombre_feuille++">
                                            <v-icon class="primary--text pt-10">add</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-col>
                                <v-col cols="7" sm="3">
                                    Nombre des Copies
                                    <v-layout row class="pl-3">
                                            <v-btn :disabled="type =='Triater'" text icon
                                            @click="Remove2">
                                            <v-icon class="primary--text pt-10">remove</v-icon>
                                            </v-btn>
                                        <v-flex xs4 >
                                            <v-text-field :disabled="type =='Triater'" v-model="DT.nombre_exemplaire" ></v-text-field>
                                        </v-flex>
                                        <v-btn text :disabled="type =='Triater'" icon @click="DT.nombre_exemplaire++">
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
                            {{DT}}
                            <v-row justify="center" v-if="$store.state.user.typeUtilisateur == 'Agent de Tirage'"> 
                                <v-col cols="12" sm="5"> 
                                    <v-text-field
                                    v-model="DT.numero_ordre"
                                    label="N° ordre" 
                                    prepend-icon="nothing" 
                                    :rules="[v => !!v || 'Ce champs est obligatoire']"></v-text-field>
                                </v-col> 
                                <v-col cols="12" sm="5"> 
                                    <Date 
                                        v-model="DT.date_prestation"
                                        label="Date"
                                        @date ="(date) => DT.date_prestation = date"
                                    />
                                </v-col>
                            </v-row>  
                            <v-row justify="center" v-if="type =='Triater' && ($store.state.user.typeUtilisateur != 'Agent de Tirage')"> 
                                <v-col cols="12" sm="10"> 
                                    <v-textarea
                                    v-model="DT.motif"
                                    label="Motif" 
                                    prepend-icon="mdi-flag-outline" 
                                    :rules="[v => !!v || 'Ce champs est obligatoire']"></v-textarea>
                                </v-col>   
                            </v-row>  
                            <v-row justify="center"> 
                                <v-btn v-if="type=='Triater' && ($store.state.user.typeUtilisateur != 'Agent de Tirage')" 
                                    class="ma-1 red white--text"
                                    @click="Reject">Rejeter la demande </v-btn>

                                <v-btn v-if="type=='Triater'" 
                                    class="ma-1 green white--text"
                                    @click="Accept">Accepter la demande </v-btn>

                                <v-btn v-if="type =='update'" 
                                    class="ma-1 pink white--text" 
                                    :disabled="!valid"
                                    @click="update"
                                    type="submit">
                                    <v-icon left>send</v-icon>
                                    <span  >Modifier la demande</span></v-btn>

                                <v-btn  v-if="type=='new'"
                                    class="ma-1 pink white--text" 
                                    :disabled="!valid"
                                    @click="submit">
                                    <v-icon left>send</v-icon>
                                    <span  >Envoyer la demande</span></v-btn>
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
import Date from '../Date'
export default {
  props: ['demande' , 'value', 'type'],
  components: {Date},
  computed :{
      dialog : {
            get : function(){
                return this.value
            },set : function(value){
                this.$emit('input' , value)
            }
      },
      DT: function() {
          if ((this.type == 'update' || this.type == 'Triater') && this.dialog==true) {
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
              numero_ordre: null,
              date_prestation: null,
              motif: '',
          },
          loading: false,
      }
  },
  methods:{
    close:function(){
        this.DT.NombreFeuilles= 1,
        this.DT.NombreCopies= 1,
        this.dialog = false
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
            this.dialog = false
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
            this.dialog = false
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
    Reject(){
      this.$refs.form.validate();
      Axios.put('http://localhost:3030/UpdateDemandState/'+this.DT.demande_T_ID, 
        {State :'Rejetee',
            Demande: this.DT, 
            typeD: 'Demande de tirage', 
            UT: this.$store.state.user.typeUtilisateur})
      this.dialog = false
    },
    Accept(){
        if (this.$store.state.user.typeUtilisateur == 'Chef departement') 
            Axios.put('http://localhost:3030/UpdateDemandState/'+this.DT.demande_T_ID, 
                {State :'Directeur',
                    Demande: this.DT, 
                    typeD: 'Demande de tirage',
                    UT: this.$store.state.user.typeUtilisateur})
        else if(this.$store.state.user.typeUtilisateur == 'Directeur') 
            Axios.put('http://localhost:3030/UpdateDemandState/'+this.DT.demande_T_ID, 
                {State :'Acceptee',
                    Demande: this.DT, 
                    typeD: 'Demande de tirage',
                    UT: this.$store.state.user.typeUtilisateur})    
        else if(this.$store.state.user.typeUtilisateur == 'Agent de Tirage') 
            Axios.put('http://localhost:3030/UpdateDemandState/'+this.DT.demande_T_ID, 
                {State :'Acceptee', 
                   Demande: this.DT, 
                   typeD: 'Demande de tirage',
                   UT: this.$store.state.user.typeUtilisateur})
                   .then(this.update())    
        this.dialog = false
    }
  }
}
</script>

<style>

</style>