<template>
    <div class="mt-8">
    <v-container class="fill-height" fluid>
      <v-layout class="justify-center align-center">
        <v-flex class="Login-box" xs10 sm6 md4 >
          <v-card>
            <v-card-title class="amber darken-1 indigo--text text--darken-4"> 
              <v-flex row class="justify-center">
                <h2>Bienvenue</h2>
              </v-flex>
            </v-card-title>
            <v-form  class="pa-5" ref="form" v-model="valid">
                <v-alert
                  v-if="showError"
                  class="ml-8 mb-6"
                  dense
                  outlined
                  type="error"
                >
               {{titleError}}
            </v-alert>
              <v-select 
                v-model="user.role"
                :items="items"
                :rules="[v => !!v || 'Cet champs est obligatoire']" 
                label="Type d'utilisateur" 
                prepend-icon="mdi-briefcase" 
                outlined>
              </v-select>
              <v-text-field 
                v-model="user.email"
                label="Email" 
                :rules="[v => !!v || 'Cet champs est obligatoire']"
                type="text" 
                prepend-icon="mdi-account" 
                required outlined>
              </v-text-field>
              <v-text-field 
                v-model="user.password"
                label="Mot de passe" 
                :rules="[v => !!v || 'Cet champs est obligatoire']"
                type="password" 
                prepend-icon="mdi-lock" 
                required 
                outlined>
              </v-text-field>
              <v-flex row class="ml-3 justify-center">
                <v-btn 
                :disabled="!valid"
                  class="primary"
                  @click="login">
                Connexion</v-btn>
              </v-flex>
              <br/>
              <v-flex>
                <a class="float-left"  >Mot de passe oublié ?</a>
                 <v-spacer></v-spacer>
                <a class="float-right"  to="/register">Enregistez-vous</a>
                <br/>
              </v-flex>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
    name:'Login'
    ,data: () => ({
      socket:null,
      valid: true,
      showError:false,
      titleError:'',
      user:
      {
        email: '',
        password: '',
        role:''
      },
      items: ['Administrator', 'Chef de parc', 'Directeur', 
      'Client','Agent de Tirage','Agent de magasin'],
      
    }),
    methods:{
      async login (){
         let res =(await Axios.post("http://localhost:3030/login",this.user)).data;
            if(typeof res.token !== "undefined"){
                localStorage.setItem('token',res.token);
                this.showError=false;
                Axios.defaults.headers.common['Authorization']=res.token;
                this.$store.commit('auth',res.token);
                this.$store.dispatch('getuser');
                this.$router.push('/dashboard');
            }else{
                this.showError=true;
                this.titleError=res.title
            }
      }
    }
}
</script>

<style  scoped>
.Login-box{
  max-width: 400px;
  padding: 10px;
}
</style>