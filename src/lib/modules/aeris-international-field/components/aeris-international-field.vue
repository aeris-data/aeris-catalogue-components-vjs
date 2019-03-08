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
  <section aeris-international-field>
    <span v-if="!isDeployed">
      <span v-if="html" v-html="truncatedText" />
      <span v-else>{{ truncatedText }}</span>
    </span>
    <span v-else>
      <span v-if="html" v-html="text" />
      <span v-else>{{ text }}</span>
    </span>
    <span v-if="isTruncated && !isDeployed" class="more" @click="isDeployed = !isDeployed">[{{ $t("more") }}]</span>
    <span v-if="isDeployed" class="more" @click="isDeployed = !isDeployed">[{{ $t("less") }}]</span>
  </section>
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
    truncatedText() {
      return this.truncate(this.text);
    },

    text() {
      if (this.value && this.value[this.language]) {
        return marked(this.value[this.language]);
      } else if (this.value && this.value["DEFAULT_VALUE_KEY"]) {
        return marked(this.value["DEFAULT_VALUE_KEY"]);
      } else {
        return "";
      }
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
[aeris-international-field] {
  display: block;
  hyphens: auto;
  word-wrap: break-word;
  text-align: justify;
}

[aeris-international-field] .more {
  cursor: pointer;
  font-size: smaller;
  color: #3395b9;
}
</style>
