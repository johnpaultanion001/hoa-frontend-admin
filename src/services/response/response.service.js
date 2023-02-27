import api from '../../globals/client';
import config from '../../config/app.config';

var promise;

export default class ResponseService {
    store(data) {
        promise = api.client.post(`/${config.end_point.responses}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.responses}/${id}`, data);
        return promise;
    }
    
    async list(data) {
        promise = await api.client.get(`/${config.end_point.responses}`, {params: data});
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.responses}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.responses}/${id}`);
        return promise;
    }
}

export const responseService = new ResponseService();
