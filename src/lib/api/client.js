import axios from "axios";

const client = axios.create();

client.defaults.baseURL = "http://api.okraseoul.com:443/";
// "http://49.50.174.103:3000/";

axios.defaults.withCredentials = true;

export default client;
