<template>
    <v-dialog max-width="600" persistent v-model="dialog">
        <v-card>
            <v-card-title>
                <v-icon left>{{formTitleIcon}}</v-icon>
                <span class="headline grey--text">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12"  sm="6" md="4" >
                        <v-text-field v-model="item.code_produit" label="code objet"></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="6" md="4" >
                        <v-text-field v-model="item.designation" label="designation"></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="6" md="4" >
                        <v-text-field v-model="item.quantite" label="quantite"></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()" >Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save()" >Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name:'Edit',
    props :['name','dialogEdit','editIndex' , 'item'],
    computed :{

        formTitle : function() {
            return this.editIndex =="-1" ? 'ajouter '+this.name : 'modifier '+this.name
        },
        formTitleIcon : function() {
            return this.editIndex =="-1" ? 'add_box' : 'edit'
        },
        dialog : {
            get : function(){
                return this.dialogEdit;
            },
            set : function(a){
                this.editIndex=a;
            }
        }
    },
    methods :{
        close : function(){
            this.$emit('close' , !this.dialogEdit)
        },
        save : function(){
            if(this.editIndex =='-1'){
                this.$emit('add' , this.item)
            }else{
                this.$emit('edit' , {editIndex: this.editIndex, vehicule : this.item})
            }
        }
    }
}
</script>