import api from '../../globals/client';
import config from '../../config/app.config';

var promise;

export default class AdvertisementService {


    store(data) {
        promise = api.client.post(`/${config.end_point.advertisements}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.advertisements}/${id}`, data);
        return promise;
    }

    async list(data) {
        promise = await api.client.get(`/${config.end_point.advertisements}`, {params: data});
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.advertisements}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.advertisements}/${id}`);
        return promise;
    }
}

export const advertisementService = new AdvertisementService();
