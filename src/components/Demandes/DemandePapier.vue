<template>
    <div>
        <v-dialog 
            :retain-focus="false" 
            v-model="dialog" 
            persistent 
            width="700">
                <v-card tile >
                    <v-toolbar flat dark :color='color'  >
                        <v-toolbar-title> 
                            <v-icon large left class="white--text">{{icon}}</v-icon> 
                            <span v-if="type=='update'&&dialog==true">Modifier la {{name}} numréo {{objetsDF[0].demande_F_ID}}</span>
                            <span v-else >{{name}}</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" >
                            <v-row justify="center" v-if="type == 'Traiter'"> 
                      <v-col cols="12" sm="5"> 
                        <v-text-field 
                          :value="objetsDF[0].nomUtilisateur+' '+objetsDF[0].prenomUtilisateur"
                          disabled
                          label="Nom et prenom"
                          prepend-icon="mdi-account"></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="5"> 
                        <v-text-field  
                        :value="objetsDF[0].departement"
                        disabled
                        label="Departement"
                        prepend-icon="mdi-office-building"></v-text-field>
                      </v-col>  
                    </v-row>
                            <v-simple-table>
                                <template v-slot:default color="white">
                                    <thead>
                                        <tr>
                                            <th>
                                                <v-btn v-if=" type != 'Traiter'"
                                                    @click="addNewObject()"
                                                    color="cyan"
                                                    fab
                                                    dark
                                                    small
                                                    >
                                                    <v-icon dark>
                                                        add
                                                    </v-icon>
                                                </v-btn> 
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Objet</th>
                                            <th>Quantite damandée</th>
                                            <th>actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(objet,index) in objetsDF" :key="index">
                                            <td>
                                                <v-autocomplete
                                                    flat
                                                    solo
                                                    :items="objets"
                                                    v-if="type != 'new'"
                                                    v-model="objet.code_object"
                                                    hide-selected
                                                    :disabled='!Editable'
                                                    item-text="designation"
                                                    item-value="code_object"
                                                    prepend-inner-icon="edit"
                                                    :rules="[v => !!v || 'Ce champs est obligatoire']"
                                                ></v-autocomplete>
                                                <v-autocomplete
                                                    flat
                                                    solo
                                                    :items="objets"
                                                    v-else
                                                    v-model="objet.code_object"
                                                    hide-selected
                                                    item-text="designation"
                                                    item-value="code_object"
                                                    :label="'Objet '+(index + 1)"
                                                    prepend-inner-icon="edit"
                                                    :rules="[v => !!v || 'Ce champs est obligatoire']"
                                                ></v-autocomplete>
                                            </td>
                                            <td>
                                                <v-text-field
                                                    flat
                                                    solo
                                                    :disabled ='!Editable'
                                                    v-model="objet.qty_demande"
                                                    label="Quantite damande"
                                                    type="number"
                                                    min=0
                                                    :rules="[v => !!v || 'Ce champs est obligatoire']"
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-btn
                                                    @click="deleteObject(index)"
                                                    color="secondary"
                                                    fab
                                                    :disabled="!Editable"
                                                    dark
                                                    small
                                                    >
                                                    <v-icon dark>
                                                        delete
                                                    </v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>

                                </template>
                            </v-simple-table>   
                            <v-row justify="center" v-if="type=='Traiter' && ($store.state.user.typeUtilisateur != 'Agent de magasin') || objetsDF[0].etat =='Rejetee'"> 
                                <v-col cols="12" sm="8"> 
                                    <v-textarea
                                    v-model="objetsDF[0].motif"
                                    :disabled="objetsDF[0].etat =='Rejetee'"
                                    label="Motif" 
                                    prepend-icon="mdi-flag-outline"></v-textarea>
                                </v-col>   
                            </v-row>                  
                            <!----- les button ------------>
                            <v-row justify="center"> 
                                <v-btn v-if="type=='Traiter' && ($store.state.user.typeUtilisateur != 'Agent de magasin')" 
                                    class="ma-1 red white--text"
                                    @click="Reject"
                                    :disabled="!objetsDF[0].motif">Rejeter la demande</v-btn>

                                <v-btn v-if="type=='Traiter' && ($store.state.user.typeUtilisateur != 'Agent de magasin')" 
                                    class="ma-1 green white--text"
                                    @click="Accept"
                                    :disabled="objetsDF[0].motif !='' && !!objetsDF[0].motif ">Accepter la demande </v-btn>

                                <v-btn v-if="Editable && type !='new'" class="ma-1 pink white--text" 
                                    :disabled="!valid"
                                    @click="update">
                                    <v-icon left>send</v-icon>
                                    <span  >Modifier la demande</span> 
                                </v-btn>
                                <v-btn v-if="type=='new'" class="ma-1 pink white--text" 
                                    :disabled="!valid"
                                    @click="send">
                                    <v-icon left>send</v-icon>
                                    <span>Envoyer la demande</span> 
                                </v-btn>
                            </v-row> 
                        </v-form>
                    </v-card-text>               
                </v-card>  
        </v-dialog>
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
export default {
    name:"DemandeFourniture",
    props:[ 'value','name','icon','color' , 'type' , 'demande', 'Editable'] ,
    computed : {
        dialog : {
            get : function(){
                return this.value
            },
            set : function(value){   
                this.$emit('input',value)
            }
        },
        objetsDF : function() {
             if(this.type=="update" || this.type== "Traiter"){
                return this.demande
            }else{
                return this.DemandeFourniture.objetsDemande
             }
        }
        
    },methods :{
        send(){
            this.$refs.form.validate();
            Axios.post('/api/DemandeFourniture',
            {userID : this.$store.state.user.email, 
            objetsDemande : this.objetsDF, 
            structure: this.$store.state.user.structure,
            departement: this.$store.state.user.departement,
            UT: this.$store.state.user.typeUtilisateur} )
            .then(
                res =>{
                    this.msg = res.data.title,
                    this.$refs.form.reset(),
                    this.Done = true,
                    this.dialog = false
                },
                err => {
                    this.Errr = true,
                    this.msg = err.response.data.title
                }
             )
        },
        update(){
        this.$refs.form.validate();
            Axios.post('/api/UpdateDemandeFourniture', 
                            {
                                demande_id : this.objetsDF[0].demande_F_ID,
                                objetsDemande : this.objetsDF,
                                uID : this.$store.state.user.email
                            })
            .then(
            res =>{
                this.msg = res.data.title,
                this.$refs.form.reset(),
                this.Done = true,
                this.dialog = false
            },
            err => {
                this.Errr = true,
                this.msg = err.response.data.title
            }
            )
        }
        
        ,deleteObject(index){
            if(this.totalObject>0){
               this.objetsDF.splice(index,1);
               this.totalObject--;
            }
        },
        addNewObject(){
            this.objetsDF.push({
                code_objet:null,    
                qty_demande:null
                });
            this.totalObject++;
        },
        close : function(){
            this.$refs.form.reset();
            this.dialog = false;
        },
        getDesign(code_object){
            if(code_object!=null){
                for (let i = 0 ; i<this.objets.length ; i++){ 
                    if(this.objets[i].code_object == code_object){
                            return this.objets[i].designation
                    } 
               }
            }else{
                return 'object '+(this.totalObject+1);
            }
        },
        Reject(){
            let TmpDemande = {
                demande_F_ID : this.objetsDF[0].demande_F_ID,
                demande_Date : this.objetsDF[0].demande_Date,
                motif : this.objetsDF[0].motif,
                uID : this.$store.state.user.email,
                structure : this.objetsDF[0].structure,
                departement : this.objetsDF[0].departement,
                email: this.objetsDF[0].utilisateurs_ID,
            }
            this.$refs.form.validate();
            Axios.put('/api/UpdateDemandState/'+this.objetsDF[0].demande_F_ID, 
                { State :'Rejetee',
                Demande: TmpDemande,
                typeD: 'Demande client',
                UT: this.$store.state.user.typeUtilisateur,
                struct : this.$store.state.structure})
            this.dialog = false
            },
        Accept(){
            let TmpDemande = {
                demande_F_ID : this.objetsDF[0].demande_F_ID,
                demande_Date : this.objetsDF[0].demande_Date,
                motif : this.objetsDF[0].motif,
                uID : this.$store.state.user.email,
                structure : this.objetsDF[0].structure,
                departement : this.objetsDF[0].departement,
                email: this.objetsDF[0].utilisateurs_ID,
            }
            if (this.$store.state.user.typeUtilisateur == 'Chef departement') 
                Axios.put('/api/UpdateDemandState/'+this.objetsDF[0].demande_F_ID, 
                { State :'Directeur',
                    Demande: TmpDemande, 
                    typeD: 'Demande fourniture', 
                    UT: this.$store.state.user.typeUtilisateur})
            else if(this.$store.state.user.typeUtilisateur == 'Directeur') 
                Axios.put('/api/UpdateDemandState/'+this.objetsDF[0].demande_F_ID, 
                { State :'DAM',
                    Demande: TmpDemande,
                    typeD: 'Demande fourniture', 
                    UT: this.$store.state.user.typeUtilisateur})    
            else if(this.$store.state.user.typeUtilisateur == 'Responsable DAM'){
                this.objetsDF[0].etat='Acceptee';
                Axios.put('/api/UpdateDemandState/'+this.objetsDF[0].demande_F_ID, 
                { State :'Acceptee',
                    Demande: TmpDemande,
                    typeD: 'Demande fourniture', 
                    UT: this.$store.state.user.typeUtilisateur,
                    struct : this.$store.state.structure
                    })  
                }  
        this.dialog = false
        }
    },
    async created(){
        for(let i=0 ; i<this.totalObject ; i++){
            this.DemandeFourniture.objetsDemande.push({
                code_object:null,    
                qty_demande:null
                });
        }
        this.objets = (await Axios.get("/api/fournitures")).data
    },
    data(){
        return{
            totalObject : 1 ,
            valid : false,
            msg :'',
            Done: false,
            Errr: false,
            objetsDemande : [],
            objets :[],
            DemandeFourniture :{
                struct : this.$store.state.user.structure,
                userID : this.$store.state.user.email,
                objetsDemande : []
            }
        }
    }
}
</script>

<style>

</style>
