module.exports = {
  root: true,
  plugins: ["testcafe"],
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "plugin:testcafe/recommended"
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    "no-console": 0,
    "no-undef": 0,
    semi: [2, "always"],
    "space-before-function-paren": 0,
    "object-property-newline": 0,
    "vue/order-in-components": 0,
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 10,
        multiline: {
          max: 10,
          allowFirstLine: true
        }
      }
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "never"
        }
      }
    ],

    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        closeBracket: 0,
        ignores: []
      }
    ],
    "vue/name-property-casing": ["error", "kebab-case"],
    "prettier/prettier": "error"
  }
};
