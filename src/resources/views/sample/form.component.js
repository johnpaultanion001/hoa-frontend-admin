import {alertService} from "@/services/alert/alert.service";
import {sampleService} from "@/services/sample/sample.service";


export default {
    data: () => {
        return {
            data: {},
            error: {},
            config: {},

        }
    },
    async mounted() {


        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {

        async store$() {
            var callback = async () => {
                await sampleService.store(this.data)
                    .then(() => {
                        this.error = {};
                        alertService.success('success', 'success');
                        this.data = {};
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            }
            alertService.confirmation(callback, 'Confirmation', 'Are you sure?');
        },
        async update$() {
            var callback = async () => {

                await sampleService.update(this.$route.params.id, this.data)
                    .then(async () => {
                        this.error = {};
                        alertService.success('success', 'success');
                        await this.show(this.$route.params.id);
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            }
            alertService.confirmation(callback, 'Confirmation', 'Are you sure?');
        },
        async show(id) {

            var response = await sampleService.show(id);
            this.data = response.data;

        }
    }

}
