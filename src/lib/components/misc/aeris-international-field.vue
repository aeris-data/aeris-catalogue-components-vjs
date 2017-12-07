<i18n>
{
	  "en": {
	    "more": "More",
	    "less": "Less"
	  },
	  "fr": {
	    "more": "Plus",
	    "less": "Moins"
	  }
}
</i18n>
<template>
<div data-aeris-international-field>
  <span v-if="!isDeployed">
    <span v-if="html" v-html="truncatedtext"></span>
  <span v-else>{{truncatedtext}}</span>
  </span>
  <span v-else>
    <span v-if="html" v-html="text"></span>
  <span v-else>{{text}}</span>
  </span>
  <span v-if="isTruncated && !isDeployed" class="more" @click="isDeployed = !isDeployed;"> [{{$t("more")}}] </span><span v-if="isDeployed" class="more" @click="isDeployed = !isDeployed;"> [{{$t("less")}}] </span>

</div>
</div>
</template>

<script>
export default {

	name: 'aeris-international-field',

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    html: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isTruncated: false,
      isDeployed: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  computed: {

    truncatedtext: function() {
      return this.truncate(this.text);
    },

    text: function() {
      if (!this.value) {
        return '';
      }
      if (this.value == "null") {
        return '';
      }
      if (!this.lang) {
        return this.value;
      }
      var json = JSON.parse(this.value)
      for (var key in json) {
        if (key === 'DEFAULT_VALUE_KEY') {
          /* If there's only a default language */
          return json['DEFAULT_VALUE_KEY'];
        } else if (key.length > 2) {
          /* key = String language in the object */
          newKey = key.substr(0, 2);
          json[newKey] = json[key];
          delete json[key];
        }
      }

      if (json[this.lang]) {
        return json[this.lang]
      }
      return '';
    },

  },

  mounted: function() {
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
  },

  methods: {
    truncate: function(value) {
      if (this.maxLength > 0) {
        if (value.length > this.maxLength) {
          this.isTruncated = true;
          return value.substring(0, this.maxLength);
        } else {
          this.isTruncated = false;
          return value;
        }
      } else {
        this.isTruncated = false;
        return value
      }
    }
  }
}
</script>

<style>
[data-aeris-international-field] {
  display: block;
	hyphens: auto;
	word-break: break-all;
}

[data-aeris-international-field] .more {
  cursor: pointer;
  font-size: smaller;
  color: #3395b9
}
</style>
