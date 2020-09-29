<template>
    <div class="Chauffeurs">
        <v-container>
             <v-data-table 
                    :headers ="headers"
                    :items="Chauffeurs" 
                    class="elevation-1"
                    :search="search"
                >
                <template
                    v-slot:top
                >
                <v-toolbar flat class="pa-3">
                    <h3 class="blue--text my-3 mx-3">
                        <v-icon left class="blue--text">airline_seat_recline_normal</v-icon>
                        La liste des chauffeurs
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
                        <span class="blue--text"> ajouter chauffeur </span>
                    </v-btn>
                    <Edit 
                        name='Chauffeur'
                        :dialogEdit="dialog"
                        :editIndex="editedIndex"
                        :item = "item"
                        @close="close"
                        @add="ajouterChauffeur"
                        @edit="editerChauffeur"
                    ></Edit>

                </v-toolbar>
                </template>
                <template v-slot:item.actions="{item}">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small @click="deleteItem(item)">delete</v-icon>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
import Edit from '../components/Edit'
export default {
    name : "Chauffeurs",
    components :{Edit},
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
            var index = this.Chauffeurs.indexOf(item);
            this.Chauffeurs.splice(index ,1)
        },
        ajouterChauffeur : function(value){
            //bdd function nodejs
            this.Chauffeurs.push(value);
            this.item={
                idChauffeur : "xxxx",
                nom : "xxxxxx",
                prenom : "xxxxx",
                permis : "xxxx x"
           }
           this.dialog=false;
        },
        editerChauffeur : function(){
            //add bdd function nodejs
            this.item={
                idChauffeur : "xxxx",
                nom : "xxxxxx",
                prenom : "xxxxx",
                permis : "xxxx x"
           }
           this.dialog=false;  
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
            text: 'ID chauffeur',
            align: 'start',
            value: 'idChauffeur',
          },
          { text: 'Nom', value: 'nom' },
          { text: 'Prénom', value: 'prenom' },
          { text: 'Permis', value: 'permis' },
          { text: 'actions', value: 'actions' }
        ],
        Chauffeurs : [
                {
                    idChauffeur : "206",
                    nom : "Salmi",
                    prenom : "Youef",
                    permis : "Type B"

                },
                {
                    idChauffeur : "207",
                    nom : "amar ben amar",
                    prenom : "hossin",
                    permis : "Type B"
                },                {
                    idChauffeur: "208",
                    nom : "Larbi",
                    prenom : "mouh",
                    permis : "Type B"

                }
            ]
        }
    }
}
</script>