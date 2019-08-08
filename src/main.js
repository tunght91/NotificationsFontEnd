// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "core-js/es6/promise";
import "core-js/es6/string";
import "core-js/es7/array";
// import cssVars from 'css-vars-ponyfill'
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";

import ApiService from "./services/api.service";
import { TokenService } from "./services/storage.service";

import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";

Vue.component("vue-simplemde", VueSimplemde);

// Set the base URL of the API
ApiService.init("https://wallet.tomochain.com/services/news");

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader();
}

Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
});
