<template>
    <v-dialog v-model="dialog" width="600">
        <v-card class="pa-4">
            <v-card-title>
                <v-icon left>message</v-icon>
                <span class="grey--text">new message</span>
                <v-spacer></v-spacer>
                <v-icon>close</v-icon>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="msg.objet" label="objet"></v-text-field>
                <v-textarea
                    v-model="msg.content"
                    label="type your message"
                >
                </v-textarea>
            </v-card-text>
            <v-card-actions >
                <v-btn class="primary" @click="submit()">
                    <v-icon left>send</v-icon>
                    <span>envoyer message</span>
                </v-btn>
                <v-btn>
                    <v-icon>close</v-icon>
                    <span>annuler message</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name : 'NewMessage',
    props : ['dialogNewMessage'],
    computed :{
      dialog :{ 
       get: function(){
          return this.dialogNewMessage
        },
        set : function(a){
            this.dialogNewMessage=a;
        }
      }
    },
    methods : {
       async submit (){
           try{
               this.$store.dispatch('newMessage' , this.msg)
                this.$store.commit('updateDialog')
                
           }catch(error){
               console.error(error);
           }

        }
    },
    data(){
        return{
            msg : {
                sender:'Yakoub Ould bouchiba',
                avatar:'avatar1.jpg',
                content:'' 
            }
        }
    }
}
</script>