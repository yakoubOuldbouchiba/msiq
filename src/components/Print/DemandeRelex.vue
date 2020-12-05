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
             await axios.get('/api/demande/'+this.ID)
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
            doc.text(80, 25, 'Demande activité relex')
            doc.setFontSize(12)
            let DA = this.demande.demande_Date;
            var date_app = DA.substr(0,10)
            var heure_app = DA.substr(11,5)
            doc.text("Date d'appilaction : "+ date_app+" "+heure_app, 140, 25);
            doc.setLineWidth(0.3)
            doc.line(10, 34, 205, 34)
            /** Info Demande **/
            doc.setFontSize(12)
            doc.text(10, 40, 'Demande relex N  : ')
            doc.text(10, 46, 'Structure : ')
            doc.text(10, 52, 'Poste Téléphonique : ')
            doc.setFontSize(10)
            doc.text(50, 40, (this.demande.demande_ID).toString())
            doc.text(30, 46, this.demande.structure)
            doc.text(48, 52, (this.demande.posteTelephonique).toString())
            doc.line(10, 56, 205, 56)
            /** relex info */
            await axios.get('/api/DemandeRelex/'+this.ID)
            .then(
                    res =>{
                    this.demande = res.data.demande;
                    let dp = this.demande.date_depart;
                    let dr = this.demande.date_retour
                    this.demande.date_depart = dp.substr(0,10)
                    this.demande.date_retour = dr.substr(0,10)
                    this.demande.heure_depart = dp.substr(11,5)
                    this.demande.heure_retour = dr.substr(11,5) 
                    if(this.demande.prise_en_charge){
                        this.demande.prise_en_charge = 'Oui'
                    } else{
                        this.demande.prise_en_charge = 'Non'
                    }     
                    },
                    err => {
                        this.Errr = true,
                        this.msg = err.response.data.title
                    }
            )
            var PrintDemand = [] 
            PrintDemand.push(
                ['Nom' , this.demande.nomUtilisateur],
                ['Prénom' , this.demande.prenomUtilisateur],
                ['Fonction' , this.demande.fonction ],
                ['Destination', this.demande.destination ],
                ['Objet mission' , this.demande.objet_mission],
                ['Date de départ' , this.demande.date_depart],
                ['Heure souhaitée', this.demande.heure_depart],
                ['Date de retour' , this.demande.date_retour],
                ['Heure souhaitée', this.demande.heure_retour],
                ['Moyens de transport',this.demande.demande_R_ID],
                ['Prise en charge par la structure de destination',this.demande.prise_en_charge],
            )
            doc.autoTable({
                theme:'grid',
                margin: { top: 60 },
                head: [[{ content: 'Demandeur', colSpan: 2, styles: { halign: 'center' ,fillColor: [255, 191, 0] } }]],
                body :PrintDemand
                
            })
            /**save  */
            doc.save("Demande relex némuro "+this.ID+".pdf");
        }
    }
}
</script>