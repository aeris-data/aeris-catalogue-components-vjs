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
      <span v-if="html" v-html="truncatedtext" />
      <span v-else>{{ truncatedtext }}</span>
    </span>
    <span v-else>
      <span v-if="html" v-html="text" />
      <span v-else>{{ text }}</span>
    </span>
    <span v-if="isTruncated && !isDeployed" class="more" @click="isDeployed = !isDeployed">[{{ $t("more") }}]</span>
    <span v-if="isDeployed" class="more" @click="isDeployed = !isDeployed">[{{ $t("less") }}]</span>
  </div>
</template>

<script>
export default {
  name: "aeris-international-field",

  props: {
    language: {
      type: String,
      default: "en"
    },
    html: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
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
    };
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  computed: {
    truncatedtext() {
      return this.truncate(this.text);
    },

    text() {
      console.log("value :", this.value)
      if (!this.value && this.value== null) {
        return "";
      }
     
      if (!this.language) {
        return this.value;
      }
       console.log("value json :",JSON.parse(this.value))
      var json = JSON.parse(this.value);
      for (var key in json) {
        if (key === "DEFAULT_VALUE_KEY") {
          return json["DEFAULT_VALUE_KEY"];
        }

      }

      if (json[this.language]) {
        return json[this.language];
      }
      return "";
    } 
  },

  mounted() {
    if (this.language) {
      this.$i18n.locale = this.language;
    }
  },

  methods: {
    truncate(value) {
      console.log(value)
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
        return value;
      }
    }
  }
};
</script>

<style>
[data-aeris-international-field] {
  display: block;
  hyphens: auto;
  word-wrap: break-word;
}

[data-aeris-international-field] .more {
  cursor: pointer;
  font-size: smaller;
  color: #3395b9;
}
</style>
