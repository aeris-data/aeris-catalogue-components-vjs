<template>
<div class="aeris-catalog-box-host" v-bind:class="{ showBody: isdeployed }">
  <div id="main" class="box noselect">
    <header class="box-heading" v-on:click="isdeployed = !isdeployed">
      <div class="box-title">
        <i :class="headerIconClass" id="icon" v-show="headerIconClass"></i>
        <h4 no-label-float>{{title}}</h4>
      </div>
      <div class="box-heading-buttons">
        <i class="chevron" :class="openIconClass"></i>
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
export default {
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

  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },

  created: function() {
    console.log("aeris-keyword-search-criteria - Creating");
    this.aerisThemeListener = this.handleTheme.bind(this)
    document.addEventListener('aerisTheme', this.aerisThemeListener);
    this.isdeployed = this.deployed
  },

  mounted: function() {
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
  },

  computed: {

  },

  data() {
    return {
      theme: null,
      aerisThemeListener: null,
      hasToolbar: false,
      isdeployed: null
    }
  },

  updated: function() {
    this.ensureTheme()
  },

  methods: {

    handleChevronClick: function() {

    },

    handleTheme: function(theme) {
      this.theme = theme.detail
      this.ensureTheme()
    },

    ensureTheme: function() {
      if (this.theme) {
        if (this.$el) {
          this.$el.querySelector("header").style.background = this.theme.primary
        }
      }
    }


  }
}
</script>

<style>

.aeris-catalog-box-host .box-collapsable-part {
    display: none;
    transition: 0.3s
}

.aeris-catalog-box-host.showBody .box-collapsable-part {
    display: block;
    transition: 0.3s
}
.aeris-catalog-box-host.showBody .chevron {
    transform: rotate(180deg)
}
.aeris-catalog-box-host .chevron {
    transition: 0.3s
}


.aeris-catalog-box-host {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 280px;
    margin: var(--catalog-box-margin, 5px);
    transition: transform 4s ease-out;
    box-shadow:  0 2px 5px rgba(0, 0, 0, 0.2)
}
.aeris-catalog-box-host:hover {
    cursor: default
}
.aeris-catalog-box-host .box {
    box-sizing: border-box;
    width: 100%;
    color: var(--catalog-box-color, #333);
    background-color: var(--catalog-box-background-color, #fff)
}
.aeris-catalog-box-host .box-title {
    display: flex;
    font-size: 16px;
    line-height: 1.2
}
.aeris-catalog-box-host .box-title .plateform-icon,
.aeris-catalog-box-host .box-title .fa {
    margin-right: 10px
}

.aeris-catalog-box-host header {
	color:#fff;
}

.aeris-catalog-box-host .box-title h4 {
    margin: 0;
    font-size: 16px;
}
.aeris-catalog-box-host .box-body {
    font-size: 14px;
    word-wrap: break-word
}
.aeris-catalog-box-host .box-body .content {
    padding: 10px;
    text-align: justify
}
.aeris-catalog-box-host .box-toolbar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    border: var(--catalog-box-toolbar-bo	rder);
    background-color: var(--catalog-box-toolbar-background-color, #fafafa)
}
.aeris-catalog-box-host .box-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: var(--catalog-box-header-background-color, #f5f5f5);
    border: var(--catalog-box-header-border, none);
    cursor: pointer
}
.aeris-catalog-box-host .box-heading .box-heading-buttons {
    display: flex;
    flex-flow: row nowrap
}
.aeris-catalog-box-host .box-heading .box-heading-buttons .fa {
    margin-left: 5px
}

.aeris-catalog-box-host .box-collapsable-part {
    border: var(--catalog-box-main-border, none)
}
.aeris-catalog-box-host .box-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px
}
.aeris-catalog-box-host .expandButton {
    font-size: 14px;
    padding: 6px 13px;
    margin: 0 5px;
    color: var(--expand-button-text-color, #fff);
    border: 1px solid;
    background-color: var(--expand-button-main-color, #4765A0);
    opacity: var(--expand-button-opacity, 1);
    outline: none
}
.aeris-catalog-box-host .expandButton:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: var(--expand-button-hover-text-color, #fff);
    background-color: var(--expand-button-secondary-color, #d35400);
    opacity: var(--expand-button-hover-opacity, 1)
}
.aeris-catalog-box-host .metadata-datalevel .cartouche {
    display: inline-block;
    padding: 3px 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    background-color: #f0ad4e
}
.aeris-catalog-box-host .metadata-datalevel .cartouche .fa {
    margin-right: 5px
}
 </style>
