<template>
    <div class="mt-8">
    <v-container class="fill-height" fluid>
      <v-layout class="justify-center align-center">
        <v-flex xs10 sm6 md4 >
          <v-card>
            <v-card-title class="amber darken-1 indigo--text text--darken-4"> 
              <v-flex row class="justify-center">
                <h2>Crée un nouveau compte</h2>
              </v-flex>
            </v-card-title>
            <v-form  class="pa-5">
              <v-select :items="items" label="fonction" prepend-icon="mdi-briefcase" outlined v-model="user.role" ></v-select>
              <v-text-field v-model="user.userName"  label="Nom d'utilisateur" type="text" prepend-icon="mdi-account"  outlined></v-text-field>
              <v-text-field v-model="user.password"  label="Mot de passe" type="password" prepend-icon="mdi-lock"  outlined></v-text-field>
              <v-flex row class="justify-center">
                <v-btn large class="primary" @click="creeCompte">Crée un compte</v-btn>
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
    data: () => ({
      user : {
        userName:'',
        role :'',
        password :'',
        avater :''
      },
      items: ['Administrator', 'Chef de parc', 'Directeur', 
      'Client','Agent de Tirage']
    }),
    methods : {
        async creeCompte(){
            await this.$store.dispatch('creeCompte' , this.user)
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