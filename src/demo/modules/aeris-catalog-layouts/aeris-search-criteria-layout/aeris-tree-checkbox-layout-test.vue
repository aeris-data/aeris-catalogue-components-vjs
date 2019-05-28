<template>
  <div style="width:500px">
    <aeris-tree-checkbox-layout :elements="items" :theme="theme" type="test"></aeris-tree-checkbox-layout>
  </div>
</template>
<script>
import AerisTreeCheckboxLayout from "../../../../lib/modules/aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-tree-checkbox-layout";
export default {
  name: "aeris-tree-checkbox-layout-test",
  components: { AerisTreeCheckboxLayout },

  data() {
    return {
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff",
        contentPrimaryColor: "grey"
      },
      items: [
        {
          checked: false,
          deployed: false,
          name: "element_1",
          label: "element_1",

          subitems: [
            {
              checked: false,
              name: "subelement_11",
              label: "subelement_11"
            },
            {
              checked: false,
              name: "subelement_12",
              label: "subelement_12"
            },
            {
              checked: false,
              name: "subelement_13",
              label: "subelement_13"
            }
          ]
        },
        {
          checked: false,
          deployed: false,
          name: "element_2",
          label: "element_2",

          subitems: [
            {
              checked: false,
              name: "subelement_21",
              label: "subelement_21"
            },
            {
              checked: false,
              name: "subelement_22",
              label: "subelement_22"
            }
          ]
        },
        {
          checked: false,
          deployed: false,
          name: "element_3",
          label: "element_3",

          subitems: [
            {
              checked: false,
              name: "subelement_31",
              label: "subelement_31"
            },
            {
              checked: false,
              name: "subelement_32",
              label: "subelement_32"
            }
          ]
        },
        {
          checked: false,
          deployed: false,
          name: "element_4",
          label: "element_4",

          subitems: [
            {
              checked: false,
              name: "subelement_41",
              label: "subelement_41"
            },
            {
              checked: false,
              name: "subelement_42",
              label: "subelement_42"
            }
          ]
        }
      ]
    };
  }
};
</script>
