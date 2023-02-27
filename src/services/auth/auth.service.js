import api from '../../globals/client';
import config from '../../config/app.config';

var promise;

export default class AuthService {
    authorized(data) {
        promise = api.client.post(`/${config.end_point.auth}`, data);
        return promise;
    }


    profile() {
        promise = api.client.get(`/${config.end_point.auth}/profile`);
        return promise;
    }

}

export const authService = new AuthService();
