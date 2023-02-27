import {alertService} from "@/services/alert/alert.service";
import {firebaseService} from "@/services/firebase/firebase.service";
import Vue from "vue";
import {default as auth} from "../../../shared/map/auth.map";

export default {
    data: () => {
        return {
            data: {},
            error: {},
            config: {
                success: false
            },
        }
    },
    async mounted() {


    },
    methods: {


        async submit$() {

            this.config.success = false;

            await alertService.loading();

            await firebaseService.password_reset(this.data.email).then(async (response) => {
                this.error = {}
                this.data = {};
                this.config.success = true;
                alertService.close();
            }).catch(async (response) => {

                this.error = {
                    message: "Email Not Found."
                };
                this.data = {};
                alertService.close();
            });

        },


    },


}
