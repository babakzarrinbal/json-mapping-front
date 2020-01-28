// my own proto functions
require("./utils/prototypes");

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// custom styles
import "./scss/globalstyle.scss";
import "./scss/vue-transitions.scss";

// fast click to disable touch delay
var attachFastClick = require("fastclick");
attachFastClick.attach(document.body);

require("./serviceworker/registerServiceWorker");

// prepairing vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// initializing app
Vue.config.productionTip = true;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
