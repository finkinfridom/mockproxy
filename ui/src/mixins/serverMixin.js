import axios from "axios";
const API_URL = "https://mockproxy.herokuapp.com/api/v1";
export const serverMixin = {
	methods: {
		getKeys() {
			return axios.get(`${API_URL}/keys`);
		},
		getRequests(key) {
			return axios.get(`${API_URL}/requests/${key}`);
		},
		saveRequest(req) {
			return axios.get(`${API_URL}/${req.key}${req.url}`);
		}
	}
};
