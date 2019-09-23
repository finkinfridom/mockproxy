import axios from "axios";
export const serverMixin = {
	methods: {
		getKeys() {
			return axios.get("https://mockproxy.herokuapp.com/api/v1/keys");
		},
		getRequests(key) {
			return axios.get(
				`https://mockproxy.herokuapp.com/api/v1/requests/${key}`
			);
		}
	}
};
