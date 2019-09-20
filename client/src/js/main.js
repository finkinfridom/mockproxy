import Vue from "vue";
//import App from "./App";
// import Key from "./Key";
Vue.config.productionTip = false;

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);

const routes = {
	"/": "Home",
	"/keys": "Keys"
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
			console.log(matchingView, this.currentRoute, __dirname);

			return matchingView
				? require("../pages/" + matchingView + ".vue")
				: require("../pages/404.vue");
		}
	},
	render(h) {
		return h(this.ViewComponent);
	}
});

window.addEventListener("popstate", () => {
	app.currentRoute = window.location.pathname;
});
