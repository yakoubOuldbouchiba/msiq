<template>
    <v-dialog v-model="$store.state.dialogPEC" persistent width="900">
            <v-card tile >
                <v-toolbar flat dark :color='color'  >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">{{icon}}</v-icon> 
                        {{name}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Destitation"></v-text-field>
                        <v-btn :class="color" class="white--text ">Envoyer demande</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>  
    </v-dialog>
</template>

<script>
export default {
    name:"PEC",
    props:[ 'name' ,'color','icon'] ,
    methods:{
        close : function(){
            //var value = {name : this.name , dialog:!this.dialog};
            this.$store.commit('updateDialogPEC')
        }
    }
  
}
</script>

<style>

</style>