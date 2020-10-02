<template>
    <div class="Fourniture">
        <v-container>
             <v-data-table 
                :headers ="headers"
                :items="Produits" 
                class="elevation-1"
                :search="search"
                >
                <template v-slot:top>
                    <v-toolbar flat class="pa-5">
                        <h3 class="blue--text my-3 mx-3">
                            <v-icon left class="blue--text"> devices </v-icon>
                            La liste des produits
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
                            <span class="blue--text"> ajouter produit </span>
                        </v-btn>
                        <EditProduit
                            name="Produit" 
                            :editIndex="editedIndex" 
                            :item="item"  
                            :dialogEdit="dialog"
                            @add = "ajouterProduit"
                            @edit = "editerProduit"
                            @close="close"
                            ></EditProduit>
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
import EditProduit from '../components/EditProduit'
export default {
    name : "Fourniture",
    components :{EditProduit},
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
        this.Produits =(await axios.get("http://localhost:3030/produits")).data
    },
    methods:{
        // edit & editItem use to lancer the pupup
        edit : function(){
            this.dialog=true;
        },
        editItem : function(item){
            this.item=item;
            this.editedIndex = this.Produits.indexOf(item);
            this.dialog=true;
        },
        async deleteItem (item){
            axios.delete("http://localhost:3030/produit/" +item.code_produit)
            const index = this.Produits.indexOf(item)
            confirm('vous êtes sur que vous voulez supprimer ce produit ?') && this.Produits.splice(index, 1)
        },
        async ajouterProduit  (value){
            (await axios.post("http://localhost:3030/produit",value));
            this.Produits.push(value);
             this.item = {
                code_produit : 'xxxxx',
                designation :'xxxx',
                quantite :'0'
            };
            this.dialog=false;
        },
        editerProduit :function(){
            // modifier au niveau de data base
             this.item = {
                code_produit : 'xxxxx',
                designation :'xxxx',
                quantite :'0'
            };
            this.dialog=false;
        },
        close :function(){
            this.item = {
                code_produit : 'xxxxx',
                designation :'xxxx',
                quantite :'0'
            };
            this.dialog=false;
        }
    },
    data(){
        return{
        search:'',
        editedIndex:'-1',
        item : {
            code_produit : 'xxxxx',
            designation :'xxxx',
            quantite :'0'
        },
        dialog :false,
        headers: [
          {
            text: 'Code produit',
            align: 'start',
            value: 'code_produit',
          },
          { text: 'Designation', value: 'designation' },
          { text: 'Quantite', value: 'quantite' },
          { text: 'actions' , value :'actions' ,sortable : false}
        ],
        Produits : []
        }
    }
}
</script>