<template>
<div>
    <v-dialog v-model="dialog" persistent  width="800px">
      <template v-slot:activator="{on}">
        <a class="float-right"  v-on="on">Enregistez-vous</a>
      </template>
      <v-card>
        <v-toolbar flat dark color='indigo pl-5'  >
                <v-toolbar-title class="amber--text">Enregistez-vous</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false"> <v-icon> clear </v-icon></v-btn>
            </v-toolbar>
        <v-card-text>
    <v-form v-model="valid" ref="form">
        <v-container>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-select 
                    v-model="user.usertype"
                    :items="items"
                    :rules="[v => !!v || 'Cet champs est obligatoire']" 
                    label="Type d'utilisateur" 
                    prepend-icon="mdi-briefcase" >
                    </v-select>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field 
                    v-model="user.lastName" 
                    label="Nom*" 
                    :rules="[v => !!v || 'Cet champs est obligatoire']" 
                    prepend-icon="mdi-nothing" 
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field 
                    v-model="user.firstName" 
                    label="Prénom*" 
                    :rules="[v => !!v || 'Cet champs est obligatoire']" 
                    prepend-icon="mdi-nothing" 
                    required>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-text-field 
                    v-model="user.passWord" 
                    label="Mot de passe*" 
                    :rules="MDPRules" 
                    prepend-icon="mdi-lock" 
                    type="password"
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field 
                    v-model="user.passWordConfirm" 
                    label="Confirme mot de passe*" 
                    :rules="PasswordRule"
                    prepend-icon="mdi-nothing"  
                    type="password"
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-menu max-width="290px" :close-on-content-click="false" ref="menu">
                        <template v-slot:activator="{on}">
                            <v-text-field 
                            label="Date de naissance*"
                            :rules="[v => !!v || 'Cet champs est obligatoire']" 
                            prepend-icon="mdi-calendar-month" 
                            v-on="on" 
                            :value="user.ddn">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="user.ddn">
                            <v-flex>
                                <v-btn text class="primary float-right" @click="$refs.menu.save(user.ddn)">OK</v-btn>        
                            </v-flex>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field 
                    v-model="user.fonction" 
                    label="Fonction*" 
                    :rules="[v => !!v || 'Cet champs est obligatoire']"
                    prepend-icon="mdi-briefcase" 
                    required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field 
                    v-model="user.posteTelephonique" 
                    label="Poste Téléphonique*" 
                    :rules="PosteTelRule"
                    prepend-icon="mdi-phone-classic" 
                    required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-select
                    v-model="user.structure" 
                    label="Structure*"
                    :items="Structures"
                    :rules="[v => !!v || 'Cet champs est obligatoire']" 
                    prepend-icon="mdi-factory" 
                    required>
                    </v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select 
                    v-model="user.departement" 
                    label="Département"
                    :items="Departements"
                    prepend-icon="mdi-office-building">
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="7">
                    <v-text-field v-model="user.email" 
                    label="Email*"
                    :rules="Emailrules" 
                    prepend-icon="mdi-email" 
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="5">
                    <v-text-field v-model="user.mobile" 
                    label="Numéro de Tél*"
                    :rules="PhoneNumberRule" 
                    prepend-icon="mdi-phone" 
                    required>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>
  </v-form>
        </v-card-text>
        <v-card-actions>
            <span>  * Champs obligatoires</span>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="green darken-1" text @click="submit">envoyer</v-btn>
        </v-card-actions>
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
import axios from 'axios';
export default {
    data() {
        return{
            Users: [],
            items: ['Administrator', 'Chef de parc', 'Directeur', 'Client','Agent de Tirage','Agent de magasin', 'Responsable PEC', 'Responsable  AR'],
            Departements: ['Informatique'],
            Structures: ['DAM'],
            valid:true,
            dialog: false,
            msg: '',
            user: {                           
                lastName: '',
                firstName: '',
                passWord: '',
                passWordConfirm: '',
                fonction: '',
                ddn: null,
                structure: '',
                departement: '',
                email: '',
                mobile: '',
                usertype: 'Client',
                posteTelephonique: ''
            },
            Emailrules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail inccorect',
            ],
            MDPRules: [
                v => !!v || 'Cet champs est obligatoire',
                v => v.length > 7 || 'Votre mot de passe doit contenir au moins 8 caractères',
            ],
            PasswordRule: [
                v => !!v || 'Confirm password',
                v => this.user.passWord == v || 'Mot de passe incorrect'
            ],
            PhoneNumberRule: [
                v => !!v || 'Cet champs est obligatoire',
                v =>  /^\d+$/.test(v)  || 'Numéro incorrect'
            ],
            PosteTelRule: [
                v => !!v || 'Cet champs est obligatoire',
                v =>  /^\d+$/.test(v)  || 'Numéro incorrect'
            ],
            state: false,
            Done: false,
            Errr: false
        }
    },
    methods : {
        submit(){
            (this.$refs.form.validate());

            axios.post("http://localhost:3030/register",this.user)
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
                })
        },
    }
}
</script>
