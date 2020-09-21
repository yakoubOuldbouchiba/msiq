<template>
    <v-dialog v-model="$store.state.dialogFourniture" 
        persistent 
        width="900">
            <v-card tile >
                <v-toolbar flat dark :color='color'  >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">{{icon}}</v-icon> 
                        {{name}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-card-text></v-card-text>
                <v-card-actions>
                    <v-form>
                        <v-btn :class="color" class="white--text">Envoyer demande</v-btn>
                    </v-form>
                </v-card-actions>
            </v-card>  
    </v-dialog>
</template>

<script>
export default {
    name:"Fourniture",
    props:['name','icon','color'] ,
    methods :{
        close : function(){
            //var value = {name : this.name , dialog:!this.dialog}
            this.$store.commit('updateDialogFourniture');
        }
    },
}
</script>

<style>

</style>