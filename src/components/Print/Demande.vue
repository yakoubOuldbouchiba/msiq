<template>
  <span>
      <DemandeClient v-if="type =='demande client'" :ID='ID' />
      <DemandeFourniture v-if="type == 'demande fourniture'" :ID='ID' />
      <DemandePriseEnCharge v-if="type =='demande prise en charge'" :ID='ID' />
      <DemandeRelex v-if="type == 'demande relex'" :ID='ID' />
      <DemandeVehicule v-if="type == 'demande véhicule'" :ID='ID' />
      <DemandeTirage v-if="type =='demande tirage'" :ID='ID' />
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