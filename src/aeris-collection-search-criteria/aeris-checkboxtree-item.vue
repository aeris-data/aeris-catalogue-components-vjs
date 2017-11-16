<i18n>
{
	  "en": {
	  },
	  "fr": {
	  }
}
</i18n>

<template>
<div data-aeris-checkbixtree-item>
  <div v-for="item of parsedItems" class="program" :key="item.name">
    <div v-if="isFolder(item)">
      <div class="program-header">
        <label :for="item.name">
            <input  type="checkbox" class="program-checkbox" :id="prefix+'.'+item.name" @change="toggleChildren(prefix+'.'+item.name)" :parent="prefix" >
            <span class="program-name-row">
            <strong>
            {{item.name}}
            </strong>
            <span class="badge">{{item.content.length}}</span>
            </span>
            </input>
            </label>
        <i :id="item.name" class="fa" :class="computeToggleClass(item)" @click="toggleState(item)"></i>
      </div>
      <div class="folderContent" v-show="item.state=='opened'">
        <div class="offset">
          <aeris-checkboxtree-item :items='JSON.stringify(item.content)' :prefix="prefix+'.'+item.name"></aeris-checkboxtree-item>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <label>
            <input  type="checkbox" :id="prefix+'.'+item.name" @change="toggleParent(prefix)"  role="leaf"  :parent="prefix" :name="item.name" class="platform-checkbox" >
            <span >{{(item.name)}}</span>
            </label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    items: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: ''
    }
  },

  watch: {
    lang: function(value) {
      this.$i18n.locale = value
    },

    items: function(value) {
      this.computeParsedItems()
    }
  },

  destroyed: function() {

  },

  created: function() {

  },

  mounted: function() {
    this.computeParsedItems()

  },

  computed: {

  },

  data() {
    return {
      parsedItems: []
    }
  },

  updated: function() {},

  methods: {

    computeParsedItems: function() {
      if (this.items) {
        if (this.items.length == 0) {
          this.parsedItems = []
        } else {
          var aux = JSON.parse(this.items)
          for (var i = 0; i < aux.length; i++) {
            aux[i].checked = ""
          }
          this.parsedItems = aux

        }
      } else {
        this.parsedItems = []
      }
    },

    toggleChildren: function(idPrefix) {
      var box = this.$el.querySelector("input[id='" + idPrefix + "']")
      var boxes = this.$el.querySelectorAll("input[id^='" + idPrefix + ".']")
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].checked = box.checked
      }
      this.toggleParent(idPrefix)
    },

    toggleParent: function(id) {
      var box = document.querySelector("input[id='" + id + "']")
      if (!box) {
        return;
      }
      var boxes = document.querySelectorAll("input[parent='" + id + "']")
      var state = false;
      for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
          state = true
        }
      }
      box.checked = state
      var index = id.lastIndexOf('.');
      if (index < 0) {
        retrun;
      } else {
        this.toggleParent(id.slice(0, index))
      }
    },

    isFolder: function(item) {
      if (!item.type) {
        return false
      } else {
        if (item.type == 'folder') {
          return true
        } else {
          return false
        }
      }
    },

    computeToggleClass: function(item) {
      if (item.state == "closed") {
        return "fa-plus-square-o"
      } else {
        return "fa-minus-square-o"
      }
    },

    toggleState: function(item) {
      if (item.state == "closed") {
        item.state = "opened"
      } else {
        item.state = "closed"
      }
    }

  }
}
</script>
<style>
.loadingbar {
  background: gainsboro;
  padding: 3px;
}

[data-aeris-checkbixtree-item] .visible {
  display: block;
}

[data-aeris-checkbixtree-item] .notvisible {
  display: none;
}

[data-aeris-checkbixtree-item] {
  display: block;
}

[data-aeris-checkbixtree-item] .program {
  margin-bottom: 5px;
}

[data-aeris-checkbixtree-item] .program .program-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

[data-aeris-checkbixtree-item] .program .program-header label {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 2px;
}

[data-aeris-checkbixtree-item] .program .program-header .fa {
  cursor: pointer;
}

[data-aeris-checkbixtree-item] .program .collection {
  margin-left: 20px;
}

[data-aeris-checkbixtree-item] .offset {
  margin-left: 20px;
}

[data-aeris-checkbixtree-item] .icon-input {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
  color: #999;
  display: inline-flex;
  justify-content: space-between;
  border: 1px solid;
  color: #999;
}

[data-aeris-checkbixtree-item] .icon-input i {
  padding: 3px;
}

[data-aeris-checkbixtree-item] .filter-input {
  border-style: none;
  border: none;
  outline: none;
  margin: 2px;
}

[data-aeris-checkbixtree-item] .badge {
  display: inline-block;
  margin: 0 5px -2px;
  padding: 0 4px;
  height: 14px;
  text-align: center;
  line-height: 14px;
  border: var(--badge-border, none);
  border-radius: 8px;
  font-size: 10px;
  background-color: var(--badge-main-color, #333);
  color: var(--badge-text-color, #fff);
}
</style>
