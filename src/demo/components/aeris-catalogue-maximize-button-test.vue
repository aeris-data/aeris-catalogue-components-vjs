<template>
<dvi>
    <aeris-catalogue-maximize-button @CatalogueMaximize="maximize =true" @CatalogueMinimize="minimize= true" lang="en"></aeris-catalogue-maximize-button>
    <p v-if="maximize">emit maximize: des pouvoirs cosmique phénoménaux</p>
    <p v-if="minimize">emit minimize: dans un vrais mouchoir de poche </p>
</dvi>
</template>
<script>
import AerisCatalogueMaximizeButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-maximize-button/components/aeris-catalogue-maximize-button.vue"
export default {
    components:{AerisCatalogueMaximizeButton},
    data(){
        return {
            maximize: false,
            minimize: false
        }
    }
}
</script>
