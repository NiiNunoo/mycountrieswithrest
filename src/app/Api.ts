import axios from "axios";

//configure request to server with axios

const http = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
});

export const api = {
    //get all countries
    getCountries: async () => {
        const response = await http.get('/all')
        const data = await response.data
        return data;
    },
}
