<template>
    <v-dialog v-model="$store.state.dialogNewMessage" width="600">
        <v-card class="pa-4">
            <v-card-title>
                <v-icon left>message</v-icon>
                <span class="grey--text">new message</span>
                <v-spacer></v-spacer>
                <v-icon>close</v-icon>
            </v-card-title>
            <v-card-text>
                <v-text-field  label="objet"></v-text-field>
                <v-textarea
                    v-model="content"
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
    methods : {
       async submit (){
           try{
               this.$store.dispatch('newMessage' , this.content)
               this.$store.commit('updateDialogNewMessage')
                
           }catch(error){
               console.error(error);
           }

        }
    },
    data(){
        return{
                content:''    
        }
    }
}
</script>