<template>
    <v-menu max-width="290px" >
        <template v-slot:activator="{attrs , on}">
            <v-text-field 
                :label="label" 
                :prepend-icon="icon"
                v-bind="attrs"
                v-on="on"
                :value="date"
                >
            </v-text-field>
        </template>
        <v-date-picker v-model="date"></v-date-picker>
    </v-menu>
</template>
<script>
export default {
    props:['label' , 'icon'],
    data(){
        return {
            date :null
        }
    }
    
}
</script>