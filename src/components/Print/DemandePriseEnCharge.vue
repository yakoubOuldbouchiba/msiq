<template>
    <v-btn
        class="mx-2"
        outlined
        color="cyan"
        fab
        dark
        x-small
        @click="print"
    >
        <v-icon dark>
        print
        </v-icon>
    </v-btn>
</template>
<script>
import axios from "axios"
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import image from '../../assets/naftal.jpg'
export default {
    props : ['ID'],
    data(){
        return{}
    },
    methods :{
        async print(){
        await axios.get('/api/DemandePriseEnCharge/'+this.ID)
            .then(
                    res =>{
                        this.demande = res.data.demande;     
                    },
                    err => {
                        this.Errr = true,
                        this.msg = err.response.data.title
                    }
            )
            var doc = new jsPDF()
            doc.setFont('times')
            /** header */
            doc.addImage(image, 'JPEG', 10, 15, 20, 15)
            doc.setFontSize(16)
            doc.text(70, 25, 'Demande prise en charge')
            doc.setFontSize(12)
            let DA = this.demande.demande_Date;
            var date_app = DA.substr(0,10)
            var heure_app = DA.substr(11,5)
            doc.text("Date d'appilaction : "+ date_app+" "+heure_app, 140, 25);
            doc.setLineWidth(0.3)
            doc.line(10, 34, 205, 34)
            /** Info Demande **/
            doc.setFontSize(12)
            doc.text(10, 40, 'Demande N  : ')
            doc.text(10, 46, 'Structure : ')
            doc.text(10, 52, 'Poste Téléphonique : ')
            doc.setFontSize(10)
            doc.text(36, 40, (this.demande.demande_P_ID).toString())
            doc.text(30, 46, this.demande.structure)
            doc.text(48, 52, (this.demande.posteTelephonique).toString())
            doc.line(10, 56, 205, 56)
            /** users */
            var users =[];
            users.push(['Nom : '+this.demande.nomUtilisateur , 'Prénom : '+this.demande.prenomUtilisateur ,'Poste Tél : '+(this.demande.posteTelephonique).toString()])
            for (let i = 0 ; i< this.demande.Collegues ; i++){
                var dataUser = (await axios.get('/api/users/'+this.demande.Collegues[i])).data
                users.push ( [
                    'Nom : '+dataUser.nomUtilisateur ,
                    'Prénom : '+dataUser.prenomUtilisateur,
                    'Poste Tél : '+dataUser.posteTelephonique.toString()
                ])
            }
            var margin_top = 60 
            doc.autoTable({
                theme:'grid',
                margin: { top: margin_top },
                head: [[{ content: 'Demandeurs', colSpan: 3, styles: { halign: 'center' ,fillColor: [255, 191, 0] } }]],
                body :users
                
            })
            margin_top = margin_top + (users.length * 12) 
            doc.setLineWidth(0.3)
            doc.setDrawColor(0, 0, 0)
            /** Destination */
            doc.autoTable({
                theme:'grid',
                margin: { top: margin_top },
                head: [[{ content: 'Destination', colSpan: 2, styles: { halign: 'center' ,fillColor: [255, 191, 0] } }]],
                body :[
                    ['Destination' , this.demande.destination],
                    ['Objet de la mission' , this.demande.objet_mission],
                    ['Date du' , this.demande.date_depart +" au  "+this.demande.date_retour],
                    ['Moyens de transport' , this.demande.moyen_transport],
                    ['Heure du vol',this.demande.heureDeVol],
                    ['Aéroport',this.demande.aeroport]
                ]
                
            })
            /**save  */
            doc.save("Demande relex némuro "+this.ID+".pdf"); 
        }
    }
}
</script>