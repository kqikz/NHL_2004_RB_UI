import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import JQuery from 'jquery'
window.$ = JQuery
try{
  window.external.GameInterface.MainLoaded();
  window.external.GameInterface.TitleComplete();
} catch (e){}
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
