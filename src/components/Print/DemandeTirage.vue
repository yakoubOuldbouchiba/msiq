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
            doc.text(80, 25, 'Demande tirage')
            doc.setFontSize(12)
            let DA = this.demande.demande_Date;
            var date_app = DA.substr(0,10)
            var heure_app = DA.substr(11,5)
            doc.text("Date d'appilaction : "+ date_app+" "+heure_app, 140, 25);
            doc.setLineWidth(0.3)
            doc.line(10, 34, 205, 34)
            /** Info Demande **/
            doc.setFontSize(12)
            doc.text(10, 40, 'Demande tirage N  : ')
            doc.text(10, 46, 'Structure : ')
            doc.text(10, 52, 'Poste Téléphonique : ')
            doc.setFontSize(10)
            doc.text(50, 40, (this.demande.demande_ID).toString())
            doc.text(30, 46, this.demande.structure)
            doc.text(48, 52, (this.demande.posteTelephonique).toString())
            doc.line(10, 56, 205, 56)
            /** Document */
            var Document = [['Prestations' , 'Intitulé' , 'Nombre feuilles' , 'Nombre exemplaires' , 'Total feuilles']]
            await axios.get('/api/DemandeTirage/'+this.ID)
            .then(
                    res =>{
                        this.demande = res.data.demande;       
                    },
                    err => {
                        this.Errr = true,
                        this.msg = err.response.data.title
                    }
            )
            Document.push([
                this.demande.type_document,
                this.demande.nom_document ,
                this.demande.nombre_feuille,
                this.demande.nombre_exemplaire,
                this.demande.total_feuille
            ])
            doc.autoTable({
                theme:'grid',
                margin: { top: 60 },
                head: [[{ content: 'Document', colSpan: 5, styles: { halign: 'center' ,fillColor: [255, 191, 0] } }]],
                body :Document
                
            })
            /**save  */
            doc.save("Demande tirage némuro "+this.ID+".pdf"); 
        }
    }
}
</script>