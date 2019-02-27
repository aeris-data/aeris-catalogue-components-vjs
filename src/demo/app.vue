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
        <router-link to="/search_box">/search box</router-link>
      </li>
    </ul>
    <div>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
