<template>
    <v-dialog tile v-model="dialog" width="900" persistent fullscreen >
            <v-card >
                <v-toolbar flat dark :color='color' class="my-0" >
                    <v-toolbar-title> 
                        <v-icon large left class="white--text">{{icon}}</v-icon> 
                        {{name}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close()"> <v-icon> clear </v-icon></v-btn>
                </v-toolbar>
                <v-row>
                <v-col cols="12" sm="10">
                <v-card-text>
                    <!--v-combobox
                        v-model="demandeurs"
                        :items="collegues"
                        chips
                        clearable
                        label="Demandeurs"
                        multiple
                        prepend-icon="filter_list"
                        solo
                        class="mt-4 mb-0"
                    >
                        <template v-slot:selection="{attrs , item , select , selected}">
                            <v-chip
                                v-bind="attrs"
                                :input-value="selected"
                                close
                                @click="select"
                                @click:close="remove(item)"
                            >
                                <span>{{item}}</span>
                            </v-chip>
                        </template>
                    </v-combobox-->
                    <v-autocomplete
                        v-model="demandeurs"
                        :items="collegues"
                        prepend-icon="group_add"
                        multiple
                        hide-selected
                        filled
                        chips
                        color="blue-grey lighten-2"
                        label="Demandeurs"
                        item-text="name"
                        item-value="name"
                        outlined
                    >
                        <template v-slot:selection="data">
                            <v-chip 
                                v-model="data.attrs"
                                :input-value="data.selected"
                                close
                                @click="data.select"
                                @click:close="removeChip(data.item)"
                            >
                                <v-avatar><v-img :src="data.item.avatar"/></v-avatar>
                                {{data.item.name}}
                            </v-chip>
                        </template>
                        <template v-slot:item="data">
                             <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                            <v-list-item-avatar>
                                <v-img :src="data.item.avatar"/>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{data.item.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{data.item.group}}</v-list-item-subtitle>
                            </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
                    <v-row>
                        <v-col>
                            <v-text-field label="Lieu" prepend-icon="location_on"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field label="Organisme" prepend-icon="domain"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col >
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <Date label="Date de départ" icon="date_range"/>
                                </v-col>
                                 <v-col cols="12" sm="6">
                                    <Heure label="heure de départ" icon="alarm"/>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col >
                            <v-text-field label="Lieu de remassage *" prepend-icon="flight_takeoff"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <Date label="Date de retour" icon="date_range"/>
                                </v-col>
                                 <v-col cols="12" sm="6">
                                    <Heure label="heure de retour" icon="alarm"/>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Lieu de remassage *" prepend-icon="flight_land"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Nature marchandise" prepend-icon='shop'></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Transportée" prepend-icon="commute"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="10">
                        <v-card-actions>
                            <v-spacer></v-spacer>
                                <v-form>
                                    <v-btn  large :class="color" class='white--text mr-2' >
                                        <v-icon left>send</v-icon>
                                        Envoyer demande
                                    </v-btn>
                                    <v-btn larege class=' grey white--text' >
                                        <v-icon left>close</v-icon>
                                        Annuler demande
                                    </v-btn>
                            </v-form>
                         </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>  
            
    </v-dialog>
</template>

<script>
import Date from '../components/Date'
import Heure from '../components/Heure'
export default {
    name:"Vehicule",
    props:['dialogVehicule','name','color','icon'] ,
    components:{Date , Heure},
    computed :{
        dialog : {
            get : function(){
                return this.dialogVehicule
            },
            set : function(a){
                this.dialogVehicule=a
            }
        }
    },
    methods:{
        close : function(){
            var value = {name : this.name , dialog : !this.dialog}
            this.$emit('updateDialog',value);
        }
        ,remove : function(item){
            this.demandeurs.splice(this.demandeurs.indexOf(item),1)
            this.demandeurs=[...this.demandeurs];
        },
        removeChip : function (item) {
        const index = this.demandeurs.indexOf(item.name)
        if (index >= 0) this.demandeurs.splice(index, 1)
        }
    },
    data(){
      const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }
        return{
            demandeurs : [],
            collegues: [
            { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
            { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
            { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
            { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
            { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
            { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
            { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
            { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
            ]
        }
    }
}
</script>

<style>

</style>