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
import Axios from 'axios';
import Edit from '../components/Edit'
export default {
    name : "Chauffeurs",
    components :{Edit},
    methods:{
        //edit & editItem use to open pupup & close use to close pupup 
        edit : function(){
            this.dialog=true;
        },
        async editItem (item){
            this.item=item;
            this.editedIndex= this.Chauffeurs.indexOf(item);
            this.dialog=true;
        },
        close : function(){
            this.dialog=false;
        },
        async deleteItem (item){
            // 1- we should assigne an anthors cars for the demandesV have this car    
            // 2- deleting for db nodejs part
            Axios.delete("http://localhost:3030/chauffeur/"+item.chauffeur_id);
            var index = this.Chauffeurs.indexOf(item);
            this.Chauffeurs.splice(index ,1)
        },
        async ajouterChauffeur(value){
            console.log(value);
            (await Axios.post("http://localhost:3030/chauffeur",value));
            this.Chauffeurs=(await Axios.get("http://localhost:3030/chauffeurs")).data
            this.item={
                nom : "xxxxxx",
                prenom : "xxxxx",
                type_permis : "xxxx x",
                telephone : "x xxx xx xx xx",
                email : "xxxxxxxxxxxxxxxxx"
           }
           this.dialog=false;
        },
        editerChauffeur : function(item){
            console.log(item)
            Axios.put("http://localhost:3030/chauffeur/"+item.item.chauffeur_id , item.item);
            this.item={
                nom : "xxxxxx",
                prenom : "xxxxx",
                type_permis : "xxxx x",
                telephone : "x xxx xx xx xx",
                email : "xxxxxxxxxxxxxxxxx"
           }
           this.dialog=false;  
        }
    },
    async created(){
        this.Chauffeurs=(await Axios.get("http://localhost:3030/chauffeurs")).data
    }
    ,
    data(){
        return{
        search:'',
        dialog : false,
        editedIndex : '-1',
        item :{
            nom : "xxxxxx",
            prenom : "xxxxx",
            type_permis : "xxxx x",
            telephone : "x xxx xx xx xx",
            email : "xxxxxxxxxxxxxxxxx"
        }
        ,headers: [
          {
            text: 'Chauffeur ID',
            align: 'start',
            value: 'chauffeur_id',
          },
          { text: 'Nom', value: 'nom' },
          { text: 'Prénom', value: 'prenom' },
          { text: 'Permis', value: 'type_permis' },
          { text: 'Telephone', value: 'telephone' },
          { text: 'email', value: 'email' },
          { text: 'actions', value: 'actions' }
        ],
        Chauffeurs : []
        }
    }
}
</script>