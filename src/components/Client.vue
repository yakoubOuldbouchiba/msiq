<template>
    <v-dialog 
            v-model="dialog" 
            persistent
            width="900"
    >
        <v-card tile>
            <v-toolbar flat dark :color='color'  >
                <v-toolbar-title> <v-icon large left class="white--text">{{icon}}</v-icon> Demande Client</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
            </v-toolbar>
            <v-card>
                    <v-card-text>
                        <v-form class="px-3">
                            <v-menu class="my-0">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field 
                                        label="Date de creation"
                                        v-on=on
                                        v-bind="attrs"
                                        prepend-icon="date_range"
                                        :value="demandeClient.dateCreation"
                                    >
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="demandeClient.dateCreation"></v-date-picker>
                            </v-menu>
                            <v-checkbox v-model="demandeClient.nature1" class="mx-0" label="Produit"></v-checkbox>
                            <v-checkbox v-model="demandeClient.nature2"  label="Presentation de service"></v-checkbox>
                            <v-text-field v-model="demandeClient.objet" label="Objet" prepend-icon="title" ></v-text-field>
                            <v-textarea v-model="demandeClient.description" label="Description" prepend-icon="notes">Description</v-textarea>
                            <v-btn class="pink white--text mx-0 my-4">Envoyer demande</v-btn>
                        </v-form>
                    </v-card-text>

             </v-card>  
        </v-card>  
    </v-dialog>
</template>

<script>
export default {
  props:['dialogClient','name','color','icon' ],
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
          this.$emit('updateDialog',value)
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