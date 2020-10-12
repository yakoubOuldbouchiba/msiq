<template>
  <v-autocomplete
        v-model="email"
        prepend-icon="person_add"
        :items="items"
         dense
        item-text="email"
        :label="label"
        @input="$emit ('update:utilisateur',email)"
      ></v-autocomplete>
</template>
<script>
export default {
  props:['items' , 'label'],
  data(){
        return {
            email :null
        }
    }
}
</script>