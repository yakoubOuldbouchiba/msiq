<template>
<div>
    <v-dialog v-model="dialog" persistent  width="800px">
      <template v-slot:activator="{on}">
        <a class="float-right"  v-on="on">Enregistez-vous</a>
      </template>
      <v-card>
        <v-card-title class="indigo amber--text mb-5">Enregistez-vous</v-card-title>
        <v-card-text>
    <v-form v-model="valid" ref="form">
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field 
                    v-model="user.lastName" 
                    label="Nom*" 
                    :rules="[v => !!v || 'Cet champs est obligatoire']" 
                    prepend-icon="mdi-nothing" 
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
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
                <v-col cols="12" sm="6">
                    <v-text-field 
                    v-model="user.passWord" 
                    label="Mot de passe*" 
                    :rules="[v => !!v || 'Cet champs est obligatoire']" 
                    prepend-icon="mdi-lock" 
                    type="password"
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field 
                    v-model="user.passWordConfirm" 
                    label="Confirme mot de passe*" 
                    :rules="PasswordRule"
                    prepend-icon="mdi-nothing"  
                    type="password"
                    required>
                    </v-text-field>
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
                    <v-menu max-width="290px" :close-on-content-click="false" ref="menu">
                        <template v-slot:activator="{on}">
                            <v-text-field 
                            label="Date de naissance"
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
                    v-model="user.structure" 
                    label="Structure*"
                    :rules="[v => !!v || 'Cet champs est obligatoire']" 
                    prepend-icon="mdi-office-building" 
                    required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="user.departement" 
                    label="Département"
                    prepend-icon="mdi-nothing">
                    </v-text-field>
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
            <v-btn color="red darken-1" text @click="dialog = false">fermer</v-btn>
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
            Emailrules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail inccorect',
            ],
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
                usertype: 'Client'
            },
            PasswordRule: [
                v => !!v || 'Confirm password',
                v => this.user.passWord == v || 'Mot de passe incorrect'
            ],
            PhoneNumberRule: [
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
