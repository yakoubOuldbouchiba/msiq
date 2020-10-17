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
                :value="date"
                >
            </v-text-field>
        </template>
        <v-date-picker v-model="date" @change="$emit('date' , date)">
            
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
            date :this.value
        }
    }
    
}
</script>