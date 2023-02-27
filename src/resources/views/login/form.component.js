import { alertService } from "@/services/alert/alert.service";
import { firebaseService } from "@/services/firebase/firebase.service";
import Vue from "vue";
import { default as auth } from "../../../shared/map/auth.map";
import { authService } from "../../../services/auth/auth.service";
import { authorized } from "../../../shared/mockup/user-setting.mockup";
import {permissionService} from "../../../services/permission/permission.service";
import {pages} from "../../../shared/mockup/pages.mockup";

export default {
    data: () => {
        return {
            data: {},
            error: {},
            config: {}
        };
    },
    async mounted() {},
    methods: {
        async login$() {
            await alertService.loading();

            await firebaseService
                .login(this.data)
                .then((response) => this.handle_success(response))
                .catch((response) => this.handle_error());
        },
        async google$() {
            await firebaseService
                .google()
                .then((response) => this.handle_success(response))
                .catch((response) => this.handle_error());
        },
        async handle_error() {
            this.error = {
                message: "Invalid Credential.",
            };
            this.data = {};
            alertService.close();
        },
        async handle_success(response) {
            let input = {};
            auth.forEach((value, key) => {
                input[value.to] = response.user[value.from];
            });
            Vue.$storage.set("auth", input);

            await authService
                .authorized({ allowed: authorized.allowed })
                .then(async (success) => {
                    let profile = await authService.profile().then((response) => response.data);
                    Vue.$storage.set("profile", profile);
                    await this.init_permissions({role: profile.role, paginate: 0});

                })
                .catch((error) => this.handle_error());
        },

        async init_permissions(query){
            const response   = await permissionService.list(query);
            let permission = response.data;
            let stop = false;
            pages.forEach((value,key) => {

                let landing = permission.find(el => el.key == value.permission);

                if(landing && !stop){
                    stop = true;
                    this.$router.push({ name: value.path }).then(() => alertService.close());

                }

            });

        },
    },
};
