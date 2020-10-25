<template>
    <span>
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
        <div v-if="false" id="Content">
             <header>
                 <h1>Demande client</h1>
             </header>
        </div>
    </span>
</template>
<script>
import axios from "axios"
import { jsPDF } from "jspdf";
import image from '../../assets/naftal.jpg'
export default {
    props : ['ID'],
    data(){
        return{
            demande : null
        }
    },
    methods :{
        async print(){
            /*const doc = new jsPDF({
            orientation: "landscape",
            unit: "in"
            });*/
            await axios.get('http://localhost:3030/DemandeClient/'+this.ID)
            .then(
                    res =>{
                    this.demande = res.data.demande;
                    
                    console.log(this.demande);
                    var doc = new jsPDF()
                    doc.setFont('times')
                    /** header */
                    doc.addImage(image, 'JPEG', 10, 15, 20, 15)
                    doc.setFontSize(16)
                    doc.text(80, 25, 'Demande client')
                    doc.setFontSize(12)
                    let DA = this.demande.demande_Date;
                    var date_app = DA.substr(0,10)
                    var heure_app = DA.substr(11,5)
                    doc.text("Date d'appilaction : "+ date_app+" "+heure_app, 140, 25);
                    doc.setLineWidth(0.3)
                    doc.line(10, 34, 205, 34)
                    /** Info user **/
                    doc.setFontSize(12)
                    doc.text(10, 40, 'Nom Prénom : ')
                    doc.text(10, 46, 'Structure : ')
                    doc.text(10, 52, 'Poste Téléphonique : ')
                    doc.setFontSize(10)
                    doc.text(38, 40, this.demande.nomUtilisateur +" "+this.demande.prenomUtilisateur)
                    doc.text(30, 46, this.demande.structure)
                    doc.text(48, 52, (this.demande.posteTelephonique).toString())
                    doc.line(10, 56, 205, 56)
                    /** Nature de la demande */
                    doc.setFontSize(12)
                    doc.text(10, 62, 'Nature de la demande : ')
                    doc.setFontSize(10)
                    doc.text(52, 62, this.demande.nature)
                    doc.line(10, 66, 205, 66)
                    /** objet */
                    doc.setFontSize(12)
                    doc.text(10, 72, 'Objet : ')
                    doc.setFontSize(10)
                    doc.text(22, 72, this.demande.objet)
                    doc.line(10, 76, 205, 76)
                    /**Descripation de la demande */
                    doc.setFontSize(14)
                    doc.text(10, 82, 'Descripation de la demande : ')
                    doc.setFontSize(12)
                    doc.text(10, 88, this.demande.demande_C_description)
                    /**save  */
                    doc.save("Demande client némuro "+this.ID+".pdf");        
                    },
                    err => {
                        this.Errr = true,
                        this.msg = err.response.data.title
                    }
            )
        }
    }
}
</script>