<template>
    <v-dialog 
            v-model="dialog" 
            fullscreen
            persistent
    >
        <v-card tile>
            <v-toolbar flat dark :color='color'  >
                <v-toolbar-title> <v-icon large left class="white--text">{{icon}}</v-icon> Demande Client</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
            </v-toolbar>
            <v-card flat>
                    <v-card-text>
                        <v-form class="px-3">
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <Date @date="DateCreation" label="date de création" icon="date_range"/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">  
                                    <v-checkbox v-model="demandeClient.nature1" class="mx-0" label="Produit"></v-checkbox>
                                </v-col> 
                                <v-col cols="12" sm="6" md="4">
                                    <v-checkbox v-model="demandeClient.nature2"  label="Presentation de service"></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row> 
                                <v-col cols="12" sm="8"> 
                                    <v-text-field v-model="demandeClient.objet" label="Objet" prepend-icon="title" ></v-text-field>
                                </v-col>  
                            </v-row>
                            <v-row>  
                                <v-col cols="12" sm="8"> 
                                    <v-textarea v-model="demandeClient.description" label="Description" prepend-icon="notes">Description</v-textarea>
                                </v-col>  
                            </v-row>  
                            <v-row> 
                                <v-spacer></v-spacer>
                                <v-col cols="12" sm="8">
                                    <v-btn class="pink white--text mx-4">
                                        <v-icon left>send</v-icon>
                                       <span>Envoyer la demande</span> 
                                    </v-btn>
                                    <v-btn class="grey white--text" @click="close()">
                                        <v-icon left>close</v-icon>
                                       <span>Annuler la demande</span>  
                                    </v-btn>
                                </v-col>
                            </v-row> 
                        </v-form>
                    </v-card-text>

             </v-card>  
        </v-card>  
    </v-dialog>
</template>

<script>
import Date from '../components/Date.vue'

export default {
  props:['dialogClient','name','color','icon' ],
  components :{Date},
  data(){
      return{
          demandeClient :{
              nature1:'',
              objet:'',
              description:'',
              nature2:'',
              dateCreation:null
          }
      }
  }
  ,methods:{
      close:function(){
          var value = {name :'demande de client', dialog:!this.dialog }
          this.$emit('closeDemande',value)
      }
  },computed :{
      dialog :{ 
       get: function(){
          return this.dialogClient
        },
        set : function(a){
            this.dialogClient=a;
        }
      }
  }
}
</script>

<style>

</style>