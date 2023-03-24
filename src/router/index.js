import Vue from "vue";
import VueRouter from "vue-router";
import PlayNow from "../views/PlayNow.vue";
import ControllerSettings from "../views/ControllerSettings.vue";
import Empty from "../views/Empty.vue";
Vue.use(VueRouter);

const routes = [
	
  {
    path: "/playnow",
    name: "PlayNow",
    component: PlayNow,
  },
  {
    path: "/controller_settings",
    name: "ControllerSettings",
    component: ControllerSettings,
  },  
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "*",
    component: Empty // the component you want to always display
  }  
];

const router = new VueRouter({
  routes
});

export default router;
