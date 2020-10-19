<template>
    <v-menu 
        max-width="290px"  
        :close-on-content-click="false" 
        ref="menu">
        <template v-slot:activator="{attrs , on}">
            <v-text-field 
                v-bind="attrs"
                prepend-icon="date_range"
                :label="label"
                :rules="[v => !!v || 'Cet champs est obligatoire']"
                v-on="on"
                :value="date_computed"
                >
            </v-text-field>
        </template>
        <v-date-picker v-model="date_computed" @change="$emit('date' , date)">
            
            <v-flex>
                <v-btn text class="primary float-right" 
                    @click="$refs.menu.save(date)"
                >OK</v-btn>        
            </v-flex>
        </v-date-picker>
    </v-menu>
</template>
<script>
export default {
    props: ['label' , 'value'],
    data(){
        return {
            date :null
        }
    },computed :{
        date_computed : {
            get :function(){
                return this.value
            },
            set : function(value){
                this.date=value
            }
        }
    }
    
}
</script>