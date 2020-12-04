<template>
    <div class="mx-auto my-12 pa-5">
        <v-row>
            <v-col
                cols="12" sm="7"
                class="mx-auto"
            >
            <v-form v-model="valid" ref="form">
                <v-text-field
                    v-model="email"
                    label="Tapez votre email"
                    :rules="Emailrules" 
                    prepend-icon="mdi-email" 
                    required
                >
                </v-text-field>
                <v-btn
                    large
                    outlined
                    class="ma-2"
                    color="indigo"
                    :disabled="!valid"
                    @click="forget()"
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
export default {
    name:"ForgetPW",
    data(){
        return({
            email:'',
            valid:true,
            Done: false,
            Errr: false,
            msg: '',
            Emailrules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail inccorect',
            ]
        })
    },
    methods:{
        async forget(){
           await Axios.post('/api/forget',{email : this.email}).then(
               res=>{
                   if(res.data.ok==false){
                       this.Errr=true
                       this.msg=res.data.title
                   }else if(res.data.ok==true){
                       this.Done=true
                       this.msg=res.data.title
                   }
               }
           )
        }
    }
}
</script>