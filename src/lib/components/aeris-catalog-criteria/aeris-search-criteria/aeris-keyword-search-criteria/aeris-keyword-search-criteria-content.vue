<i18n>
    {
    "en": {
    "keywords": "Keywords",
    "or" :"OR",
    "and" :"AND"
    },
    "fr": {
    "keywords": "Mots-clés",
    "or" : "OU",
    "and":"ET"
    }
    }
</i18n>

<template>
    <div data-aeris-keyword-search-criteria>
        <div class="operator" :v-show="isShowOperators">
            <label :for="typeIndex('or')"><input type="radio" :id="typeIndex('or')" value="or" v-model="operator" > {{$t('or')}}</label>
            <label :for="typeIndex('and')"><input type="radio" :id="typeIndex('and')" value="and" v-model="operator"> {{$t('and')}}</label>
        </div>
        <aeris-catalog-ui-input name="keywords" :value="current" @input="current = $event.target.value" @keyup.enter="inputKeyword" autofocus></aeris-catalog-ui-input>
        <aeris-cartouche edit="true" v-for="keyword in keywords" :key="keyword" :itemref="keyword">{{keyword}}
        </aeris-cartouche>
    </div>
</template>

<script>
    export default {

        name: 'aeris-keyword-search-criteria-content',

        props: {
            lang: {
                type: String,
                default: 'en'
            },
            isShowOperators: {
                type: Boolean,
                default: true
            }
        },

        watch: {
            lang(value) {
                this.$i18n.locale = value
            },
            isShowOperators(value) {
                if (value) {
                    this.operator = 'or'
                }
            }
        },

        destroyed: function () {
            document.removeEventListener('aerisCartoucheItemDeleted', this.keywordDeletionListener);
            this.keywordDeletionListener = null;
            document.removeEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
            this.catalogueResetListener = null;
            document.removeEventListener('aerisCatalogueSearchEvent', this.catalogueSearchListener);
            this.catalogueSearchListener = null;

        },

        created: function () {

            this.$i18n.locale = this.lang
            this.keywordDeletionListener = this.handleKeywordDeletion.bind(this)
            document.addEventListener('aerisCartoucheItemDeleted', this.keywordDeletionListener);
            this.catalogueSearchListener = this.handleCatalogueSearch.bind(this)
            document.addEventListener('aerisCatalogueSearchEvent', this.catalogueSearchListener);
            this.catalogueResetListener = this.handleCatalogueReset.bind(this)
            document.addEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
        },

        mounted: function () {
            console.log('Aeris keywords search criteria content - mounted');
        },

        computed: {},

        data() {
            return {
                keywords: [],
                current: '',
                keywordDeletionListener: null,
                catalogueResetListener: null,
                catalogueSearchListener: null,
                operator: ''
            }
        },

        updated: function () {
        },

        methods: {

            handleKeywordDeletion: function (e) {
                console.log(e.detail.itemref)
                let itemref = e.detail.itemref;
                let index = this.keywords.indexOf(itemref)
                if (index > -1) {
                    this.keywords.splice(index, 1);
                }
                e.stopPropagation()
            },

            handleCatalogueReset: function () {
                this.keywords.splice(0, this.keywords.length)
                this.current = ""
            },

            handleCatalogueSearch: function (e) {
                if (this.current.length > 0) {
                    let aux = this.current;
                    this.keywords.push(aux);
                    this.current = ""
                }
                e.detail.keywords = this.keywords;
                e.detail.searchOperator = this.operator
            },

            inputKeyword: function (e) {
                let withComma = this.current.trim();
                if (withComma.length < 2) return;
                let keyCode = e.keyCode ? e.keyCode : e.charCode;
                if (withComma.endsWith(',') || keyCode === 13 || keyCode === 32) {
                    let withoutComma = (withComma.endsWith(',')) ? withComma.substring(0, (withComma.length - 1)) : withComma;
                    if (!this.keywords) this.keywords = [];
                    this.keywords.push(withoutComma);
                    this.current = '';
                }
            },
            typeIndex: function (index) {
                return `${this.name}-${index}`;
            }

        }
    }
</script>

<style>
    [data-aeris-keyword-search-criteria] aeris-cartouche .aeris-cartouche-container {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        margin-top: 8px;
    }

    [data-aeris-keyword-search-criteria] .operator {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    [data-aeris-keyword-search-criteria] input[value="and"] {
        margin-left: 30px;
    }
</style>
