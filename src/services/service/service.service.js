import api from '../../globals/client';
import config from '../../config/app.config';

var promise;

export default class ServiceService {
    store(data) {
        promise = api.client.post(`/${config.end_point.services}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.services}/${id}`, data);
        return promise;
    }

    async list(data) {
        promise = await api.client.get(`/${config.end_point.services}`, {params: data});
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.services}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.services}/${id}`);
        return promise;
    }


    async availabilities(id,data) {
        promise = await api.client.get(`/${config.end_point.services}/date-availabilities/${id}`, {params: data});
        return promise;
    }
}

export const serviceService = new ServiceService();
