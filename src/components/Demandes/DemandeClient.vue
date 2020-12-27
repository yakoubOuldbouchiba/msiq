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

                    <v-row justify="center" v-if="type == 'Traiter'"> 
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
                    <!----- Nature de la demande------------>
                    <v-row justify="space-around"> 
                      <v-radio-group
                        v-model="DC.nature"
                        row
                        :disabled="!Editable"
                        :rules="[v => !!v || 'Ce champs est obligatoire']">
                        <v-radio
                          label="Produit"
                          value="Produit"></v-radio>
                        <v-radio
                          label="Prestation de service"
                          value="Prestation de service"></v-radio>
                      </v-radio-group>
                    </v-row>
                    <!--Destination-->
                    <v-row justify="space-around"> 
                      <v-col cols="12" sm="8"> 
                       <v-autocomplete
                          v-model="DC.destination_id"
                          :items="destinations"
                          :readonly="!Editable"
                          item-text="description"
                          item-value="id"
                          prepend-icon="location_on"
                        >
                        </v-autocomplete>
                      </v-col>
                    </v-row>
                    <!----- Objet et la description de la demande------------>
                    <v-row justify="center"> 
                      <v-col cols="12" sm="8"> 
                        <v-text-field 
                        v-model="DC.objet" 
                        :disabled="!Editable"
                        label="Objet" 
                        prepend-icon="mdi-target" 
                        :rules="[v => !!v || 'Ce champs est obligatoire']"></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="8"> 
                          <v-textarea 
                          v-model="DC.demande_C_description" 
                          :disabled="!Editable"
                          label="Description" 
                          prepend-icon="notes"
                          :rules="[v => !!v || 'Ce champs est obligatoire']">Description</v-textarea>
                      </v-col>  
                    </v-row> 
                    <!----- Zone de traitement  de la demande par coté DAM ------------>
                    <!----- Mise en disposition ------------>
                    <v-row  v-if="$store.state.user.typeUtilisateur == 'Responsable DAM' || DC.etat =='Acceptee'"> 
                      <v-col cols="12" sm="5" offset-sm="2"> 
                        <v-checkbox
                        v-model="DC.mise_disposition"
                        label="Mise en disposition"
                        :disabled=" DC.etat =='Acceptee'"
                        prepend-icon="mdi-archive-arrow-down"></v-checkbox>
                      </v-col>  
                      <v-col cols="12" sm="3" v-if="DC.mise_disposition">
                        <Date 
                            :Editable="true && DC.etat !='Acceptee'"
                            v-model="DC.date_mise_dispostion"
                            label="Date"
                            @date ="(date) => DC.date_mise_dispostion = date"
                        />
                      </v-col> 
                    </v-row> 
                    <!----- Achat ------------>
                    <v-row  v-if="$store.state.user.typeUtilisateur == 'Responsable DAM' || DC.etat =='Acceptee'"> 
                      <v-col cols="12" sm="2" offset-sm="2"> 
                        <v-checkbox
                        v-model="DC.achat"
                        label="Achats"
                        :disabled="DC.etat =='Acceptee'"
                        prepend-icon="mdi-cart"></v-checkbox>
                      </v-col> 
                      <v-col cols="12" sm="2" offset-sm="1" v-if="DC.achat">
                        <v-text-field
                        v-model="DC.nAchat"
                        :disabled="DC.etat =='Acceptee'"
                        label="N°....."></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="3" v-if="DC.achat">
                        <Date 
                            v-model="DC.date_achat" 
                            :Editable="true && DC.etat !='Acceptee'"
                            label="Date" 
                            @date ="(date) => DC.date_achat = date"
                        />
                      </v-col> 
                    </v-row> 
                    <!----- Orientation d'achat ------------>
                    <v-row justify="center" v-if="$store.state.user.typeUtilisateur == 'Responsable DAM' || DC.etat =='Acceptee'"> 
                      <v-col cols="12" sm="8"> 
                          <v-textarea
                          v-model="DC.oAchats"
                          label="Orientations d'achats" 
                          :disabled="DC.etat =='Acceptee'"
                          prepend-icon="mdi-directions-fork"></v-textarea>
                      </v-col>   
                    </v-row> 
                    <!----- Motife de rejet ------------>
                    <v-row justify="center" v-if="type == 'Traiter' || DC.etat =='Rejetee'"> 
                      <v-col cols="12" sm="8"> 
                          <v-textarea
                          v-model="DC.motif"
                          :disabled="DC.etat =='Rejetee'"
                          label="Motif" 
                          prepend-icon="mdi-flag-outline"></v-textarea>
                      </v-col>   
                    </v-row>
                    <!----- les button ------------>
                    <v-row justify="center"> 
                      <v-btn v-if="type=='Traiter' && ($store.state.user.typeUtilisateur != 'Agent de magasin')" 
                        class="ma-1 red white--text"
                        @click="Reject"
                        :disabled="!DC.motif">Rejeter la demande</v-btn>

                       <v-btn v-if="type=='Traiter' && ($store.state.user.typeUtilisateur != 'Agent de magasin')" 
                        class="ma-1 green white--text"
                        @click="Accept"
                        :disabled="DC.motif !='' && !!DC.motif ">Accepter la demande </v-btn>

                      <v-btn v-if="Editable && type !='new'" class="ma-1 pink white--text" 
                        :disabled="!valid"
                        @click="update">
                        <v-icon left>send</v-icon>
                        <span  >Modifier la demande</span> 
                      </v-btn>
                      <v-btn v-if="type=='new'" class="ma-1 pink white--text" 
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
  props : ['value' ,'type' , 'demande', 'Editable'],
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
          if((this.type=="update" || this.type=="Traiter" ) && this.dialog==true){
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
          destinations : null,
          DemandeClient:{
            departement: this.$store.state.user.departement,
            structure: this.$store.state.user.structure,
            UserID: this.$store.state.user.email,
            demande_C_ID : '',
            demande_C_description:'',
            nature:'',
            objet:'',
            mise_disposition: false,
            date_mise_dispostion: null,
            achat: false,
            nAchat: null,
            date_achat: null,
            oAchats: null,
            motif: null,
            etat: 'Chef Departement',
            destination_id : null
          },
      }
  },
  async created(){
        this.destinations = (await Axios.get("/api/destination")).data
        console.log(this.destinations)
  },
  methods:{
    close:function(){
        this.$refs.form.reset(),
        this.dialog=false
    },
    submit () {
        this.$refs.form.validate();
        Axios.post('/api/DemandeClient', {D: this.DC ,UT :this.$store.state.user.typeUtilisateur})
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
        Axios.post('/api/UpdateDemandeClient', this.DC )
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
      Axios.put('/api/UpdateDemandState/'+this.DC.demande_C_ID, 
        { State :'Rejetee',
          Demande: this.DC,
          typeD: 'Demande client',
          UT: this.$store.state.user.typeUtilisateur,
          struct : this.$store.state.structure})
      this.dialog = false
    },
    Accept(){
      if (this.$store.state.user.typeUtilisateur == 'Chef departement') 
        Axios.put('/api/UpdateDemandState/'+this.DC.demande_C_ID, 
          { State :'Directeur',
            Demande: this.DC, 
            typeD: 'Demande client', 
            UT: this.$store.state.user.typeUtilisateur})
      else if(this.$store.state.user.typeUtilisateur == 'Directeur') {
        let tmpState=null;
        if(this.DC.destination_id==1){
          tmpState='DAM';
        }else if(this.DC.destination_id==2){
          tmpState='Informatique'
        }
      
        Axios.put('/api/UpdateDemandState/'+this.DC.demande_C_ID, 
          { State :tmpState,
            Demande: this.DC,
            typeD: 'Demande client', 
            UT: this.$store.state.user.typeUtilisateur}) 
      }   
      else if(this.$store.state.user.typeUtilisateur == 'Responsable DAM'){
        this.DC.etat='Acceptee';
        Axios.put('/api/UpdateDemandState/'+this.DC.demande_C_ID, 
          { State :'Acceptee',
            Demande: this.DC,
            typeD: 'Demande client', 
            UT: this.$store.state.user.typeUtilisateur,
            struct : this.$store.state.structure
            })
        }  
      this.dialog = false
    }
  }
}
</script>