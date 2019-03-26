<template>
  <div>
    <button class="changer" @click="changeTheme">change theme</button>
    <aeris-catalog-help-content :theme="theme" language="en" help-cookie="help-popup"></aeris-catalog-help-content>
  </div>
</template>

<script>
import AerisCatalogHelpContent from "../../../lib/modules/aeris-catalog-help/components/aeris-catalog-help-content.vue";
export default {
  name: "aeris-catalog-help-content-test",
  components: { AerisCatalogHelpContent },
  data() {
    return {
      theme: {
        primaryColor: "#FF4901"
      }
    };
  },
  methods: {
    changeTheme() {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      this.theme.primaryColor = "#" + randomColor;
    }
  }
};
</script>

<style scoped>
.changer {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
