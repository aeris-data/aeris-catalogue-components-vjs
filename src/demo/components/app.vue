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
    </ul>
    <div>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

[data-app] > ul {
  position: fixed;
  display: flex;
  flex-direction: row;
  top: 0;
  z-index: 10;
  height: 60px;
}

[data-app] > ul > li {
  list-style-type: none;
  padding-left: 10px;
}

[data-aeris-catalog] {
  padding-top: 60px;
}
</style>
