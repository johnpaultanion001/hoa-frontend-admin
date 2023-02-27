import {alertService} from "@/services/alert/alert.service";
import {authService} from "@/services/auth/auth.service";

export default {
    data: () => {
        return {
            data: {},
            error: {},
            config: {}
        }
    },
    async mounted() {


    },
    methods: {


        async login$() {

            await alertService.loading();

            await authService.login(this.data).then(() => {
                this.$router.push({name: 'dashboard.index'}).then(() => alertService.close());
            }).catch((response) => {
                this.error = response;
                alertService.close();
            });

        },
    }

}
