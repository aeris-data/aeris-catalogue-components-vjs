<template>
  <div data-app>
    <ul data-role="menu">
      <li>
        <router-link to="/eurochamp">/eurochamp</router-link>
      </li>
      <li>
        <router-link to="/gmos">/gmos</router-link>
      </li>
      <li>
        <router-link to="/actris">/actris</router-link>
      </li>
      <li>
        <router-link to="/iagos">/iagos</router-link>
      </li>
      <li>
        <router-link to="/aeris">/aeris</router-link>
      </li>
      <li>
        <router-link to="/catalogue_map">/catalogue map</router-link>
      </li>
      <li>
        <router-link to="/spatial_search_criteria">/spatial search criteria</router-link>
      </li>
    </ul>
    <div>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<style>