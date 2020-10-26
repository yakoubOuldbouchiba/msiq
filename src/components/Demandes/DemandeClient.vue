<template>
<div>
<v-dialog 
        :retain-focus="false" 
        v-model="dialog" 
        width="700"
        persistent>
        <v-card tile>
            <v-toolbar flat dark color='pink'  >
                <v-toolbar-title> 
                  <v-icon large left class="white--text">devices</v-icon> 
                  <span v-if="type=='update'&&dialog==true"> modifier demande Client némuro {{demande.demande_C_ID}} </span>
                  <span v-else>Demande Client</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
            </v-toolbar>
            <v-card flat>
              <v-card-text>
                  <v-form v-model="valid" ref="form">
                    <v-row justify="center" v-if="type == 'Triater'"> 
                      <v-col cols="12" sm="4"> 
                        <v-text-field 
                          :value="DC.nomUtilisateur+' '+DC.prenomUtilisateur"
                          disabled
                          label="Nom et prenom"
                          prepend-icon="mdi-account"></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="4"> 
                        <v-text-field  
                        :value="DC.departement"
                        disabled
                        label="Departement"
                        prepend-icon="mdi-office-building"></v-text-field>
                      </v-col>  
                    </v-row>
                    <v-row justify="space-around"> 
                      <v-radio-group
                        v-model="DC.nature"
                        row
                        :disabled="type =='Triater'"
                        :rules="[v => !!v || 'Ce champs est obligatoire']">
                        <v-radio
                          label="Produit"
                          value="Produit"></v-radio>
                        <v-radio
                          label="Prestation de service"
                          value="Prestation de service"></v-radio>
                      </v-radio-group>
                    </v-row>
                    <v-row justify="center"> 
                      <v-col cols="12" sm="8"> 
                        <v-text-field 
                        v-model="DC.objet" 
                        :disabled="type =='Triater'"
                        label="Objet" 
                        prepend-icon="mdi-target" 
                        :rules="[v => !!v || 'Ce champs est obligatoire']"></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="8"> 
                          <v-textarea 
                          v-model="DC.demande_C_description" 
                          :disabled="type =='Triater'"
                          label="Description" 
                          prepend-icon="notes"
                          :rules="[v => !!v || 'Ce champs est obligatoire']">Description</v-textarea>
                      </v-col>  
                    </v-row>  
                    <v-row  v-if="$store.state.user.typeUtilisateur == 'Agent de magasin' || $store.state.user.typeUtilisateur == 'Responsable DAM'"> 
                      <v-col cols="12" sm="5" offset-sm="2"> 
                        <v-checkbox
                        v-model="DC.MED"
                        label="Mise en disposition"
                        :disabled="$store.state.user.typeUtilisateur == 'Agent de magasin'"
                        prepend-icon="mdi-archive-arrow-down"></v-checkbox>
                      </v-col>  
                      <v-col cols="12" sm="3" v-if="DC.MED">
                        <Date 
                            v-model="DC.DateMED"
                            label="Date"
                            @date ="(date) => DC.DateMED = date"
                        />
                      </v-col> 
                    </v-row> 
                    <v-row  v-if="$store.state.user.typeUtilisateur == 'Agent de magasin' || $store.state.user.typeUtilisateur == 'Responsable DAM'"> 
                      <v-col cols="12" sm="2" offset-sm="2"> 
                        <v-checkbox
                        v-model="DC.Achats"
                        label="Achats"
                        :disabled="$store.state.user.typeUtilisateur == 'Agent de magasin'"
                        prepend-icon="mdi-cart"></v-checkbox>
                      </v-col> 
                      <v-col cols="12" sm="2" offset-sm="1" v-if="DC.Achats">
                        <v-text-field
                        v-model="DC.NAchats"
                        :disabled="$store.state.user.typeUtilisateur == 'Agent de magasin'"
                        label="N°....."></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="3" v-if="DC.Achats">
                        <Date 
                            v-model="DC.DateAchats" 
                            label="Date" 
                            @date ="(date) => DC.DateAchats = date"
                        />
                      </v-col> 
                    </v-row> 
                    <v-row justify="center" v-if="$store.state.user.typeUtilisateur == 'Agent de magasin'"> 
                      <v-col cols="12" sm="8"> 
                          <v-textarea
                          v-model="DC.OAchats"
                          label="Orientations d'achats" 
                          prepend-icon="mdi-directions-fork"></v-textarea>
                      </v-col>   
                    </v-row> 
                    <v-row justify="center" v-if="$store.state.user.typeUtilisateur != 'Client'"> 
                      <v-col cols="12" sm="8"> 
                          <v-textarea
                          v-model="DC.motif"
                          label="Motif" 
                          prepend-icon="mdi-flag-outline"></v-textarea>
                      </v-col>   
                    </v-row> 
                    <v-row justify="center"> 
                      <v-btn v-if="type=='Triater'" 
                        class="ma-1 red white--text"
                        @click="Reject"
                        :disabled="!valid">Rejeter la demande</v-btn>
                      <v-btn v-if="type=='update'" class="ma-1 pink white--text" 
                        :disabled="!valid"
                        @click="update">
                        <v-icon left>send</v-icon>
                        <span  >Modifier la demande</span> 
                      </v-btn>
                      <v-btn v-else-if="type=='Triater'" 
                        class="ma-1 green white--text"
                        @click="Accept">Accepter la demande </v-btn>
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
import Date from '../Date'
export default {
  props : ['value' ,'type' , 'demande'],
  components: {Date},
  computed :{
        dialog : {
            get : function(){
                return this.value
            },
            set : function(value){
                this.$emit('input',value) 
            }
        },
        DC : function() {
          if((this.type=="update" || this.type=="Triater" ) && this.dialog==true){
            return this.demande
          }else{
            return this.DemandeClient
          }
        }
    },
    data(){
      return{
          CheckTest: '',
          msg: '',
          Done: false,
          Errr: false,
          valid:false,
          DemandeClient :{
            demande_C_ID : '',
            demande_C_description:'',
            nature:'',
            objet:'',
            MED: false,
            DateMED: null,
            Achats: false,
            NAchats: null,
            DateAchats: null,
            OAchats: null,
            motif: '',
          },
      }
  },
  methods:{
    close:function(){
        this.$emit('resetDemand')
        this.$refs.form.reset(),
        this.dialog=false
    },
    submit () {
        this.$refs.form.validate();
        Axios.post('http://localhost:3030/DemandeClient', this.DC)
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
        Axios.post('http://localhost:3030/UpdateDemandeClient', this.DC )
        .then(
          res =>{
            this.msg = res.data.title,
            this.$refs.form.reset(),
            this.Done = true,
            this.dialog = false
            this.$emit('resetDemand')
          },
          err => {
              this.Errr = true,
              this.msg = err.response.data.title
          }
        )
    },
    Reject(){
      this.$refs.form.validate();
      Axios.put('http://localhost:3030/UpdateDemandState/'+this.DC.demande_C_ID, 
        { State :'Rejetee',
          Demande: this.DC,
          typeD: 'Demande client',
          UT: this.$store.state.user.typeUtilisateur})
      this.dialog = false
    },
    Accept(){
      if (this.$store.state.user.typeUtilisateur == 'Chef departement') 
        Axios.put('http://localhost:3030/UpdateDemandState/'+this.DC.demande_C_ID, 
          { State :'Directeur',
            Demande: this.DC, 
            typeD: 'Demande client', 
            UT: this.$store.state.user.typeUtilisateur})
      else if(this.$store.state.user.typeUtilisateur == 'Directeur') 
        Axios.put('http://localhost:3030/UpdateDemandState/'+this.DC.demande_C_ID, 
          { State :'DAM',
            Demande: this.DC,
            typeD: 'Demande client', 
            UT: this.$store.state.user.typeUtilisateur})    
      else if(this.$store.state.user.typeUtilisateur == 'Responsable DAM') 
        Axios.put('http://localhost:3030/UpdateDemandState/'+this.DC.demande_C_ID, 
          { State :'Acceptee',
            Demande: this.DC,
            typeD: 'Demande client', 
            UT: this.$store.state.user.typeUtilisateur})
            .then(this.update())     
      this.dialog = false
    }
  }
}
</script>