<template>
  <span>
      <DemandeClient v-if="type =='Demande client'" :ID='ID' />
      <DemandeFourniture v-if="type == 'Demande fourniture'" :ID='ID' />
      <DemandePriseEnCharge v-if="type =='Demande de prise en charge'" :ID='ID' />
      <DemandeRelex v-if="type == 'Demande activité relex'" :ID='ID' />
      <DemandeVehicule v-if="type == 'Demande véhicule'" :ID='ID' />
      <DemandeTirage v-if="type =='Demande de tirage'" :ID='ID' />
  </span>
</template>
<script>
import DemandeClient from './DemandeClient'
import DemandeFourniture from './DemandeFourniture'
import DemandePriseEnCharge from './DemandePriseEnCharge'
import DemandeRelex from './DemandeRelex'
import DemandeVehicule from './DemandeVehicule'
import DemandeTirage from './DemandeTirage'
export default {
    props : ['type', 'ID'],
    components :{
        DemandeClient,
        DemandeFourniture,
        DemandePriseEnCharge,
        DemandeRelex,
        DemandeVehicule,
        DemandeTirage
    }
}
</script>