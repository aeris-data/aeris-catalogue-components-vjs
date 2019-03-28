<template>
  <div :class="{ showBody: isDeployed }" class="aeris-catalog-box">
    <div class="box">
      <header v-if="header" :style="getTitleTheme" class="box-heading" @click="isDeployed = !isDeployed">
        <div class="box-heading-buttons">
          <i :class="openIconClass" class="chevron" />
        </div>
        <div class="box-title">
          <i v-show="headerIconClass" :class="headerIconClass" :style="getIconTheme" />
          <h3 no-label-float>{{ getTitle }}</h3>
        </div>
      </header>
      <div class="box-collapsable-part">
        <section class="box-body">
          <div class="content">
            <slot />
          </div>
        </section>
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
    boxTitle: {
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
      default: () => {}
    }
  },

  data() {
    return {
      isDeployed: false
    };
  },

  computed: {
    getTitle() {
      return this.title || this.box_title;
    },

    getTheme() {
      return this.theme ? { color: this.theme.secondaryColor } : "";
    },

    getTitleTheme() {
      return this.theme ? { color: this.theme.emphasis } : "";
    },

    getIconTheme() {
      return this.theme ? { color: this.theme.iconColor } : "";
    }
  }
};
</script>

<style scoped>
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

.box-title h3 {
  margin: 0;
  color: rgb(11, 107, 179);
}

.box-title h3:first-letter {
  text-transform: uppercase;
}

.box-title i {
  color: grey;
}

.box-heading-buttons i {
  color: grey;
}

.box-body {
  word-wrap: break-word;
}

.box-body .content {
  padding: 10px;
}

.box-heading {
  display: flex;
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
</style>
