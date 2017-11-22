<i18n>
{
	  "en": {
		  "filter": "Filter",
		  "L0": "Level 0",
		  "L0A": "Level 0A",
		  "L1": "Level 1",
		  "L10": "Level 10",
		  "L15": "Level 15",
		  "L1A": "Level 1A",
		  "L1B": "Level 1B",
		  "L2": "Level 2",
		  "L20": "Level 20",
		  "L2A": "Level 2A",
		  "L2B": "Level 2B",
		  "L3": "Level 3",
		  "L4": "Level 4",
		  "UNKNOWN": "Unknown"
	  },
	  "fr": {
		  "filter": "Filtre",
		  "L0": "Niveau 0",
		  "L1": "Niveau 1",
		  "L1A": "Niveau 1A",
		  "L1B": "Niveau 1B",
		  "L2": "Niveau 2",
		  "L2A": "Niveau 2A",
		  "L2B": "Niveau 2B",
		  "L3": "Niveau 3",
		  "L4": "Niveau 4",
		  "UNKNOWN": "Inconnu"
	  }
}
</i18n>

<template>
<div data-aeris-level-search-criteria-content>

  <div v-for="(level, index) of levels" class="program">

    <div class="program-header">
      <label :for="level.name">
	            <input :id="level.name" type="checkbox" class="program-checkbox" @change="levelClickHandler">
		            <span class="program-name-row">
		              <strong>{{$t(level.name)}}</strong>
		            </span>
	            </input>
	          </label>
      <i :id="level.name" class="fa fa-plus-square-o" @click="toggleState" v-if="level.sublevels.length > 0"></i>
    </div>

    <div :name="level.name" class="program-body notvisible">
      <div v-for="sublevel of level.sublevels">
        <div class="collection">
          <label>
	                <input :id="sublevel.name" type="checkbox" :name="sublevel.name" class="sublevel-checkbox" @change="sublevelClickHandler">
	                <span>{{$t(sublevel.name)}}</span>
	              </label>
        </div>
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
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleSearchBarResetListener = null;
  },

  created: function() {
    console.log('Aeris level search criteria content - created');
    this.$i18n.locale = this.lang;

    this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
    document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
    document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);

    var parentService = document.querySelector('aeris-catalog').attributes.getNamedItem('metadata-service').value;
    parentService = parentService.endsWith('/') ? parentService + 'levels/' : parentService + '/levels/';
    var url = this.service || parentService;
    if (document.querySelector('aeris-catalog').attributes.getNamedItem('program')) {
      var program = document.querySelector('aeris-catalog').attributes.getNamedItem('program').value;
      if (program) {
        url += "?program=" + program;
      }
    }
    this.$http.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        this.handleResponse(response)
      }, (response) => {
        this.handleError(response)
      });
  },

  mounted: function() {},

  computed: {},

  data() {
    return {
      parentService: null,
      levels: [],
      selectedItems: []
    }
  },

  updated: function() {},

  methods: {

    handleResponse: function(response) {
      console.log('response = ' + response.body);
      this.levels = response.body;
    },

    handleError: function(request) {
      console.log("Aeris level criteria - Error while accessing server:");
      var error = response.status;
      var message = response.statusText;
      if (!error) message = 'Can\'t connect to the server';
      console.log('Error ' + error + ': ' + message);
    },

    /* Check all children when click on a top level */
    levelClickHandler: function(e) {

      var checked = e.target.checked;
      var originalName = e.target.id;
      var boxes = e.target.closest('.program').getElementsByClassName("sublevel-checkbox");

      var arr = [];
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].checked = checked;
        var ind = this.selectedItems.indexOf(boxes[i].name);
        if (checked && ind === -1) {
          this.selectedItems.push(boxes[i].name);
        }
        if (!checked) {
          this.selectedItems.splice(ind, 1);
        }
      }
      // treat the top level also
      if (checked) {
        this.selectedItems.push(originalName);
      } else {
        var ind = this.selectedItems.indexOf(originalName);
        this.selectedItems.splice(originalName, 1);
      }

      // simulate the event click on the expand/unexpand button
      var el = checked ? e.target.closest('.program-header').getElementsByClassName('fa-plus-square-o') : e.target.closest('.program-header').getElementsByClassName('fa-minus-square-o');
      if (el != null && el.length > 0) {
        var event = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        el[0].dispatchEvent(event);
      }

    },

    /* Check all parents when click on a bottom level */
    sublevelClickHandler: function(e) {
      var checked = e.target.checked;
      var ind = this.selectedItems.indexOf(e.target.name);
      if (checked && ind === -1) {
        this.selectedItems.push(e.target.name);
      }
      if (!checked) {
        this.selectedItems.splice(ind, 1);
      }
    },

    handleSearchBarEvent: function(e) {
      e.detail.sublevels = this.selectedItems;
    },

    handleSearchBarResetEvent: function(e) {
      // uncheck everything
      var parent = this.$el.querySelectorAll("input");
      parent.forEach(function(element) {
        if (element.checked) {
          element.checked = false;
        }
      })
      // empty the selection
      this.selectedItems = [];
    },

    toggleState: function(e) {
      var trigger = e.target;
      if (trigger) {
        var el = null;
        var el = document.getElementsByName(trigger.id)[0];
        if (trigger.classList.contains('fa-plus-square-o')) {
          trigger.classList.remove('fa-plus-square-o');
          trigger.classList.add('fa-minus-square-o');
          el.classList.remove('notvisible');
          el.classList.add('visible');
        } else {
          trigger.classList.remove('fa-minus-square-o');
          trigger.classList.add('fa-plus-square-o');
          el.classList.remove('visible');
          el.classList.add('notvisible');
        }
      }
    }

  }
}
</script>
<style>
[data-aeris-level-search-criteria-content] .visible {
  display: block;
}

[data-aeris-level-search-criteria-content] .notvisible {
  display: none;
}

[data-aeris-level-search-criteria-content] {
  display: block;
}

[data-aeris-level-search-criteria-content] .program {
  margin-bottom: 5px;
}

[data-aeris-level-search-criteria-content] .program .program-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

[data-aeris-level-search-criteria-content] .program .program-header label {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 2px;
}

[data-aeris-level-search-criteria-content] .program .program-header .fa {
  cursor: pointer;
}

[data-aeris-level-search-criteria-content] .program .collection {
  margin-left: 20px;
}

[data-aeris-level-search-criteria-content] .icon-input {
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

[data-aeris-level-search-criteria-content] .icon-input i {
  padding: 3px;
}

[data-aeris-level-search-criteria-content] .filter-input {
  border-style: none;
  border: none;
  outline: none;
  margin: 2px;
}

[data-aeris-level-search-criteria-content] .badge {
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
