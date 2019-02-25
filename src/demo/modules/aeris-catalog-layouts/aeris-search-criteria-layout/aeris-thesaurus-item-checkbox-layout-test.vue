<template>
  <div>
    <aeris-thesaurus-item-checkbox-layout
      :thesaurus-item="thesaurusItem"
      :theme="theme"
      thesaurus-type="projects"
    ></aeris-thesaurus-item-checkbox-layout>
  </div>
</template>

<script>
import { AerisThesaurusItemCheckboxLayout } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-thesaurus-item-checkbox-layout-test",
  components: { AerisThesaurusItemCheckboxLayout },
  data() {
    return {
      thesaurusItem: {
        checked: false,
        deployed: false,
        label: "Campaigns",
        name: "CAMPAIGNS",
        search: "CAMPAIGNS.NULL",
        thesaurusItems: [
          {
            checked: false,
            deployed: false,
            label: "AEROCLO-SA",
            name: "AEROCLO-SA",
            search: "CAMPAIGNS.AEROCLO-SA",
            thesaurusItems: [],
            translation: { en: "AEROCLO-SA", fr: "AEROCLO-SA" }
          },
          {
            checked: false,
            deployed: false,
            label: "BLLAST",
            name: "BLLAST",
            search: "CAMPAIGNS.BLLAST",
            thesaurusItems: [],
            translation: { en: "BLLAST", fr: "BLLAST" }
          },
          {
            checked: false,
            deployed: false,
            label: "CAPITOUL",
            name: "CAPITOUL",
            search: "CAMPAIGNS.CAPITOUL",
            thesaurusItems: [],
            translation: { en: "CAPITOUL", fr: "CAPITOUL" }
          },
          {
            checked: false,
            deployed: false,
            label: "CARBO",
            name: "CARBO",
            search: "CAMPAIGNS.CARBO",
            thesaurusItems: [],
            translation: { en: "CARBO", fr: "CARBO" }
          },
          {
            checked: false,
            deployed: false,
            label: "DACCIWA",
            name: "DACCIWA",
            search: "CAMPAIGNS.DACCIWA",
            thesaurusItems: [],
            translation: { en: "DACCIWA", fr: "DACCIWA" }
          },
          {
            checked: false,
            deployed: false,
            label: "ESCOMPTE",
            name: "ESCOMPTE",
            search: "CAMPAIGNS.ESCOMPTE",
            thesaurusItems: [
              {
                checked: false,
                deployed: false,
                label: "AEROCLO-SA",
                name: "AEROCLO-SA",
                search: "CAMPAIGNS.ESCOMPTE.AEROCLO-SA",
                thesaurusItems: [],
                translation: { en: "AEROCLO-SA", fr: "AEROCLO-SA" }
              },
              {
                checked: false,
                deployed: false,
                label: "BLLAST",
                name: "BLLAST",
                search: "CAMPAIGNS.ESCOMPTE.BLLAST",
                thesaurusItems: [],
                translation: { en: "BLLAST", fr: "BLLAST" }
              },
              {
                checked: false,
                deployed: false,
                label: "CAPITOUL",
                name: "CAPITOUL",
                search: "CAMPAIGNS.ESCOMPTE.CAPITOUL",
                thesaurusItems: [
                  {
                    checked: false,
                    deployed: false,
                    label: "AEROCLO-SA",
                    name: "AEROCLO-SA",
                    search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.AEROCLO-SA",
                    thesaurusItems: [],
                    translation: { en: "AEROCLO-SA", fr: "AEROCLO-SA" }
                  },
                  {
                    checked: false,
                    deployed: false,
                    label: "BLLAST",
                    name: "BLLAST",
                    search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.BLLAST",
                    thesaurusItems: [],
                    translation: { en: "BLLAST", fr: "BLLAST" }
                  },
                  {
                    checked: false,
                    deployed: false,
                    label: "CAPITOUL",
                    name: "CAPITOUL",
                    search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.CAPITOULL",
                    thesaurusItems: [
                      {
                        checked: false,
                        deployed: false,
                        label: "AEROCLO-SA",
                        name: "AEROCLO-SA",
                        search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.CAPITOULL.AEROCLO-SALL",
                        thesaurusItems: [],
                        translation: { en: "AEROCLO-SA", fr: "AEROCLO-SA" }
                      },
                      {
                        checked: false,
                        deployed: false,
                        label: "BLLAST",
                        name: "BLLAST",
                        search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.CAPITOULL.BLLASTL",
                        thesaurusItems: [],
                        translation: { en: "BLLAST", fr: "BLLAST" }
                      },
                      {
                        checked: false,
                        deployed: false,
                        label: "CAPITOUL",
                        name: "CAPITOUL",
                        search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.CAPITOULL.CAPITOULYL",
                        thesaurusItems: [
                          {
                            checked: false,
                            deployed: false,
                            label: "AEROCLO-SA",
                            name: "AEROCLO-SA",
                            search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.CAPITOULL.AEROCLO-SALLL",
                            thesaurusItems: [],
                            translation: { en: "AEROCLO-SA", fr: "AEROCLO-SA" }
                          },
                          {
                            checked: false,
                            deployed: false,
                            label: "BLLAST",
                            name: "BLLAST",
                            search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.CAPITOULL.BLLASTTLL",
                            thesaurusItems: [],
                            translation: { en: "BLLAST", fr: "BLLAST" }
                          },
                          {
                            checked: false,
                            deployed: false,
                            label: "CAPITOULX",
                            name: "CAPITOULX",
                            search: "CAMPAIGNS.ESCOMPTE.CAPITOUL.CAPITOULL.XL",
                            thesaurusItems: [],
                            translation: { en: "CAPITOUL", fr: "CAPITOUL" }
                          }
                        ],
                        translation: { en: "CAPITOUL", fr: "CAPITOUL" }
                      }
                    ],
                    translation: { en: "CAPITOUL", fr: "CAPITOUL" }
                  }
                ],
                translation: { en: "CAPITOUL", fr: "CAPITOUL" }
              }
            ],
            translation: { en: "ESCOMPTE", fr: "ESCOMPTE" }
          },
          {
            checked: false,
            deployed: false,
            label: "FENNEC",
            name: "FENNEC",
            search: "CAMPAIGNS.FENNEC",
            thesaurusItems: [],
            translation: { en: "FENNEC", fr: "FENNEC" }
          },
          {
            checked: false,
            deployed: false,
            label: "KASCADE",
            name: "KASCADE",
            search: "CAMPAIGNS.KASCADE",
            thesaurusItems: [],
            translation: { en: "KASCADE", fr: "KASCADE" }
          },
          {
            checked: false,
            deployed: false,
            label: "PARCS",
            name: "PARCS",
            search: "CAMPAIGNS.PARCS",
            thesaurusItems: [],
            translation: { en: "PARCS", fr: "PARCS" }
          },
          {
            checked: false,
            deployed: false,
            label: "Passy",
            name: "Passy",
            search: "CAMPAIGNS.Passy",
            thesaurusItems: [],
            translation: { en: "Passy", fr: "Passy" }
          }
        ]
      },
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff"
      }
    };
  }
};
</script>
