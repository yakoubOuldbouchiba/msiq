<template>
  <div class="profile pt-8">
    <v-row class="text-center" justify="center">
      <v-flex xs4 >
        <v-responsive>
            <v-avatar size="130" class="blue">
                  <img :src="$store.state.user.avatar" alt="" />
            </v-avatar>
        </v-responsive>
      </v-flex>
      </v-row>
      <v-row class="text-center mt-5" justify="center">
      <v-flex xs3 >
        <div class="amber--text text--darken-1">{{$store.state.user.userName}}</div>
        <div class="indigo--text text--darken-4 capation">{{$store.state.user.fonction}}</div>
      </v-flex>
      </v-row>
      <v-row justify="center">
        <v-col cols="11">
          <v-card>
            <v-toolbar
              color="#efefef"
              elevation="2"
              dark>
              <v-toolbar-title class="indigo--text text-uppercase">
                <span class="indigo--text text--darken-4 mr-3">Information</span>
                <span class="amber--text text--darken-1">personal</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outlined  color="#efefef" @click="activate">
                  <v-icon color="indigo">mdi-account-edit</v-icon>
                  <span class="indigo--text text--darken-4">Modifier</span>
              </v-btn>
              <v-dialog
                v-model="dialog"
                persistent
                width="400">
                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    Confirmez votre identité
                    <v-spacer></v-spacer>
                    <v-btn text @click="close">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="pt-5">
                    <v-form ref="menu">
                      <v-row justify="center">
                        <v-col cols="11" >
                          <v-text-field
                          label="Nom d'utilisateur"
                          v-model="confirmData.UserName"
                          outlined
                          disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-col cols="11">
                          <v-text-field
                          label="Mot de passe"
                          v-model="confirmData.PassWord"
                          outlined
                          type="password"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="confirm">
                      Comfirme
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-form v-model="valid" ref="form"  class="mt-5 px-5 mb-16">
               <v-row justify="center">
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="Email">Nom d'utilisateur</label>
                   <v-text-field
                   v-model="UserInfo.UserName"
                   disabled
                   id="Email"
                   outlined
                   prepend-icon="mdi-email"
                   required 
                   ></v-text-field>
                 </v-col>
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="DDN">Date de Naissance</label>
                   <v-menu max-width="290px" :close-on-content-click="false" ref="datee">
                        <template v-slot:activator="{on}">
                            <v-text-field 
                            id="DDN"
                            :rules="[v => !!v || 'Cet champs est obligatoire']" 
                            prepend-icon="mdi-calendar-month" 
                            v-on="on" 
                            outlined
                            :disabled="enabled" 
                            :value="UserInfo.dateNaissance"
                            required>
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="UserInfo.dateNaissance">
                            <v-flex>
                                <v-btn text class="primary float-right" @click="$refs.datee.save(UserInfo.dateNaissance)">OK</v-btn>        
                            </v-flex>
                        </v-date-picker>
                    </v-menu>
                 </v-col>
               </v-row>
               <v-row justify="center">
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="LastName">Votre Nom</label>
                   <v-text-field
                   :disabled="enabled" 
                   required
                   prepend-icon="nothing"
                   v-model="UserInfo.LastName"
                   id="LastName"
                   outlined
                   ></v-text-field>
                 </v-col>
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="FirstName">Votre Prenom</label>
                   <v-text-field
                   id="FirstName"
                   required
                   prepend-icon="nothing"
                   v-model="UserInfo.FirstName"
                   outlined
                   :disabled="enabled"
                   ></v-text-field>
                 </v-col>
               </v-row>
                <v-row justify="center">
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="Fonction">Fonction</label>
                   <v-text-field
                   :disabled="enabled" 
                   required
                   prepend-icon="nothing"
                   v-model="UserInfo.Fonction"
                   id="Fonction"
                   outlined
                   ></v-text-field>
                 </v-col>
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="TPU">Type d'utilisateur</label>
                   <v-text-field
                   id="TPU"
                   required
                   v-model="UserInfo.userType"
                   prepend-icon="mdi-briefcase"
                   outlined
                   disabled
                   ></v-text-field>
                 </v-col>
               </v-row>
               <v-row justify="center">
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="Structure">Structure</label>
                   <v-text-field
                   :disabled="enabled" 
                   required
                   prepend-icon="mdi-factory" 
                   v-model="UserInfo.Structure"
                   id="Structure"
                   outlined
                   ></v-text-field>
                 </v-col>
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="Departement">Departement</label>
                   <v-text-field
                   id="Departement"
                   prepend-icon="mdi-office-building"
                   v-model="UserInfo.Departement"
                   outlined
                   :disabled="enabled"
                   ></v-text-field>
                 </v-col>
               </v-row>
               <v-row justify="center">
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="NDT">Numéro de tél</label>
                   <v-text-field
                   :disabled="enabled" 
                   required
                   prepend-icon="phone"
                   v-model="UserInfo.Tel"
                   id="NDT"
                   outlined
                   ></v-text-field>
                 </v-col>
                 <v-col cols="11" sm="6">
                   <label class='pl-8' for="PT">Poste Téléphonique</label>
                   <v-text-field
                   id="PT"
                   v-model="UserInfo.PosteTelephonique"
                   required
                   outlined
                   prepend-icon="mdi-phone-classic"
                   :disabled="enabled"
                   ></v-text-field>
                 </v-col>
               </v-row>
                <v-dialog 
                v-model="ChangePW"
                persistent
                width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2">
                      Changement de votre mot de passe
                      <v-spacer></v-spacer>
                      <v-btn text @click="close2">
                        <v-icon>clear</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text class="pt-5">
                      <v-form ref="menu">
                        <v-row justify="center">
                          <v-col cols="11" >
                            <v-text-field
                            label="Votre nouveau Mot de passe"
                            v-model="ChangePassword.pw"
                            outlined
                            :rules="MDPRules"
                            type="password"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-col cols="11">
                            <v-text-field
                            label="Confirmez votre Mot de passe"
                            v-model="ChangePassword.cpw"
                            outlined
                            :rules="PasswordRule"
                            type="password"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="ChangeMDP">
                        Comfirme
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
               <v-row justify="center">
                 <v-col cols="12" sm="5">
                    <v-btn class="ma-1  green--text" 
                      :disabled="enabled"
                      outlined
                      @click="ChangePW = !ChangePW">
                      <v-icon left>lock</v-icon>
                      <span  >changez votre mot de pass</span> 
                    </v-btn>
                 </v-col>
                 <v-col cols="12" sm="5">
                   <v-btn class="ma-1 pink white--text" 
                      :disabled="!valid"
                      @click="submit">
                      <v-icon left>send</v-icon>
                      <span  >Envoyez les modifications</span> 
                    </v-btn>
                 </v-col>
               </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
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
import Axios from "axios";
export default {
  name:'profile',
  data(){
    return{
      ChangePW: false,
      msg: '',
      Done: false,
      Errr: false,
      valid: true,
      dialog: false,
      enabled: true,
      UserInfo: {
        UserName: this.$store.state.user.email,
        FirstName: this.$store.state.user.FirstName,
        LastName: this.$store.state.user.LastName,
        Fonction: this.$store.state.user.fonction,
        Structure: this.$store.state.user.structure,
        Departement: this.$store.state.user.departement,
        PosteTelephonique: this.$store.state.user.posteTelephonique,
        Tel: this.$store.state.user.mobile,
        dateNaissance: this.$store.state.user.dateNaissance.substring(0,10),
        userType: this.$store.state.user.typeUtilisateur,
      },
      confirmData: {
        UserName: this.$store.state.user.email,
        PassWord: '',
      },
      ChangePassword: {
        UserName: this.$store.state.user.email, 
        pw: '',
        cpw: '',
      },
      MDPRules: [
        v => !!v || 'Cet champs est obligatoire',
        v => v.length > 7 || 'Votre mot de passe doit contenir au moins 8 caractères',
      ],
      PasswordRule: [
        v => !!v || 'Confirm password',
        v => this.ChangePassword.pw == v || 'Mot de passe incorrect'
      ],
    }
  },
  methods: {
    confirm(){
      Axios.post('http://localhost:3030/confirm',this.confirmData)
      .then(
        res => {
          this.msg = res.data.title,
          this.Done = true,
          this.dialog = false,
          this.confirmData.PassWord = '',
          this.enabled = false
        },
        err => {
          this.Errr = true,
          this.msg = err.response.data.title
        }
      )
    },
    
    ChangeMDP(){
      Axios.post('http://localhost:3030/changeMDP',this.ChangePassword)
      .then(
        res => {
          this.msg = res.data.title,
          this.Done = true,
          this.ChangePW = false,
          this.ChangePassword.pw = '',
          this.ChangePassword.cpw = ''
        },
        err => {
          this.Errr = true,
          this.msg = err.response.data.title
        }
      )
    },
    submit(){
      Axios.post('http://localhost:3030/updateuser',this.UserInfo)
      .then(
        res => {
          this.$refs.form.validate(),
          this.msg = res.data.title,
          this.Done = true
        },
        err => {
          this.Errr = true,
          this.msg = err.response.data.title
        }
      )   
    },
    activate(){
      if (this.enabled) 
        this.dialog = true
      else {
        this.enabled= true
      }
    },
    close(){
      this.dialog = false,
      this.confirmData.PassWord = ''
    },
    close2(){
      this.ChangePW = false,
      this.ChangePassword.pw = '',
      this.ChangePassword.cpw = ''
    },
    sender(){
        return !this.valid && this.enabled
    }
  }
}
</script>

<style>

</style>
