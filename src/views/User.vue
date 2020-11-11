<template>
    <div class="user">
        <v-container>
             <v-data-table 
                    :headers ="headers"
                    :items="$store.state.users" 
                    class="elevation-1"
                    :search="search"
                >
                <template
                    v-slot:top
                >
                <v-toolbar flat class="pa-3">
                    <h3 class="blue--text my-3 mx-3">
                        <v-icon left class="blue--text">group</v-icon>
                        La liste des employees
                    </h3>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        label="search"
                        prepend-icon="search"
                    >
                    </v-text-field>
                    <v-btn text large color="blue" @click="edit">
                        <v-icon left class="blue--text">add_box</v-icon>
                        <span class="blue--text"> ajouter employee </span>
                    </v-btn>

                </v-toolbar>
                </template>
                <template v-slot:item.actions="{item}">
                    <v-btn text fab>
                        <v-icon  @click="editItem(item)">edit</v-icon>
                    </v-btn>
                    <v-btn text fab v-if="item.shown==1" @click="deleteItem(item)">
                        <v-icon   >explore_off</v-icon>
                    </v-btn>
                    <v-btn text fab v-else @click="deleteItem(item)">
                        <v-icon   >explore</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>

export default {
    name : "Users",

    async created(){
        this.$store.dispatch('getTeam');
    },
    methods:{
        //edit & editItem use to open pupup & close use to close pupup 
        edit : function(){
            this.dialog=true;
        },
        editItem : function(item){
            this.item=item;
            this.editedIndex= this.Chauffeurs.indexOf(item);
            this.dialog=true;
        },
        close : function(){
            this.dialog=false;
        },
        deleteItem : function(item){
            // 1- we should assigne an anthors cars for the demandesV have this car    
            // 2- deleting for db nodejs part
            //var email = item.email;
            this.$store.dispatch('deleteUser',item);
        }
    },
    data(){
        return{
        search:'',
        dialog : false,
        editedIndex : '-1',
        item :{
            idChauffeur : "xxxx",
            nom : "xxxxxx",
            prenom : "xxxxx",
            permis : "xxxx x"
        }
        ,headers: [
          {
            text: 'email',
            align: 'start',
            value: 'email',
          },
          { text: 'Nom', value: 'nomUtilisateur' },
          { text: 'Prénom', value: 'prenomUtilisateur' },
          { text: 'fonction', value: 'fonction' },
          { text: 'actions', value: 'actions' }
        ]
        }
    }
}
</script>