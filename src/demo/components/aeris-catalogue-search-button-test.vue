<template>
    <div style="padding:40px">
        <aeris-catalogue-search-button :theme="theme" language="fr" @CatalogueSearchStart="getEmitParameter"></aeris-catalogue-search-button>
         <span v-if="max !== null && min !== null">parametres de la requete search: min ={{min}} max ={{max}}</span>
    </div>
</template>


<script>
import AerisCatalogueSearchButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-search-button/components/aeris-catalogue-search-button.vue"

export default {

    components:{AerisCatalogueSearchButton},
    data(){
        return{
            min:null,
            max:null,
        theme: {
                emphasis: "#f39c12",
                color: "#fff"
            },
            visible: false
                }
    },
    methods:{
        getEmitParameter(emitParametermin,emitParametermax){
            this.min = emitParametermin
            this.max = emitParametermax
        }
    }
}
</script>
