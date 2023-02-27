import api from '../../globals/client';
import config from '../../config/app.config';

var promise;

export default class FileService {
    store(data) {
        promise = api.client.post(`/${config.end_point.files}`, data);
        return promise;
    }

    update(id, data) {
        promise = api.client.put(`/${config.end_point.files}/${id}`, data);
        return promise;
    }

    async list(data) {
        promise = await api.client.get(`/${config.end_point.files}`, {params: data});
        return promise;
    }

    show(id) {
        promise = api.client.get(`/${config.end_point.files}/${id}`);
        return promise;
    }

    delete(id) {
        promise = api.client.delete(`/${config.end_point.files}/${id}`);
        return promise;
    }


    upload(file, body = {}) {

        let data = new FormData();
        data.append('file', file);

        for (var key of Object.keys(body)) {
            data.append(key, body[key]);
        }

        const options = {
            header: {
                'Content-Type': 'image/png'
            }
        }

        promise = api.client.post(`/${config.end_point.files}/upload`, data,options);
        return promise;

    }

    crop(body,directory){
        let data = new FormData();

        body.forEach((value,key) => {
            data.append(value.key, value.blob, value.name)
        });
        data.append("directory",directory);
        promise = api.client.post(`/${config.end_point.files}/upload`, data);

        return promise;
    }
}

export const fileService = new FileService();
