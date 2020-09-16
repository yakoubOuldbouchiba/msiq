<template>
    <v-menu max-width ="290px" >
        <template v-slot:activator="{attrs , on}">
            <v-text-field 
                v-bind="attrs"
                v-on="on"
                :label="label"
                :prepend-icon="icon"
                :value="heure"
            ></v-text-field>
        </template>
        <v-time-picker v-model="heure"  @click:minute="$refs.menu.save(time)"></v-time-picker>
    </v-menu>
</template>

<script>
export default {
    name:'Heure',
    props :['label','icon'],
    data(){
        return{
            heure : null
        }
    }
}
</script>