import axios from "axios";

const client = axios.create();

client.defaults.baseURL = "https://api.okraseoul.com/";
// "http://49.50.174.103:3000/";

axios.defaults.withCredentials = true;

export default client;
