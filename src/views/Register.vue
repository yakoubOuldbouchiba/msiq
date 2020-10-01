<template v-slot:activator="{on}">
      <v-card>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field 
                        v-model="user.userName" 
                        label="Nom d'utilisateur*"
                        :rules="[v => !!v || 'Cet champs est obligatoire']" 
                        prepend-icon="mdi-account" 
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field 
                        v-model="user.lastName" 
                        label="Nom*" 
                        :rules="[v => !!v || 'Cet champs est obligatoire']" 
                        prepend-icon="mdi-nothing" 
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
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
                    <v-col cols="12" md="6">
                        <v-text-field 
                        v-model="user.passWord" 
                        label="Mot de passe*" 
                        :rules="[v => !!v || 'Cet champs est obligatoire']" 
                        prepend-icon="mdi-lock" 
                        type="password"
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field 
                        v-model="user.passWordConfirm" 
                        label="Confirme mot de passe*" 
                        :rules="[v => !!v || 'Cet champs est obligatoire']"
                        prepend-icon="mdi-nothing"  
                        type="password"
                        required>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field 
                        v-model="user.fonction" 
                        label="Fonction*" 
                        :rules="[v => !!v || 'Cet champs est obligatoire']"
                        prepend-icon="mdi-briefcase" 
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
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
                    <v-col cols="12" md="6">
                        <v-text-field 
                        v-model="user.structure" 
                        label="Structure*"
                        :rules="[v => !!v || 'Cet champs est obligatoire']" 
                        prepend-icon="mdi-office-building" 
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="user.departement" 
                        label="Département"
                        prepend-icon="mdi-nothing">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="user.email" 
                        label="Email*"
                        :rules="[v => !!v || 'Cet champs est obligatoire']" 
                        prepend-icon="mdi-email" 
                        required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="user.mobile" 
                        label="Numéro de Tél*"
                        :rules="[v => !!v || 'Cet champs est obligatoire']" 
                        prepend-icon="mdi-phone" 
                        required>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
      </v-form>
      </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <span color="red darken-1">* champs obligatoires</span>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="colse">fermer</v-btn>
              <v-btn :disabled="!valid" color="green darken-1" text @click="submit">envoyer</v-btn>
           </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {
    data: () => ({
      valid:true,
      user:{                           
        userName: '',
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
      },
      state: false
    }),
    methods : {
        async submit(){
            (this.$refs.form.validate());
            await this.$store.dispatch('creeCompte' , this.user).then(this.$refs.form.reset())
            if(this.$store.state.authenticed==true){
              console.log('I am login')
              this.$router.replace({name:"Dashboard"});
            }else{
              console.log('I am not login')
           }  
        },
        colse(){
          this.$refs.form.reset();
          this.$router.push('/');
        }
    }
}
</script>