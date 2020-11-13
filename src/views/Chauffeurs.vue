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
        <v-snackbar
        v-model="Done"
        :timeout="5000"
        color="green"
        outlined
        class="mb-5"
        >
        {{ msg}}

        <template v-slot:action="{ attrs }">
            <v-btn
            color="green"
            text
            v-bind="attrs"
            @click="Done = false"
            >
            Close
            </v-btn>
        </template>
       </v-snackbar>
       <v-dialog v-model="Errr" max-width="290">
        <v-card>
            <v-card-title class="headline red lighten-2">
            Error
            </v-card-title>
            <v-card-text  class="mt-10 title">{{msg}}</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                text
                @click="Errr = false"
            >
                OK
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
            confirm('Vous êtes sur que vous voulez supprimer le chauffeur ?')
            let deleted = (await Axios.delete("http://localhost:3030/chauffeur/"+item.chauffeur_id)).data;
            if(deleted){
                const index = this.Chauffeurs.indexOf(item)
                this.Chauffeurs.splice(index, 1)
                this.Done=true;
                this.msg="Le chauffeur est supprimé"
           }else{
               this.Errr=true
               this.msg='Le chauffeur est attribuer une ou plusieurs demande véhicule'
           }
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
        Done: false,
        Errr: false,
        msg :'',
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