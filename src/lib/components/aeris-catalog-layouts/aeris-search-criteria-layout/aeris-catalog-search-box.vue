<template>
<div class="aeris-criterion" v-bind:class="{ showBody: isDeployed }">
  <header v-on:click="isDeployed = !isDeployed">
    <aside>
      <i :class="openIconClass"></i>
    </aside>
    <h4><i :class="headerIconClass" v-if="headerIconClass"></i>{{title}}</h4>
  </header>
  <article>
    <slot></slot>
  </article>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-search-box',

  props: {
    headerIconClass: {
      type: String,
      default: 'fa fa-search'
    },
    deployed: {
      type: Boolean,
      default: false
    },
    openIconClass: {
      type: String,
      default: 'fa fa-chevron-right'
    },
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isDeployed: false
    }
  },

  created: function() {
    console.log("aeris-keyword-search-criteria - Creating");
    this.isDeployed = this.deployed;
  }

}
</script>
