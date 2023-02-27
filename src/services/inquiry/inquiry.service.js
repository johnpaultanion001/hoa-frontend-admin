import api from "../../globals/client";
import config from "../../config/app.config";

var promise;

export default class InquiryService {
    store(data) {
        promise = api.client.post(`/${config.end_point.inquiries}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.inquiries}/${id}`, data);
        return promise;
    }

    async list(data) {
        promise = await api.client.get(`/${config.end_point.inquiries}`, { params: data });
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.inquiries}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.inquiries}/${id}`);
        return promise;
    }

    reply(id, data) {
        promise = api.client.post(`/${config.end_point.inquiries}/reply/${id}`, data);
        return promise;
    }
}

export const inquiryService = new InquiryService();
