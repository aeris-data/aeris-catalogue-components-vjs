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

<template class="aeris-international-field">
  <div>
    <p v-if="!isDeployed && html" v-html="truncatedText" />
    <p v-else-if="!isDeployed && !html">{{ truncatedText }}</p>
    <p v-else-if="isDeployed && html" v-html="text" />
    <p v-else-if="isDeployed && !html">{{ text }}</p>
    <a v-if="isTruncated && !isDeployed" class="more" @click="isDeployed = !isDeployed">[{{ $t("more") }}]</a>
    <a v-if="isDeployed" class="more" @click="isDeployed = !isDeployed">[{{ $t("less") }}]</a>
  </div>
</template>

<script>
import marked from "marked";

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
      type: Object,
      default: () => {
        return {};
      }
    },
    maxLength: {
      type: Number,
      default: 100
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
    truncatedText() {
      return this.truncate(this.text);
    },

    text() {
      if (!this.html) {
        if (this.value && this.value[this.language]) {
          return this.value[this.language];
        } else if (this.value && this.value["DEFAULT_VALUE_KEY"]) {
          return this.value["DEFAULT_VALUE_KEY"];
        }
      }
      if (this.value && this.value[this.language]) {
        return marked(this.value[this.language]);
      } else if (this.value && this.value["DEFAULT_VALUE_KEY"]) {
        return marked(this.value["DEFAULT_VALUE_KEY"]);
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
      if (value.length > this.maxLength) {
        this.isTruncated = true;
        return value.substring(0, this.maxLength);
      } else {
        this.isTruncated = false;
        return value;
      }
    }
  }
};
</script>

<style scoped>
.aeris-international-field {
  display: block;
  hyphens: auto;
  word-break: break-all;
  word-wrap: break-word;
}

.more {
  cursor: pointer;
  font-size: smaller;
  color: #3395b9;
}
</style>
