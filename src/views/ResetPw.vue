<template>
    <div class="mx-auto my-12 pa-5">
        <v-row v-if="end">
            <v-col
                cols="12" sm="7"
                class="mx-auto"
            >
                <v-alert
                class="mx-auto my-12 pa-5"
                width="500px"
                dense
                outlined
                type="error"
                >
                    <b>Désole , Le lien est mort</b> 
                </v-alert>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col
                cols="12" sm="7"
                class="mx-auto"
            >
            <v-form v-model="valid" ref="form">
                <v-text-field 
                    v-model="password" 
                    label="Tapez un noveau mot de passe*" 
                    :rules="MDPRules" 
                    prepend-icon="mdi-lock" 
                    type="password"
                    required>
                </v-text-field>
                <v-text-field 
                    v-model="passwordConfirm" 
                    label="Confirme le mot de passe*" 
                    :rules="PasswordRule"
                    prepend-icon="mdi-lock"  
                    type="password"
                    required>
                    </v-text-field>
                <v-btn
                    large
                    outlined
                    class="ma-2"
                    color="indigo"
                    :disabled="!valid"
                    @click="reset()"
                >
                    Envoyer
                </v-btn>
            </v-form>
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
import Axios from 'axios';
import jwt from 'jsonwebtoken'
export default {
    name:"ResetPW",
    data(){
        return({
            password: '',
            passwordConfirm: '',
            end:false,
            valid:true,
            Done: false,
            Errr: false,
            msg: '',
            MDPRules: [
                v => !!v || 'Ce champs est obligatoire',
                v => v.length > 7 || 'Votre mot de passe doit contenir au moins 8 caractères',
            ],
            PasswordRule: [
                v => !!v || 'Confirm password',
                v => this.password == v || 'Mot de passe incorrect'
            ]
        })
    },created(){
          let done = false;
          jwt.verify(this.$route.params.token,'KEY/**/Secret', async function(err){
                if(err) {
                    done = true;
                }
           })
           this.end=done
    },
    methods:{
        async reset(){
            await Axios.post('/api/Reset',{token : this.$route.params.token , pw : this.password})
            .then(
                res => {
                this.msg = res.data.title,
                this.Done = true
                this.$router.push('/Login')
                },
                err => {
                this.Errr = true,
                this.msg = err.response.data.title
                }
            )
        }
    }
}
</script>