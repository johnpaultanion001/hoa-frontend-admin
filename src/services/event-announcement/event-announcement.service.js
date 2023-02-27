import api from "../../globals/client";
import config from "../../config/app.config";

var promise;

export default class EventAnnouncementService {
    store(data) {
        promise = api.client.post(`/${config.end_point.event_announcements}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.event_announcements}/${id}`, data);
        return promise;
    }

    async list(data) {
        promise = await api.client.get(`/${config.end_point.event_announcements}`, { params: data });
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.event_announcements}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.event_announcements}/${id}`);
        return promise;
    }

    tags(id) {
        promise = api.client.get(`/${config.end_point.event_announcements}/get/tags`);
        return promise;
    }
}

export const eventAnnouncementService = new EventAnnouncementService();
