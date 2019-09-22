import Vue from "vue";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.use(VueRouter);
Vue.use(VueMaterial);

import App from "./app";
import Home from "../pages/Home";
const routes = [
	{
		path: "/",
		component: Home
		// children: [
		// 	{
		// 		path: "",
		// 		name: "home",
		// 		component: Home
		// 	},
		// 	{
		// 		path: "*",
		// 		component: require("../pages/404.vue")
		// 	}
		// ]
	}
];
const router = new VueRouter({
	routes,
	mode: "history"
});
new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
