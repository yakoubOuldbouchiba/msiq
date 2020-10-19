<template>
    <v-menu 
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="heure"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
     >
        <template v-slot:activator="{attrs , on}">
            <v-text-field 
                :label="label"
                v-bind="attrs"
                v-on="on"
                prepend-icon="alarm"
                :value="heure_computed"
                :rules="[v => !!v || 'Cet champs est obligatoire']"
            ></v-text-field>
        </template>
        <v-time-picker 
            v-if="menu2"
            v-model="heure_computed" 
            @click:minute="$refs.menu.save(heure)"
            @change="$emit('heure' , heure+':00')" >
    </v-time-picker>
    </v-menu>
</template>

<script>
export default {
    name:'Heure',
    props :['label' , 'value'],
    data(){
        return{
            menu2: false,
            heure : this.value
        }
    },
    computed : {
        heure_computed :{
            get : function(){
                return this.value
            },
            set : function(value){
                this.heure = value
            }
        }
    }
}
</script>