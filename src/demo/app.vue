<template>
  <div data-app>
    <ul data-role="menu">
      <li>
        <router-link to="/search_box">/search box</router-link>
      </li>
      <li>
        <router-link to="/thesaurus-item-checkbox-layout">/thesaurus-item-checkbox-layout</router-link>
      </li>
      <li>
        <router-link to="/thesaurus-item-tree-checkbox-layout">/thesaurus-item-tree-checkbox-layout</router-link>
      </li>
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
        <router-link to="/international_field">/international field</router-link>
      </li>
      <li>
        <router-link to="/search_button">/search button</router-link>
      </li>
      <li>
        <router-link to="/reset_text_button">/reset text button</router-link>
      </li>
    </ul>
    <div>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
