import axios from "axios";
import config from "../config/app.config";
import Vue from "vue";
import router from "../router";

const host = window.location.host;
const parts = host.split(".");
const domain_length = 3; // route1.example.com => domain length = 3

const client = axios.create({
    baseURL: config.api_url,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        "Access-Type": "admin",
    },
});

client.interceptors.request.use(
    (response) => {


        let auth = Vue.$storage.get("auth");
        if (auth && auth.access_token) {
            response.headers["Authorization"] = "Bearer " + auth.access_token;
        }

        if (domain_length == 3 && !["www", config.base_client].includes(parts[0])) {
            response.headers["Company"] = parts[0];
        }

        let profile = Vue.$storage.get("profile");
        if(profile){
            if(profile.role == "super_admin"){

                if(response.params && !response.params.exclude_from_company_injection){
                    let filter = Vue.$storage.get("super_admin_filter");
                    if(filter && filter.company_id && filter.company_id != 0){
                        response.params['company_id'] = filter.company_id;
                    }

                }
            }
        }


        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//response interceptors
client.interceptors.response.use(
    (response) => {
        delete response.data.code;

        return response.data;
    },
    (error) => {
        var response = error.response.data;
        delete response.code;

        if (error.response.status === 401 && router.currentRoute.name !== "login") {
            Vue.$storage.remove("auth");
            router.push({ name: "login" });
            return;
        }
        return Promise.reject(response);
    }
);

export default {
    client,
};
