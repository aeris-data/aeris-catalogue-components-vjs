<template>
<div data-aeris-catalog-box data-layout="search-criteria" v-bind:class="{ showBody: isdeployed }">
  <div id="main" class="box noselect">
    <header class="box-heading" v-on:click="isdeployed = !isdeployed">
      <div class="box-heading-buttons">
        <i class="chevron" :class="openIconClass"></i>
      </div>
      <div class="box-title">
        <i :class="headerIconClass" id="icon" v-show="headerIconClass"></i>
        <h3 :style="{'color': theme.primary}" no-label-float>{{title}}</h3>
      </div>
    </header>
    <div id="collapse" class="box-collapsable-part">
      <main class="box-body">
        <div class="content">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import store from '../../../store/index.js'

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
      default: 'fa fa-chevron-down'
    },
    title: {
      type: String,
      default: ''
    }


  },

  watch: {},

  created: function() {
    console.log("aeris-keyword-search-criteria - Creating");
    this.isdeployed = this.deployed
  },

  computed: {

    theme() {
      return store.state.common.theme;
    }
  },

  data() {
    return {
      theme: null,
      hasToolbar: false,
      isdeployed: null
    }
  },

  methods: {

    handleChevronClick: function() {

    }
  }
}
</script>

<style>
[data-aeris-catalog-box] {
  font-size: 0.9rem;
  padding: 5px;
}

[data-aeris-catalog-box] .box-collapsable-part {
    display: none;
    transition: 0.3s
}

[data-aeris-catalog-box].showBody .box-collapsable-part {
    display: block;
    transition: 0.3s
}

[data-aeris-catalog-box].showBody .chevron {
    transform: rotate(180deg)
}

[data-aeris-catalog-box] .chevron {
    transition: 0.3s
}

[data-aeris-catalog-box] {
    box-sizing: border-box;
    position: relative;
    display: block;
    transition: transform 4s ease-out;

}

[data-aeris-catalog-box] .box {
    box-sizing: border-box;
    width: 100%;
    color: var(--catalog-box-color, #333);
}

[data-aeris-catalog-box] .box-title {
    display: flex;
    font-size: 16px;
    line-height: 1.2;
    align-items: baseline;
}

[data-aeris-catalog-box] .box-title .plateform-icon,
[data-aeris-catalog-box] .box-title .fa {
    margin-right: 10px
}

[data-aeris-catalog-box] header {
	color:#fff;
}

[data-aeris-catalog-box] .box-title h4 {
    margin: 0;
}

[data-aeris-catalog-box] .box-body {
    word-wrap: break-word;
}

[data-aeris-catalog-box] .box-body .content {
    padding: 10px;
}

[data-aeris-catalog-box] .box-toolbar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    border: var(--catalog-box-toolbar-border);
    background-color: var(--catalog-box-toolbar-background-color, #fafafa)
}

[data-aeris-catalog-box] .box-heading {
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
    padding: 5px 5px;
    border: var(--catalog-box-header-border, none);
    cursor: pointer
}

[data-aeris-catalog-box] .box-heading .box-heading-buttons {
    display: flex;
    flex-flow: row nowrap
}

[data-aeris-catalog-box] .box-heading .box-heading-buttons .fa {
    padding: 0 10px;
}

[data-aeris-catalog-box] .box-collapsable-part {
    border: var(--catalog-box-main-border, none)
}

[data-aeris-catalog-box] .box-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px
}

[data-aeris-catalog-box] .expandButton {

    padding: 6px 13px;
    margin: 0 5px;
    color: var(--expand-button-text-color, #fff);
    border: 1px solid;
    background-color: var(--expand-button-main-color, #4765A0);
    opacity: var(--expand-button-opacity, 1);
    outline: none
}

[data-aeris-catalog-box] .expandButton:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: var(--expand-button-hover-text-color, #fff);
    background-color: var(--expand-button-secondary-color, #d35400);
    opacity: var(--expand-button-hover-opacity, 1)
}
 </style>
