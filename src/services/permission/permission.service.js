import api from '../../globals/client';
import config from '../../config/app.config';

var promise;

export default class PermissionService {
    store(data) {
        promise = api.client.post(`/${config.end_point.permission}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.permission}/${id}`, data);
        return promise;
    }

    async list(data) {
        promise = await api.client.get(`/${config.end_point.permission}`, {params: data});
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.permission}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.permission}/${id}`);
        return promise;
    }


    async lookup() {
        promise = await api.client.get(`/${config.end_point.permission}/look-up/get`);
        return promise;
    }
}

export const permissionService = new PermissionService();
