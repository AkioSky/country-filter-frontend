import http from "./http-common";

class ApiService {
    getCountries() {
        return http.get('/country');
    }
}


export default new ApiService();