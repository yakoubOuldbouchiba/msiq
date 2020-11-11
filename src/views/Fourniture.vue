<template>
    <div class="Fourniture">
        <v-container>
             <v-data-table 
                :headers ="headers"
                :items="Fournitures" 
                class="elevation-1"
                :search="search"
                >
                <template v-slot:top>
                    <v-toolbar flat class="pa-5">
                        <h3 class="blue--text my-3 mx-3">
                            <v-icon left class="blue--text"> edit </v-icon>
                            La liste des Fournitures 
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
                            <span class="blue--text"> ajouter fourniture </span>
                        </v-btn>
                        <EditFourniture
                            name="Fourniture" 
                            :editIndex="editedIndex" 
                            :item="item"  
                            :dialogEdit="dialog"
                            @add = "ajouterFourniture"
                            @edit = "editerFourniture"
                            @close="close"
                            ></EditFourniture>
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
import axios from '../../node_modules/axios'
import EditFourniture from '../components/EditFourniture'
export default {
    name : "Fourniture",
    components :{EditFourniture},
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
        this.Fournitures =(await axios.get("http://localhost:3030/fournitures")).data
    },
    methods:{
        // edit & editItem use to lancer the pupup
        edit : function(){
            this.dialog=true;
        },
        editItem : function(item){
            this.item=item;
            this.editedIndex = this.Fournitures.indexOf(item);
            this.dialog=true;
        },
        async deleteItem (item){
            let deleted =(await axios.delete("http://localhost:3030/fourniture/"+item.code_object)).data
           if(deleted){
                const index = this.Fournitures.indexOf(item)
                confirm('vous êtes sur que vous voulez supprimer ce objet ?') && this.Fournitures.splice(index, 1)
                this.Done=true;
                this.msg="Le objet est supprimé"
           }else{
               this.Errr=true
               this.msg='Le objet est exister dans le magasin ! La quantité doit être égale à zero '
           }
        },
        async ajouterFourniture  (value){
            console.log(value)
            await axios.post("http://localhost:3030/fourniture",value);
            this.Fournitures.push(value);
             this.item = {
                code_object : 'xxxxx',
                designation :'xxxx',
                quantite :'0'
            };
            this.dialog=false;
        },
        async editerFourniture (value){
            // modifier au niveau de data base
            (await axios.put("http://localhost:3030/fourniture/"+value.Founiture.code_object,value.Founiture));
             this.dialog=false;
        },
        close :function(){
            this.item = {
                code_object : 'xxxxx',
                designation :'xxxx',
                quantite :'0'
            };
            this.dialog=false;
        }
    },
    data(){
        return{
        Done: false,
        Errr: false,
        msg :'',
        search:'',
        editedIndex:'-1',
        item : {
            code_object : 'xxxxx',
            designation :'xxxx',
            quantite :'0'
        },
        dialog :false,
        headers: [
          {
            text: 'Code objet',
            align: 'start',
            value: 'code_object',
          },
          { text: 'Designation', value: 'designation' },
          { text: 'Quantite', value: 'quantite' },
          { text: 'actions' , value :'actions' ,sortable : false}
        ],
        Fournitures : []
        }
    }
}
</script>