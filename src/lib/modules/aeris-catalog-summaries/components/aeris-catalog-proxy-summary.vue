<script>
export default {
  name: "aeris-catalog-proxy-summary",

  props: {
    value: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },

  watch: {},

  destroyed() {},

  render() {
    return this.$createElement(this.name, { attrs: { deployed: "true", value: this.value } });
  },

  mounted() {},

  computed: {},

  data() {
    return {};
  },

  updated() {},

  methods: {}
};
</script>
