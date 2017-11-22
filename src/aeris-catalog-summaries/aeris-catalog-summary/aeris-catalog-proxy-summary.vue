<script>
export default {
  props: {
	  value:  {
          type: String,
          default: ''
        },
        name:  {
            type: String,
            default: ''
          }

  },

  watch: {

	  },

  destroyed: function() {
  },

  render: function (createElement) {
	  return this.$createElement(this.name, {attrs: {"deployed": 'true', "value": this.value }})
	  },

  mounted: function() {

  },

  computed: {

  },

   data () {
    return {
    }
  },

  updated: function() {
  },

  methods: {

  }
}
</script>
