<template>
  <div>
    <button @click="changeTheme">change theme</button>
    <aeris-catalog-help-content :theme="theme1" language="en" helpCookie="help-popup"></aeris-catalog-help-content>
  </div>
</template>

<script>
import AerisCatalogHelpContent from "../../lib/modules/aeris-catalog-help/components/aeris-catalog-help-content.vue";
export default {
  name: "aeris-catalog-help-content-test",
  components: { AerisCatalogHelpContent },
  data() {
    return {
      theme1: {
        primaryColor: "#FF4901"
      }
    };
  },
  methods: {
    changeTheme() {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      this.theme1.primaryColor = "#" + randomColor;
      console.log("theme color change : ", this.theme1.primaryColor);
    }
  }
};
</script>