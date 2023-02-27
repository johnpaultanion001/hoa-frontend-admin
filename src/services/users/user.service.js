import api from '../../globals/client';
import config from '../../config/app.config';

var promise;

export default class UserService {


    store(data) {
        promise = api.client.post(`/${config.end_point.users}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.users}/${id}`, data);
        return promise;
    }

    async list(data) {
        promise = await api.client.get(`/${config.end_point.users}`, {params: data});
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.users}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.users}/${id}`);
        return promise;
    }
}

export const userService = new UserService();
