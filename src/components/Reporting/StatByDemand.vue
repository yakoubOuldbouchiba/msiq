<template>
<v-col>
    <v-card 
        width="90%"
        class="my-1 mx-auto"
        light
        v-for="(item, index) in peroids" :key="item"
    >  
        <v-toolbar 
            :color="color"
            dark
            tile
        >
            <v-toolbar-title>{{item}}</v-toolbar-title>
        </v-toolbar>
        <v-simple-table light>
            <template v-slot:default>
            
            <tbody>
                    <tr>
                        <td class="text-left">Le departement qui fait le maximum demandes</td>
                        <td class="text-left" v-if="maxDep[index]"><b>{{maxDep[index].max[0].departement}}</b> est effucté(e) <b>{{maxDep[index].max[0].maximum}}</b> </td>
                    </tr>
                    <tr>
                        <td class="text-left">Le client qui fait le maximum demandes</td>
                        <td class="text-left" v-if="maxUser[index]"><b v-if="nom[index]"> {{nom[index].nomUtilisateur+" "+nom[index].prenomUtilisateur}}</b> est effucté(e) <b>{{maxUser[index].max[0].maximum}}</b></td>
                    </tr>
                    <tr>
                        <td class="text-left">Moyenne des demandes par departement</td>
                        <td class="text-left" v-if="avgDep[index]"><b>{{avgDep[index].avg[0].avg}}</b></td>
                    </tr>
                    <tr>
                        <td class="text-left">Moyenne des demandes par client</td>
                        <td class="text-left" v-if="avgUser[index]"><b>{{avgUser[index].avg[0].avg}}</b></td>
                    </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card>
</v-col>
</template>
<script>
import Axios from 'axios';
export default {
    name:'StatByDemand',
    props :['color' , 'name'],
    data(){
        return({
            maxDep : [] ,
            maxUser : [],
            nom : [],
            avgDep : [],
            avgUser : [],
            peroids :[
                'Cette année',
                'Ce mois',
                'Cette semaine',
                'Tout le temps'
            ]
        })
    },
    async mounted (){
        for(let i=0 ; i <this.peroids.length ; i++){
         this.maxDep.push((await  Axios.get('http://localhost:3030/MaxByDep/'+this.$store.state.user.structure+"/"+this.peroids[i]+"/"+this.name)).data)
         this.maxUser.push( (await  Axios.get('http://localhost:3030/MaxByUser/'+this.$store.state.user.structure+"/"+this.peroids[i]+"/"+this.name)).data)
         this.nom.push((await Axios.get('http://localhost:3030/users/'+this.maxUser[i].max[0].email)).data)
         this.avgDep .push((await  Axios.get('http://localhost:3030/AvgByDep/'+this.$store.state.user.structure+"/"+this.peroids[i]+"/"+this.name)).data)
         this.avgUser.push( (await  Axios.get('http://localhost:3030/AvgByUser/'+this.$store.state.user.structure+"/"+this.peroids[i]+"/"+this.name)).data)
        }
    }
}
</script>