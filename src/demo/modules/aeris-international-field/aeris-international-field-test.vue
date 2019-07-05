<template>
  <div style="width:1000px;height:800px; margin:0 auto">
    <aeris-international-field
      :value="value"
      :max-length="200"
      html="html"
      language="en"
      @click="isDeployed = !isDeployed"
    ></aeris-international-field>
    <br />
    <aeris-international-field
      :value="value"
      :max-length="200"
      html="html"
      language="fr"
      @click="isDeployed = !isDeployed"
    ></aeris-international-field>
    <aeris-international-field :value="title" :max-length="200" html="html" language="none"></aeris-international-field>
    <aeris-international-field :value="title" :max-length="200" language="none"></aeris-international-field>
  </div>
</template>

<script>
import AerisInternationalField from "../../../lib/modules/aeris-international-field/components/aeris-international-field";
export default {
  name: "aeris-international-field-test",
  components: { AerisInternationalField },
  data() {
    return {
      value: {
        en:
          "**Amsterdam Island** is a small island (55km2) located in the southern Indian Ocean (37◦48 S, 77◦34 E), 3400km and 5000km downwind from the nearest lands, Madagascar and South Africa, respectively. Instrumentation dedicated to the study of atmospheric mercury is located at the Pointe Benedicte station, at the northwest end of the island, 55m above sea level and 2km west of the scientific base (30 residents at most).\\nnFrom 2012-2015, atmospheric mercury species measurements were performed using a Tekran mercury speciation unit (Tekran 1130 and 1135) coupled to a Tekran 2537B analyzer (Tekran Inc., Toronto, Canada). nGaseous Elemental Mercury (GEM or Hg(0)), Reactive Gaseous Mercury (RGM or RHg or Hg(II)) and Particulate –bound Mercury (PBM or HgP) are continuously measured.\nThe speciation unit was located on the rooftop of the station, the sampling inlet being 6m above the ground, and was connected to the 2537B analyzer through a 10m long PTFE heated line (50 ◦C). \nThe time sampling resolution was 5 or 15 min for GEM and 4 h for RGM and PBM, with sampling flowrates of 1 Lmin−1 and 10 Lmin−1, respectively. Measurements were achieved through a multistep procedure as described elsewhere (Lindberg et al., 2002) using an impactor inlet (2.5µm cut-off aerodynamic diameter at 10Lmin−1), a KCl-coated quartz annular denuder in the 1130 unit, and a quartz regenerable particulate filter (RPF) in the 1135 unit. In order to protect the analytical system against deleterious compounds such as acid gases and halogen compounds, and against particulate matter, the sample air stream – after exiting the speciation unit – was pre-filtered through a soda-lime trap and a 0.2µm PTFE (polytetrafluoroethylene) filter. \n\\nSince end of November, 2015, atmospheric mercury measurements (GEM) are performed using a 10 m long PTFE heated line (50°C) with a sampling inlet located 6 m above the ground (herbaceous ground) and a PES filter (0.45µm) at the front of the sampling line. The time sampling resolution is 15 minutes.",
        fr:
          "**Amsterdam Island** est une petite île en France (55km2) located in the southern Indian Ocean (37◦48 S, 77◦34 E), 3400km and 5000km downwind from the nearest lands, Madagascar and South Africa, respectively. Instrumentation dedicated to the study of atmospheric mercury is located at the Pointe Benedicte station, at the northwest end of the island, 55m above sea level and 2km west of the scientific base (30 residents at most).\n\nFrom 2012-2015, atmospheric mercury species measurements were performed using a Tekran mercury speciation unit (Tekran 1130 and 1135) coupled to a Tekran 2537B analyzer (Tekran Inc., Toronto, Canada). \nGaseous Elemental Mercury (GEM or Hg(0)), Reactive Gaseous Mercury (RGM or RHg or Hg(II)) and Particulate –bound Mercury (PBM or HgP) are continuously measured.\nThe speciation unit was located on the rooftop of the station, the sampling inlet being 6m above the ground, and was connected to the 2537B analyzer through a 10m long PTFE heated line (50 ◦C). \nThe time sampling resolution was 5 or 15 min for GEM and 4 h for RGM and PBM, with sampling flowrates of 1 Lmin−1 and 10 Lmin−1, respectively. Measurements were achieved through a multistep procedure as described elsewhere (Lindberg et al., 2002) using an impactor inlet (2.5µm cut-off aerodynamic diameter at 10Lmin−1), a KCl-coated quartz annular denuder in the 1130 unit, and a quartz regenerable particulate filter (RPF) in the 1135 unit. In order to protect the analytical system against deleterious compounds such as acid gases and halogen compounds, and against particulate matter, the sample air stream – after exiting the speciation unit – was pre-filtered through a soda-lime trap and a 0.2µm PTFE (polytetrafluoroethylene) filter. \n\nSince end of November, 2015, atmospheric mercury measurements (GEM) are performed using a 10 m long PTFE heated line (50°C) with a sampling inlet located 6 m above the ground (herbaceous ground) and a PES filter (0.45µm) at the front of the sampling line. The time sampling resolution is 15 minutes."
      },
      title: {
        en: "TNO High resolution European emission inventory for the years 2003 - 2007",
        fr: "TNO High resolution European emission inventory for the years 2003 - 2007",
        DEFAULT_VALUE_KEY:
          "DEFAULT_VALUE_KEY : TNO High resolution European emission inventory for the years 2003 - 2007"
      },

      isDeployed: true
    };
  }
};
</script>
