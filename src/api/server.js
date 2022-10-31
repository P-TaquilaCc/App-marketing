import axios from "axios";

export default axios.create({
    baseURL: 'http://192.168.1.53:8000',
   /*  baseURL: 'https://marketing-virtual.org', */ 
}); 