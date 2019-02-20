<template>
  <div :class="{ showBody: isdeployed } " class="aeris-catalog-box"  :style="getTheme" >
    <div  class="box">
      <header v-if="header" class="box-heading" @click="isdeployed = !isdeployed">
        <div class="box-heading-buttons">
          <i :class="openIconClass" :style="getIconTheme" class="chevron" />
        </div>
        <div class="box-title">
          <i v-show="headerIconClass" :style="getIconTheme" :class="headerIconClass" />
          <h3 :style="getTitleTheme" no-label-float>{{ getTitle }}</h3>
        </div>
      </header>
      <div  class="box-collapsable-part">
        <main class="box-body">
          <div class="content">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aeris-catalog-search-box",

  props: {
    headerIconClass: {
      type: String,
      default: "fa fa-search"
    },
    deployed: {
      type: Boolean,
      default: false
    },
    openIconClass: {
      type: String,
      default: "fa fa-chevron-down"
    },
    box_title: {
      type: String,
      default: ""
    },
    header: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    theme: {
      type: Object,
      default: {}
    }
  },

  computed: {

    getTitle() {
      return this.title || this.box_title;
    },

    getTheme() {
      if (this.theme) {
        let primaryColor = this.theme.primaryColor;
        let secondaryColor = this.theme.secondaryColor;
        return {
          color: secondaryColor,
          background: primaryColor
        };
      } else {
        return "";
      }
    },

    getTitleTheme() {
      if (this.theme) {
        let emphasis = this.theme.emphasis;
        return {
          color: emphasis
        };
      } else {
        return "";
      }
    },

    getIconTheme() {
      if (this.theme) {
        let iconColor = this.theme.iconColor;
        return {
          color: iconColor
        };
      } else {
        return "";
      }
    }
  },

  data() {

    return {
      hasToolbar: false,
      isdeployed: false
    };
  }
};
</script>

<style>

.aeris-catalog-box {
  font-size: 0.9rem;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  display: block;
  transition: transform 4s ease-out;
}

.box-title {
  display: flex;
  font-size: 16px;
  line-height: 1.2;
  align-items: baseline;
}

.box-collapsable-part {
  display: none;
  transition: 0.3s;
}

.showBody .box-collapsable-part {
  display: block;
  transition: 0.3s;
}

.showBody .chevron {
  transform: rotate(180deg);
}

.chevron {
  transition: 0.3s;
}

.box {
  box-sizing: border-box;
  width: 100%;
}

.box-title .plateform-icon,
.box-title .fa {
  margin-right: 10px;
}

.box-title h4 {
  margin: 0;
}

.box-body {
  word-wrap: break-word;
}

.box-body .content {
  padding: 10px;
}

.box-toolbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}

.box-heading {
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  padding: 5px 5px;
  cursor: pointer;
}

.box-heading .box-heading-buttons {
  display: flex;
  flex-flow: row nowrap;
}

.box-heading .box-heading-buttons .fa {
  padding: 0 10px;
}

.box-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.expandButton {
  padding: 6px 13px;
  margin: 0 5px;
  border: 1px solid;
  outline: none;
}

.expandButton:hover {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
</style>
