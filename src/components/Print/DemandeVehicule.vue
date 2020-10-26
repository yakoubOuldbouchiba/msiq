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
        return{
            demande : null
        }
    },
    methods :{
        async print(){
            await axios.get('http://localhost:3030/DemandeVehicule/'+this.ID)
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
            doc.text(80, 25, 'Demande Vehicule')
            doc.setFontSize(12)
            let DA = this.demande.demande_Date;
            var date_app = DA.substr(0,10)
            var heure_app = DA.substr(11,5)
            doc.text("Date d'appilaction : "+ date_app+" "+heure_app, 140, 25);
            doc.setLineWidth(0.3)
            doc.line(10, 34, 205, 34)
            /** Info Demande **/
            doc.setFontSize(12)
            doc.text(10, 40, 'Demande véhicule N  : ')
            doc.text(10, 46, 'Structure : ')
            doc.text(10, 52, 'Poste Téléphonique : ')
            doc.setFontSize(10)
            doc.text(50, 40, (this.demande.demande_V_ID).toString())
            doc.text(30, 46, this.demande.structure)
            doc.text(48, 52, (this.demande.posteTelephonique).toString())
            doc.line(10, 56, 205, 56)
            /** users */
            var user =[];
            user.push(['Nom : '+this.demande.nomUtilisateur , 'Prénom : '+this.demande.prenomUtilisateur ,'Poste Tél : '+(this.demande.posteTelephonique).toString()])
            if(this.demande.utilisateur1_ID !==null){
                var dataUser = (await axios.get('http://localhost:3030/users/'+this.demande.utilisateur1_ID)).data
                user.push ( [
                    'Nom : '+dataUser.nomUtilisateur ,
                    'Prénom : '+dataUser.prenomUtilisateur,
                    'Poste Tél : '+dataUser.posteTelephonique.toString()
                ])
            }
             if(this.demande.utilisateur2_ID !==null){
                dataUser = (await axios.get('http://localhost:3030/users/'+this.demande.utilisateur2_ID)).data
                user.push ( [
                    'Nom : '+dataUser.nomUtilisateur ,
                    'Prénom : '+dataUser.prenomUtilisateur,
                    'Poste Tél : '+dataUser.posteTelephonique.toString()
                ])
            }
             if(this.demande.utilisateur3_ID !==null){
                dataUser = (await axios.get('http://localhost:3030/users/'+this.demande.utilisateur3_ID)).data
                user.push ( [
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
                body :user
                
            })
            margin_top = margin_top + (user.length * 12) 
            doc.setLineWidth(0.3)
            doc.setDrawColor(0, 0, 0)
            /** Destination */
            let dp = this.demande.date_depart;
            let dr = this.demande.date_retour
            this.demande.date_depart = dp.substr(0,10)
            this.demande.date_retour = dr.substr(0,10)
            this.demande.heure_depart = dp.substr(11,5)
            this.demande.heure_retour = dr.substr(11,5)
            doc.autoTable({
                theme:'grid',
                margin: { top: margin_top },
                head: [[{ content: 'Destination', colSpan: 2, styles: { halign: 'center' ,fillColor: [255, 191, 0] } }]],
                body :[
                    ['Lieu' , this.demande.lieu],
                    ['Organisme' , this.demande.organisme],
                    ['Motif déplacement' , this.demande.motif_deplacement],
                    ['Date et heure depart' , this.demande.date_depart +" "+this.demande.heure_depart],
                    ['Lieu de remassage *' , this.demande.lieu_ramassage_d],
                    ['Date et heure depart',this.demande.date_retour +" "+this.demande.heure_retour],
                    ['Lieu de remassage *',this.demande.lieu_ramassage_r],
                    ['Nature marchandise transportée',this.demande.nature_marchandise]
                ]
                
            })
            /**save  */
            doc.save("Demande véhicule némuro "+this.ID+".pdf"); 
        }
    }
}
</script>