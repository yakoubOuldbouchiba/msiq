<template>
    <v-dialog tile v-model="dialog" width="900" persistent>
            <v-card >
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
    name:"Relex",
    props:['dialogRelex','name','icon','color'] ,
    computed : {
        dialog : {
            get : function(){
                return this.dialogRelex
            },
            set : function(a){
                this.dialogRelex=a
            }
        }
    },
    methods : {
        close : function(){
            var value = {name : this.name , dialog : !this.dialog};
            this.$emit('updateDialog',value)
        }
    }
}
</script>

<style>

</style>