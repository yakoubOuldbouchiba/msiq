<template>
    <div class="Vehicules">
        <v-container>
             <v-data-table 
                :headers ="headers"
                :items="Vehicules" 
                class="elevation-1"
                :search="search"
                >
                <template v-slot:top>
                    <v-toolbar flat class="pa-5">
                        <h3 class="blue--text my-3 mx-3">
                            <v-icon left class="blue--text"> commute </v-icon>
                            La liste des véhicules 
                        </h3>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            label="search"
                            prepend-icon="search"
                            class="blue--text"
                        > </v-text-field>
                         <v-btn text  large color="blue" @click="edit()">
                            <v-icon left class="blue--text">add_box</v-icon>
                            <span class="blue--text"> ajouter véhicule </span>
                        </v-btn>
                        <Edit
                            name="Vehicule" 
                            :editIndex="editedIndex" 
                            :item="item"  
                            :dialogEdit="dialog"
                            @add = "ajouterVehicule"
                            @edit = "editerVehicule"
                            @close="close"
                            ></Edit>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                     <v-icon small class="mr-2" @click="editItem(item)" >
                       edit
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                       delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
import axios from '../../node_modules/axios'
import Edit from '../components/Edit'
export default {
    name : "Vehicules",
    components :{Edit},
    computed : {
        newHeaders : function(){ 
            var newHeaders = []
            for(let i=0 ; i < this.headers.length - 1;i++){
                newHeaders.push(this.headers[i])
            }
            return newHeaders;
        }
    },
    async created(){
        this.Vehicules =(await axios.get("http://localhost:3030/vehicules/")).data
    },
    methods:{
        // edit & editItem use to lancer the pupup
        edit : function(){
            this.dialog=true;
        },
        editItem : function(item){
            this.item=item;
            this.editedIndex = this.Vehicules.indexOf(item);
            this.dialog=true;
        },
        async deleteItem (item){
            axios.delete("http://localhost:3030/vehicule/"+item.matricule)
            const index = this.Vehicules.indexOf(item)
            confirm('vous êtes sur que vous voulez supprimer cette véhicule ?') && this.Vehicules.splice(index, 1)
        },
        async ajouterVehicule  (value){
            (await axios.post("http://localhost:3030/vehicule",value));
            this.Vehicules.push(value);
             this.item = {
                matricule : 'xxxxx-xxx-xx',
                nom :'xxxx',
                annee: 'xxxx',
                type_vehicule : 'xxxx'
            };
            this.dialog=false;
        },
        editerVehicule :function(){
            // modifier au niveau de data base
             this.item = {
                name :'xxxx',
                matricule : 'xxxxx-xxx-xx',
                annee: 'xxxx',
                type : 'xxxx'
            };
            this.dialog=false;
        },
        close :function(){
            this.item = {
                name :'xxxx',
                matricule : 'xxxxx-xxx-xx',
                annee: 'xxxx',
                type : 'xxxx'
            };
            this.dialog=false;
        }
    },
    data(){
        return{
        search:'',
        editedIndex:'-1',
        item : {
            matricule : 'xxxxx-xxx-xx',
            nom :'xxxx',
            annee: 'xxxx',
            type_vehicule : 'xxxx'
        },
        dialog :false,
        headers: [
          {
            text: 'name',
            align: 'start',
            value: 'nom',
          },
          { text: 'Matricule', value: 'matricule' },
          { text: 'année', value: 'annee' },
          { text: 'type', value: 'type_vehicule' },
          { text: 'actions' , value :'actions' ,sortable : false}
        ],
        Vehicules : []
        }
    }
}
</script>