import api from "../../globals/client";
import config from "../../config/app.config";

var promise;

export default class AnalyticService {
    async all(data) {
        promise = await api.client.get(`/${config.end_point.analytics}/dashboard`, { params: data });
        return promise;
    }
}

export const analyticService = new AnalyticService();
