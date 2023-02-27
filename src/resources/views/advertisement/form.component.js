import { alertService } from "@/services/alert/alert.service";
import { fileService } from "../../../services/file/file.service";
import { advertisementService } from "../../../services/advertisement/advertisement.service";

export default {
    data: () => {
        return {
            data: {
                file_cover: {},
            },
            error: {},
            config: {},
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        async upload$($event, data, key) {
            await fileService.upload($event.target.files[0], { directory: "ads" }).then((success) => {
                this.data[key] = { ...this.data[key], ...success.data, ...data };
            });
        },
        async store$() {
            var callback = async () => {
                await advertisementService
                    .store(this.data)
                    .then(async (success) => {
                        await fileService.store({ ...this.data.file_cover, table_type: "advertisements", table_id: success.data.id });

                        this.error = {};
                        alertService.success("success", "success");

                        this.data = {
                            file_cover: {},
                        };
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async update$() {
            var callback = async () => {
                await advertisementService
                    .update(this.$route.params.id, this.data)
                    .then(async (success) => {
                        await fileService.update(this.data.file_cover.id, { ...this.data.file_cover, table_type: "advertisements", table_id: success.data.id });

                        this.error = {};
                        alertService.success("success", "success");
                        await this.show(this.$route.params.id);
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async show(id) {
            var response = await advertisementService.show(id);
            this.data = response.data;
        },
    },
};
