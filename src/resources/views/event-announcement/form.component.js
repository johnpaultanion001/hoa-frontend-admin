import { alertService } from "@/services/alert/alert.service";

import { fileService } from "../../../services/file/file.service";
import { eventAnnouncementService } from "../../../services/event-announcement/event-announcement.service";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { userService } from "../../../services/users/user.service";
// src\services\event-announcement\event-announcement.service.js
export default {
    components: { vSelect },
    data: () => {
        return {
            data: {
                file_cover: {},
                body: "",
                tags: [],
            },
            tags: [],
            error: {},
            config: {},
            assignees: [],
        };
    },
    async mounted() {
        await this.init_assignees();
        await this.init_tags();
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        // async upload$($event, data, key) {
        //     await fileService.upload($event.target.files[0], { directory: "events-announcements" }).then((success) => {
        //         this.data[key] = { ...this.data[key], ...success.data, ...data };
        //     });
        // },
        async store$() {
            var callback = async () => {
                await eventAnnouncementService
                    .store(this.data)
                    .then(async (success) => {
                        // await fileService.store({ ...this.data.file_cover, table_type: "event_announcements", table_id: success.data.id });

                        this.error = {};
                        alertService.success("success", "success");

                        this.data = {
                            file_cover: {},
                            tags: [],
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
                await eventAnnouncementService
                    .update(this.$route.params.id, this.data)
                    .then(async (success) => {
                        // await fileService.update(this.data.file_cover.id, { ...this.data.file_cover, table_type: "event_announcements", table_id: success.data.id });

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
            var response = await eventAnnouncementService.show(id);
            this.data = response.data;
        },
        async init_tags() {
            var response = await eventAnnouncementService.tags();
            this.tags = response.data;
        },
        async init_assignees() {
            const response = await userService.list({ paginate: 0, roles: `super_admin-company` });

            this.assignees = response.data;
        },
    },
};
