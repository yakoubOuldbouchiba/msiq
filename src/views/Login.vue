<template>
    <div class="mt-8">
    <v-container class="fill-height" fluid>
      <v-layout class="justify-center align-center">
        <v-flex xs10 sm6 md4 >
          <v-card>
            <v-card-title class="amber darken-1 indigo--text text--darken-4"> 
              <v-flex row class="justify-center">
                <h2>Bienvenue</h2>
              </v-flex>
            </v-card-title>
            <v-form  class="pa-5">
              <v-select :items="items" label="fonction" prepend-icon="mdi-briefcase" outlined v-model="role" ></v-select>
              <v-text-field v-model="userName"  label="Nom d'utilisateur" type="text" prepend-icon="mdi-account" required outlined></v-text-field>
              <v-text-field v-model="password"  label="Mot de passe" type="password" prepend-icon="mdi-lock" required outlined></v-text-field>
              <v-flex row class="justify-center">
                <v-btn class="primary" @click="login">Connexion</v-btn>
                <v-spacer></v-spacer>
                <v-btn  text class="blue--text"  to="/register">cree un nouveau compte</v-btn>
              </v-flex>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
</template>

<script>

export default {
    name:'Login'
    ,data: () => ({
      socket:null,
      userName: '',
      password: '',
      items: ['Administrator', 'Chef de parc', 'Directeur', 
      'Client','Agent de Tirage','Agent de magasin'],
      role:''
    }),
    methods:{
      async login (){
        await this.$store.dispatch("login",{userName:this.userName ,password:this.password , role : this.role })
        if(this.$store.state.authenticed==true){
          console.log('I am login')
          this.$router.replace({name:"Dashboard"});
        }else{
          console.log('I am not login')
          
        }
      }
    }
}
</script>