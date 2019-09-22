import Vue from "vue";
//import App from "./App";
// import Key from "./Key";
Vue.config.productionTip = false;

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);

const routes = {
	"/": () => {
		return require("../pages/Home.vue").default;
	}
	// "/keys": () => {
	// 	return require("../pages/Keys.vue");
	// }
	// "/keys": Key
};
new Vue({
	el: "#app",
	data: {
		currentRoute: window.location.pathname
	},
	computed: {
		ViewComponent() {
			const matchingView = routes[this.currentRoute];
			return matchingView
				? matchingView()
				: require("../pages/404.vue").default;
		}
	},
	render(h) {
		return h(this.ViewComponent);
	}
});

window.addEventListener("popstate", () => {
	app.currentRoute = window.location.pathname;
});
