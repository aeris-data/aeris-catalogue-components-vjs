<template>
  <div style="width:800px;height:800px; margin:0 auto">
    <aeris-catalog-search-box
      :deployed="true"
      :theme="theme"
<<<<<<< HEAD
      box-title="Zones géographiques"
=======
      box_title="Zones géographiques"
>>>>>>> refactoring
      header-icon-class="fa fa-globe"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum ac augue quis laoreet. Phasellus massa
      lorem, faucibus non luctus vitae, semper eu dolor. Suspendisse quis vulputate dolor. Morbi rutrum elementum
      ligula, porta commodo augue venenatis pellentesque. Fusce ut hendrerit urna. Aenean sed posuere odio, eu ultrices
      risus. Vestibulum sit amet volutpat purus, id fringilla arcu. Mauris consequat neque non odio accumsan fringilla.
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import { AerisCatalogSearchBox } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  components: { AerisCatalogSearchBox },
  data() {
    return {
      theme: {
        primaryColor: "#F5F5F5",
        emphasis: "#0b6bb3",
        secondaryColor: "#a7a7a7",
        iconColor: "#818181"
      }
    };
  }
};
</script>
