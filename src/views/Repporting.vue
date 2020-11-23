<template>
    <div class="Reporting">
        <v-container>
            <h2 class="indigo--text lighten-2 my-5">Reporting</h2>
            <v-layout row>
                <v-flex md5>
                    <v-app>
                        <v-container>
                            <v-flex>
                                <v-card class="ma-5 text-center" tile  elevation="3">
                                    <v-card-title class="layout">Nombre</v-card-title>
                                    <v-list class="mt-n7">
                                        <v-list-item>
                                            <v-list-item-title class="indigo--text text--darken-1">Total</v-list-item-title>
                                            <v-list-item-title class="indigo--text text--darken-1">Cette année</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-subtitle>
                                                <v-chip class="mx-1 Encours" small outlined>{{getTotal1('Encours',total)}}</v-chip>
                                                <v-chip class="mx-1 Acceptee" small outlined >{{getTotal1('Acceptee',total)}}</v-chip>
                                                <v-chip small outlined class="Rejetee">{{getTotal1('Rejetee',total)}}</v-chip>
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>
                                                <v-chip class="mx-1 Encours" small outlined>{{getTotal1('Encours',totalYear)}}</v-chip>
                                                <v-chip class="mx-1 Acceptee" small outlined >{{getTotal1('Acceptee',totalYear)}}</v-chip>
                                                <v-chip small outlined class="Rejetee">{{getTotal1('Rejetee',totalYear)}}</v-chip>
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>    
                                            <v-list-item-title class="indigo--text text--darken-1">Ce mois</v-list-item-title>
                                            <v-list-item-title class="indigo--text text--darken-1">Ce jour</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>    
                                            <v-list-item-subtitle>
                                                <v-chip class="mx-1 Encours" small outlined>{{getTotal1('Encours',totalMonth)}}</v-chip>
                                                <v-chip class="mx-1 Acceptee" small outlined >{{getTotal1('Acceptee',totalMonth)}}</v-chip>
                                                <v-chip small outlined class="Rejetee">{{getTotal1('Rejetee',totalMonth)}}</v-chip>
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>
                                                <v-chip class="mx-1 Encours" small outlined>{{getTotal1('Encours',totalDay)}}</v-chip>
                                                <v-chip class="mx-1 Acceptee" small outlined >{{getTotal1('Acceptee',totalDay)}}</v-chip>
                                                <v-chip small outlined class="Rejetee">{{getTotal1('Rejetee',totalDay)}}</v-chip>
                                            </v-list-item-subtitle>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-flex>
                            <v-flex>
                                <v-card class="ma-5 mt-n2" tile elevation="3">
                                   <v-card-title>
                                       <v-avatar  size="10" class="mx-2 indigo darken-1"></v-avatar>
                                       Nombre par demande
                                   </v-card-title>
                                    <v-list>
                                          
                                            <v-tabs >
                                                <v-tab>
                                                    <v-btn text small @click="getTotalByDemand('total')" class="indigo--text text--darken-1" >
                                                         Total
                                                    </v-btn>
                                                </v-tab>
                                                <v-tab>
                                                    <v-btn text x-small @click="getTotalByDemand('year')" class="indigo--text text--darken-1">
                                                        Cette année
                                                    </v-btn>
                                                </v-tab>
                                                <v-tab>
                                                    <v-btn text x-small @click="getTotalByDemand('month')" class="indigo--text text--darken-1">
                                                        Ce mois
                                                    </v-btn>
                                                </v-tab>
                                                <v-tab >
                                                    <v-btn text x-small @click="getTotalByDemand('day')" class="indigo--text text--darken-1">
                                                        Ce jour
                                                    </v-btn>
                                                </v-tab>
                                            </v-tabs>
                                            
                                        
                                        <v-divider></v-divider>
                                    </v-list>
                                        <v-list>
                                        <v-list-item
                                            v-for="demande in demandes" :key="demande.name"
                                        >
                                            <v-list-item-avatar>
                                            <v-icon
                                                class="indigo lighten-1"
                                                dark
                                            >
                                                {{demande.icon}}
                                            </v-icon>
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title>{{demande.name}}</v-list-item-title>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <span>
                                                <v-chip class="mx-1 Encours" small outlined>{{getTotal2('Encours',demande.name,totalByDemand)}}</v-chip>
                                                <v-chip class="mx-1 Acceptee" small outlined >{{getTotal2('Acceptee',demande.name,totalByDemand)}}</v-chip>
                                                <v-chip small outlined class="Rejetee">{{getTotal2('Rejetee',demande.name,totalByDemand)}}</v-chip>
                                                </span>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-list>

                                </v-card>
                            </v-flex>
                        </v-container>
                    </v-app>
                </v-flex>
                <v-flex md7>
                    <v-card  tile class="ma-7 text-center mx-6"  elevation="3">
                        <v-carousel height="100%"   v-model="model">
                            <v-carousel-item color="white"  v-for="item in sheets" :key="item.icon">
                                    <div>
                                        <v-toolbar :color="item.color">
                                            <v-icon left>{{item.icon}}</v-icon>
                                            <v-toolbar-title>{{item.name}}</v-toolbar-title>
                                        </v-toolbar>
                                        <v-row class="mb-12">
                                                <StatByDemand 
                                                    :name="item.name"
                                                    :color="item.color"
                                                />
                                        </v-row>
                                    </div>
                               
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
import StatByDemand from '../components/Reporting/StatByDemand'
export default {
    name:'Reporting',
    components: {StatByDemand},
    async created(){
        /** total */
        this.total = (await axios.get("/api/Total/"+this.$store.state.user.structure)).data.total
        this.totalYear = (await axios.get("/api/TotalYear/"+this.$store.state.user.structure)).data.total
        this.totalMonth = (await axios.get("/api/TotalMonth/"+this.$store.state.user.structure)).data.total
        this.totalDay = (await axios.get("/api/TotalDay/"+this.$store.state.user.structure)).data.total
        /** total by demand */
        this.totalByDemand = (await axios.get("/api/TotalByDemand/"+this.$store.state.user.structure+"/total")).data.total;
       
    },
    mounted(){        
        for(let i =0  ; i < this.demandes.length ; i++){
            this.update(this.demandes[i].name , this.demandes[i].prefix)
            this.updateInChangeEtat(this.demandes[i].prefix,this.demandes[i].name);
            this.updateInDelete(this.demandes[i].prefix,this.demandes[i].name);
        }
   },
    methods:{
        async getTotalByDemand(value){
            /** total by demand */
            this.totalByDemand = (await axios.get("/api/TotalByDemand/"+this.$store.state.user.structure+"/"+value)).data.total;
        },
        getIndex1(etat , tab){
            for(let i= 0 ; i<tab.length ; i ++){
                if(tab[i].etat==etat){
                    return i
                }
                
            }
            return tab.length
        },
        getIndex2(etat , type_demande , tab){
            for(let i = 0 ; i <tab.length ; i++){
                if(etat == tab[i].etat && type_demande == tab[i].type_demande){
                    return i
                }
            }
            return tab.length;
        },
        getTotal1(etat , tab){
            for(let i= 0 ; i<tab.length ; i ++){
                if(tab[i].etat==etat){
                    return tab[i].total
                }
                
            }
            return 0
        },
        getTotal2(etat , type_demande , tab){
            if(tab.length !== null){
                for(let i = 0 ; i <tab.length ; i++){
                    if(etat == tab[i].etat && type_demande == tab[i].type_demande){
                        return tab[i].total
                    }
                }
            }
            return 0;
        },
        setTotal1(etat,total){
            let id = this.getIndex1(etat, total);
            if(id < total.length)
            total[id].total = total[id].total+1;
            else{
                total.push({etat : 'Encours' , total : 1});
            }
        },
        setTotal2(etat,name,total){
            let id = this.getIndex2(etat,name , total);
            console.log(id)
            if(id < total.length)
            total[id].total = total[id].total+1;
            else{
                total[id].type_demande = name
                total[id].etat = etat;
                total[id].total = 1;
            }
        },
        deleteTotal1(total){
            total[this.getIndex1('Encours', total)].total = total[this.getIndex1('Encours', total)].total-1;
        } , 
        deleteTotal2(name,total){
            total[this.getIndex2('Encours',name ,total)].total = total[this.getIndex2('Encours',name ,total)].total-1;
        } , 
        update(name , prefix){
                this.$store.state.sokect.on(this.$store.state.user.structure+prefix, () => {
                this.setTotal1('Encours',this.total);
                this.setTotal1('Encours',this.totalYear);
                this.setTotal1('Encours',this.totalMonth);
                this.setTotal1('Encours',this.totalDay);
                this.setTotal2( 'Encours', name , this.totalByDemand);
            })
        } ,   
        updateInDelete(prefix , name){
                this.$store.state.sokect.on(this.$store.state.user.structure+"D"+prefix, () => {
                this.deleteTotal1(this.total);
                this.deleteTotal1(this.totalYear);
                this.deleteTotal1(this.totalMonth);
                this.deleteTotal1(this.totalDay);
                this.deleteTotal2(  name , this.totalByDemand);
            })
        } ,
        updateInChangeEtat(prefix , name){
                this.$store.state.sokect.on(this.$store.state.user.structure+'E'+prefix, (newDemand) => {
                this.setTotal1(newDemand.etat,this.total);
                this.deleteTotal1(this.total)
                this.setTotal1(newDemand.etat,this.totalYear);
                this.setTotal1(newDemand.etat,this.totalMonth);
                this.setTotal1(newDemand.etat,this.totalDay);
                var today = new Date();
                var demandDate = newDemand.demande_Date
                var year = demandDate.substr(0,4)
                var month = demandDate.substr(5,2)
                var day = demandDate.substr(8,2)
                console.log(today + " "+year+" "+month+" "+day);
                if(year == today.getFullYear()){
                    this.deleteTotal1(this.totalYear)
                }
                if(parseInt (month) == today.getMonth()+1){
                    this.deleteTotal1(this.totalMonth)
                }
                if(parseInt(day) == today.getDate()){
                    this.deleteTotal1(this.totalDay)
                }
                this.setTotal2(newDemand.etat,name ,this.totalByDemand);
                this.deleteTotal2(name,this.totalByDemand)
            })
        } 
    },
    data(){
        return({
            total : [],
            totalYear:[],
            totalMonth : [],
            totalDay : [], 
            totalByDemand : [],
            model :0 ,
            sheets  : [
                {prefix:'CD',name:'Demande client',icon:'devices',color:'pink'},
                {prefix:'FD',name:'Demande fourniture',icon:'edit',color:'red'},
                {prefix:'VD',name:'Demande véhicule',icon:'commute',color:'deep-purple'},
                {prefix:'TD',name:'Demande de tirage',icon:'print',color:'purple'},
                {prefix:'PD',name:'Demande de prise en charge',icon:'flight',color:'indigo'},
                {prefix:'RD',name:'Demande activité relex',icon:'hotel',color:'blue'}
            ],
            demandes :[
                {prefix:'CD',name:'Demande client',icon:'devices',color:'pink'},
                {prefix:'FD',name:'Demande fourniture',icon:'edit',color:'red'},
                {prefix:'VD',name:'Demande véhicule',icon:'commute',color:'deep-purple'},
                {prefix:'TD',name:'Demande de tirage',icon:'print',color:'purple'},
                {prefix:'PD',name:'Demande de prise en charge',icon:'flight',color:'indigo'},
                {prefix:'RD',name:'Demande activité relex',icon:'hotel',color:'blue'}
            ]
        })
    }
}
</script>
<style>
  .theme--light.v-chip:not(.v-chip--active).Encours{
    color: orange;
  }
  .theme--light.v-chip:not(.v-chip--active).Acceptee{
    color: green;
  }
  .theme--light.v-chip:not(.v-chip--active).Rejetee{
    color: tomato;
  }
  .theme--light.v-chip.Encours{
      border-color:  orange;
  }
  .theme--light.v-chip.Acceptee{
      border-color:  green;
  }
  .theme--light.v-chip.Rejetee{
      border-color:  tomato;
  }
</style>