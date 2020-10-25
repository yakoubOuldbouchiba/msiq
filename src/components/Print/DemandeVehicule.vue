<template>
    <v-btn
        class="mx-2"
        outlined
        color="cyan"
        fab
        dark
        x-small
        @click="print"
    >
        <v-icon dark>
        print
        </v-icon>
    </v-btn>
</template>
<script>
export default {
    props : ['ID'],
    data(){
        return{}
    },
    methods :{
        print(){

        }
    }
}
</script>