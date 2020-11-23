<template>
<div>
<v-dialog 
        :retain-focus="false" 
        v-model="dialog" 
        width="700"
        persistent>
        <v-card tile>
            <v-toolbar flat dark color='cyan lighten-2'  >
                <v-toolbar-title> 
                  <v-icon large left class="white--text">devices</v-icon> 
                  <span >Demande de Compte</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
            </v-toolbar>
            <v-card flat>
              <v-card-text>
                  <v-form v-model="valid" ref="form" v-if="!!dialog">
                    <v-row justify="center">
                        <v-col cols="12" sm="5">
                            <v-text-field
                            outlined
                            label="Email"
                            v-model="demande.email"
                            disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-text-field
                            outlined
                            label="Type de compte"
                            v-model="demande.typeUtilisateur"
                            disabled></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row justify="center">
                        <v-col cols="12" sm="5">
                            <v-text-field
                            outlined
                            label="Nom"
                            v-model="demande.nomUtilisateur"
                            disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-text-field
                            outlined
                            label="Prénom"
                            v-model="demande.prenomUtilisateur"
                            disabled></v-text-field>
                        </v-col>
                    </v-row>

                     <v-row justify="center">
                        <v-col cols="12" sm="5">
                            <v-text-field
                            outlined
                            label="Structure"
                            v-model="demande.structure"
                            disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-text-field
                            outlined
                            label="Departement"
                            v-model="demande.departement"
                            disabled></v-text-field>
                        </v-col>
                    </v-row>
                    <!----- les button ------------>
                    <v-row justify="center"> 
                      <v-btn
                        class="ma-1 red white--text"
                        @click="Reject">Rejeter la demande</v-btn>

                       <v-btn 
                        class="ma-1 green white--text"
                        @click="Accept">Accepter la demande </v-btn>
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
  props : ['value', 'demande'],
  computed :{
        dialog : {
            get : function(){
                return this.value
            },
            set : function(value){
                this.$emit('input',value) 
            }
        },
    },
    data(){
      return{
          msg: '',
          Done: false,
          Errr: false,
          valid:false,
      }
  },
  methods:{
    close:function(){
        this.dialog=false
    },
    Reject(){
        Axios.put('/api/AccDemande/'+this.demande.email, {msg: 'Reject'})
        .then(
            res =>{
                this.msg = res.data.title,
                this.Done = true,
                this.dialog = false
            },
            err => {
                this.Errr = true,
                this.msg = err.response.data.title
            })
            this.$store.state.sokect.emit('RemoveDemandeAcc'+this.$store.state.user.structure , this.demande)
        this.dialog = false
    },
    Accept(){
        Axios.put('/api/AccDemande/'+this.demande.email, {msg: 'Accept'}).then(
            res =>{
                console.log(res.data);
                this.msg = res.data.title,
                this.Done = true,
                this.dialog = false
            },
            err => {
                this.Errr = true,
                this.msg = err.response.data.title
            })  
            
        this.$store.state.sokect.emit('RemoveDemandeAcc'+this.$store.state.user.structure , this.demande)
        this.dialog = false
    }
  }
}
</script>